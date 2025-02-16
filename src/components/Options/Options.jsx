import css from "./Options.module.css";

const options = ["good", "neutral", "bad"];

export default function Options({ hasFeedback, onVote, onReset }) {
  return (
    <ul className={css.options}>
      {options.map((option) => (
        <li key={option}>
          <button
            className={css.btn}
            type="button"
            onClick={() => {
              onVote(option);
            }}
          >
            {option}
          </button>
        </li>
      ))}
      {hasFeedback > 0 && (
        <li>
          <button
            className={css.btn}
            type="button"
            onClick={onReset}
          >
            Reset
          </button>
        </li>
      )}
    </ul>
  );
}
