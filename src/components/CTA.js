/* This example requires Tailwind CSS v2.0+ */
export default function CTA(props) {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Business Card for the Digital Age</span>
          <span className="block text-gray-600">Get your card today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
              Log In
            </div>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a href="#feature-benefits">
              <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50">
                Sign Up
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
