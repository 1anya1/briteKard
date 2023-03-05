import FormInput from "../Input Styles/FormInput";
import FormDescription from "../Input Styles/FormDescription";
import URLInputs from "../Input Styles/URLInputs";
import { workInfoInputs } from "../Form Data/FormData";
export default function WorkInfo(props) {
  const formName = "Work Info";

  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-[1800px] m-auto ">
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
                // placeholder={el.placeholder}
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
                // placeholder={el.placeholder}
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
                // placeholder={el.placeholder}
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
