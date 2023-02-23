import FormDescription from "../Input Styles/FormDescription";
import { useState } from "react";
import { getBase64, checkFileSize } from "../Form Functions/imageFunctions";
export default function CoverPhoto(props) {
  const [image, setImage] = useState(props.logo ? props.logo : "");
  const [error, setError] = useState(false);
  const formName = "Background Image";

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    const size = checkFileSize(e.target.files[0].size);

    if (size < 2097152) {
      getBase64(file)
        .then((result) => {
          file["base64"] = result;
          const base64URL = file["base64"];
          setImage(base64URL);
          setError(false);
          props.handleImageChange(base64URL, "logo");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setImage(null);
      setError(true);
      props.handleImageChange("", "logo");
    }
  }

  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-[1800px] m-auto">
      <div className=" p-4  sm:p-8">
        <label className="block text-sm font-medium text-gray-700">
          <FormDescription formName={formName} />
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md max-w-md m-auto">
          <div className="space-y-1 text-center">
            {!image ? (
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div className=" pb-4 ">
                <img src={image} alt="uploaded" />
              </div>
            )}
            <div className=" text-sm text-gray-600 self-center">
              <label
                htmlFor="logo"
                className="relative cursor-pointer bg-white  rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:ring-gray-500 focus:border-gray-500"
              >
                <span className="text-center text-xs border py-2 px-3 mb-2  rounded-md text-gray-600  border-gray-500 hover:opacity-70 focus:ring-gray-500 focus:border-gray-500">
                  Upload a file
                </span>
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleFileInputChange(e)}
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 pt-2">PNG or JPG up to 2MB</p>
            {error && (
              <span className="text-xs text-red" id="logo">
                Your file is too large. Please make sure the image is 2MG or
                less.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
