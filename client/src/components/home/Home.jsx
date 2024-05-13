import "./Home.css";
// import {BsThreeDotsVertical} from "react-icons/bs"

import BannerPage from "./banner/BannerPage";
import TopPicks from "../../pages/topics/TopPicks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../redux/features/productSlice";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  const { products, loading, error } = useSelector((state) => state.product);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="font-sans">
        <BannerPage />
      </div>

      <div className="container mx-auto py-8">
        {loading ? (

            <div className='d-flex justify-content-center align-items-center' style={{ height: "85vh" }}>
              <Spinner animation="border" variant="danger" /> &nbsp;&nbsp; Loading .....
            </div>
          
          
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products?.map((product) => (
              <TopPicks key={product._id} product={product} />
            ))}{" "}
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
