import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Custom styles for the MKAlert
import MKAlertRoot from "components/MKAlert/MKAlertRoot";
import MKAlertCloseIcon from "components/MKAlert/MKAlertCloseIcon";

function MKAlert({ color, timeOut, title, message, ...rest }) {
  const alertIcon = "fa fa-info-circle";
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  window.setTimeout(() => {
    handleAlertStatus();
  }, timeOut || 5000);
  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <MKAlertRoot ownerState={{ color }} {...rest}>
        <MKBox
          display="flex"
          alignItems="center"
          fontSize="1rem"
          fontWeight="regular"
          color={color === "light" ? "dark" : "white"}
        >
          <span className="alert-inner--icon">
            <i className={alertIcon} />
          </span>

          <span className="alert-inner--text">
            <strong className="alert-inner--title">{title}</strong>
            {message}
          </span>
        </MKBox>
        <MKAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</MKAlertCloseIcon>
      </MKAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      window.setTimeout(() => {
        setTimeout(() => setAlertStatus("unmount"), 400);
        return alertTemplate(false);
      }, timeOut || 5000);
      break;
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of MKAlert
MKAlert.defaultProps = {
  color: "info",
  timeOut: 5000,
};

// Typechecking props of the MKAlert
MKAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  timeOut: PropTypes.number,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MKAlert;
