import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './styles.css';
import { Box, Button } from '@chakra-ui/react';
import Home from './Home';
import Orders from './Orders';
import Products from './Products';
import ProductDetail from './ProductDetail';
import NewProduct from './Products/new';

function Admin() {


  return (
    <div>
      <nav>
        <ul className='admin-menu'>
          <li>
            <Link to="/admin/home">
              <Button color="white">Home</Button>
            </Link>
          </li>

          <li>
            <Link to="/admin/orders">
              <Button color="white">Orders</Button>
            </Link>
          </li>

          <li>
            <Link to="/admin/products">
              <Button color="white">Products</Button>
            </Link>
          </li>
        </ul>
      </nav>

      <Box mt="10">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route path="products/:product_id" element={<ProductDetail />} />
        </Routes>
      </Box>
    </div>
  )
}

export default Admin