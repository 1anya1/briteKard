export default function DisplayPersonal(props) {
  function removeHttp(url) {
    return url.replace(/^https?:\/\//, "");
  }

  return (
    <div className="mx-4 mb-5">
      <p className="text-lg font-medium text-gray-500 pb-3 pl-4">Personal Info</p>

      {props.personalTags.map((el, idx) => {
        if (el === "Home Address") {
          return (
            props.houseStreet && (
              <div className="drop-shadow-md  border-gray-100 border rounded-2xl  bg-white mb-4 group">
                <div className="p-4 flex items-center">
                  <div key={idx}>
                    <p className="text-gray-400 text-sm  font-medium">
                      Home Address
                    </p>
                    <p className="text-gray-700 text-base font-medium capitalize ">
                      {props.houseStreet}
                    </p>

                    <p className="text-gray-700 text-base font-medium capitalize ">
                      {props.houseCity} {props.houseState} {props.housezip}
                    </p>

                    <p className="text-gray-700 text-base font-medium capitalize ">
                      {props.houseCountry}
                    </p>
                  </div>
                </div>
              </div>
            )
          );
        } else {
          return (
            props.personalInfo[idx] && (
              <div className="drop-shadow-md  border-gray-100 border rounded-2xl  bg-white mb-4 group">
                <div className="p-4 flex items-center">
                  <div key={idx}>
                    <p className="text-gray-400 text-sm  font-medium">{el}</p>
                    {el === "Phone Number" && (
                      <a href={`tel:+1${props.personalInfo[idx]}`}>
                        <p className="text-gray-700 text-base font-medium">
                          {props.personalInfo[idx]}
                        </p>
                      </a>
                    )}
                    {el === "Email" && (
                      <a href={`mailto:${props.personalInfo[idx]}`}>
                        <p className="text-gray-700 text-base pb-4 font-medium">
                          {props.personalInfo[idx]}
                        </p>
                      </a>
                    )}
                    {el === "Personal Website" && (
                      <a
                        href={`https://${props.personalInfo[idx]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-gray-700 text-base font-medium">
                          {removeHttp(props.personalInfo[idx])}
                        </p>
                      </a>
                    )}
                    {el === "Name" && (
                      <p className="text-gray-700 text-base font-medium">
                        {props.personalInfo[idx]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          );
        }
      })}
    </div>
  );
}
