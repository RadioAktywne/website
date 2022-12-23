import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { InfoTileArchiveData, InfoTileEntity } from "../../data";
import Loading from "../loading";
import InfoTileListItem from "./info-tile-list-item";

/**
 * Props received by the {@link InfoTileList} component.
 */
interface ListProps {
  /**
   * Data object representing an archive link.
   */
  data: InfoTileArchiveData;

  /**
   * Flag used by Frontity's {@link Switch} component to decide whether
   * this component should be rendered.
   */
  when?: boolean;
}

/**
 * Component that renders the list of info tiles,
 * passed as an {@link InfoTileArchiveData} object.
 *
 * @param props - Object of type {@link ListProps}.
 * @returns React component.
 */
function InfoTileList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  const tiles = data.items.reduce((acc, item) => {
    const tile = state.source[item.type]?.[item.id] as InfoTileEntity;
    return { ...acc, [tile.acf.id]: tile };
  }, {} as { [id: string]: InfoTileEntity });

  if (!data.isReady) return <Loading />;

  return (
    <Container>
      {tiles.topleft && (
        <TileContainer id="item-0">
          <InfoTileListItem item={tiles.topleft} />
        </TileContainer>
      )}
      {tiles.bottomleft && (
        <TileContainer id="item-1">
          <InfoTileListItem item={tiles.bottomleft} />
        </TileContainer>
      )}
      {tiles.topright && (
        <TileContainer id="item-2">
          <InfoTileListItem item={tiles.topright} />
        </TileContainer>
      )}
      {tiles.bottomright && (
        <TileContainer id="item-3">
          <InfoTileListItem item={tiles.bottomright} />
        </TileContainer>
      )}
    </Container>
  );
}

export default connect(InfoTileList);

const Container = styled.section`
  width: 1140px;
  margin: 0;
  padding: 20px;

  display: grid;

  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;

  gap: 15px;
  height: 100%;

  & #item-0 {
    grid-row-start: 1;
    grid-column-start: 1;
    grid-row-end: 2;
    grid-column-end: 3;
  }

  & #item-1 {
    grid-row-start: 2;
    grid-column-start: 1;
    grid-row-end: 3;
    grid-column-end: 3;
  }

  & #item-2 {
    grid-row-start: 1;
    grid-column-start: 3;
    grid-row-end: 2;
    grid-column-end: 4;
  }

  & #item-3 {
    grid-row-start: 2;
    grid-column-start: 3;
    grid-row-end: 3;
    grid-column-end: 4;
  }

  @media (max-width: 1030px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;

    & #item-0 {
      grid-row-start: 1;
      grid-column-start: 1;
      grid-row-end: 2;
      grid-column-end: 2;
    }

    & #item-1 {
      grid-row-start: 2;
      grid-column-start: 1;
      grid-row-end: 3;
      grid-column-end: 2;
    }

    & #item-2 {
      grid-row-start: 1;
      grid-column-start: 2;
      grid-row-end: 2;
      grid-column-end: 3;
    }

    & #item-3 {
      grid-row-start: 2;
      grid-column-start: 2;
      grid-row-end: 3;
      grid-column-end: 3;
    }
  }

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    padding: 20px 0 0 0;
  }
`;

const TileContainer = styled.div`
  width: 100%;
`;
