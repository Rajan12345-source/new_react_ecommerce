import React from 'react';
import { useFilterContext } from '../context/filter_context';
import { MdProductionQuantityLimits } from 'react-icons/md';
import GridView from './GridView';
import ListView from './ListView';
import { Box, Typography } from '@mui/material';

const ProductList = () => {
  const { filter_products, grid_view } = useFilterContext();

  if (grid_view === true) {
    return filter_products?.length ? (
      <GridView products={filter_products} />
    ) : (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <MdProductionQuantityLimits
          style={{
            width: 60,
            height: 60,
            color: 'rgba(221, 24, 24, 0.6)',
          }}
        />
        <Typography variant="h4" color="rgba(0, 0, 0, 0.33)">
          No Products Available
        </Typography>
      </Box>
    );
  }

  if (grid_view === false) {
    return filter_products?.length ? (
      <ListView products={filter_products} />
    ) : (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <MdProductionQuantityLimits
          style={{
            width: 60,
            height: 60,
            color: 'rgba(221, 24, 24, 0.6)',
          }}
        />
        <Typography variant="h4" color="rgba(0, 0, 0, 0.33)">
          No Products Available
        </Typography>
      </Box>
    );
  }
};

export default ProductList;
