import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

import loads from "src/service/loads";

export const CustomerListResults = ({ ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(async () => {
    setData([...(await loads.randomLoads())]);
  }, []);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Button
          onClick={async () => {
            let result = await loads.randomLoads();
            setData([...result]);
          }}
          color="primary"
          variant="contained"
        >
          Refresh
        </Button>
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table class="border" style={{ borderColor: "888" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Origin City</TableCell>
                  <TableCell>Origin State</TableCell>
                  <TableCell>Destination City</TableCell>
                  <TableCell>Destination State</TableCell>
                  <TableCell>Equipment Type</TableCell>
                  <TableCell>Revenue</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Days To Pay</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, limit).map((load) => (
                  <TableRow
                    hover
                    key={load.id}
                    selected={selectedCustomerIds.indexOf(load.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {load.originCity}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{load.originState}</TableCell>
                    <TableCell>{load.destinationCity}</TableCell>
                    <TableCell>{load.destinationState}</TableCell>
                    <TableCell>{load.equipmentType}</TableCell>
                    <TableCell>{load.revenue}</TableCell>
                    <TableCell>{load.company}</TableCell>
                    <TableCell>{load.daysToPay}</TableCell>
                    <TableCell>View</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={data.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

CustomerListResults.propTypes = {
  data: PropTypes.array.isRequired,
};
