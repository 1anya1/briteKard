import { ThreeDots } from "react-loader-spinner";
export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <ThreeDots
        color="#3e404d"
        height={110}
        width={110}
        ariaLabel="three-circles-rotating"
      />
    </div>
  );
}
