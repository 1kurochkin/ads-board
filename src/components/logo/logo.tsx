import React from 'react';
import "./logoStyles.css"
import { NavLink } from 'react-router-dom';

const Logo = (props: any) => {

  return (
      <NavLink to={"/feed"}>
          <div className="logo">
              SALAM
          </div>
      </NavLink>

  );
}

export default Logo;
