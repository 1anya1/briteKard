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
import { useState } from "react";

export default function DisplaySocial(props) {
  console.log(props);
  const socialData = {
    Github: (
      <GitHubSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    Youtube: (
      <YouTubeSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    Snapchat: (
      <SnapChatSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    Tumblr: (
      <TubmlrSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    TikTok: (
      <TikTokSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    Meetup: (
      <MeetUpSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    Twitch: (
      <TwitchSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    Instagram: (
      <InstagramSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    Facebook: (
      <FacebookSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    Twitter: (
      <TwitterSVG
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
    LinkedIn: (
      <LinkedInSvg
        brandColor={props.colorScheme.brandColor}
        textColor={props.colorScheme.textColor}
      />
    ),
  };

  const [hover, setHover] = useState(false);
  const [current, setCurrent] = useState(null);

  const colorChange = props.colorScheme.brandColor;

  return props.socialData.map((socialLink, idx) => {
    if (socialLink[1]) {
      return (
        <a
          href={`https://${socialLink[1]}`}
          key={idx}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => {
            setHover(true);
            setCurrent(idx);
          }}
          onMouseLeave={() => {
            setHover(false);
            setCurrent(null);
          }}
        >
          <div className="drop-shadow-md mx-4 border-gray-100 border rounded-2xl  bg-white mb-4 group">
            <div className="p-4 flex items-center">
              {socialData[`${socialLink[0]}`]}
              <p
                className="text-gray-500 pl-4 text-base font-medium "
                style={
                  hover && current === idx
                    ? { color: colorChange }
                    : { color: "#a3a3a3 " }
                }
              >
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
