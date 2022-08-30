import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect } from "react";
import { getUser } from "src/context/globalUtils";
import { useRouter } from "next/router";

const Account = () => {
  const router = useRouter();
  useEffect(() => {
    if (!getUser()) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Profile | Material Kit</title>
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
            Profile
          </Typography>
          <Grid container>
            <Grid item lg={4} md={6} xs={12}></Grid>
            <Grid item lg={12} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
