import FormDescription from "../styling/FormDescription";

export default function BasicInfo(props) {
  const formName = "BasicInfo";
  const formDescription = "this is my form description";
  return (
    <div className="md:grid md:grid-cols-3 md:gap-3 pb-8">
      <FormDescription formName={formName} formDescription={formDescription} />
      <div className="col-start-2 sm:col-span-2">
        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-gray-700"
        >
          First name
        </label>
        <input
          type="text"
          name="first-name"
          id="firstName"
          autoComplete="given-name"
          value={props.userInputs.firstName}
          placeholder="Jane"
          onChange={(e) => props.handleChange(e)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-start-2 col-span-2">
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-gray-700"
        >
          Last name
        </label>
        <input
          type="text"
          name="last-name"
          id="lastName"
          autoComplete="family-name"
          placeholder="Doe"
          value={props.userInputs.lastName}
          onChange={(e) => props.handleChange(e)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-start-2 col-span-2">
        <label
          htmlFor="email-address"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          type="text"
          name="email-address"
          id="email"
          autoComplete="email"
          placeholder="www.JaneDoe@gmail.com"
          value={props.userInputs.email}
          onChange={(e) => props.handleChange(e)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}
