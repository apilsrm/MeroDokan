import AppStore from "../../assest/appstore.png"
import GooglePay from "../../assest/googleplay.png"
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { SiFacebook, SiTwitter, SiInstagram } from "react-icons/si";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className=" flex flex-wrap font-sans bg-gray-200 py-8">
        <div className="container mx-auto flex flex-wrap ">
          <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-8">
            <h2 className="text-gray-600 text-lg font-semibold mb-4">
              Inside Deals and Offers !!
            </h2>
            <div className="flex flex-col">
              <Link>
                <div className="mb-2">
                  <img
                    src={GooglePay}
                    alt="Google Pay"
                    className="h-8 md:h-12 inline rounded-md shadow-md"
                  />
                </div>
              </Link>
              <Link>
                <div>
                  <img
                    src={AppStore}
                    alt="App Store"
                    className="h-8 md:h-12 inline rounded-md shadow-md"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-8">
            <h2 className="text-gray-600 text-lg font-semibold mb-4">Links</h2>
            <ul className="text-gray-600">
              <li className="mb-2">
                <Link to="/about" className="no-underline hover:text-orange-400">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <a href="/contact"  target="_blank" className="no-underline hover:text-orange-400">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <Link to="" className="no-underline hover:text-orange-400">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link to="" className="no-underline hover:text-orange-400">
                  {`FAQ'S`}
                </Link>
              </li>
              <li>
                <Link to="" className="no-underline hover:text-orange-400">
                  Hiring
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-8">
            <h2 className="text-gray-600 text-lg font-semibold mb-4">
              Policies
            </h2>
            <ul className="text-gray-600">
              <li className="mb-2 ">
                <Link to="" className="no-underline hover:text-orange-400 text-gray-400">
                  Terms and Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link to="" className="no-underline hover:text-orange-400">
                  Return Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="" className="no-underline hover:text-orange-400">
                  Data Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="" className="no-underline hover:text-orange-400">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="" className="no-underline hover:text-orange-400">
                  G-Cash Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-8">
            <h2 className="text-gray-600 text-lg font-semibold mb-4">
              Contact Us
            </h2>
            <ul className="text-gray-600 ">
              <Link to="" className="no-underline text-gray-400">
                <li className="mb-2 flex items-center">
                  <FaPhone className="mr-2" />
                  <span>123-456-7890/9861315260</span>
                </li>
              </Link>
              <Link to="" className="no-underline">
                <li className="mb-2 flex items-center ">
                  <FaEnvelope className="mr-2" />
                  <span>info@example.com</span>
                </li>
              </Link>
              <li className="flex items-center ">
                <Link>
                  <SiFacebook className="mr-2 text-blue-500" />
                </Link>
                <Link>
                  <SiTwitter className="mr-2 text-blue-700" />
                </Link>
                <Link>
                  <SiInstagram className="text-red-400" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className=" flex flex-row bg-white w-100 text-gray-600 text-lg font-semibold mb-0">
          <h3>Copyright @ apil sharma</h3>
          <p className="">this si</p>
        </div>
        <p>hello</p>
      </footer>

    </>
  );
};
export default Footer;
