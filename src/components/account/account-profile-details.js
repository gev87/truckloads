import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { getUser, saveUser } from "src/context/globalUtils";
import auth from "src/service/auth";


export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    phone: "",
    zoom: "",
  });
  const [error, setError] = useState("");
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader={getUser()?.organizationName} title="Organisation:" />
        <CardHeader subheader={getUser()?.accountType} title="Account type:" />
        <CardHeader subheader={getUser()?.email} title="Email:" />
        {error && (
          <div>
            <Alert variant="outlined" severity="error">
              Please add phone and zoom number
            </Alert>
          </div>
        )}
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify your phone number"
                label="Phone"
                name="phone"
                onChange={handleChange}
                required
                defaultValue={getUser()?.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Zoom"
                name="zoom"
                onChange={handleChange}
                defaultValue={getUser()?.zoom}
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
              if (!values.zoom || !values.phone) {
                setError(true);
                return;
              }
              let user = getUser();
              let result = await auth.updateProfile({
                ...user,
                ...values,
              });
              if (result) {
                alert("Successfully updated.");
                saveUser(result);
              } else alert("Failed to update");
            }}
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
