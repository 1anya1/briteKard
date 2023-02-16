import CTA from "./CTA";
import "../images/home.svg";

import Benefits from "./Benefits";
import Lottie from "lottie-react";
import qrCode from "../images/lottie/qrcode.json";
import { Link } from "react-router-dom";

export default function Home(props) {


  return (
    <>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-0  bg-white  lg:max-w-2xl lg:w-full lg:pb-24 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    Virtual Business Cards
                  </span>
                  <span className="block text-purple-400 xl:inline">
                    {" Made Easy "}
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-lg lg:max-w-md  sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Unleash the power of networking with our virtual business
                  cards. Empowering your digital presence one click at a time.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/signup">
                      <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 md:py-4 md:text-lg md:px-10 cursor-pointer">
                        Get started
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 h-full md:h-600 lg:h-full">
          <Lottie
            animationData={qrCode}
            loop={true}
            style={{ height: "inherit" }}
          />
        </div>
      </div>

      <Benefits />
      <CTA />
    </>
  );
}
