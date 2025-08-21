import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The route you are trying to access does not exist.</p>
      <NavLink to="/">
        <Button variant="primary">Go to Home</Button>
      </NavLink>
    </div>
  );
};

export default NotFound;
