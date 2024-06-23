import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskCard from "./TaskCard";
import PropTypes from "prop-types";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTask } from "../../../apis/apis";
import { style } from "../../../misc/misc";

const TaskCardWrapper = ({
  type,
  chipBg,
  tasks,
  taskLength,
  error,
  isLoading,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleCreateTask = async (status) => {
    if (taskTitle === "" || taskDescription === "") {
      toast.error("Please fill all the fields");
      return;
    }

    const taskData = {
      title: taskTitle,
      description: taskDescription,
      status: status,
    };

    try {
      setIsAddingTask(true);
      const response = await createTask(taskData);
      if (response) {
        setTaskTitle("");
        setTaskDescription("");
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      setIsAddingTask(false);
      toast.error(`Failed to add task: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
      }}
    >
      {/* Task Type  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
        >
          {type}
        </Typography>
        <Chip
          label={taskLength}
          size="small"
          sx={{
            fontFamily: "monospace",
            color: "white",
            backgroundColor: chipBg,
            borderRadius: "50px",
          }}
        />
      </Box>
      {/* Add a new task */}
      <Button
        endIcon={<AddIcon />}
        sx={{
          display: "flex",
          borderRadius: "10px",
          fontFamily: "monospace",
          color: "black",
          backgroundColor: "#fafafa",
          border: "1px solid lightgray",
          borderStyle: "dashed",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
        onClick={handleOpen}
      >
        Add a new task
      </Button>

      {/* Modal for adding a new task */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            maxWidth: { xs: "90%", md: "60%" },
          }}
        >
          {/* Add Task Form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontFamily: "monospace" }}
            >
              Add a Task ({type})
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Task Form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {/* Task Title */}
            <TextField
              id="name"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              label="Title"
              variant="outlined"
            />
            {/* Task Description */}
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              multiline
              minRows={4}
              maxRows={4}
            />
            {/* Add Task Button */}
            <Button
              sx={{
                borderRadius: "10px",
                fontFamily: "monospace",
                color: "white",
                backgroundColor: "green",
                "&:hover": {
                  backgroundColor: "green",
                },
              }}
              disabled={isAddingTask}
              onClick={() => handleCreateTask(type)}
            >
              Add Task
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Tasks List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
        }}
      >
        {/* Tasks */}
        {tasks &&
          tasks?.map((task, idx) => <TaskCard key={idx} taskData={task} />)}

        {/* Error */}
        {error && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "red",
              }}
            >
              {error}
            </Typography>
            {/* refetch Button  */}
            <Button
              onClick={refetch}
              sx={{
                fontFamily: "monospace",
                color: "white",
                backgroundColor: "red",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Loading */}
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                borderRadius: "10px",
                width: "100%",
                height: "200px",
              }}
            />
          </Box>
        )}

        {/* Empty */}
        {tasks && tasks.length === 0 && !error && !isLoading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "#f5f5f5",
              borderStyle: "dashed",
              padding: "1rem",
              maxHeight: "200px",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "gray",
                textAlign: "center",
              }}
            >
              No tasks available, add a new task
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskCardWrapper;

TaskCardWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  chipBg: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  taskLength: PropTypes.number.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
};
