// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";

function Information() {
  return (
    <MKBox component="section" pt={12}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKTypography variant="h2">Trusted by over</MKTypography>
          <MKTypography variant="h2" color="info" textGradient mb={2}>
            1,679,477+ Happy Pets
          </MKTypography>
          <MKTypography variant="body1" color="text" mb={2}>
            We know you have many choices when choosing the best West Garden Grove, CA, veterinary
            hospital, and we&rsquo;re happy that you&rsquo;ve decided to join the Vet Care Pet
            Clinic family. Your kind words and feedback help us continue to provide over-the-top
            service to you and your pet!
          </MKTypography>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 8 }}>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Nick Willever"
              date="1 day ago"
              review="We took our aging lab to see Dr. Fong on a busy Saturday afternoon. Even though her office was very busy, she took her time examining him and getting to know him. She explained his aging process, current condition and what to expect. She really calmed our fears. Dr. Fong didn't order up all kinds of tests but helped us understand ways to keep Max comfortable."
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              color="info"
              name="Shailesh Kushwaha"
              date="1 week ago"
              review="Super friendly, knowledgeable, and caring staff here. We called to get our anxious kitty's nails trimmed and they were able to see us immediately. We drove up, called the number for the tech to meet us outside - only one person is allowed inside at a time and there's a bench to wait on outside until you're called. It took them about 4 minutes to do it all, no fuss, no angry kitty, in and out without a problem."
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Samuel Kamuli"
              date="3 weeks ago"
              review="Pet care place for all kinds of pets. Nice and decent place. There is a resting area for extra visitors. I went there for 3 days. And they try their level best to maintain the cleanliness and hygiene. Good customer care. Very kind to customers as well."
              rating={5}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
