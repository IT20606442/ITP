import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

import { fetchAllUsers, createUser, updateUser } from "actions/UserAction";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/vet-contribution.webp";

import { FILE_IMG_SIZE, SUPPORTED_IMG_FORMATS, phoneRegExp, passwordRegExp } from "helper";

const validationSchemaUserCreate = yup.object({
  fname: yup
    .string("Enter your first name")
    .max(255, "First name should be of maximum 255 characters length"),
  lname: yup
    .string("Enter your last name")
    .max(255, "Last name should be of maximum 255 characters length"),
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(
      passwordRegExp,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string("Passwords must match")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  mnumber: yup
    .string("Enter your phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  hno: yup
    .string("Select your House No")
    .min(1, "House No should be of minimum 1 characters length")
    .max(5, "House No should be of maximum 5 characters length")
    .required("House No is required"),
  street: yup
    .string("Select your Street")
    .min(3, "Street should be of minimum 3 characters length")
    .max(250, "Street should be of maximum 250 characters length")
    .required("Steet is required"),
  city: yup
    .string("Enter your city")
    .min(3, "City should be of minimum 3 characters length")
    .max(250, "City should be of maximum 250 characters length")
    .required("Steet is required"),
  province: yup
    .string("Select your country")
    .min(3, "Province should be of minimum 3 characters length")
    .max(250, "Province should be of maximum 250 characters length")
    .required("Province is required"),
  file: yup
    .mixed()
    .test("fileSize", "File too large, Maximum file size 500KB", (value) =>
      value ? FILE_IMG_SIZE >= value.size : true
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      value ? SUPPORTED_IMG_FORMATS.includes(value.type) : true
    ),
});

const validationSchemaUserEdit = yup.object({
  fname: yup
    .string("Enter your first name")
    .max(255, "First name should be of maximum 255 characters length"),
  lname: yup
    .string("Enter your last name")
    .max(255, "Last name should be of maximum 255 characters length"),
  mnumber: yup
    .string("Enter your phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  hno: yup
    .string("Select your House No")
    .min(1, "House No should be of minimum 1 characters length")
    .max(5, "House No should be of maximum 5 characters length")
    .required("House No is required"),
  street: yup
    .string("Select your Street")
    .min(3, "Street should be of minimum 3 characters length")
    .max(250, "Street should be of maximum 250 characters length")
    .required("Steet is required"),
  city: yup
    .string("Enter your city")
    .min(3, "City should be of minimum 3 characters length")
    .max(250, "City should be of maximum 250 characters length")
    .required("Steet is required"),
  province: yup
    .string("Select your country")
    .min(3, "Province should be of minimum 3 characters length")
    .max(250, "Province should be of maximum 250 characters length")
    .required("Province is required"),
  file: yup
    .mixed()
    .test("fileSize", "File too large, Maximum file size 500KB", (value) =>
      value ? FILE_IMG_SIZE >= value.size : true
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      value ? SUPPORTED_IMG_FORMATS.includes(value.type) : true
    ),
});

function UserForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const userId = location.state?.userId;
  // get state all user profiles
  const selectUser = (state) => {
    const itemArray = state.user.users?.filter((item) => (userId ? item._id === userId : false));
    return itemArray && itemArray[0] ? itemArray[0] : null;
  };

  const user = useSelector(selectUser);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  useEffect(() => {
    if (user && user?._id) {
      setFile(`http://localhost:8070/${user.pic}`);
      setFileName(user.pic);
    }
    return () => {
      setFile("");
      setFileName("");
    };
  }, [user]);

  const formik = useFormik({
    initialValues: {
      _id: user?._id || "",
      fname: user?.fname || "",
      lname: user?.lname || "",
      email: user?.email || "",
      mnumber: user?.mnumber || "",
      hno: user?.hno || "",
      street: user?.street || "",
      city: user?.city || "",
      province: user?.province || "",
    },
    validationSchema: user && user._id ? validationSchemaUserEdit : validationSchemaUserCreate,
    onSubmit: (values, onSubmitProps) => {
      delete values.confirmPassword;
      if (values._id) {
        dispatch(updateUser(values, history));
      } else {
        dispatch(createUser(values, history));
      }
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
  });

  // handle change event of the File
  const handleFileChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      const [file0] = e.target.files;
      formik.values.file = file0;
      setFileName(e.target.files[0].name);
      reader.addEventListener("load", (eve) => setFile(eve.target.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history("/pages/user");
  };

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
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={9} lg={9} xl={9}>
            <Card
              sx={{
                p: 2,
                mx: { xs: 2, lg: 3 },
                mt: -20,
                mb: 4,
                backgroundColor: "white",
                backdropFilter: "saturate(200%) blur(30px)",
                boxShadow: ({ boxShadows: { xxl } }) => xxl,
              }}
            >
              <MKBox
                component="form"
                role="form"
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
                zIndex={2}
              >
                <MKBox mb={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="fname"
                        type="text"
                        label="First Name"
                        value={formik.values.fname}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.fname && formik.errors.fname)}
                        helperText={formik.touched.fname && formik.errors.fname}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="lname"
                        type="text"
                        label="Last Name"
                        value={formik.values.lname}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.lname && formik.errors.lname)}
                        helperText={formik.touched.lname && formik.errors.lname}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MKBox>
                <MKBox mb={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="mnumber"
                        type="text"
                        label="Contact No"
                        value={formik.values.mnumber}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.mnumber && formik.errors.mnumber)}
                        helperText={formik.touched.mnumber && formik.errors.mnumber}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="email"
                        type="text"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        fullWidth
                        disabled={!!formik.values._id}
                      />
                    </Grid>
                  </Grid>
                </MKBox>

                {!formik.values._id && (
                  <MKBox mb={2}>
                    <Grid container item xs={12}>
                      <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                        <MKInput
                          id="password"
                          type="text"
                          label="Password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          error={Boolean(formik.touched.password && formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                        <MKInput
                          id="confirmPassword"
                          type="text"
                          label="Confirm Password"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.touched.confirmPassword && formik.errors.confirmPassword
                          )}
                          helperText={
                            formik.touched.confirmPassword && formik.errors.confirmPassword
                          }
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </MKBox>
                )}
                <MKBox mb={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="hno"
                        type="text"
                        label="House Number"
                        value={formik.values.hno}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.hno && formik.errors.hno)}
                        helperText={formik.touched.hno && formik.errors.hno}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="street"
                        type="text"
                        label="Street"
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.street && formik.errors.street)}
                        helperText={formik.touched.street && formik.errors.street}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MKBox>
                <MKBox mb={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="city"
                        type="text"
                        label="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.city && formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="province"
                        type="text"
                        label="Province"
                        value={formik.values.province}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.province && formik.errors.province)}
                        helperText={formik.touched.province && formik.errors.province}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MKBox>
                {file && (
                  <MKBox mb={2} style={{ width: "50vh", margin: "auto" }}>
                    <img alt={fileName} src={file} style={{ width: "100%" }} />
                  </MKBox>
                )}
                <MKBox mb={2}>
                  <MKInput
                    id="file"
                    type="file"
                    label="Profile Picture"
                    onChange={(e) => handleFileChange(e)}
                    inputProps={{ filename: fileName }}
                    error={Boolean(formik.touched.file && formik.errors.file)}
                    helperText={formik.touched.file && formik.errors.file}
                    fullWidth
                  />
                </MKBox>
                <MKBox mt={4} mb={1} sx={{ float: "right" }}>
                  <MKButton
                    onClick={(e) => handleCancel(e)}
                    variant="gradient"
                    color="light"
                    sx={{ margin: "0px 10px" }}
                  >
                    Cancel
                  </MKButton>
                  <MKButton
                    variant="gradient"
                    color="info"
                    type="submit"
                    sx={{ margin: "0px 10px" }}
                  >
                    Save
                  </MKButton>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
        <MKBox width="100%" position="relative" zIndex={2} bottom="1rem">
          <SimpleFooter dark />
        </MKBox>
      </MKBox>
    </>
  );
}

export default UserForm;
