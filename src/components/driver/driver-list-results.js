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
} from "@mui/material";
import { getAllDrivers } from "src/service/drivers";

export const DriverListResults = ({ customers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(async () => {
    setData(await getAllDrivers());
  }, []);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Timeline</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.slice(0, limit).map((driver) => (
                  <TableRow hover key={driver?.id}>
                    <TableCell>{driver?.name}</TableCell>
                    <TableCell>{driver?.email}</TableCell>
                    <TableCell>{driver?.phone}</TableCell>
                    <TableCell>{driver?.status}</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Timeline</TableCell>
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

DriverListResults.propTypes = {
  data: PropTypes.array.isRequired,
};
