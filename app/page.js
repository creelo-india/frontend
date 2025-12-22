"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productList } from "../src/redux/productAction";
import BannerCarousel from "../src/components/BannerCarousel/BannerCarousel";
import MiddleSection from "../src/components/MiddleSection/MiddleSection";

export default function HomePage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productData);
  console.warn("data in main component", data);

  useEffect(() => {
    dispatch(productList());
  }, [dispatch]);

  return (
    <>
      <BannerCarousel />
      <MiddleSection />
    </>
  );
}
