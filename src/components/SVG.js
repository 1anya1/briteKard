import {
  PhoneOutgoingIcon,
  MailIcon,
  GlobeAltIcon,
} from "@heroicons/react/solid";
export default function VCard() {
  return (
    <div className="md:container md:mx-auto">
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        <PhoneOutgoingIcon
          className="fill-gray hover:fill-teal"
          xmlns="http://www.w3.org/2000/svg"
        />
        <MailIcon
          className="fill-gray hover:fill-teal "
          xmlns="http://www.w3.org/2000/svg"
        />
        <GlobeAltIcon
          className="fill-teal hover:opacity-70 "
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
    </div>
  );
}
