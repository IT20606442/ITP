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

import TextField from "@mui/material/TextField";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

import { fetchAllArticles, createArticle, updateArticle } from "actions/ArticleAction";

import { fetchAllVets } from "actions/VetAction";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/vet-contribution.webp";

import { FILE_IMG_SIZE, SUPPORTED_IMG_FORMATS } from "helper";

const validationSchemaArticle = yup.object({
  title: yup.string("Enter article title").required("Article title is required"),
  article: yup.string("Enter article text").required("Article Text is required"),
  authorname: yup.string("Enter article title").required("Email is required"),
  file: yup
    .mixed()
    .test("fileSize", "File too large, Maximum file size 500KB", (value) =>
      value ? FILE_IMG_SIZE >= value.size : true
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      value ? SUPPORTED_IMG_FORMATS.includes(value.type) : true
    ),
});

function ArticleForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const articleId = location.state?.articleid;
  // get state all vet profiles
  const selectArticle = (state) => {
    const itemArray = state.article.articles?.filter((item) =>
      articleId ? item._id === articleId : false
    );
    return itemArray && itemArray[0] ? itemArray[0] : null;
  };

  const article = useSelector(selectArticle);

  // get state all vet profiles
  const allVetProfiles = useSelector((state) => state.vet.vets);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    dispatch(fetchAllArticles());
    dispatch(fetchAllVets());
  }, []);

  useEffect(() => {
    if (article && article?._id) {
      setFile(`http://localhost:8070/${article.articleImage}`);
      setFileName(article.articleImage);
    }
    return () => {
      setFile("");
      setFileName("");
    };
  }, [article]);

  const formik = useFormik({
    initialValues: {
      _id: article?._id || "",
      title: article?.title || "",
      article: article?.article || "",
      authorname: article?.authorname || "",
    },
    validationSchema: validationSchemaArticle,
    onSubmit: (values, onSubmitProps) => {
      if (values._id) {
        dispatch(updateArticle(values, history));
      } else {
        dispatch(createArticle(values, history));
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
    history("/pages/articles");
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
                  <MKInput
                    id="title"
                    type="text"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.title && formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    fullWidth
                  />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput
                    id="article"
                    type="text"
                    label="Article Text"
                    multiline
                    rows={10}
                    value={formik.values.article}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.article && formik.errors.article)}
                    helperText={formik.touched.article && formik.errors.article}
                    fullWidth
                  />
                </MKBox>
                <MKBox mb={2}>
                  <TextField
                    name="authorname"
                    id="authorname"
                    select
                    label="Author"
                    value={formik.values.authorname}
                    onChange={formik.handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    error={formik.touched.authorname && Boolean(formik.errors.authorname)}
                    helperText={formik.touched.authorname && formik.errors.authorname}
                    fullWidth
                  >
                    <option value=""> </option>
                    {allVetProfiles.map((item) => (
                      <option key={item._id} value={item._id}>
                        {`by ${item.First_Name} ${item.Last_Name}`}
                      </option>
                    ))}
                  </TextField>
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
                    label="Image"
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

export default ArticleForm;
