import React, { useEffect, useRef, useState } from "react";
import { getCurrencies, getCurrencyRates } from "../../services/currencies";
import { SwapOutlined } from "@ant-design/icons";
import classes from "./convert.module.css";
import { IoMdAlert } from "react-icons/io";

export const Convert = (props) => {
  const { currencies } = props;
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
  const [amount, setAmount] = useState(1.0);
  const [result, setResult] = useState(0);
  const firstRef = useRef();
  const secondRef = useRef();

  useEffect(() => {
    const tmpFirstCurr = currencies.length
      ? currencies.filter(
          (item) => item.country.toLowerCase() === "united states"
        )[0]
      : {};
    const tmpSecondCurr = currencies.length
      ? currencies.filter((item) => item.name.toLowerCase() === "euro")[0]
      : {};
    setFirstCurr(tmpFirstCurr);
    setSecondCurr(tmpSecondCurr);
  }, [currencies]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        firstClicked &&
        firstRef.current &&
        !firstRef.current.contains(e.target)
      ) {
        setFirstClicked(false);
        setFirstQuery("");
      } else if (
        secondClicked &&
        secondRef.current &&
        !secondRef.current.contains(e.target)
      ) {
        setSecondClicked(false);
        setSecondQuery("");
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [firstClicked,secondClicked]);

  const handleFirstClick = () => {
    setFirstClicked(true);
    setFilteredFirstCurrencies(currencies);
  };
  const handleSecondClick = () => {
    setSecondClicked(true);
    setFilteredSecondCurrencies(currencies);
  };
  const handleChangeQuery = (e) => {
    const q = e.target.value.toLowerCase();
    if(e.target.name == "first"){
    setFirstQuery(q);
    const tmp = [...currencies];
    const data = tmp.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.currency.toLowerCase().includes(q)
    );
    setFilteredFirstCurrencies(data);
  } else if (e.target.name == "second"){
    setSecondQuery(q);
    const tmp = [...currencies];
    const data = tmp.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.currency.toLowerCase().includes(q)
    );
    setFilteredSecondCurrencies(data);
  }
  };
  // const handleChangeSecondQuery = (e) => {
  //   const q = e.target.value.toLowerCase();
  //   setSecondQuery(q);
  //   const tmp = [...currencies];
  //   const data = tmp.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(q) ||
  //       item.currency.toLowerCase().includes(q)
  //   );
  //   setFilteredSecondCurrencies(data);
  // };
  const handleChooseFirst = (element) => {
    setFirstCurr(element);
    setFirstClicked(false);
    setResult(0);
  };
  const handleChooseSecond = (element) => {
    setSecondCurr(element);
    setSecondClicked(false);
    setResult(0);
  };
  const handleSwap = () => {
    const tmpFirst = firstCurr;
    const tmpSecond = secondCurr;
    setFirstCurr(tmpSecond);
    setSecondCurr(tmpFirst);
    setResult(0);
  };
  const fetchRates = () => {
    if (firstCurr.currency && secondCurr.currency) {
      getCurrencyRates(firstCurr.currency).then((data) => {
        const rate = data[secondCurr.currency.toLowerCase()]["rate"];
        const tmpResult = amount * rate;
        setResult(tmpResult);
      });
    }
  };
  const handleConvert = () => {
    fetchRates();
  };
  const handleChangeAmount = (e) => {
    if (e.target.value < 0) setAmount(0);
    else setAmount(e.target.value);
    setResult(0);
  };

  return (
    <div className={classes.convertContainer}>
      <div className={classes.inputs}>
        <div className={classes.inputContainer}>
          <label className={classes.amountLabel}>
            Amount<span className={classes.symbol}>{firstCurr.symbol}</span>
          </label>

          <input
            className={classes.amountInput}
            onChange={handleChangeAmount}
            type="number"
            value={amount}
          ></input>
        </div>

        <div className={classes.inputContainer}>
          <label>From</label>
          {firstClicked && (
            <input
              className={classes.search}
              autoFocus={true}
              onChange={handleChangeQuery}
              type="text"
              name="first"
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
                <div ref={firstRef} className={classes.droplistContainer}>
                  <ul className={classes.droplist}>
                    {filteredFirstCurrencies.map((item, index) => {
                      if (
                        item.currency != firstCurr.currency &&
                        item.currency != secondCurr.currency
                      ) {
                        return (
                          <li key={index}>
                            <div
                              onClick={() => {
                                handleChooseFirst(item);
                              }}
                              className={classes.droplistItem}
                            >
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
                <div ref={firstRef} className={classes.droplistContainer}>
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
        <button onClick={handleSwap} className={classes.swapButton}>
          <SwapOutlined style={{ fontSize: "20px" }} />
        </button>
        <div className={classes.inputContainer}>
          <label>To</label>
          {secondClicked && (
            <input
              className={classes.search}
              autoFocus={true}
              onChange={handleChangeQuery}
              type="text"
              name="second"
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
                <div ref={secondRef} className={classes.droplistContainer}>
                  <ul className={classes.droplist}>
                    {filteredSecondCurrencies.map((item, index) => {
                      if (
                        item.currency != firstCurr.currency &&
                        item.currency != secondCurr.currency
                      ) {
                        return (
                          <li key={index}>
                            <div
                              onClick={() => {
                                handleChooseSecond(item);
                              }}
                              className={classes.droplistItem}
                            >
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
                <div ref={secondRef} className={classes.droplistContainer}>
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
      {result > 0 && (
        <div className={classes.resultContainer}>
          <span className={classes.resultText}>
            {amount} {firstCurr.name}s ={" "}
          </span>
          <span className={classes.result}>
            {result} {secondCurr.name}s
          </span>
        </div>
      )}
      <div className={classes.actionsContainer}>
        <span className={classes.tooltip}>
          We use midmaket rates <IoMdAlert className={classes.icon} />{" "}
        </span>
        <button onClick={handleConvert} className={classes.convertButton}>
          Convert
        </button>
      </div>
    </div>
  );
};
