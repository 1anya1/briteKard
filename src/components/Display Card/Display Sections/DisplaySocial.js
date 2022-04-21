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
    Github: <GitHubSVG />,
    Youtube: <YouTubeSVG />,
    Snapchat: <SnapChatSVG />,
    Tumblr: <TubmlrSVG />,
    TikTok: <TikTokSVG />,
    Meetup: <MeetUpSVG />,
    Twitch: <TwitchSVG />,
    Instagram: <InstagramSVG />,
    Facebook: <FacebookSVG />,
    Twitter: <TwitterSVG />,
    LinkedIn: <LinkedInSvg />,
  };

  return props.socialData.map((socialLink, idx) => {
    if (socialLink[1]) {
      return (
        <a
          href={socialLink[1]}
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
