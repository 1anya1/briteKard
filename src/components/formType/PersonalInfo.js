import FormDescription from "../styling/FormDescription";
import FormInput from "./FormInput";
import { personalDataInputs } from "../FormData";
import ProfileImageInputs from "./ProfileImageInput";
import URLInputs from "./URLInputs";

export default function PersonalInfo(props) {
  const formName = "Personal Info";
  const formDescription = "this is my form description";

  return (
    <div className="md:grid md:grid-cols-3 md:gap-3 py-5">
      <FormDescription formName={formName} formDescription={formDescription} />
      <ProfileImageInputs
        imageConvert={props.imageConvert}
        imageData={props.userInputs.photo}
      />
      {personalDataInputs.map((el, idx) => {
        if (el.type === "url")
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
        else {
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
      <div className="col-start-2 col-span-2 pb-4">
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-700"
        >
          About
        </label>
        <div className="mt-1">
          <textarea
            id="note"
            name="about"
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-2xl"
            placeholder="Write something about yourself"
            defaultValue={""}
            onChange={(e) => props.handleChange(e)}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Brief description for your profile. URLs are hyperlinked.
        </p>
      </div>
    </div>
  );
}
