import './App.scss'
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage/HomePage';
import Layout from '@/components/Layout/Layout';
import CategoriesPage from '@/pages/CategoriesPage/CategoriesPage';
import AllProductsPage from '@/pages/AllProductsPage/AllProductsPage';
import CartPage from '@/pages/CartPage/CartPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import SingleProductPage from '@/pages/SingleProductPage/SingleProductPage';
import ProductsFromCategoryPage from '@/pages/ProductsFromCategoryPage/ProductsFromCategoryPage';
import LikedProductsPage from '@/pages/LikedProductsPage/LikedProductsPage';
import DiscountedProductsPage from '@/pages/DiscountedProductsPage/DiscountedProductsPage';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      document.body.classList.add('no-transition');

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('no-transition');
      }, 300); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="all-products" element={<AllProductsPage />} />
          <Route path="products/:productId" element={<SingleProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="categories/:categoryId" element={<ProductsFromCategoryPage />} />
          <Route path="liked-products" element={<LikedProductsPage />} />
          <Route path="all-sales" element={<DiscountedProductsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
