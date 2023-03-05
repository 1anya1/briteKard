export default function URLInputs(props) {
  return (
    <div className="col-start-2 col-span-2 pb-4">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
          https://
        </span>
        <input
          type="text"
          name={props.id}
          id={props.id}
          value={props.value}
          onChange={(e) => props.change(e)}
          className="focus:ring-gray-500 focus:border-gray-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 h-12"
          // placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}
