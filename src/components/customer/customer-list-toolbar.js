import {
  Box,Typography
} from '@mui/material';
export const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Find Loads
      </Typography>
    </Box>
    
  </Box>
);
