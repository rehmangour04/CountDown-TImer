/** @format */

import { useState, useRef } from "react";
import ShowTimeDuration from "./ShowTimeDuration";

const CountDown = () => {
  const message = "The countdown is over! What's next on your adventure 🚀";
  let timeInterval = useRef(null);

  const [dateTime, setDateTime] = useState();
  const [timerStarted, setTimerStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    Days: 0,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessge] = useState("");

  const startTimer = (d_T) => {
    const final_time = new Date(d_T).getTime();
    const maxdays = 99;

    timeInterval.current = setInterval(() => {
      const initial_time = new Date().getTime();
      const difference = final_time - initial_time;
      if (difference > 0) {
        const day = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (day > maxdays) {
          clearInterval(timeInterval.current);
          setTimerStarted(false);
          alert(
            "No of days cannot be greater than 99 days from the selected date."
          );
          setDateTime("");
          return;
        }

        const hour = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const sec = Math.floor((difference % (1000 * 60)) / 1000);

        setRemainingTime({
          Days: day,
          Hours: hour,
          Minutes: mins,
          Seconds: sec,
        });
      } else {
        clearInterval(timeInterval.current);
        setTimerStarted(false);
        setRemainingTime({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });
        setShowMessage(true); // Show the message when the timer is over
      }
    }, 1000);
  };

  const handleDateTimeChange = (input) => {
    setDateTime(input);

    if (new Date(input) < new Date()) {
      setShowErrorMessage(true); //enables the error message to render
      setErrorMessge("Check the date and time ⚠️"); //sets the error message
    } else {
      setShowErrorMessage(false);
      setErrorMessge("");
    }
  };

  const handleStartTimer = () => {
    if (!showErrorMessage) {
      setTimerStarted(true);
    }
    setShowMessage(false);

    startTimer(dateTime);
  };

  const handleStopTimer = () => {
    clearInterval(timeInterval.current);
    setTimerStarted(false);
    setRemainingTime({
      Days: 0,
      Hours: 0,
      Minutes: 0,
      Seconds: 0,
    });
  };
  //for pausing the timer we can comment out line no 72 to 77
  //this code works for clearing the running timer by applying useRef hook

  return (
    <div className="w-screen h-screen overflow-auto bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="flex flex-col justify-center items-center gap-5 my-5">
        <h1 className="font-bold text-white text-4xl text-center">
          Countdown <span className="text-purple-500">Timer</span>
        </h1>

        <div className="border border-white rounded-md w-auto">
          <form>
            <input
              className="rounded-md p-2 bg-transparent text-white"
              type="datetime-local"
              value={dateTime}
              onChange={(event) => handleDateTimeChange(event.target.value)}
            ></input>
          </form>
        </div>

        {timerStarted ? (
          <div className="flex flex-col items-center gap-3">
            <button
              className="text-white px-4 py-2 border border-white rounded-md text-center"
              onClick={handleStopTimer}
            >
              Clear Timer
            </button>
          </div>
        ) : (
          <button
            className="text-white px-4 py-2 border border-white rounded-md text-center"
            onClick={handleStartTimer}
          >
            Start Timer
          </button>
        )}

        {!showErrorMessage && !showMessage && (
          <>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-10">
              <ShowTimeDuration
                data={`${remainingTime.Days} ${
                  remainingTime.Days > 1 ? "Days" : "Day"
                }`}
              />
              <ShowTimeDuration
                data={`${remainingTime.Hours} ${
                  remainingTime.Hours > 1 ? "Hours" : "Hour"
                }`}
              />
              <ShowTimeDuration
                data={`${remainingTime.Minutes} ${
                  remainingTime.Minutes > 1 ? "Minutes" : "Minute"
                }`}
              />
              <ShowTimeDuration
                data={`${remainingTime.Seconds} ${
                  remainingTime.Seconds > 1 ? "Seconds" : "Second"
                }`}
              />
            </div>
            {!timerStarted && (
              <p className="text-green-400 font-light text-xl text-center">
                Set the date and Start the timer 🙂
              </p>
            )}
          </>
        )}

        {showErrorMessage && (
          <p className="text-red-400 text-xl font-light text-center">
            {errorMessage}
          </p>
        )}
        {showMessage && (
          <p className="text-slate-200 text-xl font-light text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CountDown;
