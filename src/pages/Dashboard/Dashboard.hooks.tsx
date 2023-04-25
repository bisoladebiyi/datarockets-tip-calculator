import React, { useState } from "react";
import { letterInStringCheck } from "../../utils/Helpers/helper";

const useDashboard = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [bill, setBill] = useState<number | string>(0);
  const [tipValue, setTipValue] = useState<number>(0);
  const [customTip, setCustomTip] = useState<number | string>(0);
  const [noOfPeople, setNoOfPeople] = useState<number | string>(0);
  const [peopleCountError, setPeopleCountError] = useState<boolean>(false);
  const [tipAmountPerPerson, setTipAmountPerPerson] = useState<number | string>(
    0
  );
  const [total, setTotal] = useState<number | string>(0);

  const updateTipValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTipValue(parseFloat(e.currentTarget.value));
    setCustomTip(0);
  };

  const updateBillAndPeople = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "bill" | "people_count"
  ) => {
    if (letterInStringCheck(e.target.value)) return;

    if (name === "bill") {
      setBill(e.target.value);
    } else {
      if (e.target.value === "") {
        setPeopleCountError(true);
      } else {
        setPeopleCountError(false);
      }

      setNoOfPeople(parseInt(e.target.value));
    }
  };

  const updateCustomTip = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (letterInStringCheck(e.target.value)) return;

    setCustomTip(e.target.value);

    if (e.target.value) {
      setTipValue(0);
    }
  };

  const calculateResult = () => {
    const tip = Number(tipValue || customTip);
    const tip_amount = (Number(bill) * (tip / 100)) / Number(noOfPeople);
    const total = Number(bill) / Number(noOfPeople) + tip_amount;

    setTipAmountPerPerson(tip_amount.toFixed(2));
    setTotal(total.toFixed(2));
  };

  const reset = () => {
    setBill(0);
    setTipValue(0);
    setCustomTip(0);
    setNoOfPeople(0);
    setTipAmountPerPerson(0);
    setTotal(0);
    setPeopleCountError(false);
  };

  const handleResetDisabling = () => {
    // disable button is values are falsy
    if (!bill && !tipValue && !customTip && !noOfPeople && !isDisabled) {
      setIsDisabled(true);
    }

    // enable button is values are truthy
    if ((bill || tipValue || noOfPeople || customTip) && isDisabled) {
      setIsDisabled(false);
    }
  };

  return {
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
  };
};

export default useDashboard;
