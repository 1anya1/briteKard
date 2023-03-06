const EmptyBackground = (props) => {
  const { color } = props;
  return (
    <svg
      
      preserveAspectRatio="none"
      width='100%'
      height='100%'
      viewBox="0 0 1068 696"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect  width="100%" height="100%" fill={color} fill-opacity="0.2" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 137L48.1667 171.438C92.3333 205.875 180.667 274.75 269 286.229C357.333 297.708 445.667 251.792 534 217.354C622.333 182.917 710.667 159.958 799 240.312C887.333 320.667 975.667 504.333 1019.83 596.167L1064 688H1019.83C975.667 688 887.333 688 799 688C710.667 688 622.333 688 534 688C445.667 688 357.333 688 269 688C180.667 688 92.3333 688 48.1667 688H4V137Z"
        fill={color}
        fill-opacity="0.5"
        
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 190.5L48.1667 235.3C92.3333 285.6 180.667 386.2 269 428.117C357.333 470.033 445.667 453.267 534 411.35C622.333 369.433 710.667 302.367 799 268.833C887.333 235.3 975.667 235.3 1019.83 235.3H1064V688H1019.83C975.667 688 887.333 688 799 688C710.667 688 622.333 688 534 688C445.667 688 357.333 688 269 688C180.667 688 92.3333 688 48.1667 688H4V190.5Z"
        fill={color}
        fill-opacity="1"
    
      />
    </svg>
  );
};

export default EmptyBackground;
