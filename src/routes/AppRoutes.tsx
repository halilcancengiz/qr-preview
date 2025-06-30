import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import CategoriesLayout from "../pages/CategoriesLayout";
import AllCategoriesLayout from "../pages/AllCategoriesLayout";
import ProductDetailLayout from "../pages/ProductDetailLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/:slug" element={<CategoriesLayout />} />
      <Route path="/:slug/all-categories" element={<AllCategoriesLayout />} />
      <Route path="/:slug/product/:productId" element={<ProductDetailLayout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;