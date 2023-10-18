import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { Box, IconButton, Typography } from '@mui/material';

const Header = ({ menu, setMenu }) => {
  return (
    <MainHeader
      style={{
        ...(menu
          ? {
              height: '10rem',
            }
          : {
              height: '100vh',
            }),
      }}
    >
      <Box display="flex" alignItems="center">
        <IconButton size="large">
          <FlutterDashIcon sx={{ fontSize: '5.2rem' }} />
        </IconButton>
        <Typography variant="h4">My App</Typography>
      </Box>
      <Nav menu={menu} setMenu={setMenu} />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: menu10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
`;
export default Header;
