import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect } from "react";
import { getUser } from "src/context/globalUtils";
import { useRouter } from "next/router";

const FindLoads = () => {
  const router = useRouter();
  useEffect(() => {
    if (!getUser()) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Find Loads</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};
FindLoads.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FindLoads;
