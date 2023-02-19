import { getBase64, checkFileSize } from "../Form Functions/imageFunctions";
import { useState } from "react";

export default function ProfileImageInputs(props) {


  const [image, setImage] = useState("");
  const [error, setError] = useState(false);

  //Handiling image input
  //Setting to max 2gb of data transfer
  // converting to base 64URL and setting to image
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
          props.handleImageChange(base64URL, "profile");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError(true);
      setImage(null);
      props.handleImageChange("", "profile");
    }
  }

  return (
    <div className="col-start-2 col-span-2 pb-4">
      <div className="col-start-2 col-span-2">
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <div className="mt-1 flex items-center">
          <span className="inline-block h-20 w-20 lg:h-36  sm:w-28 sm:h-28 lg:w-36 rounded-full overflow-hidden bg-gray-100 bg-cover">
            {image ? (
              <img
                src={image}
                alt="profile"
                className="object-cover h-20 w-20 lg:h-36  sm:w-28 sm:h-28 lg:w-36 "
              />
            ) : (
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </span>
          <label
            htmlFor="file-upload"
            className="ml-5 relative cursor-pointer bg-gray-500 rounded-2xl py-2 px-3 border border-gray-500  text-white hover:opacity-70 focus:ring-gray-500 focus:border-gray-500"
          >
            <p className="leading-relaxed text-xs font-medium"> File Input</p>

            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handleFileInputChange(e)}
              className="sr-only"
            />
          </label>
        </div>
        {error && (
          <span className="text-xs text-red" id="logo">
            Your file is too large. Please make sure the image is 2MG or less.
          </span>
        )}
      </div>
    </div>
  );
}
