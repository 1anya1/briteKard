export default function DisplayWorkInfo(props) {
  const workAddressTags = [
    "Company Name",
    "Company Number",
    "Company Email",
    "Company Website",
  ];
  console.log(props);
  return (
    props.workAddressTags && (
      <div className="drop-shadow-md mx-4 border-gray-100 border rounded-2xl  bg-white mb-5">
        <div className="mx-4 pt-4">
          <p className="text-lg font-medium text-gray-500 pb-4">Comapny Info</p>
          {workAddressTags.map((title, idx) => {
            return (
              props.workAddressData[idx] && (
                <div key={idx}>
                  <p className="text-gray-400 text-sm  font-medium">{title}</p>
                  <p className="text-gray-700 text-base pb-4 font-medium">
                    {props.workAddressData[idx]}
                  </p>

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
    )
  );
}
