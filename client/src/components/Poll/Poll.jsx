import { useEffect, useState } from "react";

import classes from "./Poll.module.css";
import { getPoll, votePoll } from "../../api/poll";

function Poll({ poll }) {
  const [pollData, setPollData] = useState(poll);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (showResults) {
      const interval = setInterval(async () => {
        const updatedPoll = await getPoll(pollData._id);
        setPollData(updatedPoll);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showResults]);

  const totalVotes = pollData.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  const handleVote = async (optionId) => {
    try {
      const updatedPoll = await votePoll(pollData._id, optionId);
      setPollData(updatedPoll);
      setShowResults(true);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className={classes.poll}>
      <h3>{pollData.question}</h3>
      <div className={classes.options}>
        {pollData.options.map((option, index) => (
          <div key={index} className={classes.option}>
            {!showResults && (
              <button onClick={() => handleVote(option._id)}>
                {option.text}
              </button>
            )}
            {showResults && (
              <div className={classes.results}>
                <div
                  className={classes.progressBar}
                  style={
                    option.votes > 0
                      ? {
                          width: `${(option.votes / totalVotes) * 100}%`,
                        }
                      : {
                          display: "none",
                        }
                  }
                />
                <span>{option.text}</span>
                <span>{option.votes} votes</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poll;
