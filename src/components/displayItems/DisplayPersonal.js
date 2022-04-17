export default function DisplayPersonal(props) {
  return (
    <div className="drop-shadow-md mx-4 border-gray-100 border rounded-2xl  bg-white mb-5">
      <div className="mx-4 pt-4">
        <p className="text-lg font-medium text-gray-500 pb-4">Personal Info</p>
        {props.personalTags.map((el, idx) => {
          if (el === "Home Address") {
            return (
              <div key={idx}>
                <p className="text-gray-400 text-sm  font-medium">
                  Home Address
                </p>
                <p className="text-gray-700 text-sm pb-4 font-medium">
                  {props.houseStreet} <br></br>
                  {props.houseCity} {props.houseState}
                  <br></br>
                  {props.housezip}
                </p>
              </div>
            );
          } else {
            return (
              <div key={idx}>
                <p className="text-gray-400 text-sm  font-medium">{el}</p>
                <p className="text-gray-700 text-sm pb-4 font-medium">
                  {props.personalInfo[idx]}
                </p>
                {idx !== props.personalTags.length - 1 && (
                  <div className="bg-gray-200 h-px w-full mb-4"></div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
