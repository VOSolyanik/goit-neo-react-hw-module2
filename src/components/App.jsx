import { useState, useEffect } from 'react';
import css from './App.module.css';

import Description from './Description/Description';
import Options from './Options/Options';
import Feedback from './Feedback/Feedback';
import Notification from './Notification/Notification';

const defaultFeedbacks = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const FEEDBACK_STORAGE_KEY = 'cafe.feedback';

function App() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const initialFeedbacks = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    try {
      return initialFeedbacks ? JSON.parse(initialFeedbacks) : defaultFeedbacks;
    } catch (error) {
      console.error('Error parsing feedbacks from localStorage', error);
      return defaultFeedbacks;
    }
  });

  useEffect(() => {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleVote = type => {
    setFeedbacks(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleReset = () => {
    setFeedbacks(defaultFeedbacks);
  };

  const hasFeedback = Object.values(feedbacks).some(value => value > 0);

  return (
    <div className={css.container}>
      <Description />
      <Options
        hasFeedback={hasFeedback}
        onVote={handleVote}
        onReset={handleReset}
      />
      {hasFeedback ? (
        <Feedback
          feedback={feedbacks}
        />
      ) : (
        <Notification>No feedback yet</Notification>
      )}
    </div>
  );
}

export default App;
