import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      mobileNo:"",
      message: "",
    });
    function handleChange(e) {
      setFormData(e.target.value);
    }

  
  return (
    <div className="h-screen grid grid-cols-2 items-center ">
    <form className="bg-white flex rounded-lg h-screen ">
      <div className="flex-1 p-5 text-gray-700 ">
        <h1 className="font-bold text-3xl p-2">Contact us</h1>
        <div className="mt-6">
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="name">
              Name
            </label>
            <input
              className="border-2 border-black p-2 rounded-md w-full focus:border-black focus:ring-black"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-black p-2 rounded-md w-full focus:border-black focus:ring-black"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="number">
              Phone Number
            </label>
            <input
              className="border-2 border-black p-2 rounded-md w-full focus:border-black focus:ring-black"
              type="number"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="name">
              Message
            </label>
            <textarea
              className="border-2 border-black p-2 rounded-md w-full focus:border-black focus:ring-black"
              type="text"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
            />
          </div>
        </div>
        <button
          className="text-white text-sm bg-blue-500 hover:bg-gray-500 py-2 px-2 rounded-md w-auto focus:border-black hover:whi-400"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
    <div className="pb-5 relative ">
      <div>
        <h1 className="py-2 text-3xl font-bold">CONTACT DETAILS</h1>
        <p>
          <strong>Email:</strong> info@merodokan.com
        </p>
        <p>
          <strong>Address:</strong> Balkumari, Lalitpur, Nepal
        </p>
        <p>
          <strong>Phone:</strong> +977-010000000 / 9800000000
        </p>
      </div>
      <iframe 
            title="myFrame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1766.7472224419478!2d85.33818846941982!3d27.671109053823017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e5f9cfaed7%3A0xec6e0fae0c6cb7b4!2sKathford%20College%20of%20Engineering%20%26%20Management!5e0!3m2!1sne!2snp!4v1689841206860!5m2!1sne!2snp" 
            width="100%" 
            height="450" 
            style={{border:0}} 
            allowfullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
    </div>
  </div>
);
}
// CONTACT DETAILS
// Email: info@gyapu.com
// Address: Bhanimandal, Lalitpur, Nepal
// Website:  https://www.gyapu.com
// Phone: +977-015970362 / 9801855549
// GYAPU Marketplace Pvt. Ltd.
export default Contact;




