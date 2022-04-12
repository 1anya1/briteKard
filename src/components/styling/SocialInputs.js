export default function SocialInputs(props) {
  return (
    <div className="col-start-2 col-span-2">
      {props.site.map((title, idx) => {
        console.log(title);
        return (
          <div className=" pb-3">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              {title.title}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://
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
        );
      })}
    </div>
  );
}
