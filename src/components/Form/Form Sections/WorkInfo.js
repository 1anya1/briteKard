import FormInput from "../Input Styles/FormInput";
import FormDescription from "../Input Styles/FormDescription";
import URLInputs from "../Input Styles/URLInputs";
export default function WorkInfo(props) {
  const formName = "Work Info";

  const inputs = [
    {
      label: "Organization Name",
      type: "text",
      id: "organization",
      placeholder: "Promotely",
    },
    {
      label: "Company Website",
      type: "text",
      id: "workUrl",
      placeholder: "www.Promotely.com",
    },
    {
      label: "Street Address",
      type: "text",
      id: "workAddress.street",
      placeholder: "123 Main Street",
    },
    {
      label: "City",
      type: "text",
      id: "workAddress.city",
      placeholder: "San Francisco",
    },
    {
      label: "State / Province",
      type: "text",
      id: "workAddress.stateProvince",
      placeholder: "California",
    },
    {
      label: "ZIP / Postal code",
      type: "text",
      id: "workAddress.postalCode",
      placeholder: "92115",
    },
    {
      label: "Work Phone",
      type: "text",
      id: "workPhone",
      placeholder: "555-555-5555",
    },
    {
      label: "Work Fax",
      type: "text",
      id: "workFax",
      placeholder: "123-123-3445",
    },
    {
      label: "Work Email",
      type: "email",
      id: "workEmail",
      placeholder: "Jane@Promotely.com",
    },
  ];
  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-white mb-5 max-w-4xl m-auto">
      <div className=" p-4 md:grid md:grid-cols-3 md:gap-3  sm:p-8">
        <FormDescription formName={formName} />

        {inputs.map((el, idx) => {
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
            id="homeAddress.postalCode"
            name="country"
            autoComplete="country-name"
            onChange={props.handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
