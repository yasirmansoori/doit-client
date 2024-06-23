import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";
import Draggable from "react-draggable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import dayTimeAgo from "../../../utils/dayTimeAgo";
import config from "../../../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import {
  createComment,
  delteComment,
  changeStatus,
  updateTask,
} from "../../../apis/apis";
import { style, taskWrapperData } from "../../../misc/misc";
function PaperComponentComment(props) {
  return (
    <Draggable
      handle="#comment-dialog"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const TaskCard = ({ taskData }) => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const handleClickOpenCommentDialog = () => setOpenCommentDialog(true);
  const handleCloseCommentDialog = () => setOpenCommentDialog(false);

  const [isDelete, setIsDelete] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [errorInComment, setErrorInComment] = useState(false);

  // edit complete task details modal
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const handleOpenTaskModal = () => setOpenTaskModal(true);
  const handleCloseTaskModal = () => setOpenTaskModal(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(taskData?.title);
  const [editDescription, setEditDescription] = useState(taskData?.description);

  // change status of task, open status modal
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const handleOpenStatusModal = () => setOpenStatusModal(true);
  const handleCloseStatusModal = () => setOpenStatusModal(false);

  const handleTaskUpdate = async () => {
    // if title and scription are same as before
    if (
      editTitle === taskData?.title &&
      editDescription === taskData?.description
    ) {
      setIsEditing(false);
      return;
    }

    try {
      const response = await updateTask(taskData?._id, {
        title: editTitle,
        description: editDescription,
      });
      if (response) {
        handleCloseTaskModal();
        window.location.reload();
      }
    } catch (error) {
      toast.error(`Failed to update task: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsDelete(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`${config.server}/api/task/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      if (!response.ok) {
        setIsDelete(false);
        throw new Error("Network response was not ok");
      }
      setIsDelete(false);
      setToggleDelete(!toggleDelete);
      window.location.reload();
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleCreateComment = async (taskId) => {
    try {
      const response = await createComment({
        taskId,
        text: commentText,
      });
      if (response) {
        setCommentText("");
        handleCloseCommentDialog();
        window.location.reload();
      }
    } catch (error) {
      setErrorInComment(error.message);
      toast.error(`Failed to add comment: ${error.message}`);
    }
  };

  const handleDelteComment = async (commentId) => {
    try {
      const response = await delteComment(commentId);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      toast.error(`Failed to delete comment: ${error.message}`);
    }
  };

  const handleChangeStatus = async (taskId, status) => {
    try {
      const response = await changeStatus(taskId, status);
      if (response) {
        handleCloseStatusModal();
        window.location.reload();
      }
    } catch (error) {
      toast.error(`Failed to change status: ${error.message}`);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          padding: "10px",
          position: "relative",
          borderRadius: "10px",
          border: "1px solid lightgray",
          borderStyle: "dashed",
          maxWidth: "100vw",
        }}
      >
        {/* edit task button */}
        <Tooltip title="Edit Task" placement="top">
          <IconButton
            size="small"
            aria-label="delete"
            sx={{
              color: "black",
              position: "absolute",
              top: "2rem",
              right: "0.5rem",
            }}
            onClick={handleOpenTaskModal}
          >
            <EditIcon
              sx={{
                fontSize: "16px",
              }}
            />
          </IconButton>
        </Tooltip>

        {/* edit task details modal  */}
        <Modal
          open={openTaskModal}
          onClose={handleCloseTaskModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, maxWidth: { xs: "90%", md: "600px" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontFamily: "monospace" }}
              >
                Task Details
              </Typography>
              {isEditing ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "#ef3838",
                      color: "white",
                      fontFamily: "monospace",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#ff4d4d",
                      },
                    }}
                    onClick={() => {
                      setIsEditing(!isEditing);
                      setEditTitle(taskData?.title);
                      setEditDescription(taskData?.description);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      fontFamily: "monospace",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#3b963e",
                      },
                    }}
                    onClick={handleTaskUpdate}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
                <Button
                  sx={{
                    backgroundColor: "#f5f5f5",
                    color: "black",
                    fontFamily: "monospace",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#fafafa",
                    },
                  }}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Edit
                </Button>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <TextField
                label="Title"
                value={editTitle}
                disabled={!isEditing}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <TextField
                label="Description"
                value={editDescription}
                disabled={!isEditing}
                onChange={(e) => setEditDescription(e.target.value)}
                multiline
                rows={4}
              />

              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Created At: {dayTimeAgo(taskData?.createdAt)}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Comments: {taskData?.comments?.length}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <CommentIcon
                  sx={{
                    color: "gray",
                    fontSize: "16px",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "monospace",
                  }}
                >
                  {taskData?.comments?.length} Comments
                </Typography>

                {taskData?.comments?.length > 0 ? (
                  <IconButton
                    size="small"
                    onClick={handleClickOpenCommentDialog}
                  >
                    <VisibilityIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    onClick={handleClickOpenCommentDialog}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Modal>

        {/* Delete Task button  */}
        <Tooltip title="Delete Task" placement="top">
          <IconButton
            size="small"
            aria-label="delete"
            sx={{
              color: "#ef3838",
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
            }}
            onClick={() => setToggleDelete(!toggleDelete)}
          >
            <DeleteIcon
              sx={{
                fontSize: "16px",
              }}
            />
          </IconButton>
        </Tooltip>

        {/* on delete button click overlay  */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            borderRadius: "10px",
            border: "2px solid red",
            borderStyle: "dashed",
            display: toggleDelete ? "block" : "none",
            zIndex: 100,
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "monospace",
              color: "red",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Delete Task?
          </Typography>

          <Box
            sx={{
              position: "absolute",
              bottom: "0.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ef3838",
                color: "white",
                fontFamily: "monospace",
                fontWeight: "bold",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#ff4d4d",
                },
              }}
              disabled={isDelete}
              onClick={() => handleDelete(taskData?._id)}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                fontFamily: "monospace",
                fontWeight: "bold",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              disabled={isDelete}
              onClick={() => setToggleDelete(!toggleDelete)}
            >
              No
            </Button>
          </Box>
        </Box>

        {/* Title  */}
        <Typography
          sx={{
            fontSize: "16px",
            fontFamily: "monospace",
            fontWeight: "bold",
            wordWrap: "break-word",
            paddingRight: "2rem",
          }}
        >
          {taskData?.title}
        </Typography>

        {/* short description  */}
        <Typography
          sx={{
            fontSize: "12px",
            fontFamily: "monospace",
            color: "gray",
            marginTop: "0.5rem",
            wordWrap: "break-word",
          }}
        >
          {taskData?.description}
        </Typography>

        {/* comments  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            padding: "10px",
            justifyContent: "space-between",
            borderRadius: "10px",
            marginTop: "0.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <CommentIcon
              sx={{
                color: "gray",
                fontSize: "16px",
              }}
            />
            <Typography
              sx={{
                fontFamily: "monospace",
              }}
            >
              {taskData?.comments?.length} Comments
            </Typography>
          </Box>

          {taskData?.comments?.length > 0 ? (
            <IconButton size="small" onClick={handleClickOpenCommentDialog}>
              <VisibilityIcon />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={handleClickOpenCommentDialog}>
              <AddIcon />
            </IconButton>
          )}
        </Box>

        {/* comments Dialog  */}
        <Dialog
          open={openCommentDialog}
          onClose={handleCloseCommentDialog}
          PaperComponent={PaperComponentComment}
          aria-labelledby="comment-dialog"
          sx={{
            maxWidth: { xs: "calc(100vw)", md: "600px" },
          }}
        >
          <DialogTitle style={{ cursor: "move" }} id="comment-dialog">
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Comments
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* if comments  */}
              {taskData?.comments.map((comment, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid lightgray",
                    padding: "10px",
                    borderStyle: "dashed",
                    maxWidth: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "black",
                      wordWrap: "break-word",
                    }}
                  >
                    {comment.text}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: { xs: "flex-start", md: "flex-end" },
                    }}
                  >
                    <Tooltip title="Delete Comment" placement="top">
                      <IconButton
                        size="small"
                        aria-label="delete"
                        sx={{
                          color: "#ef3838",
                        }}
                        onClick={() => handleDelteComment(comment._id)}
                      >
                        <DeleteIcon
                          sx={{
                            fontSize: "16px",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "12px",
                        color: "gray",
                      }}
                    >
                      {dayTimeAgo(comment.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              ))}

              {/* if no comments  */}
              {taskData?.comments.length === 0 && (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "monospace",
                    fontSize: "16px",
                    color: "gray",
                  }}
                >
                  No comments yet
                </Typography>
              )}

              {/* add comment  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Add New Comment
                </Typography>
                <TextField
                  error={errorInComment}
                  helperText={errorInComment}
                  rows="4"
                  multiline
                  fullWidth
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  variant="outlined"
                  placeholder="Type your comment here..."
                />
                <Button
                  sx={{
                    backgroundColor: "#f5f5f5",
                    color: "black",
                    fontFamily: "monospace",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#fafafa",
                    },
                  }}
                  onClick={() => handleCreateComment(taskData?._id)}
                >
                  Add Comment
                </Button>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseCommentDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Divider
          sx={{
            margin: "0.5rem 0",
          }}
        />

        {/* change status of task */}
        <Button
          sx={{
            backgroundColor: "#4CAF50",
            color: "white",
            fontFamily: "monospace",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#3b963e",
            },
          }}
          onClick={handleOpenStatusModal}
        >
          Change Status
        </Button>

        {/* status modal  */}
        <Modal
          open={openStatusModal}
          onClose={handleCloseStatusModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              ...style,
              maxWidth: { xs: "calc(100vw - 10%)", md: "500px" },
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontFamily: "monospace" }}
            >
              Current Status - {taskData?.status}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              {taskWrapperData
                .filter((data) => data.type !== taskData?.status)
                .map((data, index) => (
                  <Button
                    key={index}
                    sx={{
                      backgroundColor: data.bgColor,
                      color: "white",
                      fontFamily: "monospace",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: data.bgColor,
                      },
                    }}
                    onClick={() => handleChangeStatus(taskData?._id, data.type)}
                  >
                    {data.type}
                  </Button>
                ))}
            </Box>
          </Box>
        </Modal>

        {/* footer  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "end",
            gap: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              color: "gray",
              fontSize: "12px",
            }}
          >
            {dayTimeAgo(taskData?.createdAt)}
          </Typography>
        </Box>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
};

export default TaskCard;

TaskCard.propTypes = {
  taskData: PropTypes.object,
};
