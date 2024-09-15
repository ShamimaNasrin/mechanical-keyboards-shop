// import bg from "../../assets/images/bgkey.jpg";
import "./contact.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const ContactMain = () => {
  return (
    <section
      className="contact relative min-h-screen py-12 px-24 flex flex-col justify-center items-center bg-cover bg-center bg-zinc-900"
      // style={{ backgroundImage: "url(../../assets/images/bgkey.jpg)" }}
    >
      <div className="content max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
        <p className="text-white font-light mt-4">
          Please reach out to us if you have any questions or concerns, and we
          will try to get back to you as soon as possible. We respond within two
          business days.
        </p>
      </div>

      <div className="container w-full flex justify-center items-center mt-8 flex-wrap">
        {/* Contact Info Section */}
        <div className="contactInfo w-full lg:w-1/2 flex flex-col items-start space-y-6">
          <div className="box flex items-center">
            <div className="icon w-14 h-14 bg-white rounded-full flex justify-center items-center text-2xl">
              <FaMapMarkerAlt />
            </div>
            <div className="text ml-4 text-white">
              <h3 className="font-semibold text-cyan-500">Address</h3>
              <p>
                8653 Lalmatia Road, <br />
                Dhaka
              </p>
            </div>
          </div>

          <div className="box flex items-center">
            <div className="icon w-14 h-14 bg-white rounded-full flex justify-center items-center text-2xl">
              <FaPhone />
            </div>
            <div className="text ml-4 text-white">
              <h3 className="font-semibold text-cyan-500">Phone</h3>
              <p>865397865</p>
            </div>
          </div>

          <div className="box flex items-center">
            <div className="icon w-14 h-14 bg-white rounded-full flex justify-center items-center text-2xl">
              <IoIosMail />
            </div>
            <div className="text ml-4 text-white">
              <h3 className="font-semibold text-cyan-500">Email</h3>
              <p>lalmatia27@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contactForm w-full lg:w-2/5 bg-white p-8 shadow-lg ">
          <form>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Message
            </h2>
            <div className="inputBox relative w-full mb-6">
              <input
                type="text"
                className="w-full border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2"
                required
              />
              <span className="absolute left-0 text-gray-500 pointer-events-none text-[16px] py-[5px] px-0 my-[10px] mx-0">
                {/* <span className=""> */}
                Full Name
              </span>
            </div>
            <div className="inputBox relative w-full mb-6">
              <input
                type="text"
                className="w-full border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2"
                required
              />
              <span className="absolute left-0 text-gray-500 pointer-events-none text-[16px] py-[5px] px-0 my-[10px] mx-0">
                {/* <span className=""> */}
                Email
              </span>
            </div>
            <div className="inputBox relative w-full mb-6">
              <textarea
                className="w-full border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2"
                required
              ></textarea>
              <span className="absolute left-0 text-gray-500 pointer-events-none text-[16px] py-[5px] px-0 my-[10px] mx-0">
                {/* <span className=""> */}
                Type your message
              </span>
            </div>
            <div className="inputBox w-full">
              <input
                type="submit"
                value="Send"
                className="w-full bg-cyan-500 text-white py-3 cursor-pointer hover:bg-cyan-600 transition-all"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactMain;
