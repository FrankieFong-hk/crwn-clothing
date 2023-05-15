import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { NaviagtionContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";

import CartIcon from "../../components/cart-icon/cart-icons.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { selectCurrentUser } from "../../store/user/user.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { signOut } from "firebase/auth";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);


  const isCartOpen = useSelector(selectIsCartOpen);

  return(
    <Fragment>
      <NaviagtionContainer>
      <LogoContainer to='/crwn-clothing/'>
        <CrwnLogo className="logo" />
      </LogoContainer>
        <NavLinks>
          <NavLink to='./shop'>
              SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>{' '}SIGN OUT{' '}</NavLink>
              )
              : 
              (
                <NavLink to='./auth'>
                  SIGN IN
                </NavLink>
              ) 
          }

          <CartIcon />
          
        </NavLinks>

        {isCartOpen && <CartDropdown />}
      </NaviagtionContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
