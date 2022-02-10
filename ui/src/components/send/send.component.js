import React from "react";
import classes from "./send.module.css";
import {BsCheckCircle,BsBank2 } from "react-icons/bs";
import {FaCcVisa,FaCcMastercard } from "react-icons/fa";

export const Send = () => {
  return (
    <div className={classes.sendContainer}>
      <div className={classes.formContainer}>

      </div>
      <div className={classes.aboutContainer}>
        <h3>The fast & trusted way to send money</h3>
        <span>
          Millions of people check our rates and send money with us every day
        </span>
        <ul className={classes.list}>
          <li className={classes.listItem}>
          <BsCheckCircle className={classes.checkIcon}/>
            See our low fees and exchange rates in real-time
          </li>
          <li className={classes.listItem}>
          <BsCheckCircle className={classes.checkIcon}/>
            Transparent delivery times so you can move money fast
          </li>
          <li className={classes.listItem}>
          <BsCheckCircle className={classes.checkIcon}/>
            Sign up for a free personal or business account in minutes
          </li>
        </ul>
        <div className={classes.paymentIcons}>
            <FaCcVisa className={classes.paymentIconFill}/>
            <FaCcMastercard className={classes.paymentIconFill}/>
            <div className={classes.paymentText}>EFT</div>
            <div className={classes.paymentText}>ACH</div>
            <div className={classes.paymentText}>WIRE</div>
            <div className={classes.paymentIcon}><BsBank2 /></div>
        </div>
      </div>
    </div>
  );
};
