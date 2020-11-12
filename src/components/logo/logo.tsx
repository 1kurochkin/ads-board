import React from 'react';
import "./logoStyles.css"
import { NavLink } from 'react-router-dom';

const Logo = (props: any) => {

  return (
      <NavLink to={"/feed"}>
          <div className="logo navbar-brand mb-0 h1">
              SALAM
          </div>
      </NavLink>

  );
}

export default Logo;
