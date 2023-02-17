import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import FormDescription from "./Input Styles/FormDescription";

const people = [
  {
    id: 1,
    name: "Purple",
    color: 'bg-pallete-purple'
  },
  {
    id: 2,
    name: "Pink",
    color: 'bg-pallete-purple'
  },
  {
    id: 3,
    name: "Yellow",
    color: 'bg-pallete-purple'
  },
  {
    id: 4,
    name: "Blue",
    color: 'bg-pallete-purple'
  },
  {
    id: 5,
    name: "Aqua",
    color: 'bg-pallete-purple'
  },
  {
    id: 6,
    name: "Gray",
    color: 'bg-pallete-purple'
  },
  {
    id: 7,
    name: "Black",
    color: 'bg-pallete-purple'
  },
  
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ColorPicker() {
  const [selected, setSelected] = useState(people[3]);
  const formName = "Choose Theme";

  return (
    <div className=" drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-4xl m-auto">
      <div className="p-4  sm:p-8">
        <FormDescription formName={formName} />
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Background Color
              </Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <span className="flex items-center">
                    <img
                      src={selected.avatar}
                      alt=""
                      className="h-6 w-6 flex-shrink-0 rounded-full"
                    />
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"></span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {people.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-indigo-600"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={person.avatar}
                                alt=""
                                className="h-6 w-6 flex-shrink-0 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {person.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              ></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}
