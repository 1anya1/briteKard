// import { getBase64, checkFileSize } from "../Form Functions/imageFunctions";
import { useState } from "react";
import Compress from "react-image-file-resizer";

export default function ProfileImageInputs(props) {



  const [image, setImage] = useState(props.image? props.image : '');
  const [error, setError] = useState(false);

 
  function handleFileInputChange(e) {
    const file = e.target.files[0];
    Compress.imageFileResizer(
      file, // the file from input
      500, // width
      500, // height
      "PNG", // compress format WEBP, JPEG, PNG
      70, // quality
      0, // rotation
      (uri) => {
        if (uri) {
          setImage(uri);
          setError(false);
          props.handleImageChange(uri, "profile");
        } else {
          setImage(null);
          setError(true);
          props.handleImageChange("", "profile");
        }
   
      },
      "base64" // blob or base64 default base64
    );
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
            className="ml-5 relative cursor-pointer bg-gray-500 rounded-md py-2 px-3 border border-gray-500  text-white hover:opacity-70 focus:ring-gray-500 focus:border-gray-500"
          >
            <p className="leading-relaxed text-xs font-medium">Upload Photo</p>

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
            Something went wrong. Please try again.
          </span>
        )}
      </div>
    </div>
  );
}
