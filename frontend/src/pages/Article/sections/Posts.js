import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React components
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";

import { fetchAllArticles } from "actions/ArticleAction";

import { fetchAllVets } from "actions/VetAction";

function Places() {
  const dispatch = useDispatch();

  // get state all vet profiles
  const selectArticles = (state) => {
    const itemArray = state.article.articles?.filter((item) => !!item.title);
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
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={6}>
          <MKTypography variant="h3" mb={6}>
            Check The Latest Articles
          </MKTypography>
        </Grid>
        <Grid container spacing={3}>
          {allArticles.length > 0 &&
            Object.values(allArticles).map((article) => (
              <Grid item xs={12} sm={6} lg={3} key={article._id}>
                <TransparentBlogCard
                  image={`http://localhost:8070/${article.articleImage}`}
                  title={article.title}
                  authName={findVetName(article.authorname)}
                  description={article.article
                    .replace(new RegExp("<[^>]*>", "g"), " ")
                    .slice(0, 100)}
                  action={{
                    type: "internal",
                    route: `/pages/articles/article`,
                    article: article._id,
                    color: "info",
                    label: "read more",
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;
