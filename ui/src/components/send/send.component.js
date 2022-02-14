import React, { useState } from "react";
import classes from "./send.module.css";
import { BsCheckCircle, BsBank2 } from "react-icons/bs";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

export const Send = (props) => {
  const { currencies } = props;
  const [paymentInfo, setpaymentInfo] = useState({
    sender: "",
    reciever: "",
    amount: " ",
    currency: "",
    paymentMethod: "Visa Card",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setpaymentInfo({ ...paymentInfo, [name]: value });
  };
  console.log(paymentInfo);
  return (
    <div className={classes.sendContainer}>
      <div className={classes.formContainer}>
        <div className={classes.inputs}>
          <div className={classes.senderAndReceiver}>
            <div className={classes.inputContainer}>
              <label>Sender:</label>
              <input onChange={handleChange} name="sender" type="text"></input>
            </div>
            <div className={classes.inputContainer}>
              <label>Receiver:</label>
              <input
                onChange={handleChange}
                name="receiver"
                type="text"
              ></input>
            </div>
          </div>
          <div className={classes.inputContainer}>
            <label>Amount:</label>
            <input
              onChange={handleChange}
              name="amount"
              type="number"
              min={1}
            ></input>
          </div>
          <div className={classes.inputContainer}>
            <label>currency:</label>
            <select
              className={classes.select}
              onChange={handleChange}
              name="currency"
              type="text"
            >
              {currencies.map((item, index) => (
                <option key={index}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label>Payment Method:</label>
            <select
              onChange={handleChange}
              name="paymentMethod"
              className={classes.select}
            >
              <option className={classes.option}>Visa Card</option>
              <option className={classes.option}>Mastercard</option>
              <option className={classes.option}>EFT</option>
              <option className={classes.option}>ACH</option>
              <option className={classes.option}>WIRE</option>
            </select>
          </div>
        </div>
        <button className={classes.sendButton}>Send</button>
      </div>
      <div className={classes.aboutContainer}>
        <h3>The fast & trusted way to send money</h3>
        <span>
          Millions of people check our rates and send money with us every day
        </span>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <BsCheckCircle className={classes.checkIcon} />
            See our low fees and exchange rates in real-time
          </li>
          <li className={classes.listItem}>
            <BsCheckCircle className={classes.checkIcon} />
            Transparent delivery times so you can move money fast
          </li>
          <li className={classes.listItem}>
            <BsCheckCircle className={classes.checkIcon} />
            Sign up for a free personal or business account in minutes
          </li>
        </ul>
        <div className={classes.paymentIcons}>
          <FaCcVisa className={classes.paymentIconFill} />
          <FaCcMastercard className={classes.paymentIconFill} />
          <div className={classes.paymentText}>EFT</div>
          <div className={classes.paymentText}>ACH</div>
          <div className={classes.paymentText}>WIRE</div>
          <div className={classes.paymentIcon}>
            <BsBank2 />
          </div>
        </div>
      </div>
    </div>
  );
};
