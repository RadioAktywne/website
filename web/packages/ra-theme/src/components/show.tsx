import { motion } from "framer-motion";
import { connect, styled, useConnect } from "frontity";
import parse from "html-react-parser";
import { Packages } from "../../types";
import { ShowData, ShowEntity } from "../data";
import useMembers from "../hooks/useMembers";
import defaultImageMedia from "../img/defaultMedias/defaultMedia.png";
import Back from "../img/icons/back.svg";
import { replacePath } from "../lib/utils";
import DefaultImage from "./default-image";
import FeaturedImage from "./featured-image";
import Link from "./link";
import Loading from "./loading";
import ShowEvents from "./show-events";

/**
 * Properties received by the `Show` component.
 */
interface ShowProps {
  data: ShowData;
  when?: boolean;
}

/**
 * The Show component that is used to render shows
 *
 * @param props - The Frontity store (state, actions, and libraries).
 * @returns The {@link Show} element rendered.
 */
function Show({ data }: ShowProps): JSX.Element {
  const { state } = useConnect<Packages>();
  // Get the data of the show.
  const show = state.source[data.type][data.id] as ShowEntity;
  const { status, value: hosts } = useMembers(show.acf.hosts);

  if (status === "pending") return <Loading />;

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MainContent>
        <Title>
          <h1>{show.acf.title}</h1>

          <BackButton>
            <Link link={state.config.posts.show.archivePath}>
              <img src={Back} alt="cofnij" />
            </Link>
          </BackButton>
        </Title>

        <Description>{parse(show.acf.description)}</Description>
      </MainContent>

      <AboutContent>
        <Cover>
          {show.acf.image ? (
            <FeaturedImage id={show.acf.image} size="large"/>
          ) : (
            <DefaultImage img={defaultImageMedia} />
          )}
        </Cover>

        <Title>
          <h1>Na żywo</h1>
        </Title>
        <List>
          <ShowEvents live={true} showId={show.id} />
        </List>

        <Title>
          <h1>Powtórki</h1>
        </Title>
        <List>
          <ShowEvents live={false} showId={show.id} />
        </List>

        <Title>
          <h1>Redaktorzy</h1>
        </Title>
        <List>
          {hosts.map((value, id) => {
            if (value != undefined)
              return (
                <div key={id}>
                  <Link link={replacePath(value.link, state.config)}>
                    {value.acf.name}
                  </Link>
                </div>
              );
          })}
        </List>
      </AboutContent>
    </Container>
  ) : null;
}

export default connect(Show);

const Container = styled(motion.section)`
  max-width: 1140px;
  width: 100%;
  margin: 0 30px;
  padding: 24px;
  padding-top: 20px;

  display: flex;
  flex-direction: row;

  @media (max-width: 1400px) {
    margin: 0 10px;
  }

  @media (max-width: 750px) {
    flex-direction: column;
    padding: 20px 0;
    margin: 0;
  }
`;

const Description = styled.div`
  color: #30241a;
  font-size: 1rem;
  line-height: 1.7;
  margin-top: 20px;
  white-space: pre-line;

  & ul,
  & ol {
    line-height: 1;
    margin: 0;
  }

  @media (max-width: 1400px) {
    font-size: 0.8rem;
  }

  @media (max-width: 750px) {
    margin: 0 20px;
  }
`;

const MainContent = styled.div`
  width: 66.6%;
  padding-right: 20px;

  @media (max-width: 750px) {
    width: 100%;
    padding-right: 0;
  }
`;

const AboutContent = styled.div`
  width: 33.33%;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const Cover = styled.div`
  width: 100%;
  aspect-ratio: 1/1;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 750px) {
    & img {
      width: 100%;
    }

    aspect-ratio: auto;
    height: auto;
    padding-right: 0;
    border: none;
    margin-top: 30px;
  }

  margin-bottom: 15px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > h1 {
    color: #6aba9c;
    background-color: #30241a;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
    font-size: 1.6rem;
    width: 100%;
    display: flex;
    align-items: center;

    @media (max-width: 1400px) {
      font-size: 1.2rem;
    }
  }
`;

const BackButton = styled.div`
  cursor: pointer;
  border-left: 2px solid #6aba9c;
  background-color: #30241a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6px;

  & img {
    height: 30px;
    width: 50px;
    transform: rotateZ(90deg);
  }
`;

const List = styled.div`
  width: 100%;
  margin: 10px 10px 10px 0;
  display: flex;
  flex-direction: column;

  & > div {
    width: 100%;

    margin: 0;
    padding: 0;
    color: #30241a;
  }

  @media (max-width: 750px) {
    margin-left: 0;
  }

  & > div > a,
  & > div > span {
    padding-left: 15px;
    display: block;

    &:hover {
      color: #6aba9c;
    }
  }

  & > div:nth-of-type(2n + 1) > a,
  & > div:nth-of-type(2n + 1) > span {
    background-color: rgba(48, 36, 26, 0.1);
  }
`;
