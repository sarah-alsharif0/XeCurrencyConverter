import React, { useState } from "react";
import classes from "./header.module.css";
import { Convert } from "../convert/convert.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';


export const Header = () => {
  const [currentTab, setCurrentTab] = useState("convert");
  const handleClick = (tabName) => {
    setCurrentTab(tabName);
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Xe Currency Converter</h1>
      <h3 className={classes.spanText}>
        Check live foreign currency exchange rates
      </h3>
      <div className={classes.contentContainer}>
        <div className={classes.tabsContainer}>
          <div
            onClick={() => handleClick("convert")}
            className={[
              classes.tab,
              currentTab === "convert" && classes.selectedTab,
              classes.leftCornerTab,
            ].join(" ")}
          >
            Convert
          </div>
          <div
            onClick={() => handleClick("send")}
            className={[
              classes.tab,
              currentTab === "send" && classes.selectedTab,
            ].join(" ")}
          >
            Send
          </div>
          <div
            onClick={() => handleClick("charts")}
            className={[
              classes.tab,
              currentTab === "charts" && classes.selectedTab,
            ].join(" ")}
          >
            Charts
          </div>
          <div
            onClick={() => handleClick("alerts")}
            className={[
              classes.tab,
              currentTab === "alerts" && classes.selectedTab,
              classes.rightCornerTab,
            ].join(" ")}
          >
            Alerts
          </div>
        </div>
        {currentTab === "convert"&&<Convert/>}
        {currentTab === "send" && <div className={classes.box}>send</div>}
        {currentTab === "charts" && <div className={classes.box}>charts</div>}
        {currentTab === "alerts" && <div className={classes.box}>alerts</div>}
      </div>
    </div>
  );
};
