import { useDispatch } from "react-redux";
import { productList } from "../redux/productAction";
import { useEffect } from "react";
import BannerCarousel from "./BannerCarousel/BannerCarousel";
import MiddleSection from "./MiddleSection/MiddleSection";

function Main() {
  const dispatch = useDispatch();

  // Defer API call to not block initial render - use requestIdleCallback if available
  useEffect(() => {
    // Use requestIdleCallback to defer non-critical API call
    const loadProducts = () => {
      dispatch(productList());
    };

    if (window.requestIdleCallback) {
      requestIdleCallback(loadProducts, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadProducts, 100);
    }
  }, [dispatch]);

  return (
    <>
      <BannerCarousel />
      <MiddleSection />
    </>
  );
}

export default Main;
