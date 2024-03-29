import { motion } from "framer-motion";
import { connect, styled, useConnect } from "frontity";
import useMedia from "../hooks/useMedia";
import Loading from "./loading";
import path from 'path';
import { Packages } from "../../types";

/**
 * Props of the {@link FeaturedImage} component.
 */
interface FeaturedImageProps {
  /**
   * ID of the attachment entity.
   * size - full, large, medium, medium_large, thumbnail
   */
  id: number;
  size: string;
}

/**
 * Props of the {@link Container} component.
 */
interface ContainerProps {
  /**
   * Flag indicating if the component is rendered in AMP mode.
   */
  isAmp: boolean;
}

/**
 * The Component that renders a featured image.
 *
 * @param props - The state injected by {@link connect } and the ID of the
 * featured image.
 *
 * @returns A react component.
 */
function FeaturedImage({ id, size }: FeaturedImageProps): JSX.Element {
  const {
    status,
    value: [media],
  } = useMedia([id]);

  const { state } = useConnect<Packages>();

  if (status === "pending") return <Loading />;
  if (!media) return null;

  // temporairly,  use the same og image on all pages - set in index.html
  // /**
  //  * If the image is meant to be a part of main content of the page, set is as preview image in links.
  //  */
  // if(media && (size == "large" || size == "full")) {
  //   const ogImageTag = document.createElement("meta");
  //   ogImageTag.setAttribute("property", "og:image");
  //   ogImageTag.setAttribute("content", media.source_url + ".webp");
  //   document.head.appendChild(ogImageTag);
  // }

  return (
    <SquareContainer
      style={{
        background: "url(" + 
            (media && media.media_details && media.media_details.sizes[size] ? 
            (media.source_url.substring(0, media.source_url.lastIndexOf('/') + 1) + media.media_details.sizes[size].file)
            : (media.source_url))
           + ".webp)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    />
  );
}

export default connect(FeaturedImage);

const SquareContainer = styled(motion.div)`
  height: 0;
  width: 100%;
  padding-bottom: 100%;
`;
