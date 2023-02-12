import { connect, styled, useConnect } from "frontity";
import RecordingListItem from "./recording-list-item";
import { Packages } from "../../../types";
import { RecordingArchiveData } from "../../data";
import { useEffect } from "react";
import Loading from "../loading";

/**
 * Props received by the {@link RecordingListPage} component.
 */
interface ListPageProps {
  data: RecordingArchiveData;
  key: number;
}

function RecordingListPage({ data }: ListPageProps): JSX.Element {
  const { actions, state } = useConnect<Packages>();

  /**
   * wait till its fetched
   *  tell state if current page is ready
   *  preload next page
   *  render items from current page
   */
  useEffect(() => {
    state.archives.recordings.ready = data.isReady;

    if (data.next) {
      actions.source.fetch(data.next).then(() => {
        const nextPage = state.source.get(data.next);
        state.archives.recordings.nextPage = nextPage as RecordingArchiveData;
      });
    } else {
      state.archives.recordings.nextPage = undefined;
    }
  }, [data.isReady, data.next]);

  if (!data.isReady) return <Loading />;

  return (
    <Container>
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one RecordingListItem component for each one.
        return <RecordingListItem key={item.id} item={item} />;
      })}
    </Container>
  );
}

export default connect(RecordingListPage);

const Container = styled.section`
  width: 100%;
`;