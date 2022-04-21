import FormDescription from "../Input Styles/FormDescription";
import FormInput from "../Input Styles/FormInput";

export default function HomeAddress(props) {
  const formName = "Home Address";

  // const [country, setCountry] = useState("");

  const inputs = [
    {
      label: "Street Address",
      type: "text",
      id: "homeAddress.street",
      placeholder: "123 Main Street",
    },
    {
      label: "City",
      type: "text",
      id: "homeAddress.city",
      placeholder: "San Francisco",
    },
    {
      label: "State / Province",
      type: "text",
      id: "homeAddress.stateProvince",
      placeholder: "California",
    },
    {
      label: "ZIP / Postal code",
      type: "text",
      id: "homeAddress.postalCode",
      placeholder: "California",
    },
  ];

  return (
    <div className=" drop-shadow-md  border-gray-100 border rounded-2xl bg-white mb-5 max-w-4xl m-auto">
      <div className="p-4 md:grid md:grid-cols-3 md:gap-3  sm:p-8">
        <FormDescription formName={formName} />
        {inputs.map((el, idx) => (
          <FormInput
            key={idx}
            label={el.label}
            type={el.type}
            id={el.id}
            placeholder={el.placeholder}
            value={props.userInputs[el.id]}
            change={props.handleChange}
          />
        ))}

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
