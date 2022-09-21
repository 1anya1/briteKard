import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav(props) {
  const username = props.username;

  console.log(username, props.username);
  const [navigation, setNavigation] = useState(null);
  useEffect(() => {
    console.log("in use effect in vab");
    if (username) {
      setNavigation([
        { name: "Home", loc: "/", current: true },
        { name: "New Card", loc: "/form", current: false },
        {
          name: "My Cards",
          loc: `/myCards/${username}`,
          current: false,
        },
      ]);
    } else {
      setNavigation([{ name: "Home", loc: "/", current: true }]);
    }
  }, [props.username, username]);
  console.log(navigation);
  const myEvent = (event) => {
    const target = event.target.innerHTML;
    const data = [...navigation];
    for (let el in data) {
      if (data[el]["name"] === target) {
        data[el]["current"] = true;
      } else {
        data[el]["current"] = false;
      }
    }
    console.log(data);
    setNavigation(data);
  };

  return (
    <Disclosure as="nav" className="bg-gray-700">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {/* <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  /> */}
                  {/* <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  /> */}
                  <p className="text-2xl font-extrabold tracking-tight text-gray-200 sm:text-3xl">
                    BriteKard
                  </p>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation !== null &&
                      navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.loc}
                          onClick={myEvent}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    <button
                      className="transition duration-150 ease-in-out ..."
                      onClick={props.handleLogOut}
                    >
                      {username ? "Log Out" : "Log In"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation &&
                navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.loc}
                    onClick={myEvent}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
