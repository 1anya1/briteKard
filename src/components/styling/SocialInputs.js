export default function SocialInputs(props) {
  return props.site.map((title, idx) => {
    return (
      <div className="col-start-2 col-span-2 pb-4" key={idx}>
        <label
          htmlFor="company-website"
          className="block text-sm font-medium text-gray-700"
        >
          {title.title}
        </label>
        <div className="mt-1 flex rounded-2xl shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            https://
          </span>
          <input
            type="text"
            name="company-website"
            id="company-website"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-2xl sm:text-sm border-gray-300"
            placeholder="www.example.com"
          />
        </div>
      </div>
    );
  });
}
