export default function FormDescription(props) {
  return (
    <div className="md:col-span-1">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {props.formName}
        </h3>
        <p className="mt-1 text-sm text-gray-600">{props.formDescription}</p>
      </div>
    </div>
  );
}
