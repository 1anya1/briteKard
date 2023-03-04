import FormDescription from "../Input Styles/FormDescription";
import FormInput from "../Input Styles/FormInput";
import { cardNameInputs } from "../Form Data/FormData";


export default function CardName(props) {
  const formName = "Card Name";
  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-[1800px] m-auto">
      
      <div className=" p-4 md:grid md:grid-cols-3 md:gap-3 sm:p-8">
        <FormDescription formName={formName} />
        {cardNameInputs.map((el, idx) => {
          return (
            <FormInput
              key={idx}
              label={el.label}
              type={el.type}
              id={el.id}
              placeholder={el.placeholder}
              value={props.userInputs[el.id]}
              change={props.handleChange}
              error={props.cardNameError ? "This name is already taken" : null}
            />
          );
        })}
      </div>
    </div>
  );
}
