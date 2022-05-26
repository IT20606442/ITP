import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
import Information from "pages/Presentation/sections/Information";
import Testimonials from "pages/Presentation/sections/Testimonials";

// Presentation page components
import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";

import { fetchAllArticles } from "actions/ArticleAction";

import { fetchAllVets } from "actions/VetAction";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-presentation.webp";

function Presentation() {
  const dispatch = useDispatch();

  // get state all vet profiles
  const selectArticles = (state) => {
    const itemArray = state.article.articles?.filter((item) => !!item.title);
    itemArray.length = 2;
    return itemArray;
  };

  const allArticles = useSelector(selectArticles);

  // get state all vet profiles
  const allVetProfiles = useSelector((state) => state.vet.vets);

  const findVetName = (vetId) => {
    const itemArray = allVetProfiles?.filter((item) => item._id === vetId);
    return `by ${itemArray[0].First_Name} ${itemArray[0].Last_Name}`;
  };
  useEffect(() => {
    dispatch(fetchAllArticles());
    dispatch(fetchAllVets());
  }, []);
  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `linear-gradient(0deg, rgba(
            3, 4, 9, 0.7), rgba(
              0, 48, 87, 0.8)),url(${bgImage})`,
          backgroundSize: "contain",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#fff",
          backgroundRepeat: "no-repeat  ",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h4"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Happy Paws
            </MKTypography>
            <MKTypography
              variant="h1"
              color="white"
              mt={-1}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Our Best Friends Needs the Best
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Welcome to the Happy Paws Pet Clinic Center. We are specialists in medical pet care.
              Our philosophy is to take care of your best friends - they deserve best care!
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
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information />
        <Container sx={{ mt: 6 }}>
          <BuiltByDevelopers />
        </Container>
        <Container>
          <Grid container spacing={3}>
            {allArticles.length > 0 &&
              Object.values(allArticles).map((article, i) => (
                <Grid item xs={12} lg={4} key={i.toString()}>
                  <FilledInfoCard
                    color="info"
                    variant="gradient"
                    title={article.title}
                    authName={findVetName(article.authorname)}
                    description={article.article
                      .replace(new RegExp("<[^>]*>", "g"), " ")
                      .slice(0, 100)}
                    image={`http://localhost:8070/${article.articleImage}`}
                    action={{
                      type: "external",
                      route:
                        "https://www.creative-tim.com/learning-lab/react/overview/material-kit/",
                      label: "Read more",
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
        <Testimonials />
      </Card>
      <MKBox width="100%" position="relative" zIndex={2} bottom="1rem">
        <SimpleFooter dark />
      </MKBox>
    </>
  );
}

export default Presentation;
