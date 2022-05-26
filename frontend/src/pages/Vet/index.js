// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Vet page sections
import Record from "pages/Vet/sections/Record";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/vet-contribution.webp";

function Vet() {
  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox bgColor="white">
        <MKBox
          minHeight="25rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${bgImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "white",
            backgroundRepeat: "no-repeat",
            display: "grid",
            placeItems: "center",
          }}
        />
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Record />
        </Card>
        <MKBox width="100%" position="relative" zIndex={2} bottom="1rem">
          <SimpleFooter dark />
        </MKBox>
      </MKBox>
    </>
  );
}

export default Vet;
