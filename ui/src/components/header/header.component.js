import React, { useState, useEffect } from "react";
import classes from "./header.module.css";
import { Convert } from "../convert/convert.component";
import {BiCoinStack,BiSend } from "react-icons/bi";
import {AiOutlineLineChart } from "react-icons/ai";
import {BsBell } from "react-icons/bs";
import 'font-awesome/css/font-awesome.min.css';
import { Send } from "../send/send.component";
import { getCurrencies} from "../../services/currencies";

export const Header = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currentTab, setCurrentTab] = useState("convert");
  const handleClick = (tabName) => {
    setCurrentTab(tabName);
  };
  useEffect(() => {
    let tmpCurrencies = [];
    if (currencies.length === 0)
      getCurrencies().then((data) => {
        data.forEach((element) => {
          const currency = element["currencies"]
            ? Object.keys(element["currencies"])[0]
            : "";

          const name = currency ? element["currencies"][currency]["name"] : "";
          const symbol = currency
            ? element["currencies"][currency]["symbol"]
            : "";
          const country = currency ? element["name"]["common"] : "";

          const flag = element["flags"] ? element["flags"]["svg"] : "";
          if (currency && flag && symbol && name && country) {
            const newCurr = {
              country: country,
              currency: currency,
              flag: flag,
              name: name,
              symbol: symbol,
            };
            tmpCurrencies.push(newCurr);
          }
        });
        setCurrencies(tmpCurrencies);
      });
  }, []);
  
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
            <BiCoinStack className={classes.icon}/>
            Convert
          </div>
          <div
            onClick={() => handleClick("send")}
            className={[
              classes.tab,
              currentTab === "send" && classes.selectedTab,
            ].join(" ")}
          >
            <BiSend className={classes.icon}/>
            Send
          </div>
          <div
            onClick={() => handleClick("charts")}
            className={[
              classes.tab,
              currentTab === "charts" && classes.selectedTab,
            ].join(" ")}
          >
            <AiOutlineLineChart className={classes.icon}/>
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
            <BsBell className={classes.icon}/>
            Alerts
          </div>
        </div>
        {currentTab === "convert"&&<Convert currencies={currencies}/>}
        {currentTab === "send" && <Send currencies={currencies}/>}
        {currentTab === "charts" && <div className={classes.box}>charts</div>}
        {currentTab === "alerts" && <div className={classes.box}>alerts</div>}
      </div>
    </div>
  );
};
