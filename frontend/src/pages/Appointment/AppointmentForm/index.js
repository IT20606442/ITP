import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import { useFormik } from "formik";
import * as yup from "yup";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

import TextField from "@mui/material/TextField";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

import {
  fetchAllAppointments,
  createAppointment,
  updateAppointment,
} from "actions/AppointmentAction";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/vet-contribution.webp";

import {
  FILE_IMG_SIZE,
  SUPPORTED_IMG_FORMATS,
  phoneRegExp,
  passwordRegExp,
  userRoles,
  Countries,
} from "helper";

const validationSchemaAppointmentCreate = yup.object({
  First_Name: yup
    .string("Enter your first name")
    .max(255, "First name should be of maximum 255 characters length"),
  Last_Name: yup
    .string("Enter your last name")
    .max(255, "Last name should be of maximum 255 characters length"),
  Birthday: yup
    .string()
    .required("Birthday is Required")
    .test(
      "Birthday",
      "Please choose a valid date of birth",
      (value) => moment().diff(moment(value), "years") >= 18
    ),
  Gender: yup.string("Select your Gender"),
  City: yup
    .string("Enter your city")
    .min(3, "City should be of minimum 3 characters length")
    .max(250, "City should be of maximum 250 characters length"),
  Country: yup.string("Select your country"),
  Contact_No: yup
    .string("Enter your phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  username: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
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
  Available_Day: yup.string("Enter article title").required("Email is required"),
  Available_Date: yup.string().required("AvailableDate is Required"),
  Available_STime: yup.string().required("Open Time is Required"),
  Available_ETime: yup.string().required("Close Time is Required"),
  UserType: yup.string("Enter User Type").required("User Type is required"),
  file: yup
    .mixed()
    .test("fileSize", "File too large, Maximum file size 500KB", (value) =>
      value ? FILE_IMG_SIZE >= value.size : true
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      value ? SUPPORTED_IMG_FORMATS.includes(value.type) : true
    ),
});

const validationSchemaAppointmentEdit = yup.object({
  First_Name: yup
    .string("Enter your first name")
    .max(255, "First name should be of maximum 255 characters length"),
  Last_Name: yup
    .string("Enter your last name")
    .max(255, "Last name should be of maximum 255 characters length"),
  Birthday: yup
    .string()
    .required("Birthday is Required")
    .test(
      "Birthday",
      "Please choose a valid date of birth",
      (value) => moment().diff(moment(value), "years") >= 18
    ),
  Gender: yup.string("Select your Gender"),
  City: yup
    .string("Enter your city")
    .min(3, "City should be of minimum 3 characters length")
    .max(250, "City should be of maximum 250 characters length"),
  Country: yup.string("Select your country"),
  Contact_No: yup
    .string("Enter your phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  Available_Day: yup.string("Enter article title").required("Email is required"),
  Available_Date: yup.string().required("AvailableDate is Required"),
  Available_STime: yup.string().required("Open Time is Required"),
  Available_ETime: yup.string().required("Close Time is Required"),
  UserType: yup.string("Enter User Type").required("User Type is required"),
  file: yup
    .mixed()
    .test("fileSize", "File too large, Maximum file size 500KB", (value) =>
      value ? FILE_IMG_SIZE >= value.size : true
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      value ? SUPPORTED_IMG_FORMATS.includes(value.type) : true
    ),
});

function AppointmentForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const appointmentId = location.state?.appointmentId;
  // get state all appointment profiles
  const selectAppointment = (state) => {
    const itemArray = state.appointment.appointments?.filter((item) =>
      appointmentId ? item._id === appointmentId : false
    );
    return itemArray && itemArray[0] ? itemArray[0] : null;
  };

  const appointment = useSelector(selectAppointment);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, []);

  useEffect(() => {
    if (appointment && appointment?._id) {
      setFile(`http://localhost:8070/${appointment.profileImage}`);
      setFileName(appointment.profileImage);
    }
    return () => {
      setFile("");
      setFileName("");
    };
  }, [appointment]);

  const formik = useFormik({
    initialValues: {
      _id: appointment?._id || "",
      First_Name: appointment?.First_Name || "",
      Last_Name: appointment?.Last_Name || "",
      Birthday: appointment?.Birthday || "",
      Gender: appointment?.Gender || "",
      City: appointment?.City || "",
      Country: appointment?.Country || "",
      username: appointment?.username || "",
      Contact_No: appointment?.Contact_No || "",
      Available_Day: appointment?.Available_Day || "",
      Available_Date: appointment?.Available_Date || "",
      Available_STime: appointment?.Available_STime || "",
      Available_ETime: appointment?.Available_ETime || "",
      UserType: appointment?.UserType || "appointment",
    },
    validationSchema:
      appointment && appointment._id
        ? validationSchemaAppointmentEdit
        : validationSchemaAppointmentCreate,
    onSubmit: (values, onSubmitProps) => {
      delete values.confirmPassword;
      if (values._id) {
        dispatch(updateAppointment(values, history));
      } else {
        dispatch(createAppointment(values, history));
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
    history("/pages/Appointment");
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
                        id="First_Name"
                        type="text"
                        label="First Name"
                        value={formik.values.First_Name}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.First_Name && formik.errors.First_Name)}
                        helperText={formik.touched.First_Name && formik.errors.First_Name}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="Last_Name"
                        type="text"
                        label="Last Name"
                        value={formik.values.Last_Name}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.Last_Name && formik.errors.Last_Name)}
                        helperText={formik.touched.Last_Name && formik.errors.Last_Name}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MKBox>
                <MKBox mb={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="Contact_No"
                        type="text"
                        label="Contact No"
                        value={formik.values.Contact_No}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.Contact_No && formik.errors.Contact_No)}
                        helperText={formik.touched.Contact_No && formik.errors.Contact_No}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="username"
                        type="text"
                        label="Email"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.username && formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
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
                        id="Birthday"
                        type="text"
                        label="Birthday"
                        value={formik.values.Birthday}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.Birthday && formik.errors.Birthday)}
                        helperText={formik.touched.Birthday && formik.errors.Birthday}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="Gender"
                        type="text"
                        label="Gender"
                        value={formik.values.Gender}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.Gender && formik.errors.Gender)}
                        helperText={formik.touched.Gender && formik.errors.Gender}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MKBox>
                <MKBox mb={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="City"
                        type="text"
                        label="City"
                        value={formik.values.City}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.City && formik.errors.City)}
                        helperText={formik.touched.City && formik.errors.City}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <TextField
                        name="Country"
                        id="Country"
                        select
                        label="Country"
                        value={formik.values.Country}
                        onChange={formik.handleChange}
                        SelectProps={{
                          native: true,
                        }}
                        error={formik.touched.Country && Boolean(formik.errors.Country)}
                        helperText={formik.touched.Country && formik.errors.Country}
                        fullWidth
                      >
                        <option value=""> </option>
                        {Countries.map((item) => (
                          <option key={item.code} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </MKBox>
                <MKBox mb={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="Available_Day"
                        type="text"
                        label="Available Day"
                        value={formik.values.Available_Day}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched.Available_Day && formik.errors.Available_Day)}
                        helperText={formik.touched.Available_Day && formik.errors.Available_Day}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="Available_Date"
                        type="text"
                        label="Available Date"
                        value={formik.values.Available_Date}
                        onChange={formik.handleChange}
                        error={Boolean(
                          formik.touched.Available_Date && formik.errors.Available_Date
                        )}
                        helperText={formik.touched.Available_Date && formik.errors.Available_Date}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MKBox>
                <MKBox mb={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="Available_STime"
                        type="text"
                        label="Opening Time"
                        value={formik.values.Available_STime}
                        onChange={formik.handleChange}
                        error={Boolean(
                          formik.touched.Available_STime && formik.errors.Available_STime
                        )}
                        helperText={formik.touched.Available_STime && formik.errors.Available_STime}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <MKInput
                        id="Available_ETime"
                        type="text"
                        label="Closing Time"
                        value={formik.values.Available_ETime}
                        onChange={formik.handleChange}
                        error={Boolean(
                          formik.touched.Available_ETime && formik.errors.Available_ETime
                        )}
                        helperText={formik.touched.Available_ETime && formik.errors.Available_ETime}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MKBox>
                <MKBox mb={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={11} sm={5} md={5} lg={5} xl={5} className="mx-auto">
                      <TextField
                        name="UserType"
                        id="UserType"
                        select
                        label="User Type"
                        value={formik.values.UserType}
                        onChange={formik.handleChange}
                        SelectProps={{
                          native: true,
                        }}
                        error={formik.touched.UserType && Boolean(formik.errors.UserType)}
                        helperText={formik.touched.UserType && formik.errors.UserType}
                        fullWidth
                      >
                        <option value=""> </option>
                        {userRoles.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </TextField>
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

export default AppointmentForm;
