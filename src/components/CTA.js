import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between  flex-col flex items-center gap-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">
          Ready when you are
        </h2>
        <p className="text-center">
          Say goodbye to paper cards and say hello to your new digital business
          card
        </p>

        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center  w-full ">
          <div className="rounded-md shadow">
            <Link to="/signup">
              <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-400 hover:bg-purple-300 md:py-4 md:text-lg md:px-10 cursor-pointer">
                Create Card
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
