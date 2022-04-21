import FormDescription from "../Input Styles/FormDescription";
export default function CoverPhoto(props) {
  const formName = "Background Image";
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
        let type = file["type"];
        props.imageConvert(base64URL, type, "logo");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-white mb-5 max-w-4xl m-auto">
      <div className=" p-4  sm:p-8">
        <label className="block text-sm font-medium text-gray-700">
          <FormDescription formName={formName} />
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md max-w-md m-auto">
          <div className="space-y-1 text-center">
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
            <div className=" text-sm text-gray-600 self-center">
              <label
                htmlFor="logo"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span className="text-center">Upload a file</span>
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
