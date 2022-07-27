export default function FormInput(props) {
  return (
    <div className="col-start-2 col-span-2 pb-4">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.id}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.change(e)}
        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-2xl"
        required={props.required}
      />
    </div>
  );
}
