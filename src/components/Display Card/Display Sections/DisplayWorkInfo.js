import { BriefcaseIcon } from "@heroicons/react/solid";
export default function DisplayWorkInfo(props) {
  const workAddressTags = [
    "Company Name",
    "Company Number",
    "Company Email",
    "Company Website",
  ];
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
  function removeHttp(url) {
    return url.replace(/^https?:\/\//, "");
  }
  const{workStreet, workCity, workState,workZip, workAddressData} = props
  const data = ()=>{
    const length = workAddressData.some(el=>el.length>0)
    return length ||  workStreet || workCity|| workState ||workZip
  }

  if (data()) {
    return (
      <div className="drop-shadow-md mx-4 border-gray-100 border rounded-2xl  bg-white mb-5">
        <div className="mx-4 pt-4">
          <div className="flex items-center  pb-4">
            <BriefcaseIcon className="h-5 w-5 fill-gray-500 mr-2" />
            <p className="text-lg font-medium text-gray-500">Company Info</p>
          </div>
          {workAddressTags.map((title, idx) => {
            const currSectionData = props.workAddressData[idx];
            return (
              currSectionData && (
                <div key={idx}>
                  <p className="text-gray-400 text-sm  font-medium">{title}</p>
                  {title === "Company Number" && (
                    <a href={`tel:+1${currSectionData}`}>
                      <p className="text-gray-700 text-base pb-4 font-medium">
                        {formatUSNumber(props.workAddressData[idx])}
                      </p>
                    </a>
                  )}
                  {title === "Company Email" && (
                    <a href={`mailto:${props.workAddressData[idx]}`}>
                      <p className="text-gray-700 text-base pb-4 font-medium">
                        {props.workAddressData[idx]}
                      </p>
                    </a>
                  )}
                  {title === "Company Website" && (
                    <a
                      href={`https://${currSectionData}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-gray-700 text-base pb-4 font-medium">
                        {removeHttp(props.workAddressData[idx])}
                      </p>
                    </a>
                  )}
                  {title !== "Company Website" &&
                    title !== "Company Email" &&
                    title !== "Company Number" && (
                      <p className="text-gray-700 text-base pb-4 font-medium">
                        {props.workAddressData[idx]}
                      </p>
                    )}

                  <div className="bg-gray-200 h-px w-full mb-4"></div>
                </div>
              )
            );
          })}
          {props.workStreet && (
            <div>
              <p className="text-gray-400 text-sm  font-medium">
                Company Address
              </p>
              <p className="text-gray-700 text-base pb-4 font-medium capitalize ">
                {props.workStreet} <br></br>
                {props.workCity}, {props.workState}
                <br></br>
                {props.workzip}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
