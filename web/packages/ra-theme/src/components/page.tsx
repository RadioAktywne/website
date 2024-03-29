import { isPageEntity } from "@frontity/source";
import { PageData, PageEntity } from "@frontity/source/types";
import { connect, styled, useConnect } from "frontity";
import parse from "html-react-parser";
import { Packages } from "../../types";
import Loading from "./loading";

/**
 * Properties received by the `Page` component.
 */
interface PageProps {
  /**
   * Data element representing a URL in your frontity site.
   */
  data: PageData;

  /**
   * Whether to render this component.
   */
  when?: boolean;
}

/**
 * The Page component that is used to render pages
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Page when={data.isPage} />
 * </Switch>
 * ```
 *
 * @returns The {@link Page} element rendered.
 */
function Page({ data }: PageProps): JSX.Element {
  const { state } = useConnect<Packages>();
  // Get the data of the page.
  const page: PageEntity = state.source[data.type][data.id];

  return data.isReady ? (
    <Container>
      <MainContent>
        <Title>
          <h1>{parse(page.title.rendered)}</h1>
        </Title>

        <Description>
          {isPageEntity(page) && parse(page.content?.rendered)}
        </Description>
      </MainContent>
    </Container>
  ) : (
    <Loading />
  );
}

export default connect(Page);

const Container = styled.div`
  max-width: 800px;
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

  & img {
    max-width: 760px !important;
    height: auto;
    object-fit: cover;
    object-position: center;
    margin-left: auto;
    margin-right: auto;
  }

  & figure {
    margin: 0;
  }

  & ul,
  & ol {
    line-height: 1.5;
    margin: 0;
  }

  @media (max-width: 1400px) {
    font-size: 0.8rem;
  }

  & .aligncenter,
  & .alignleft,
  & .alignright {
    width: fit-content;
  }

  & .aligncenter {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  & .alignright {
    float: right;
    margin-left: 24px;
  }

  & .alignleft {
    float: left;
    margin-right: 24px;
  }

  & iframe {
    display: block;
  }

  & blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  & .has-light-green-cyan-color {
    color: #7bdcb5;
  }

  & .has-cyan-bluish-gray-color {
    color: #abb8c3;
  }

  & .has-white-color {
    color: #ffffff;
  }

  & .has-pale-pink-color {
    color: #f78da7;
  }

  & .has-vivid-red-color {
    color: #cf2e2e;
  }

  & .has-luminous-vivid-orange-color {
    color: #ff6900;
  }

  & .has-luminous-vivid-amber-color {
    color: #fcb900;
  }

  & .has-vivid-green-cyan-color {
    color: #00d084;
  }

  & .has-pale-cyan-blue-color {
    color: #8ed1fc;
  }

  & .has-vivid-cyan-blue-color {
    color: #0693e3;
  }

  & .has-vivid-purple-color {
    color: #9b51e0;
  }

  & .wp-block-table table {
    border-collapse: collapse;
    width: 100%;
    overflow-wrap: break-word;
  }

  & thead {
    border-bottom: 3px solid;
  }

  & .wp-block-table table {
    border-collapse: collapse;
  }

  & .wp-block-table td,
  .wp-block-table th {
    border: 1px solid;
    padding: 0.5em;
  }

  & figcaption {
    white-space: pre-wrap;
    min-width: 1px;
    color: #555;
    font-size: 13px;
    text-align: center;
  }

  & .wp-block-code {
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: Menlo, Consolas, monaco, monospace;
    padding: 0.8em 1em;
  }
`;

const MainContent = styled.div`
  width: 100%;
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
