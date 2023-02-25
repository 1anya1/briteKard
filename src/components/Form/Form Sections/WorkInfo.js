import FormInput from "../Input Styles/FormInput";
import FormDescription from "../Input Styles/FormDescription";
import URLInputs from "../Input Styles/URLInputs";
import { workInfoInputs } from "../Form Data/FormData";
export default function WorkInfo(props) {
  const formName = "Work Info";

  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-[1800px] m-auto">
      <div className=" p-4 md:grid md:grid-cols-3 md:gap-3  sm:p-8">
        <FormDescription formName={formName} />

        {workInfoInputs.map((el, idx) => {
          if (el.id === "workUrl") {
            return (
              <URLInputs
                key={idx}
                label={el.label}
                type={el.type}
                id={el.id}
                placeholder={el.placeholder}
                value={props.userInputs[el.id]}
                change={props.handleChange}
              />
            );
          }
          if (el.value) {
            return (
              <FormInput
                key={idx}
                label={el.label}
                type={el.type}
                id={el.id}
                placeholder={el.placeholder}
                value={props.userInputs[el.value[0]][el.value[1]]}
                change={props.handleChange}
              />
            );
          } else {
            return (
              <FormInput
                key={idx}
                label={el.label}
                type={el.type}
                id={el.id}
                placeholder={el.placeholder}
                value={props.userInputs[el.id]}
                change={props.handleChange}
              />
            );
          }
        })}
        <div className="col-start-2 col-span-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="workAddress.countryRegion"
            name="country"
            autoComplete="country-name"
            onChange={props.handleChange}
            value={props.userInputs["workAddress"]["countryRegion"]}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white  shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </div>
    </div>
  );
}
