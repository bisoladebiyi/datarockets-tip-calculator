/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Button from "../../components/Button";
import { tips } from "../../utils/Constants/constants";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as DollarIcon } from "../../assets/icons/icon-dollar.svg";
import { ReactComponent as PeasonIcon } from "../../assets/icons/icon-person.svg";

import "./Dashboard.scss";
import useDashboard from "./Dashboard.hooks";

const Dashboard = () => {
  const {
    bill,
    tipValue,
    customTip,
    noOfPeople,
    isDisabled,
    peopleCountError,
    tipAmountPerPerson,
    total,
    reset,
    handleResetDisabling,
    calculateResult,
    setTipAmountPerPerson,
    setTotal,
    updateBillAndPeople,
    updateTipValue,
    updateCustomTip,
  } = useDashboard();

  useEffect(() => {
    handleResetDisabling();

    if (bill && (tipValue || customTip) && noOfPeople) {
      calculateResult();
    } else {
      setTipAmountPerPerson(0);
      setTotal(0);
    }
  }, [isDisabled, bill, tipValue, noOfPeople, customTip]);

  return (
    <div className="App-Container">
      <figure className="Logo">
        <Logo />
      </figure>

      <main className="Calculator-Wrapper">
        <div className="Calculator-Inputs">
          {/* bill */}
          <form action="#" className="Calculator-Inputs-Bill">
            <label htmlFor="" className="Calculator-Inputs-Label">
              Bill
            </label>
            <div className="Input-Wrapper">
              <input
                type="text"
                className="Calculator-Inputs-Field"
                placeholder="0"
                value={bill || ""}
                onChange={(e) => updateBillAndPeople(e, "bill")}
              />
              <DollarIcon className="Input-Icon" />
            </div>
          </form>

          {/* tip */}
          <form action="#" className="Calculator-Inputs-Tip">
            <label htmlFor="" className="Calculator-Inputs-Label">
              Select Tip %
            </label>
            <div className="Calculator-Inputs-TipBtns">
              {tips.map((tip) => (
                <Button
                  type={tip === tipValue ? "focused" : "primary"}
                  text={tip.toString()}
                  onClick={updateTipValue}
                  key={tip}
                />
              ))}
              <input
                type="text"
                className="Calculator-Inputs-Field custom"
                placeholder="Custom"
                value={customTip || ""}
                onChange={updateCustomTip}
              />
            </div>
          </form>

          {/* no of people  */}
          <form action="#" className="Calculator-Inputs-People">
            <label htmlFor="" className="Calculator-Inputs-Label">
              Number of People
            </label>
            {peopleCountError && (
              <p className="people_error_text">Can't be zero</p>
            )}
            <div className="Input-Wrapper">
              <input
                type="text"
                className={`Calculator-Inputs-Field ${
                  peopleCountError ? "people_error" : ""
                }`}
                placeholder="0"
                value={noOfPeople || ""}
                onChange={(e) => updateBillAndPeople(e, "people_count")}
              />
              <PeasonIcon className="Input-Icon" />
            </div>
          </form>
        </div>

        {/* outputs/results  */}
        <div className="Calculator-Outputs">
          <div>
            <div className="Calculator-Outputs-Tip">
              <p>
                Tip Amount
                <br />
                <span>/ person</span>
              </p>
              <p className="Amount">${tipAmountPerPerson}</p>
            </div>
            <div className="Calculator-Outputs-Amount">
              <p>
                Total
                <br />
                <span>/ person</span>
              </p>
              <p className="Amount">${total}</p>
            </div>
          </div>

          <Button
            disabled={isDisabled}
            type="focused"
            text="RESET"
            onClick={reset}
            className="Calculator-Outputs-Btn"
            removePercentage
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
