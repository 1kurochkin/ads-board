import React from 'react';
import "./logoStyles.css"
import { NavLink } from 'react-router-dom';

const Logo = (props: any) => {
    const {className} = props
  return (
      <NavLink className={className} to={"/feed"}>
          <div className="logo navbar-brand mb-0 h1 d-flex">
              <span className={"border rounded d-flex align-items-center p-0 pl-2 pr-2 mr-2 font-weight-bold bg-warning text-dark border-dark"}>S</span>
              <span className={"font-weight-bold"}>salamkg.ru</span>
          </div>
      </NavLink>

  );
}

export default Logo;
