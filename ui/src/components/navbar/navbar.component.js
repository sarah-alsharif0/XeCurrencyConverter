import React from "react";
import classes from "./navbar.module.css";

export const Navbar = () => {
  return (

    <nav className={classes.navbar}>
      <div>
        <a href="/"><img alt="logo" className={classes.logo} src="/images/xeLogo.png"/></a>
      </div>
      <ul className={classes.navList}>
        <li className={classes.navItem}>Converter</li>
        <li className={classes.navItem}>Send money</li>
        <li className={classes.navItem}>Business & API</li>
        <li className={classes.navItem}>Tools</li>
        <li className={classes.navItem}>Resources</li>
      </ul>
      <div>
        <button className={classes.signInButton}>Sign in</button>
        <button className={classes.signUpButton}>Sign up</button>
      </div>
    </nav>
  );
};
