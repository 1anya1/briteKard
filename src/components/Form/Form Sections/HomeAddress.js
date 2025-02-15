import FormDescription from "../Input Styles/FormDescription";
import FormInput from "../Input Styles/FormInput";
import { homeAddressInputs } from "../Form Data/FormData";

export default function HomeAddress(props) {
  const formName = "Home Address";

  // const [country, setCountry] = useState("");

  return (
    <div className=" drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-[1800px] m-auto">
      <div className="p-4 md:grid md:grid-cols-3 md:gap-3  sm:p-8">
        <FormDescription formName={formName} />
        {homeAddressInputs.map((el, idx) => (
          <FormInput
            key={idx}
            label={el.label}
            type={el.type}
            // id={`${el.id[0]}.${el.id[1]}`}
            id={el.id}
            // placeholder={el.placeholder}
            value={props.userInputs[el.value[0]][el.value[1]]}
            change={props.handleChange}
          />
        ))}

        
      </div>
    </div>
  );
}
