export default function FormDescription(props) {
  return (
    <div className="md:col-span-1 pb-5 md:pb-0 flex">
      <h3 className="text-lg font-medium leading-6 text-gray-700">
        {props.formName}
      </h3>
    </div>
  );
}
