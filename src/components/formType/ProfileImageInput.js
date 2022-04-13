export default function ProfileImageInputs(props) {
  function getBase64(file) {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  }
  function handleFileInputChange(e) {
    const file = e.target.files[0];
    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        const base64URL = file["base64"];
        const type = file["type"];
        props.imageConvert(base64URL, type);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const image = props.imageData.url;
  console.log(image);
  return (
    <div className="col-start-2 col-span-2 pb-4">
      <div className="col-start-2 col-span-2">
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <div className="mt-1 flex items-center">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            {image ? (
              <img
                src={image}
                alt="profile photo"
                className="bg-cover bg-center h-full"
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
            className="ml-5 relative cursor-pointer bg-blue-400 rounded-2xl py-2 px-3 border border-blue-400 font-xs text-white hover:opacity-70 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            File Input
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileInputChange}
              className="sr-only"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
