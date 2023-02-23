import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-white" styles={{paddingBottom: "env(safe-area-inset-bottom)"}}>
      <div className=" max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-row gap-4 pb-6 pt-10">
          <div className="h-10 w-10 bg-gray-900 rounded-full flex justify-center items-center  hover:bg-purple-400">
            <a href="https://www.facebook.com/britekard">
              <FaFacebookF size={20} fill="white" />
            </a>
          </div>
          <div className="h-10 w-10 bg-gray-900 rounded-full flex justify-center items-center  hover:bg-purple-400">
            <a href="https://www.instagram.com/britekard/">
              <FaInstagram size={20} fill="white" />
            </a>
          </div>
          <div className="h-10 w-10 bg-gray-900 rounded-full flex justify-center items-center hover:bg-purple-400">
            <a href="https://www.linkedin.com/company/britekard/">
              <FaLinkedin size={20} fill="white" />
            </a>
          </div>
        </div>

        <a
          href="mailto:britekard@gmail.com = Feedback&body = Message"
          className="pb-4 hover:text-purple-400 font-medium  text-gray-900"
        >
          Support
        </a>
        <p className="pb-10 text-white">© 2023 BriteKard</p>
      </div>
    </div>
  );
}
