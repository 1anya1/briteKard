import { Link } from "react-router-dom";
export default function Nav(props) {
  return (
    <nav className="flex sm:justify-center space-x-4">
      {[
        ["Home", "/"],
        ["New Card", "/form"],
        ["My Cards", `/myCards/${props.username}`],
      ].map(([title, url]) => (
        <Link
          to={url}
          className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
          key={title}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}
