import FormDescription from "../styling/FormDescription";
export default function HomeAddress() {
  const formName = "Home Address";
  const formDescription = "this is my form description";
  return (
    <div className="md:grid md:grid-cols-3 md:gap-3 pb-8">
      <FormDescription formName={formName} formDescription={formDescription} />
      <div className="col-start-2 col-span-2">
        <label
          htmlFor="street-address"
          className="block text-sm font-medium text-gray-700"
        >
          Street address
        </label>
        <input
          type="text"
          name="street-address"
          id="street-address"
          autoComplete="street-address"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-start-2 col-span-2">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          autoComplete="address-level2"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-start-2 col-span-2">
        <label
          htmlFor="region"
          className="block text-sm font-medium text-gray-700"
        >
          State / Province
        </label>
        <input
          type="text"
          name="region"
          id="region"
          autoComplete="address-level1"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-start-2 col-span-2">
        <label
          htmlFor="postal-code"
          className="block text-sm font-medium text-gray-700"
        >
          ZIP / Postal code
        </label>
        <input
          type="text"
          name="postal-code"
          id="postal-code"
          autoComplete="postal-code"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="col-start-2 col-span-2">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <select
          id="country"
          name="country"
          autoComplete="country-name"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>
      </div>
    </div>
  );
}
