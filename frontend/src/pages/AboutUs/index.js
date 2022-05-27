// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// About Us page sections
import Information from "pages/AboutUs/sections/Information";
import Team from "pages/AboutUs/sections/Team";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-about-us.webp";

function AboutUs() {
  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#fff",
          backgroundRepeat: "no-repeat  ",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              We love pets!
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              We are pleased to introduce you to our Vet Care Pet Clinic team. We provide veterinary
              care in Southern California. Our goal is to give your furry family members the love,
              care, and respect they deserve.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information />
        <Team />
      </Card>
      <MKBox width="100%" position="relative" zIndex={2} bottom="1rem">
        <SimpleFooter dark />
      </MKBox>
    </>
  );
}

export default AboutUs;
