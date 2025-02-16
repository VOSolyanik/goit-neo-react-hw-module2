import css from "./Feedback.module.css";

export default function Feedback({ feedbacks, total, positivePercentage }) {

  const { good, neutral, bad } = feedbacks;

  return (
    <ul className={css.feedback}>
      <li>
        Good: {good}
      </li>
      <li>
        Neutral: {neutral}
      </li>
      <li>
        Bad: {bad}
      </li>
      <li>
        Total: {total}
      </li>
      <li>
        Positive: {positivePercentage}%
      </li>
    </ul>
  );
}
