import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { InputAdornment, IconButton } from "@mui/material";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { vetLogin } from "actions/AuthAction";

const validationSchemaSignin = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(3, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function VetSignIn() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaSignin,
    onSubmit: (values, onSubmitProps) => {
      dispatch(vetLogin(values, history));
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Vet Sign in
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox
                  component="form"
                  role="form"
                  onSubmit={formik.handleSubmit}
                  onReset={formik.handleReset}
                >
                  <MKBox mb={2}>
                    <MKInput
                      id="email"
                      type="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={Boolean(formik.touched.password && formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      InputProps={
                        showPassword !== null
                          ? {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={handleShowPassword}>
                                    {showPassword ? (
                                      <i className="fa-solid fa-eye" />
                                    ) : (
                                      <i className="fa-solid fa-eye-slash" />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }
                          : null
                      }
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" type="submit" fullWidth>
                      sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/sign-up/cover"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default VetSignIn;
