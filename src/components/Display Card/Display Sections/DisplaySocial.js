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
  const activeLinks = props.socialData.filter((el) => el[1]);
  const colorChange = props.colorScheme.brandColor;

  if (activeLinks.length > 0) {
    return (
      <div className="mx-4 mb-5">
        <p className="text-lg font-bold text-gray-500 pb-3 pt-3 pl-4">
          Social Link
        </p>
        {props.socialData.map((socialLink, idx) =>
          socialLink[1] ? (
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
              <div className="shadow  border-gray-100 border rounded-2xl  bg-white mb-4 group">
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
          ) : null
        )}
      </div>
    );
  } else {
    return null;
  }
}
