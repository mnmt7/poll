import { useState } from "react";
import classes from "./CreatePoll.module.css";
import { createPoll } from "../../api/poll";

function CreatePoll({ onPollCreated }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (question.trim() === "") {
      setError("Please enter a question");
      return;
    }

    if (options.some((option) => option.trim() === "")) {
      setError("Please enter all options");
      return;
    }

    try {
      const poll = {
        question,
        options: options.filter((option) => option.trim() !== ""),
      };

      const newPoll = await createPoll(poll);

      setQuestion("");
      setOptions(["", ""]);
      onPollCreated(newPoll);
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  return (
    <div className={classes.createPoll}>
      <h2>Create New Poll</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        {error && <p className={classes.error}>{error}</p>}
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <div className={classes.optionsContainer}>
          {options.map((option, index) => (
            <div className={classes.option} key={index}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className={classes.optionInput}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  className={classes.removeButton}
                  onClick={() =>
                    setOptions(options.filter((_, i) => i !== index))
                  }
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={classes.buttonGroup}>
          {options.length < 4 && (
            <button
              type="button"
              className={classes.addButton}
              onClick={() => setOptions([...options, ""])}
            >
              Add Option
            </button>
          )}
          <button type="submit" className={classes.submitButton}>
            Create Poll
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePoll;
