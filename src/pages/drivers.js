import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { DriverListResults } from "src/components/driver/driver-list-results";
import { DriverListToolbar } from "src/components/driver/driver-list-toolbar";
import { useEffect } from "react";
import { getUser } from "src/context/globalUtils";
import { useRouter } from "next/router";

const Drivers = () => {
  const router = useRouter();
  useEffect(() => {
    if (!getUser()) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Drivers</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <DriverListToolbar />
          <Box sx={{ mt: 3 }}>
            <DriverListResults />
          </Box>
        </Container>
      </Box>
    </>
  )
};
Drivers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Drivers;
