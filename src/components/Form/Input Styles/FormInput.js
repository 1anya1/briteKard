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
        type={ props.hidden  ? 'password' : props.type}
        name={props.id}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.change(e)}
        className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md  ${
          props.error
            ? "border-red focus:ring-red focus:border-red "
            : "border-gray-300 focus:ring-gray-500 focus:border-gray-500 "
        }`}
        required={props.required}
      />
      {props.error && (
        <p className="text-red text-xs italic pt-1">{props.error}</p>
      )}
    </div>
  );
}
