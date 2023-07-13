import React, { useState } from "react";

import Header from "./Components/Header.js/Header";
import UserInput from "./Components/UserInput/UserInput";
import Table from "./Components/Table/Table";

function App() {
  const [result, setUserInput] = useState(null);

  const calculateHandler = (result) => {
    setUserInput(result);
  };

  const yearlyData = [];

  if (result) {
    let currentSavings = +result["current-savings"];
    const yearlyContribution = +result["yearly-contribution"];
    const expectedReturn = +result["expected-return"] / 100;
    const duration = +result["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler} />
      {!result && (
        <p style={{ textAlign: "center" }}>Nothing Calculated Yet!</p>
      )}
      {result && (
        <Table data={yearlyData} initialData={result["current-savings"]} />
      )}
    </div>
  );
}

export default App;
