import Image from "@frontity/components/image";
import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import React from "react";
import useMedia from "../hooks/useMedia";
import Loading from "./loading";
import Module from "module";

interface DefaultImageProps {
  /**
   * Module of image
   */
  img: Module;
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
 * Component that renders a default image if featured is not provided.
 *
 * @param props - The state injected by {@link connect } and the ID of the
 * featured image.
 *
 * @returns A react component.
 */
function DefaultImage({ img }: DefaultImageProps): JSX.Element {
  const { state } = useConnect<Packages>();

  return (
    <SquareContainer
      style={{
        background: "url(" + img + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );
}

export default connect(DefaultImage);

const SquareContainer = styled.div`
  height: 0;
  width: 100%;
  padding-bottom: 100%;
`;
