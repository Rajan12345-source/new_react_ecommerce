import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { Button } from '../styles/Button';
import { NavLink } from 'react-router-dom';

const Success = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      height="100vh"
    >
      <Avatar
        src="/payment.png"
        alt=""
        sx={{
          width: 200,
          height: 200,
        }}
      />
      <Typography variant="h4" fontWeight="bold" mt={3} mb={3}>
        Payment successfully Done !!!
      </Typography>
      <NavLink to="/">
        <Button>Go To Home Page</Button>
      </NavLink>
    </Box>
  );
};

export default Success;
