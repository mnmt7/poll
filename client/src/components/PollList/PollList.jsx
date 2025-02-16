import Poll from "../Poll/Poll";
import classes from "./PollList.module.css";

function PollList({ polls }) {
  return (
    <div className={classes.pollList}>
      {polls.map((poll) => (
        <Poll key={poll._id} poll={poll} />
      ))}
    </div>
  );
}

export default PollList;
