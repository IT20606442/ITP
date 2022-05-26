import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import parse from "html-react-parser";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

import { fetchAllArticles, deleteArticle } from "actions/ArticleAction";

import { fetchAllVets } from "actions/VetAction";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/vet-contribution.webp";

function ArticleDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const articleId = location.state?.articleid;
  // get state all vet profiles
  const selectArticle = (state) => {
    const itemArray = state.article.articles?.filter((item) => item._id === articleId);
    return itemArray[0];
  };

  const article = useSelector(selectArticle);

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

  if (!articleId && !article) {
    history("/");
  }
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
        >
          <Container>
            <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
              <MKTypography
                variant="h1"
                color="white"
                mt={-6}
                mb={2}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                {article.title}
              </MKTypography>
              <MKTypography
                variant="h4"
                color="white"
                mt={1}
                mb={1}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                {findVetName(article.authorname)}
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
            backgroundColor: "white",
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <MKBox>
            <img
              src={`http://localhost:8070/${article.articleImage}`}
              alt={article.title}
              style={{
                width: "100vh",
                float: "right",
                margin: "0.75rem",
                marginLeft: "1.5rem",
              }}
            />
            <MKBox style={{ textAlign: "justify" }}>{parse(article.article)}</MKBox>
          </MKBox>
          <MKBox mt={4} mb={1} sx={{ float: "right" }}>
            <MKButton
              onClick={() => {
                history("/pages/articles/form", { state: { id: 1, articleid: article._id } });
              }}
              variant="gradient"
              color="light"
              sx={{ margin: "0px 10px", float: "right", width: "10rem" }}
            >
              Edit
            </MKButton>
            <MKButton
              onClick={() => {
                dispatch(deleteArticle(article, history));
                history("/pages/articles");
              }}
              variant="gradient"
              color="warning"
              sx={{ margin: "0px 10px", float: "right", width: "10rem" }}
            >
              Delete
            </MKButton>
          </MKBox>
        </Card>
        <MKBox width="100%" position="relative" zIndex={2} bottom="1rem">
          <SimpleFooter dark />
        </MKBox>
      </MKBox>
    </>
  );
}

export default ArticleDetail;
