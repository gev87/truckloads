import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
 Alert,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { addDriver } from "src/service/drivers";
import { useRouter } from "next/router";
import { getUser } from "src/context/globalUtils";

export const DriverDetails = (props) => {
  const [error,setError] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        {error && (
          <div>
            <Alert variant="outlined" severity="error">
              Please fill all the fields
            </Alert>
          </div>
        )}
        {emailCheck && (
          <div>
            <Alert variant="outlined" severity="error">
              Please enter a valid email
            </Alert>
          </div>
        )}
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Driver Name"
                label="Driver Name"
                name="name"
                onChange={handleChange}
                required
                defaultValue=""
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Email"
                label="Email"
                name="email"
                onChange={handleChange}
                required
                defaultValue=""
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Phone"
                label="Phone"
                name="phone"
                onChange={handleChange}
                required
                defaultValue=""
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Password"
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                required
                defaultValue=""
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            onClick={async () => {
              if (!values.name || !values.email || !values.phone || !values.password) {
                setError(true);
                setEmailCheck("");
                return;
              }
              if (!values.email.includes("@") || !values.email.includes(".")) {
                setError("");
                setEmailCheck(true);
                return;
              }
              const data = {
                organizationId: getUser().organizationId,
                ...values,
              };
              let result = await addDriver(data);

              if (result) {
                router.push("/drivers");
              } else alert("Failed to create driver");
            }}
            color="primary"
            variant="contained"
          >
            Add driver
          </Button>
        </Box>
      </Card>
    </form>
  );
};
