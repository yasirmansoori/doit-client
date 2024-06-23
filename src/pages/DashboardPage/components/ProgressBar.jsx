import { LinearProgress, linearProgressClasses, styled } from "@mui/material";
import PropTypes from "prop-types";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));

const ProgressBar = ({ progress }) => {
  return <BorderLinearProgress variant="determinate" value={progress} />;
};

export default ProgressBar;

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};
