import { HomeData, PageData, PageEntity } from "@frontity/source/types";
import { motion } from "framer-motion";
import { connect, styled, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../types";
import { EventArchiveData } from "../data";
import AlbumWidget from "./album-list/album-widget";
import EventWidget from "./event-list/event-widget";
import Loading from "./loading";
import Player from "./player";
import RecordingWidget from "./recording-list/recording-widget";

/**
 * Properties received by the `Home` component.
 */
interface HomeProps {
  data: HomeData & PageData;
  when?: boolean;
}

/**
 * The Home component that is used to render homepage
 */
function Home({ data }: HomeProps): JSX.Element {
  const { state, libraries, actions } = useConnect<Packages>();

  // Get the data of the homepage.
  const home: PageEntity = state.source[data.type][data.id];
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  const eventsData = state.source.get(
    state.config.posts.event.archivePath,
  ) as EventArchiveData;

  useEffect(() => {
    state.home.hovered.events = false;
    state.home.hovered.recordings = false;

    // fetch all events to pass them to EventsWidget
    actions.source.fetch(state.config.posts.event.archivePath);
  }, []);

  // Load the page, but only if the data is ready.
  return data.isReady ? (
    <BigContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <Player />
        {eventsData.isReady ? (
          <EventWidget data={eventsData} />
        ) : (
          <EventsLoadingContainer>
            <Loading />
          </EventsLoadingContainer>
        )}
        <RecordingWidget />
        <AlbumWidget />

        {home.content?.rendered && ( // Render the content using the Html2React component so the HTML is
          // processed by the processors we included in the
          // libraries.html2react.processors array.
          <Content>
            <Html2React html={home.content.rendered} />
          </Content>
        )}
      </Container>
    </BigContainer>
  ) : null;
}

export default connect(Home);

const EventsLoadingContainer = styled.div`
  width: 33.33%;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const BigContainer = styled(motion.div)`
  padding-bottom: 50px;
  width: 100%;
  max-width: 1200px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 15px;

  @media (max-width: 900px) {
    padding: 0 0;
  }

  & > div {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const Content = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    width: 100%;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition:
      outline-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
