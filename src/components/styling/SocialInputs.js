export default function SocialInputs(props) {
  return (
    <div className="px-4 py-5 bg-white sm:p-6">
      {props.site.map((title) => {
        console.log(title);
        return (
          <div className="grid gap-6">
            <div className="col-span-2 sm:col-span-2">
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                {title.title}
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  http://
                </span>
                <input
                  type="text"
                  name="company-website"
                  id="company-website"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="www.example.com"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
