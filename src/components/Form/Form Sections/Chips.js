export default function Chips(props) {
  const toggleClass = "bg-transparent text-gray-500";
  function click(event) {
    let idx = event.currentTarget.getAttribute("formid");

    props.toggle(parseInt(idx));
  }

  return props.options.map((el, idx) => {
    let curr = el;
    return (
      <span
        onClick={click}
        key={idx}
        formid={idx}
        className={
          "cursor-pointer px-3 py-2 rounded-full flex-none font-bold text-xs flex align-center w-max  active:opacity-70 transition duration-300 ease  border border-gray-500 " +
          (curr.toggle
            ? "bg-purple-400 text-white border-purple-400"
            : toggleClass)
        }
      >
        {curr.name}
        <button className="bg-transparent hover focus:outline-none">
          {curr.toggle ? (
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times"
              className="w-2 ml-3"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
          ) : null}
        </button>
      </span>
    );
  });
}
