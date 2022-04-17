import { FacebookSVG, LinkedInSvg, TwitterSVG } from "../SocialIcons";
export default function DisplaySocial(props) {
  return props.socialData.map((el, idx) => {
    if (el[0] === "LinkedIn") {
      return (
        <a href={el[1]} key={idx}>
          <div className="drop-shadow-md mx-4 border-gray-100 border rounded-2xl  bg-white mb-4">
            <div className="p-4 flex items-center">
              <LinkedInSvg />
              <p className="text-gray-500 pl-4 text-base font-medium ">
                {el[0]}
              </p>
            </div>
          </div>
        </a>
      );
    }
    if (el[0] === "Twitter") {
      return (
        <a href={el[1]} key={idx}>
          <div className="drop-shadow-md mx-4 border-gray-100 border rounded-2xl  bg-white mb-4">
            <div className="p-4 flex items-center">
              <TwitterSVG />
              <p className="text-gray-500 pl-4  text-base font-medium ">
                {el[0]}
              </p>
            </div>
          </div>
        </a>
      );
    }
    if (el[0] === "Facebook") {
      return (
        <a href={el[1]} key={idx}>
          <div className="drop-shadow-md mx-4 border-gray-100 border rounded-2xl  bg-white mb-4">
            <div className="p-4 flex items-center">
              <FacebookSVG />
              <p className="text-gray-500 pl-4  text-base font-medium ">
                {el[0]}
              </p>
            </div>
          </div>
        </a>
      );
    } else {
      return null;
    }
  });
}
