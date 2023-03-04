import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav(props) {
  const username = props.username;
  const { pathname } = useLocation();
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    if (username) {
      setNavigation([
        { name: "Home", loc: "/", current: false },
        { name: "New Card", loc: "/form", current: false },
        {
          name: "Dashboard",
          loc: `/dashboard`,
          current: false,
        },
      ]);
    } else {
      // setNavigation([{ name: "Home", loc: "/", current: true }]);
      setNavigation([
        { name: "Log In", loc: "/login", current: false },
        { name: "Sign Up", loc: "/signup", current: false },
      ]);
    }
  }, [username]);

  return (
    <Disclosure as="nav" className="bg-gray-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:justify-between sm:items-stretch ">
                <Link to="/">
                  <div className="flex-shrink-0 flex items-center">
                    {/* <Logo height={"34px"} width={"auto"} /> */}
                    <p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl ">
                      BriteKard
                    </p>
                  </div>
                </Link>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation !== null &&
                      navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.loc}
                          // onClick={myEvent}
                          className={classNames(
                            item.loc === pathname
                              ? "bg-purple-400 text-white"
                              : "text-gray-900 hover:bg-gray-700 hover:text-white",
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
                      {username && "Log Out"}
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
                    // onClick={myEvent}
                    className={classNames(
                      item.loc === pathname
                        ? "bg-purple-400 text-white"
                        : "text-gray-900 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              {username && (
                <button
                  className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={props.handleLogOut}
                >
                  Log Out
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
