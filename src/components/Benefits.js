import {
  ShareLogo,
  UpdateLogo,
  MultiLogos,
  CardLogo,
  QRLogo,
  DesignLogo,
} from "../images/icons/All-Logos";
export default function Benefits() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
        {/* <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl text-center pb-8">
          Fantastic Features
        </h2> */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <div className=" p-4 flex flex-col items-center">
            <UpdateLogo />
            <h5 className="font-semibold text-xl pt-2 text-gray-700">
              Update Anytime
            </h5>
            <p className="pt-1 text-gray-700 text-center">
              This section explanins this benefit quikly. Why its important etc.{" "}
            </p>
          </div>
          <div className=" p-4 flex flex-col items-center">
            <ShareLogo />
            <h5 className="font-semibold text-xl pt-2 text-gray-700">
              Unlimited Sharing
            </h5>
            <p className="pt-1 text-gray-700 text-center">
              This section explanins this benefit quikly. Why its important etc.{" "}
            </p>
          </div>
          <div className=" p-4 flex flex-col items-center">
            <DesignLogo />
            <h5 className="font-semibold text-xl pt-2 text-gray-700">
              Custom Design
            </h5>
            <p className="pt-1 text-gray-700 text-center">
              This section explanins this benefit quikly. Why its important etc.{" "}
            </p>
          </div>
          <div className=" p-4 flex flex-col items-center">
            <QRLogo />
            <h5 className="font-semibold text-xl pt-2 text-gray-700">
              Quick Scan
            </h5>
            <p className="pt-1 text-gray-700 text-center">
              This section explanins this benefit quikly. Why its important etc.{" "}
            </p>
          </div>
          <div className=" p-4 flex flex-col items-center">
            <CardLogo />
            <h5 className="font-semibold text-xl pt-2 text-gray-700">
              All In One
            </h5>
            <p className="pt-1 text-gray-700 text-center">
              This section explanins this benefit quikly. Why its important etc.{" "}
            </p>
          </div>
          <div className=" p-4 flex flex-col items-center">
            <MultiLogos />
            <h5 className="font-semibold text-xl pt-2 text-gray-700">
              Create Unlimited Cards*
            </h5>
            <p className="pt-1 text-gray-700 text-center">
              This section explanins this benefit quikly. Why its important etc.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
