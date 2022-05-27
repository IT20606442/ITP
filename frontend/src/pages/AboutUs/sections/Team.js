import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

import { fetchAllVets } from "actions/VetAction";

function Team() {
  const dispatch = useDispatch();

  // get state all vet profiles
  const selectVetProfile = (state) => {
    const itemArray = state.vet.vets?.filter((item) => !!item.username);
    return itemArray;
  };

  const allVetProfiles = useSelector(selectVetProfile);

  useEffect(() => {
    dispatch(fetchAllVets());
  }, []);

  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              The Veterinary Team
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              Our well-trained team of doctors will ensure that your pet receives exceptional
              quality pet care, focusing on safety and personalized attention! We are an independent
              family-owned veterinary hospital and mobile clinic with family values to its core.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {allVetProfiles.length > 0 &&
            Object.values(allVetProfiles).map((vet, i) => (
              <Grid item xs={12} lg={6} key={i.toString()}>
                <MKBox mb={1}>
                  <HorizontalTeamCard
                    image={`http://localhost:8070/${vet?.profileImage}`}
                    name={`Dr. ${vet?.First_Name} ${vet?.Last_Name}`}
                    description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                  />
                </MKBox>
              </Grid>
            ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
