import React from "react";
import {Link} from "react-router-dom";
import {useAppContext} from "../context/AppContext";

const Sidebar = () => {
  const {userInfo, isOpenSidebar, handleLogout} = useAppContext();

  return (
    <div className={`sidebar ${isOpenSidebar ? 'sidebar_show' : ''}`}>
      <p className='sidebar__email'>{userInfo.email}</p>
      <Link
        to='/signin'
        onClick={handleLogout}
        className='sidebar__link'
      >Выйти</Link>
    </div>
  );
};

export default Sidebar;