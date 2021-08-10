import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import mealTree from '../../images/mealTree.png';


function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/calendar';
    loginLinkData.text = 'Home';
  }

  return (

    <div className="front"><img src={mealTree} height="75px" />
    <div className="back">
    </div>
    </div>
    // <div className="nav">
    //   {/* <Link to="/home">
    //     <h2 className="nav-title">Prime Solo Project</h2>
    //   </Link> */}
    //   <div>

    //     {user.id && (
    //       <>
    //         <Link className="navLink" to="/info">
    //           Info Page
    //         </Link>
    //         <LogOutButton className="navLink" />
    //       </>
    //     )}

    //     <Link className="navLink" to="/about">
    //       About
    //     </Link>
    //   </div>
    // </div>
  );
}

export default Nav;
