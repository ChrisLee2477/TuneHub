// import Form from "react-bootstrap/Form";
// import React from "react";
// // import { BrowseRouter as Router, Switch, Route, Link } from "react-router-dom";
// export default function Nav() {
//   return (
//     <Form.Select aria-label="Default select example">
//       <option>TunesHub</option>
//       <option value="1">Login</option>
//       <option value="2">Search</option>
//       <option value="3">Playlist</option>
//       <option value="3">Friends</option>
//     </Form.Select>
//   );
// }

import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../assets/Navbar/Navbar.css";
import { IconContext } from "react-icons";

export default function Nav() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
