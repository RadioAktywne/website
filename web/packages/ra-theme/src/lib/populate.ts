import { DataEntity } from "@frontity/source/types";
import * as schemas from "@frontity/wp-source/src/libraries/schemas";
import { transformLink } from "@frontity/wp-source/src/libraries/transform-link";
import { State } from "frontity/types";
import { normalize } from "normalizr";
import { Packages } from "../../types";
import { replacePath } from "./utils";

export type PopulateParams = {
  state: State<Packages>;
  response: Response;
  subdirectory?: string;
  force?: boolean;
};

/**
 * A library helper to add entities to the Frontity state.
 *
 * @remarks
 * Entities are not overwritten. If an entity already exists in the state
 * and a new one is fetched, the one in the state will prevail. If you
 * want to overwrite them, use the `force` option.
 *
 * @example
 * ```js
 * const response = await libraries.source.api.get({ endpoint: "posts" });
 * const entities = await libraries.source.populate({ response, state });
 * ```
 *
 * @param populateParams - Types specified in {@link PopulateParams}.
 *
 * @returns
 * Returns a promise that resolves with an array of objects with
 * attributes `type`, `id` and `link` representing the added entities.
 */
export default async function populate({
  response,
  state,
  subdirectory,
  force,
}: PopulateParams): Promise<DataEntity[]> {
  // Normalize response
  const json = await response.json();
  const isList = Array.isArray(json);
  const { entities, result } = normalize(
    json,
    isList ? schemas.list : schemas.entity,
  );

  // Add entities to source
  Object.entries(entities).forEach(([schema, entityMap]) => {
    Object.entries(entityMap).forEach(([, entity]) => {
      // Fix links that come from the REST API
      // to match the Frontity server location.
      if (entity.link) {
        transformLink({ entity, state, subdirectory });
        entity.link = replacePath(entity.link, state.config);
      }

      // Get or init data using the transformed link
      const { data } = state.source;
      const entityData =
        data[entity.link] ||
        (data[entity.link] = {
          isReady: false,
          isFetching: false,
          link: entity.link,
          route: entity.link,
          query: {},
          page: 1,
        });

      let entityMap: any;
      let entityKey: string | number;

      if (
        schema === "postEntity" ||
        schema === "attachmentEntity" ||
        schema === "commentEntity"
      ) {
        if (!state.source[entity.type]) state.source[entity.type] = {};
        entityMap = state.source[entity.type];
        entityKey = entity.id;
        Object.assign(entityData, {
          type: entity.type,
          id: entity.id,
        });
      } else if (schema === "taxonomyEntity") {
        if (!state.source[entity.taxonomy]) state.source[entity.taxonomy] = {};
        entityMap = state.source[entity.taxonomy];
        entityKey = entity.id;
        Object.assign(entityData, {
          taxonomy: entity.taxonomy,
          id: entity.id,
        });
      } else if (schema === "authorEntity") {
        entityMap = state.source.author;
        entityKey = entity.id;
        Object.assign(entityData, {
          id: entity.id,
        });
      } else if (schema === "postType") {
        entityMap = state.source.type;
        entityKey = entity.slug;
      } else if (schema === "taxonomyType") {
        entityMap = state.source.taxonomy;
        entityKey = entity.slug;
      }

      // Add the entity if it doesn't exist.
      if (entityMap && (!entityMap[entityKey] || force)) {
        entityMap[entityKey] = entity;
      }
    });
  });

  // Return type, id and link of added entities
  return (isList ? result : [result]).map(({ id: entityId, schema }) => {
    const { type, id, link } = entities[schema][entityId];
    return { type, id, link };
  });
}
