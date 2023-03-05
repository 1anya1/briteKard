import {
  FacebookSVG,
  InstagramSVG,
  TwitterSVG,
  LinkedInSvg,
  MeetUpSVG,
  TwitchSVG,
  TikTokSVG,
  YouTubeSVG,
  TubmlrSVG,
  SnapChatSVG,
  GitHubSVG,
} from "../../Form/Icons/SocialIcons";
export default function DisplaySocial(props) {
  const socialData = {
    Github: <GitHubSVG color={"fill-gray-400"} />,
    Youtube: <YouTubeSVG color={"fill-gray-400"} />,
    Snapchat: <SnapChatSVG color={"fill-gray-400"} />,
    Tumblr: <TubmlrSVG color={"fill-gray-400"} />,
    TikTok: <TikTokSVG color={"fill-gray-400"} />,
    Meetup: <MeetUpSVG color={"fill-gray-400"} />,
    Twitch: <TwitchSVG color={"fill-gray-400"} />,
    Instagram: <InstagramSVG color={"fill-gray-400"} />,
    Facebook: <FacebookSVG color={"fill-gray-400"} />,
    Twitter: <TwitterSVG color={"fill-gray-400"} />,
    LinkedIn: <LinkedInSvg color={"fill-gray-400"} />,
  };

  return props.socialData.map((socialLink, idx) => {
    if (socialLink[1]) {
      return (
        <a
          href={`https://${socialLink[1]}`}
          key={idx}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="drop-shadow-md mx-4 border-gray-100 border rounded-2xl  bg-white mb-4">
            <div className="p-4 flex items-center">
              {socialData[`${socialLink[0]}`]}
              <p className="text-gray-500 pl-4 text-base font-medium ">
                {socialLink[0]}
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
