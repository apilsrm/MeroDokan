
import Spinner from "react-bootstrap/esm/Spinner"
import pageNotFound from "../../assest/PageNotFound.png"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
// import button from "react-bootstrap"
const PageNotFound = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <div className=" grid place-content-center text-center text-black ">

      <img className="items-center " src={pageNotFound} alt="PageNotFound"/>
      {`OOP's`} <span>page not found</span>
      <span>Please check url and try again</span>
      <Link to="/">
      <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading && <Spinner animation="border" size="sm" />}Home
            </button>
      </Link>
    </div>
  )
}

export default PageNotFound

