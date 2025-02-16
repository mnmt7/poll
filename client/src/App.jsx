import { useState, useEffect } from "react";
import CreatePoll from "./components/CreatePoll/CreatePoll";
import PollList from "./components/PollList/PollList";
import "./App.css";
import { getPolls } from "./api/poll";

function App() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const data = await getPolls();
        setPolls(data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };
    fetchPolls();
  }, []);

  const handlePollCreated = (newPoll) => {
    setPolls([newPoll, ...polls]);
  };

  return (
    <div className="container">
      <h1>Poll App</h1>
      <CreatePoll onPollCreated={handlePollCreated} />
      <PollList polls={polls} />
    </div>
  );
}

export default App;
