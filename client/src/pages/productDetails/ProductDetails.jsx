import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleProducts } from "../../redux/features/productSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/layout/loader/Loader";
import ReactStar from "react-rating-stars-component";

const ProductDetails = () => {
  const { product, loading, error } = useSelector((state) => state.product);
  console.log(product);

  const option = {
    edit: false,
    isHalf: true,
    value: product.ratings,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "#ffd700",
    size: window.innerWidth < 600 ? 12 : 36,
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(singleProducts(id));
  }, [dispatch, id, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto md:flex">
          <div className="md:w-1/2 relative">
            <img src={product?.productImg?.url} alt={product.productName} />
          </div>

          <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
            <h2>{product?.productName}</h2>

            {/* for ratings */}
            <div className="flex items-center mb-2">
              <div className="mr-2">
                <span className="text-yellow-500">
                  <ReactStar {...option} />
                </span>
              </div>
              <div>
                <span className="text-gray-600">(customer reviews)</span>
              </div>
            </div>

            <h2>RS.{product?.price}</h2>

            {/* isInStock  */}

            {product && (
              <p
                className={
                  product.isInStock
                    ? "bg-green-500 w-16 text-white font-sans"
                    : "bg-red-500  text-white w-16 font-sans"
                }
              >
                <span>{product.isInStock ? "In Stock" : "Out of Stock"}</span>
              </p>
            )}

            <span>{product.description}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
