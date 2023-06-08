import React, { useState } from "react";
import { Section } from "components/Section/Section";
import { FeedbackOptions } from "components/FeedbackOptions/FeedbackOptions";
import { Statistics } from "components/Statistics/Statistics";
import { Notification } from "components/Notification/Notification";
import css from "./App.module.css";

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onButtonClick = (e) => {
    const { name } = e.target;

    switch (name) {
      case "good":
        setGood((state) => state + 1);
        break;
      case "neutral":
        setNeutral((state) => state + 1);
        break;
      case "bad":
        setBad((state) => state + 1);
        break;
      default:
        return undefined;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = good + neutral + bad;
    const positive = Math.round((good / total) * 100);
    return positive ? positive : 0;
  };

  const total = countTotalFeedback();
  const positive = countPositiveFeedbackPercentage();

  return (
    <div className={css.container}>

      <Section title="Please leave feedback">
        <FeedbackOptions
          options={["good", "neutral", "bad"]}
          onLeaveFeedback={onButtonClick}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positive}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>

    </div>
  );
};
