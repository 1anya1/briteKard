export default function FormDescription(props) {
  return (
    <div className="md:col-span-1 pb-5 md:pb-0 flex h-max">
      <p className="text-lg leading-6 text-gray-800 font-bold">
        {props.formName}
      </p>
    </div>
  );
}
