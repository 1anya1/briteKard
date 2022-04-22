import { UserIcon } from "@heroicons/react/solid";
export default function DisplayPersonal(props) {
  function removeHttp(url) {
    return url.replace(/^https?:\/\//, "");
  }
  function formatUSNumber(entry) {
    const match = entry
      .replace(/\D+/g, "")
      .replace(/^1/, "")
      .match(/([^\d]*\d[^\d]*){1,10}$/)[0];
    const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
    const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : "";
    const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : "";
    return `${part1}${part2}${part3}`;
  }
  return (
    <div className="drop-shadow-md mx-4 border-gray-100 border rounded-2xl  bg-white mb-5">
      <div className="mx-4 pt-4">
        <div className="flex items-center  pb-4">
          <UserIcon className="h-5 w-5 fill-gray-500 mr-2" />
          <p className="text-lg font-medium text-gray-500">Personal Info</p>
        </div>

        {props.personalTags.map((el, idx) => {
          if (el === "Home Address") {
            return (
              props.houseStreet && (
                <div key={idx}>
                  <p className="text-gray-400 text-sm  font-medium">
                    Home Address
                  </p>
                  <p className="text-gray-700 text-base pb-4 font-medium capitalize ">
                    {props.houseStreet} <br></br>
                    {props.houseCity} {props.houseState}
                    <br></br>
                    {props.housezip}
                  </p>
                </div>
              )
            );
          } else {
            return (
              props.personalInfo[idx] && (
                <div key={idx}>
                  <p className="text-gray-400 text-sm  font-medium">{el}</p>
                  {el === "Phone Number" && (
                    <a href={`tel:+1${props.personalInfo[idx]}`}>
                      <p className="text-gray-700 text-base pb-4 font-medium">
                        {formatUSNumber(props.personalInfo[idx])}
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
                      <p className="text-gray-700 text-base pb-4 font-medium">
                        {removeHttp(props.personalInfo[idx])}
                      </p>
                    </a>
                  )}
                  {el === "Name" && (
                    <p className="text-gray-700 text-base pb-4 font-medium">
                      {props.personalInfo[idx]}
                    </p>
                  )}

                  {idx !== props.personalTags.length - 1 && (
                    <div className="bg-gray-200 h-px w-full mb-4"></div>
                  )}
                </div>
              )
            );
          }
        })}
      </div>
    </div>
  );
}
