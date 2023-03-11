import FormDescription from "../Input Styles/FormDescription";
import FormInput from "../Input Styles/FormInput";
import { personalDataInputs } from "../Form Data/FormData";
import ProfileImageInputs from "../Input Styles/ProfileImageInput";
import URLInputs from "../Input Styles/URLInputs";

export default function PersonalInfo(props) {
  const formName = "Personal Info";
  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-[1800px] m-auto">
      <div className=" p-4 md:grid md:grid-cols-3 md:gap-3 sm:p-8">
        <FormDescription formName={formName} />
        <ProfileImageInputs
          handleImageChange={props.handleImageChange}
          image={props.userInputs.photo}
        />
        {personalDataInputs.map((el, idx) => {
          if (el.type === "url")
            return (
              <URLInputs
                key={idx}
                label={el.label}
                type={el.type}
                id={el.id}
                value={props.userInputs[el.id]}
                change={props.handleChange}
              />
            );

          if (el.id === "cellPhone") {
            return (
              <FormInput
                key={idx}
                label={el.label}
                type={el.type}
                id={el.id}
                value={props.userInputs[el.id]}
                change={props.handleChange}
                
              />
            );
          }
          if (el.id === "firstName") {
            return (
              <FormInput
                key={idx}
                label={el.label}
                type={el.type}
                id={el.id}
                value={props.userInputs[el.id]}
                change={props.handleChange}
              />
            );
          }
          if (el.id === "note") {
            return (
              <div className="col-start-2 col-span-2 pb-4" key={idx}>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    id="note"
                    name="note"
                    rows={3}
                    className="shadow-sm focus:ring-gray-600 focus:border-gray-600 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    value={props.userInputs[el.id]}
                    onChange={(e) => props.handleChange(e)}
                  />
                </div>
              </div>
            );
          } else {
            return (
              <FormInput
                key={idx}
                label={el.label}
                type={el.type}
                id={el.id}
                value={props.userInputs[el.id]}
                change={props.handleChange}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
