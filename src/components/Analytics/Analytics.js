import axios from "axios";
import { useEffect, useState } from "react";
import MiniChart from "./MiniChart";
import { UserCircleIcon } from "@heroicons/react/solid";
import MainChart from "./MainChart";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

export default function Analytics(props) {
  const { username } = props;
  const [data, setData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [days, setDays] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [contactDownloads, setContactDownloads] = useState(null);
  const [phoneCliks, setPhoneClicks] = useState(null);
  const [emailClicks, setEmailClicks] = useState(null);
  const [totalClicks, setTotalClicks] = useState(null);
  const [timeFrame, setTimeFrame] = useState(7);
  const [startingPoint, setStartingPoint] = useState(null);
  const [endingPoint, setEndingPoint] = useState(null);
  const [show, setShow] = useState(false);
  const [cardShow, setCardShow] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (username) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/vCards/${username}`)
        .then((response) => {
          setData(response.data);
          if (response.data[0]) {
            handleAnalytics(response.data[0]._id, 0);
          }
        });
    }
  }, [username]);

  const handleAnalytics = (id, idx) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/engagement/${id}`)
      .then((response) => {
        setAnalytics(response.data);
        setCardShow(idx);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  const dayFormatter = (date) => {
    var daylist = getDaysArray(new Date(date), new Date());
    const days = (data) =>
      data.map((v) => {
        const dayString = v.toDateString().split(" ");
        const day = `${dayString[1]} ${dayString[2]}`;
        return day;
      });
    setDays();
    return days(daylist);
  };
  useEffect(() => {
    const date = new Date();
    const start = new Date(date).toDateString().split(" ");
    setEndingPoint(`${start[1]} ${start[2]}, ${start[3]}`);
    date.setDate(date.getDate() - timeFrame);
    const end = new Date(date).toDateString().split(" ");
    setStartingPoint(
      `${end[1]} ${end[2]} ${
        timeFrame >= 365 || timeFrame === "All" ? end[3] : ""
      }`
    );

    const value = dayFormatter(date);
    setDays(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFrame]);

  useEffect(() => {
    const getDataPoints = (data) => {
      const arr = [];
      const obj = {};
      data.forEach((v) => {
        const dayString = new Date(Number(v)).toDateString().split(" ");
        const day = `${dayString[1]} ${dayString[2]}`;
        obj[day] = (obj[day] || 0) + 1;
      });
      for (let i = 0; i < days.length; i++) {
        if (obj[days[i]]) {
          arr.push(obj[days[i]]);
        } else {
          arr.push(0);
        }
      }
      return arr;
    };
    if (analytics) {
      const qrCodeData = analytics.qrCode;
      const val = getDataPoints(qrCodeData);
      setQrData(val);
      const websiteClicks = analytics.addCard;
      const contact = getDataPoints(websiteClicks);
      setContactDownloads(contact);
      const phoneClicks = analytics.phone;
      const phone = getDataPoints(phoneClicks);
      setPhoneClicks(phone);
      const emailClicks = analytics.email;
      const email = getDataPoints(emailClicks);
      setEmailClicks(email);
      const arr = [];
      for (let i = 0; i < email.length; i++) {
        const el = email[i] + phone[i] + contact[i] + val[i];
        arr.push(el);
      }
      setTotalClicks(arr);
    }
  }, [analytics, days]);

  return (
    <div className=" max-w-[1800px] px-[5%] sm:pb-6 sm:w-[calc(100%_-_100px)] lg:w-[calc(100%_-_300px)] ml-auto  pb-[120px] ">
      <div className=" mx-auto  ">
        <div className="flex flex-row items-end justify-between pb-10">
          <p className="  text-2xl font-bold text-left  tracking-tight text-gray-900  mb-0 mt-10 ">
            Card Analytics
          </p>
        </div>
        {data?.length < 1 && (
          <div className="h-[200px] drop-shadow-md  border-gray-100 border  lg:w-[calc(50%_-_10px)] w-full sm:w-full text-small text-gray-800 font-medium mb-4 sm:mb-0 bg-white rounded-2xl  flex flex-col  p-4 sm:p-6 justify-center items-center">
            <Link to="/form">
              <div className="space-x-4  space-y-4 flex flex-col cursor-pointer group">
                <div className="rounded-full bg-gray-50 w-max p-4 m-auto group-hover:bg-gray-200 ">
                  <AiOutlinePlus size={30} className="color-gray-900" />
                </div>
                <div>
                  <p className="text-lg font-bold text-center">
                    Create New Card
                  </p>
                  <p className="text-sm  text-center">No analytics available</p>
                </div>
              </div>
            </Link>
          </div>
        )}
        {data?.length > 0 && (
          <>
            <div className="flex flex-col lg:flex-row space-y-2.5 lg:space-x-2.5 lg:space-y-0 pb-8">
              <div
                onClick={() => {
                  setShow(!show);
                  setShowCard(false);
                }}
                className={` ${
                  show
                    ? "rounded-br-none rounded-bl-none z-10"
                    : "rounded-[20px] "
                } bg-gray-100  cursor-pointer flex flex-row space-x-2 border border-gray-200 relative  py-2 px-4  rounded-[20px] w-full lg:w-max  justify-start lg:justify-center  content-center items-center `}
              >
                <div>
                  <p className="font-semibold text-sm">
                    Last {timeFrame} days :
                  </p>
                  <div
                    className={`${
                      show
                        ? "absolute bg-white w-[calc(100%_+_2px)] md:top-[36px] top-[32px] border-gray-200 border left-[-1px]  rounded-br-[20px] rounded-bl-[20px] overflow-hidden"
                        : "hidden"
                    }`}
                  >
                    <div
                      onClick={() => setTimeFrame(7)}
                      className={`${
                        timeFrame === 7 ? "bg-gray-50" : ""
                      } hover:bg-purple-50`}
                    >
                      <p className=" pl-4 py-1 md:text-sm">7 Days</p>
                    </div>
                    <div
                      onClick={() => setTimeFrame(30)}
                      className={`${
                        timeFrame === 30 ? "bg-gray-50" : ""
                      } hover:bg-purple-50`}
                    >
                      <p className=" pl-4 py-1 text-sm">30 Days</p>
                    </div>
                    <div
                      onClick={() => setTimeFrame(90)}
                      className={`${
                        timeFrame === 90 ? "bg-gray-50" : ""
                      } hover:bg-purple-50`}
                    >
                      <p className=" pl-4 py-1 text-sm">90 Days</p>
                    </div>
                    <div
                      onClick={() => setTimeFrame(180)}
                      className={`${
                        timeFrame === 180 ? "bg-gray-50" : ""
                      } hover:bg-purple-50`}
                    >
                      <p className=" pl-4 py-1 text-sm">180 Days</p>
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-sm ">
                  {startingPoint} - {endingPoint}
                </p>
              </div>
              <div
                onClick={() => {
                  setShowCard(!showCard);
                  setShow(false);
                }}
                className={` ${
                  showCard
                    ? "rounded-br-none rounded-bl-none z-10"
                    : "rounded-[20px] "
                } bg-gray-100 cursor-pointer flex flex-row space-x-2 border border-gray-200 relative  py-2 px-4 rounded-[20px] w-full lg:w-max   content-center items-center justify-start lg:justify-center`}
              >
                <div>
                  <p className="font-semibold text-sm ">Card Data :</p>
                  <div
                    className={`${
                      showCard
                        ? "absolute bg-white w-[calc(100%_+_2px)] md:top-[36px] top-[32px] border-gray-200 border left-[-1px]  rounded-br-[20px] rounded-bl-[20px] overflow-hidden"
                        : "hidden"
                    }`}
                  >
                    {data?.length > 0 &&
                      data.map((card, idx) => (
                        <div
                          key={card._id}
                          onClick={() => handleAnalytics(card._id, idx)}
                          className={`${
                            cardShow === idx ? "bg-gray-50" : ""
                          } p-2  flex flex-row  overflow-hidden space-x-2 align-center hover:bg-purple-50 align-center content-center`}
                        >
                          <div className="h-4 w-4 rounded-full overflow-hidden  border-1 border-gray-200  self-center ">
                            {!card.photo ? (
                              <div className=" w-full h-full flex items-center justify-center bg-gray-100">
                                <UserCircleIcon className="h-2/3 w-2/3 fill-gray-300" />
                              </div>
                            ) : (
                              <img
                                className="object-cover h-full w-full "
                                src={card.photo}
                                alt="profile"
                              />
                            )}
                          </div>

                          <p className="text-sm">
                            {card.cardName ? card.cardName : card._id}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                {data?.length > 0 && (
                  <div
                    key={data[cardShow]._id}
                    className="flex flex-row  overflow-hidden space-x-2 content-center align-center "
                  >
                    <div className="h-4 w-4 rounded-full overflow-hidden  1 border-gray-200 self-center  ">
                      {!data[cardShow].photo ? (
                        <div className=" w-full h-full flex items-center justify-center bg-gray-100">
                          <UserCircleIcon className="h-2/3 w-2/3 fill-gray-300" />
                        </div>
                      ) : (
                        <img
                          className="object-cover h-full w-full "
                          src={data[cardShow].photo}
                          alt="profile"
                        />
                      )}
                    </div>

                    <p className="text-sm  font-semibold capitalize">
                      {data[cardShow].cardName
                        ? data[cardShow].cardName
                        : data[cardShow]._id}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col  space-y-4">
              <div className="grid xl:grid-cols-4  grid-cols-1 md:grid-cols-2  gap-3 justify-between w-full max-w-full">
                {qrData && days && (
                  <MiniChart data={qrData} labels={days} title="QR Taps" />
                )}
                {contactDownloads && days && (
                  <MiniChart
                    data={contactDownloads}
                    labels={days}
                    title="Contact Downloads"
                  />
                )}
                {phoneCliks && days && (
                  <MiniChart
                    data={phoneCliks}
                    labels={days}
                    title="Phone Clicks"
                  />
                )}
                {emailClicks && days && (
                  <MiniChart
                    data={emailClicks}
                    labels={days}
                    title="Email Clicks"
                  />
                )}
              </div>
              {totalClicks && (
                <MainChart
                  data={[
                    { chart: totalClicks, name: "Total Clicks", color: "gray" },
                  ]}
                  labels={days}
                  timeFrame={timeFrame}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
