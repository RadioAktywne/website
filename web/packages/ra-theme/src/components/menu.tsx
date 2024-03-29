import { connect, Global, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import AmpHead from "./amp-head";
import { CloseIcon, HamburgerIcon } from "./menu-icon";
import MenuModal from "./menu-modal";

/**
 * The menu that should be displayed on mobile devices displaying links to
 * various categories and pages. This component contains mostly logic and
 * renders the {@link MenuModal} component.
 *
 * @returns A React component.
 */
function MobileMenu() {
  const { state, actions } = useConnect<Packages>();
  const { menu, isMobileMenuOpen } = state.theme;

  if (menu?.length === 0) return null;

  return state.frontity.mode === "amp" ? (
    <>
      <AmpHead />

      <MenuToggle>
        <HamburgerIcon
          color="white"
          size="24px"
          role="button"
          tabindex="0"
          data-amp-bind-hidden="isMenuOpen"
          on="tap:AMP.setState({ isMenuOpen: true })"
        />
        <CloseIcon
          color="white"
          size="20px"
          role="button"
          tabindex="0"
          data-amp-bind-hidden="!isMenuOpen"
          on="tap:AMP.setState({ isMenuOpen: false })"
          hidden
        />
      </MenuToggle>
      <MenuModal data-amp-bind-hidden="!isMenuOpen" hidden />
    </>
  ) : (
    <>
      <MenuToggle onClick={actions.theme.toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <>
            {/* Add some style to the body when menu is open,
            to prevent body scroll */}
            <Global styles={{ body: { overflowY: "hidden" } }} />
            <CloseIcon color="#6aba9c" size="20px" />
          </>
        ) : (
          <HamburgerIcon color="#6aba9c" size="24px" />
        )}
      </MenuToggle>
      {/* If the menu is open, render the menu modal */}
      {isMobileMenuOpen && <MenuModal />}
    </>
  );
}

const MenuToggle = styled.button`
  position: absolute;
  right: 10px;
  top: 20px;
  background: transparent;
  border: 0;
  color: #6aba9c;
  z-index: 5;
  height: 40px;
  width: 40px;
  display: none;

  @media (max-width: 560px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default connect(MobileMenu);
