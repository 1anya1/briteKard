import {
  ShareLogo,
  UpdateLogo,
  MultiLogos,
  CardLogo,
  QRLogo,
  DesignLogo,
} from "../images/icons/All-Logos";
import { twMerge } from "tailwind-merge";

export default function Benefits() {
  return (
    <div className="bg-gray-100 pt-14 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
        <h2 className="text-3xl font-extrabold  text-center tracking-tight text-gray-900 sm:text-4xl mb-10">
          Business Card for the Digital Age
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <div className="group  p-5 flex flex-col items-center border-solid  border-0  bg-white rounded-lg border-gray-500 shadow-gray shadow-lg">
            <UpdateLogo />
            <h5 className="font-semibold text-xl pt-3 pb-3 text-gray-900">
              Update Anytime
            </h5>
            <p className="pt-1 text-gray-900 text-center">
              Updates to contact information is easily made to digital business
              cards, saving time and hassle.
            </p>
          </div>
          <div className="group  p-5 flex flex-col items-center border-solid  border-0  bg-white rounded-lg border-gray-500 shadow-gray shadow-lg">
            <ShareLogo />
            <h5 className="font-semibold text-xl pt-3 pb-3 text-gray-900">
              Unlimited Sharing
            </h5>
            <p className="pt-1 text-gray-900 text-center">
              Easily shared anywhere in the world, breaking down geographical
              barriers and expanding reach.
            </p>
          </div>
          <div className="group  p-5 flex flex-col items-center border-solid  border-0  bg-white rounded-lg border-gray-500 shadow-gray shadow-lg">
            <DesignLogo />
            <h5 className="font-semibold text-xl pt-3 pb-3 text-gray-900">
              Custom Design
            </h5>
            <p className="pt-1 text-gray-900 text-center">
              Customized fields and information, ensuring that all important
              contact details are included.
            </p>
          </div>
          <div className="group  p-5 flex flex-col items-center border-solid  border-0  bg-white rounded-lg border-gray-500 shadow-gray shadow-lg">
            <QRLogo />
            <h5 className="font-semibold text-xl pt-3 pb-3 text-gray-900">
              Quick Scan
            </h5>
            <p className="pt-1 text-gray-900 text-center">
              Cards are easily shared through a QR code scan creating
              contactless exchange of information.
            </p>
          </div>
          <div className="group  p-5 flex flex-col items-center border-solid  border-0  bg-white rounded-lg border-gray-500 shadow-gray shadow-lg">
            <CardLogo />
            <h5 className="font-semibold text-xl pt-3 pb-3  text-gray-900">
              All In One
            </h5>
            <p className="pt-1 text-gray-900 text-center">
              Include contact information, as well as links to social media
              profiles, websites, and more.
            </p>
          </div>
          <div className="group  p-5 flex flex-col items-center border-solid  border-0  bg-white rounded-lg border-gray-500 shadow-gray shadow-lg">
            <MultiLogos />
            <h5 className="font-semibold text-xl pt-3 pb-3 text-gray-900">
              Custom Cards*
            </h5>
            <p className="pt-1 text-gray-900 text-center">
              Create multiple cards for different purposes or business ventures.
            </p>
          </div>
        </div>
      </div>
      {/* <CardFlow /> */}
    </div>
  );
}
