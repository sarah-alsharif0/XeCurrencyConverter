import React, { useEffect, useRef, useState } from "react";
import { getCurrencies,getCurrencyRates } from "../../services/currencies";
import classes from "./convert.module.css";

export const Convert = () => {
  const [currencies, setCurrencies] = useState([]);
  const [firstCurr, setFirstCurr] = useState({});
  const [secondCurr, setSecondCurr] = useState({});
  const [firstClicked, setFirstClicked] = useState(false);
  const [secondClicked, setSecondClicked] = useState(false);
  const [filteredFirstCurrencies, setFilteredFirstCurrencies] =
    useState(currencies);
  const [filteredSecondCurrencies, setFilteredSecondCurrencies] =
    useState(currencies);
  const [firstQuery, setFirstQuery] = useState("");
  const [secondQuery, setSecondQuery] = useState("");
  const [amount,setAmount] = useState(1.00);
  const [result,setResult] = useState(0);

  const firstref = useRef();
  const secondref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        firstClicked &&
        firstref.current &&
        !firstref.current.contains(e.target)
      ) {
        setFirstClicked(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [firstClicked]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        secondClicked &&
        secondref.current &&
        !secondref.current.contains(e.target)
      ) {
        setSecondClicked(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [secondClicked]);

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

        const tmpFirstCurr = tmpCurrencies.filter(
          (item) => item.country.toLowerCase() === "united states"
        )[0];
        const tmpSecondCurr = tmpCurrencies.filter(
          (item) => item.name.toLowerCase() === "euro"
        )[0];
        setCurrencies(tmpCurrencies);
        setFirstCurr(tmpFirstCurr);
        setSecondCurr(tmpSecondCurr);
      });
  }, []);
  const handleFirstClick = () => {
    setFirstClicked(true);
    setFilteredFirstCurrencies(currencies);
  };
  const handleSecondClick = () => {
    setSecondClicked(true);
    setFilteredSecondCurrencies(currencies);
  };
  const handleChangeFirstQuery = (e) => {
    const q = e.target.value.toLowerCase();
    setFirstQuery(q);
    const tmp = [...currencies];
    const data = tmp.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.currency.toLowerCase().includes(q)
    );
    setFilteredFirstCurrencies(data);
  };
  const handleChangeSecondQuery = (e) => {
    const q = e.target.value.toLowerCase();
    setSecondQuery(q);
    const tmp = [...currencies];
    const data = tmp.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.currency.toLowerCase().includes(q)
    );
    setFilteredSecondCurrencies(data);
  };
  const handleChooseFirst = (element) => {
    setFirstCurr(element);
    setFirstClicked(false);
    setResult(0);
  }
  const handleChooseSecond = (element) => {
    setSecondCurr(element);
    setSecondClicked(false);
    setResult(0);
  }
  const handleSwap = () => {
      const tmpFirst  = firstCurr;
      const tmpSecond = secondCurr; 
      setFirstCurr(tmpSecond);
      setSecondCurr(tmpFirst);
  }
  const fetchRates  = ()=> {
      if(firstCurr.currency && secondCurr.currency){
          
    getCurrencyRates(firstCurr.currency).then((data)=>{
        const rate = data[secondCurr.currency.toLowerCase()]['rate'];
        const tmpResult = amount*rate;
        setResult(tmpResult);
    })}
  }
  const handleConvert= ()=>{
      fetchRates();
  }
  const handleChangeAmount = (e)=>{
      if(e.target.value < 0)
        setAmount(0);
    else
    setAmount(e.target.value);
    setResult(0);
  }
    
  return (
    <div className={classes.convertContainer}>
      <div className={classes.inputs}>
        <div className={classes.inputContainer}>
          <label>Amount</label>
          <input onChange={handleChangeAmount} type="number" value={amount}></input>
        </div>

        <div className={classes.inputContainer}>
          <label>From</label>
          {firstClicked && (
            <input
              className={classes.search}
              autoFocus={true}
              onChange={handleChangeFirstQuery}
              type="text"
              placeholder="Type to search..."
            ></input>
          )}
          {!firstClicked && (
            <div onClick={handleFirstClick} className={classes.droplistDefault}>
              {firstCurr.flag && (
                <img src={firstCurr.flag} className={classes.flag}></img>
              )}
              {firstCurr.currency && (
                <span>
                  {`${firstCurr.currency}`} - {`${firstCurr.name}`}
                </span>
              )}
            </div>
          )}
          {filteredFirstCurrencies.length !== 0
            ? firstClicked && (
                <div ref={firstref} className={classes.droplistContainer}>
                  <ul className={classes.droplist}>
                    {filteredFirstCurrencies.map((item, index) => {
                      if (item.currency != firstCurr.currency && item.currency != secondCurr.currency) {
                        return (
                          <li key={index}>
                            <div onClick={()=>{handleChooseFirst(item)}} className={classes.droplistItem}>
                              <img
                                src={item.flag}
                                className={classes.flag}
                              ></img>
                              <span>
                                {`${item.currency}`} - {`${item.name}`}
                              </span>
                            </div>
                          </li>
                        );
                      } else return <li style={{ width: 0, height: 0 }}></li>;
                    })}
                  </ul>
                </div>
              )
            : firstQuery && (
                <div className={classes.droplistContainer}>
                  <ul className={classes.droplist}>
                    <li>
                      <div className={classes.droplistItem}>
                        <span>No results available</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
        </div>
        <button onClick={handleSwap} className={classes.swapButton}>swap</button>
        <div className={classes.inputContainer}>
          <label>To</label>
          {secondClicked && (
            <input
              className={classes.search}
              autoFocus={true}
              onChange={handleChangeSecondQuery}
              type="text"
              placeholder="Type to search..."
            ></input>
          )}
          {!secondClicked && (
            <div
              onClick={handleSecondClick}
              className={classes.droplistDefault}
            >
              {secondCurr.flag && (
                <img src={secondCurr.flag} className={classes.flag}></img>
              )}
              {secondCurr.currency && (
                <span>
                  {`${secondCurr.currency}`} - {`${secondCurr.name}`}
                </span>
              )}
            </div>
          )}
          {filteredSecondCurrencies.length !== 0
            ? secondClicked && (
                <div
                  ref={secondref}
                  className={classes.droplistContainer}
                >
                  <ul className={classes.droplist}>
                    {filteredSecondCurrencies.map((item, index) => {
                      if (item != secondCurr) {
                        return (
                          <li key={index}>
                            <div onClick={()=>{handleChooseSecond(item)}} className={classes.droplistItem}>
                              <img
                                src={item.flag}
                                className={classes.flag}
                              ></img>
                              <span>
                                {`${item.currency}`} - {`${item.name}`}
                              </span>
                            </div>
                          </li>
                        );
                      } else return <li style={{ width: 0, height: 0 }}></li>;
                    })}
                  </ul>
                </div>
              )
            : secondQuery && (
                <div className={classes.droplistContainer}>
                  <ul className={classes.droplist}>
                    <li>
                      <div className={classes.droplistItem}>
                        <span>No results available</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
        </div>
      </div>
      {result > 0 && <div className={classes.resultContainer}> 
          <span>{amount} {firstCurr.name}s = <br></br>{result} {secondCurr.name}s</span>
      </div>}
      <div className={classes.actionsContainer}>
        <span>We use midmaket rates </span>
         <button onClick={handleConvert} className={classes.convertButton}>Convert</button>
      </div>
    </div>
  );
};
