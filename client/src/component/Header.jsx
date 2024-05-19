import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex  justify-between items-center">
        <h1 className="text-white text-4xl font-bold">Your Blogs</h1>
        <div>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className="text-gray-300 hover:text-white"
                activeClassName="text-white  font-bold"
                exact
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addBlog"
                className="text-gray-300 hover:text-white"
                activeClassName="text-white font-bold"
              >
                Add Blog
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
