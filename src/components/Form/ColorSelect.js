import { useEffect, useState } from "react";
import { PhoneIcon } from "@heroicons/react/solid";

// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import FormDescription from "./Input Styles/FormDescription";
import Colorful from "@uiw/react-color-colorful";

export default function ColorPicker(props) {
  console.log(props);
  const { setUserInputs, userInputs } = props;
  const [hex, setHex] = useState(
    userInputs.colorScheme.brandColor
      ? userInputs.colorScheme.brandColor
      : "#737373"
  );
  const [text, setText] = useState(
    userInputs.colorScheme.textColor
      ? userInputs.colorScheme.textColor
      : "#ffffff"
  );

  useEffect(() => {
    console.log("in here");
    setUserInputs((prevVal) => ({
      ...prevVal,
      colorScheme: { brandColor: hex, textColor: text },
    }));
  }, [hex, setUserInputs, text]);

  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-[1800px] m-auto">
      <div className=" p-4 md:grid md:grid-cols-3 md:gap-3 sm:p-8">
        <FormDescription formName={"Choose A Theme"} />
        <div className="col-span-2">
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Brand Color
            </p>
            <div className=" md:max-w-[400px]">
              <Colorful
                style={{ width: "100%" }}
                color={hex}
                radius="1000px"
                onChange={(color) => {
                  setHex(color.hexa);
                }}
              />
            </div>
          </div>
          <div className="pt-4">
            <p className="block text-sm font-medium text-gray-700 mb-3">
              Font Color
            </p>
            <div className="flex flex-row space-x-4">
              <div
                onClick={() => setText("#ffffff")}
                className={`h-12 w-12 border border-gray-900 bg-white rounded-md ${
                  text === "#ffffff"
                    ? " ring-4 ring-offset-2 ring-gray-400"
                    : ""
                }`}
              ></div>
              <div
                onClick={() => setText("#171717")}
                className={`h-12 w-12 border border-gray-900 bg-gray-900 rounded-md ${
                  text === "#171717"
                    ? " ring-4 ring-offset-2 ring-gray-400"
                    : ""
                }`}
              ></div>
            </div>
          </div>

          
          <p className="block text-sm font-medium text-gray-700 mb-2 mt-6">
             Preview
            </p>
          <div className="flex flex-row align-center justify-between md:max-w-[400px]" >
      
              <div
                className="h-12 w-[calc(100%_-_60px)]  rounded-md flex items-center justify-center  hover:opacity-75"
                style={{ backgroundColor: hex }}
              >
                <p
                  className={` text-lg text-center font-bold`}
                  style={{ color: text }}
                >
                  Share Card
                </p>
              </div>
   

            <div
              className="h-12 w-12 rounded-full  flex justify-center items-center  hover:opacity-75"
              style={{
                backgroundColor: hex,
              }}
            >
              <PhoneIcon className="  h-7 w-7" style={{ fill: text }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
