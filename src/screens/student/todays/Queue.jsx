import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardStep,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import credentials from "../../../data/user";
import QueueList from "../../../components/student/QueueList";
import queueTempData from "../../../data/queueTemp";

const SERVER_BASE_URL = "http://localhost:5000/api";

const Queue = () => {
  const TOTAL_TIME = 5 * 60;

  const [countdown, setCountdown] = useState(() => {
    const savedCountdown = localStorage.getItem("queueCountdown");
    return savedCountdown ? parseInt(savedCountdown) : TOTAL_TIME;
  });

  const [queueNum, setQueueNum] = useState(() => {
    const savedQueueNum = localStorage.getItem("queueNum");
    return savedQueueNum ? parseInt(savedQueueNum) : 0;
  });

  const [queueList, setQueueList] = useState([]);
  const [currentServing, setCurrentServing] = useState({
    displayName: "",
    program: "",
  });

  const [isTimerRunning, setIsTimerRunning] = useState(() => {
    const savedTimerRunning = localStorage.getItem("isTimerRunning");
    return savedTimerRunning === "true";
  });

  const [isTimerComplete, setIsTimerComplete] = useState(() => {
    const savedTimerComplete = localStorage.getItem("isTimerComplete");
    return savedTimerComplete === "true";
  });

  const [timerStartTime, setTimerStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem("timerStartTime");
    return savedStartTime ? parseInt(savedStartTime) : null;
  });

  // Retrieve token from localStorage or your state management solution
  const token = localStorage.getItem("token");

  // Fetch queue list from server on component mount
  useEffect(() => {
    const fetchQueueList = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}/queue`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          // Handle unauthorized access (e.g., redirect to login)
          if (response.status === 401) {
            // Redirect to login or handle token refresh
            console.error("Unauthorized. Please log in.");
            // Optionally remove invalid token
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login page
            return;
          }
          throw new Error("Failed to fetch queue list");
        }
        const data = await response.json();
        setQueueList(data);

        // Set initial current serving if not already set
        if (data.length > 0) {
          const currentToken = data[0];
          setQueueNum(currentToken.counter);
          setCurrentServing({
            displayName: currentToken.firstname,
            program: currentToken.course,
          });
          setQueueList(data.slice(1));
        }

        if (data.length === 0) {
          localStorage.setItem("queueNum", "");
        }
      } catch (error) {
        console.error("Error fetching queue list:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchQueueList();

    const intervalId = setInterval(fetchQueueList, 20 * 1000); // Adjust the interval as needed
    return () => clearInterval(intervalId);
  }, [queueNum, token]);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem("queueCountdown", countdown.toString());
    localStorage.setItem("queueNum", queueNum.toString());
    localStorage.setItem("isTimerRunning", isTimerRunning.toString());
    localStorage.setItem("isTimerComplete", isTimerComplete.toString());

    if (isTimerRunning) {
      localStorage.setItem("timerStartTime", Date.now().toString());
    } else {
      localStorage.removeItem("timerStartTime");
    }
  }, [countdown, queueNum, isTimerRunning, isTimerComplete]);

  // time component
  const TimeDisplay = () => {
    const dd = String(new Date().getDate()).padStart(2, "0");
    const mm = String(new Date().getMonth() + 1).padStart(2, "0");
    const yyyy = new Date().getFullYear();

    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }, []);

    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");

    // Determine AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12

    return (
      <div className="flex justify-center items-center flex-col w-full px-7 font-inter font-semibold">
        <div className="text-blue-950">{mm + "/" + dd + "/" + yyyy}</div>
        <div className="text-xs text-amber-500">
          {hours}:{minutes} {ampm}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-x-hidden lg:overflow-hidden lg:pt-0 bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        <div className="h-screen w-full lg:w-[100%] flex gap-y-2 flex-col-reverse lg:flex-col p-2">
          <div className="w-full bg-white h-[75%] rounded-lg shadow-lg">
            <div className="flex justify-center xl:justify-end py-2 w-full">
              <div>
                <TimeDisplay />
              </div>
            </div>
            <div className="flex h-full items-center p-2 flex-col">
              <div className="flex justify-center items-center text-amber-500 text-lg">
                <label className="font-inter font-semibold">
                  Currently Serving
                </label>
              </div>
              <div className="flex pb-0 xl:pb-10 justify-center items-center">
                <label className="font-inter font-bold text-blue-950 text-3xl">
                  Token Number
                </label>
              </div>

              <div className="flex flex-row items-center justify-between space-x-4">
                <div className="w-full xl:px-12">
                  <div className="font-inter px-16 font-semibold border-4 h-full text-amber-500 border-amber-500 rounded-xl flex items-center justify-center text-[100px] xl:text-[150px]">
                    {queueNum !== 0 ? queueNum : "---"}
                  </div>
                </div>
              </div>

              <div className="h-full flex flex-col justify-end pb-24">
                {/* <div className="text-amber-500 text-lg">
                  <label className="font-inter text-2xl">Serving Time</label>
                </div>
                <div className="flex justify-center items-center space-x-4">
                  <label className="font-inter font-bold text-blue-950 text-3xl">
                    {formatCountdown(countdown)}
                  </label>
                </div> */}

                {/* <div className="flex justify-center items-center space-x-4 mt-1">
                  <button
                    onClick={handlePlayPause}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      bg-amber-500 hover:bg-amber-600 text-white
                      transition-all duration-300 ease-in-out
                      shadow-md hover:shadow-lg transform hover:scale-105
                    `}
                  >
                    <FontAwesomeIcon
                      icon={isTimerRunning ? faPause : faPlay}
                      className="w-6 h-6"
                    />
                  </button>

                  {(isTimerComplete || countdown <= 0) && (
                    <button
                      onClick={handleNextToken}
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        bg-amber-500 hover:bg-amber-600 text-white
                        transition-all duration-300 ease-in-out
                        shadow-md hover:shadow-lg transform hover:scale-105
                      `}
                    >
                      <FontAwesomeIcon
                        icon={faForwardStep}
                        className="w-6 h-6"
                      />
                    </button>
                  )}
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center rounded-lg w-full bg-white mt-2 h-auto p-8 shadow-lg">
            <div className="flex justify-center items-center text-amber-500 text-lg">
              <label className="font-inter font-semibold">Student Name</label>
            </div>
            <div className="flex w-full justify-center items-center">
              <label className="text-blue-950 lg:text-2xl xl:text-4xl text-xl font-inter font-semibold">
                {currentServing.displayName || "No Current Student"}
              </label>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-screen flex flex-col-reverse lg:flex-col p-2">
          <div className="w-full bg-white h-full lg:h-[93.8vh] rounded-lg shadow-lg overflow-hidden">
            <div className="w-full bg-[#0b1933] text-center text-white font-inter text-2xl py-3 sticky top-0 z-10">
              Waiting Line
            </div>

            <QueueList queueList={queueList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
