import React from 'react';
import classes from './convert.module.css';

export const Convert = () => {
  return <div className={classes.convertContainer}>
      <div className={classes.inputs}>
      <div className={classes.inputContainer}>
          <label>Amount</label>
          <input type="number"></input>
      </div>
      <div className={classes.inputContainer}>
          <label>From</label>
          <input type="number"></input>
      </div>
      <button className={classes.swapButton}>swap</button>
      <div className={classes.inputContainer}>
          <label>To</label>
          <input type="number"></input>
      </div>
      </div>
      <div className={classes.actionsContainer}>
          <span>We use midmaket rates </span>
          <button className={classes.convertButton}>Convert</button>
      </div>
  </div>
};
