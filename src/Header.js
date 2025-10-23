import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
  const [{ user },dispatch] = useStateValue();
  
  const handleAuthentication = () => {
    if(user) {
      auth.signOut();
    }
  }
  
  return (
    <div className='header'> 
        <Link to="/">
        <img 
           className="header__logo"
           src="https://upload.wikimedia.org/wikipedia/en/6/6b/Cet_emblem.jpg"
           alt="CET Logo"
        />
        </Link>

        <div className="header__title">
            <h1>STUDENT ATTENDANCE SYSTEM</h1>
        </div>
      

        <div className="header__nav">
            <Link to={!user && "/login"}>
            <div onClick={handleAuthentication} className="header__option">
                <span className="header__optionLineOne">Hello, {user?.email?.split('@')[0] || 'Guest'}</span>
                <span className="header__optionLineTwo">{user?"Sign Out":"Sign In"}</span>
            </div>
            </Link>
            <Link to="/">
            <div className="header__option">
                <span className="header__optionLineOne">View</span>
                <span className="header__optionLineTwo">Courses</span>
            </div>
            </Link>
        </div> 
    </div>
  )
}

export default Header;