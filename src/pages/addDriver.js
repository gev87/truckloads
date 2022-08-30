import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { DriverDetails } from "src/components/driver/driver-details";
import { useEffect } from "react";
import { getUser } from "src/context/globalUtils";
import { useRouter } from "next/router";

const AddDriver = () => {
  const router = useRouter();
  useEffect(() => {
    if (!getUser()) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Add Driver</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Add Driver
          </Typography>
          <Grid container>
            <Grid item lg={4} md={6} xs={12}></Grid>
            <Grid item lg={12} md={6} xs={12}>
              <DriverDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

AddDriver.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddDriver;
