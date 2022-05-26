// react-router components
import { useNavigate } from "react-router-dom";

import parse from "html-react-parser";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MuiLink from "@mui/material/Link";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function TransparentBlogCard({ image, title, authName, description, action }) {
  const history = useNavigate();
  const cursorPointer = {
    cursor: "pointer",
  };
  const cardActionStyles = {
    display: "flex",
    alignItems: "center",
    width: "max-content",
    cursor: "pointer",

    "& .material-icons, .material-icons-round,": {
      transform: `translateX(2px)`,
      transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
    },

    "&:hover .material-icons, &:focus .material-icons, &:hover .material-icons-round, &:focus .material-icons-round":
      {
        transform: `translateX(6px)`,
      },
  };

  const imageTemplate = (
    <MKBox position="relative" borderRadius="lg">
      <MKBox
        component="img"
        src={image}
        alt={title}
        borderRadius="lg"
        shadow="md"
        width="100%"
        position="relative"
        zIndex={1}
      />
      <MKBox
        borderRadius="lg"
        shadow="md"
        width="100%"
        height="100%"
        position="absolute"
        left={0}
        top={0}
        sx={{
          backgroundImage: `url(${image})`,
          transform: "scale(0.94)",
          filter: "blur(12px)",
          backgroundSize: "cover",
        }}
      />
    </MKBox>
  );

  return (
    <Card
      sx={{
        background: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      {action.type === "internal" ? (
        <MuiLink
          onClick={() => {
            history(action.route, { state: { id: 1, articleid: action.article } });
          }}
          sx={cursorPointer}
        >
          {imageTemplate}
        </MuiLink>
      ) : (
        <MuiLink href={action.route} target="_blank" rel="noreferrer">
          {imageTemplate}
        </MuiLink>
      )}
      <MKBox pt={2} pb={3}>
        {action.type === "internal" ? (
          <MuiLink
            onClick={() => {
              history(action.route, { state: { id: 1, articleid: action.article } });
            }}
            sx={cardActionStyles}
          >
            <MKTypography variant="h5" gutterBottom>
              {title}
            </MKTypography>
          </MuiLink>
        ) : (
          <MuiLink href={action.route} target="_blank" rel="noreferrer" sx={cardActionStyles}>
            <MKTypography variant="h5" gutterBottom>
              {title}
            </MKTypography>
          </MuiLink>
        )}
        {authName && (
          <MKTypography display="block" variant="6" fontSize="0.8rem" fontWeight="light" mb={1}>
            {authName}
          </MKTypography>
        )}
        <MKTypography variant="body2" component="p" color="text" mb={3}>
          {parse(description)}
        </MKTypography>
        {action.type === "internal" ? (
          <MKTypography
            component={MuiLink}
            onClick={() => {
              history(action.route, { state: { id: 1, articleid: action.article } });
            }}
            variant="body2"
            fontWeight="regular"
            color={action.color}
            textTransform="capitalize"
            sx={cardActionStyles}
          >
            {action.label}
            <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </MKTypography>
        ) : (
          <MKTypography
            component={MuiLink}
            to={action.route}
            target="_blank"
            rel="noreferrer"
            variant="body2"
            fontWeight="regular"
            color={action.color}
            textTransform="capitalize"
            sx={cardActionStyles}
          >
            {action.label}
            <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </MKTypography>
        )}
      </MKBox>
    </Card>
  );
}

// Typechecking props for the TransparentBlogCard
TransparentBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  authName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    article: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "inherit",
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "text",
    ]).isRequired,
  }).isRequired,
};

export default TransparentBlogCard;
