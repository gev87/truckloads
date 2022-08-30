import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import auth from "../service/auth";
import { saveUser,getUser } from "../context/globalUtils";
import { useEffect } from "react";

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      dot: "",
      name: "",
      organizationName: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirm: "",
      policy: false,
    },
    validationSchema: Yup.object({
      dot: Yup.string().max(255).required("DOT is required"),
      organizationName: Yup.string().max(255).required("Organization name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      name: Yup.string().max(255).required("Your name is required"),
      password: Yup.string().max(255).min(6).required("Password is required"),
      confirm: Yup.string().required("Confirm password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (e) => {
      if (e.password !== e.confirm) {
        alert("Passwords do NOT match");
        return;
      }
      let result = await auth.register(e, {
        organizationName: e.organizationName,
        email: e.email,
        password: e.password,
        name: e.name,
        dot: e.dot,
      });
      if (result == null) {
        alert("Something went wrong");
        return;
      }
      saveUser(result);
      router.push("/account");
    },
  });
  useEffect(() => {
    if (getUser() != null) {
      router.push("/account");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.dot && formik.errors.dot)}
              fullWidth
              helperText={formik.touched.dot && formik.errors.dot}
              label="DOT"
              margin="normal"
              name="dot"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.dot}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Your Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.organizationName && formik.errors.organizationName)}
              fullWidth
              helperText={formik.touched.organizationName && formik.errors.organizationName}
              label="Organization Name"
              margin="normal"
              name="organizationName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.organizationName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.confirm && formik.errors.confirm)}
              fullWidth
              helperText={formik.touched.confirm && formik.errors.confirm}
              label="Confirm"
              margin="normal"
              name="confirm"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirm}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
