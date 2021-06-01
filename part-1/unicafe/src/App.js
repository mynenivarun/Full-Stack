import React, { useState } from 'react';


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }
  const Button = ({ action, text }) => {
    return (
      <div>
        <button onClick={action}>{text}</button>
      </div>
    );
  }
  const Statistic = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    );
  }
  const Statistics = ({ good, neutral, bad }) => {
    return (
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <tr>
            <td>All</td>
            <td>{good + neutral + bad}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{(good - bad) / (good + neutral + bad)}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{(good / (good + neutral + bad)) * 100}%</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{ display: "flex" }}>
        <Button action={handleGoodClick} text="Good" />
        <Button action={handleNeutralClick} text="Neutral" />
        <Button action={handleBadClick} text="Bad" />
      </div>
      <h1>Statistics</h1>
      {good || neutral || bad ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

export default App;