const API_URL = import.meta.env.VITE_API_URL;

export const createPoll = async (pollData) => {
  try {
    const response = await fetch(`${API_URL}/polls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pollData),
    });

    if (!response.ok) {
      throw new Error("Failed to create poll");
    }

    const data = await response.json();
    return data.data.poll;
  } catch (error) {
    throw error;
  }
};

export const getPolls = async () => {
  try {
    const response = await fetch(`${API_URL}/polls`);

    if (!response.ok) {
      throw new Error("Failed to get polls");
    }

    const data = await response.json();
    return data.data.polls;
  } catch (error) {
    throw error;
  }
};

export const getPoll = async (pollId) => {
  try {
    const response = await fetch(`${API_URL}/polls/${pollId}`);

    if (!response.ok) {
      throw new Error("Failed to get poll");
    }

    const data = await response.json();
    return data.data.poll;
  } catch (error) {
    throw error;
  }
};

export const votePoll = async (pollId, optionId) => {
  try {
    const response = await fetch(`${API_URL}/polls/${pollId}/vote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ optionId }),
    });

    if (!response.ok) {
      throw new Error("Failed to vote");
    }

    const data = await response.json();
    return data.data.poll;
  } catch (error) {
    throw error;
  }
};
