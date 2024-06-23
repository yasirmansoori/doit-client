import config from "../config/config.json";

export const createTask = async (taskData) => {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const response = await fetch(`${config.server}/api/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add task: ${errorData.message}`);
    }

    return response;
  } catch (error) {
    throw new Error(`Failed to add task: ${error.message}`);
  }
};

export const createComment = async (commentData) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${config.server}/api/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const delteComment = async (commentId) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(
      `${config.server}/api/comment/delete/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeStatus = async (taskId, status) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${config.server}/api/task/update/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTask = async (taskId, updateTaskData) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`${config.server}/api/task/update/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateTaskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
