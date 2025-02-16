import css from "./Feedback.module.css";

export default function Feedback({ feedback }) {

  const { good, neutral, bad } = feedback;

  const total = Object.values(feedback).reduce(
    (acc, count) => acc + count,
    0
  );

  const positive = Math.round(((good + neutral) / total) * 100);

  return (
    <ul className={css.feedback}>
      <li>
        Good: {good}
      </li>
      <li>
        Neutral: {neutral}
      </li>
      <li>
        Bed: {bad}
      </li>
      <li>
        Total: {total}
      </li>
      <li>
        Positive: {positive}%
      </li>
    </ul>
  );
}
