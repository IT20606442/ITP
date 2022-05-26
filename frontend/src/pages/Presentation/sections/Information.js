// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.webp";
import bgBack from "assets/images/rotating-card-bg-back.jpg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    COMPASSIONATE
                    <br />
                    VET CARE
                  </>
                }
                description="Vet Care Pet Clinic's Hospital offers complete care for you dog or cat. Our veterinarians offer onsite emergency, surgical, laboratory and pharmacy services."
              />
              <RotatingCardBack
                image={bgBack}
                title="Sign up with us"
                description="OUR VETERINARY SERVICES CAN HELP YOUR PET STAY HEALTHY AND HAPPY."
                action={{
                  type: "internal",
                  route: "/sections/page-sections/page-headers",
                  label: "Sign Us",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="fa-solid fa-dog"
                  title="CANINE SERVICES"
                  description="Our vaccines include rabies, DA2PP, lepto, bordetella, canine influenza, lyme, and rattlesnake vaccinations!"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="fa-solid fa-cat"
                  title="FELINE SERVICES"
                  description="View our vaccination pricing and packages for cats here! Our vaccines include rabies, FeLV, and FVRCP."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="fa-solid fa-capsules"
                  title="PRESCRIPTIONS"
                  description="Vet Care Pet Clinic stocks numerous medications that your pets may need. If we do not carry a specific medication we will provide a written prescription."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="fa-solid fa-certificate"
                  title="HEALTH CERTIFICATES"
                  description="Our veterinarians perform health examinations for dogs and cats and will be happy to assist you in preparing your pet's health documents."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
