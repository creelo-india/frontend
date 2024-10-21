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
      {/* <div>
        <div>
          <button onClick={() => dispatch(emptyCart())}>Empty Cart</button>
        </div>
        <div className="product-container">
          {data.map((item) => (
            <div className="product-item">
              <img src={item.image} alt="" />
              <div>title : {item.title} </div>
           
              <div>Price : {item.views} </div>
             
              <div>
                <button onClick={() => dispatch(addToCart(item))}>
                  Add to Cart
                </button>
                <button onClick={() => dispatch(removeToCart(item.id))}>
                  Remove to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <MiddleSection />
    </>
  );
}

export default Main;
