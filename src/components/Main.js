import { addToCart, emptyCart, removeToCart } from "../redux/action";
import { useDispatch } from "react-redux";
import { productList } from "../redux/productAction";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import BannerCarousel from "./BannerCarousel/BannerCarousel";
import MiddleSection from "./MiddleSection/MiddleSection";

function Main() {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.productData);
  console.warn("data in main component", data);

  useEffect(() => {
    dispatch(productList());
  }, []);
  return (
    <>
      <BannerCarousel />
      <MiddleSection />
    </>
  );
}

export default Main;
