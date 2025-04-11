import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp = /^[0-9]{10}$/;
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Email must end with @gmail.com

  const checkoutSchema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/^[A-Za-z ]+$/, "Only alphabets and spaces are allowed")
      .min(3, "First Name must be at least 3 characters")
      .required("First Name is required"),
    lastName: yup
      .string()
      .matches(
        /^[A-Za-z][A-Za-z ]*$/,
        "Last Name must start with an alphabet and contain only alphabets and spaces"
      )
      .min(1, "Last Name must be at least 1 character")
      .required("Last Name is required"),
    email: yup
      .string()
      .matches(emailRegExp, "Email must end with @gmail.com")
      .required("Email is required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Invalid phone number format")
      .required("Phone Number is required"),
    address1: yup
      .string()
      .min(4, "Address 1 must be at least 4 characters")
      .required("Address 1 is required"),
    address2: yup.string(),
    city: yup.string().required("City is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
    city: "",
  };

  const cities = ["Bangalore", "Mysore", "Chennai", "Hyderabad", "Delhi"];

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Handle specific backend error messages
        if (response.status === 400) {
          setSnackbarMessage(
            errorData.error || "Email or Contact already exists!"
          );
          setSnackbarSeverity("error");
        } else if (response.status === 500) {
          setSnackbarMessage("Internal Server Error. Please try again later.");
          setSnackbarSeverity("error");
        } else {
          setSnackbarMessage(`Unexpected error: ${response.status}`);
          setSnackbarSeverity("error");
        }
      } else {
        const data = await response.json();
        console.log("Contact created:", data);
        setSnackbarMessage("New user created successfully!");
        setSnackbarSeverity("success");
      }

      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error creating contact:", error);
      setSnackbarMessage("Failed to create user. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
              <Box sx={{ gridColumn: "span 4" }}>
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="City"
                  value={values.city}
                  onChange={handleChange}
                  name="city"
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} sx={{ marginRight: "5px" }} />
                ) : null}{" "}
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Form;