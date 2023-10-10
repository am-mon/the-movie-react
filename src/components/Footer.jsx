import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-emerald-600 text-white text-center py-10 px-3">
      {/* <ul className="flex items-center justify-center text-lg">
        <li className="mr-10">
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul> */}
      <p>Copyright © {new Date().getFullYear()} Mon. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
