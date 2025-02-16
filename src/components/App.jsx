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

  const handleFeedback = feedbackType => {
    setFeedbacks(prev => ({ ...prev, [feedbackType]: prev[feedbackType] + 1 }));
  };

  const handleReset = () => {
    setFeedbacks(defaultFeedbacks);
  };

  const totalFeedback = Object.values(feedbacks).reduce(
    (acc, count) => acc + count,
    0
  );

  const positiveFeedback = Math.round((feedbacks.good / totalFeedback) * 100);

  return (
    <div className={css.container}>
      <Description />
      <Options
        hasFeedback={!!totalFeedback}
        onVote={handleFeedback}
        onReset={handleReset}
      />
      {totalFeedback ? (
        <Feedback
          feedbacks={feedbacks}
          total={totalFeedback}
          positivePercentage={positiveFeedback}
        />
      ) : (
        <Notification>No feedback yet</Notification>
      )}
    </div>
  );
}

export default App;
