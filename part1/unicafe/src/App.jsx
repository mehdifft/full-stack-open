import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Button = ({ evenHandler, text }) => {
  return (
    <>
      <button onClick={evenHandler}>{text}</button>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad


  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if (!all) return (
    <div>No feedback given</div>
  )
  else return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text="give feedback" />
      <Button evenHandler={() => setGood(good + 1)} text="good" />
      <Button evenHandler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button evenHandler={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
