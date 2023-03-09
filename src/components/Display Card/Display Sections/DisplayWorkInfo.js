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
  const { workStreet, workCity, workState, workZip, workAddressData } = props;
  const data = () => {
    const length = workAddressData.some((el) => el.length > 0);
    return length || workStreet || workCity || workState || workZip;
  };

  if (data()) {
    return (
      <div className="mx-4 mb-5">
        <p className="text-lg font-bold text-gray-500 pb-3 pt-3 pl-4">Work Info</p>

        {workAddressTags.map((title, idx) => {
          const currSectionData = props.workAddressData[idx];
          return (
            currSectionData && (
              <div className="shadow  border-gray-100 border rounded-2xl  bg-white mb-4 group"  key={idx}>
                <div className="p-4 flex items-center">
                  <div key={idx}>
                    <p className="text-gray-400 text-sm  font-medium">
                      {title}
                    </p>
                    {title === "Company Number" && (
                      <a href={`tel:+1${currSectionData}`}>
                        <p className="text-gray-700 text-base  font-medium">
                          {formatUSNumber(props.workAddressData[idx])}
                        </p>
                      </a>
                    )}
                    {title === "Company Email" && (
                      <a href={`mailto:${props.workAddressData[idx]}`}>
                        <p className="text-gray-700 text-base  font-medium">
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
                        <p className="text-gray-700 text-base  font-medium">
                          {removeHttp(props.workAddressData[idx])}
                        </p>
                      </a>
                    )}
                    {title !== "Company Website" &&
                      title !== "Company Email" &&
                      title !== "Company Number" && (
                        <p className="text-gray-700 text-base  font-medium">
                          {props.workAddressData[idx]}
                        </p>
                      )}
                  </div>
                </div>
              </div>
            )
          );
        })}
        {props.workStreet && (
           <div className="shadow  border-gray-100 border rounded-2xl  bg-white mb-4 group">
           <div className="p-4 ">
            <p className="text-gray-400 text-sm  font-medium">
              Company Address
            </p>
            <p className="text-gray-700 text-base font-medium capitalize ">
              {props.workStreet}
            </p>
            <p className="text-gray-700 text-base font-medium capitalize ">
              {props.workCity}, {props.workState} {props.workzip}
            </p>
            <p className="text-gray-700 text-base font-medium capitalize ">
              {props.workCountry}
            </p>
          </div>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}
