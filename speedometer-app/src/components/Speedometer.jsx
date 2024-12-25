import React, { useEffect, useState } from "react";

const Speedometer = () => {
  const [speed, setSpeed] = useState(-1);

  useEffect(() => {
    // Create a WebSocket connection to the backend
    const socket = new WebSocket("ws://localhost:5000");

    socket.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log("Message from server on **UI**:", data);
      setSpeed(data.speed);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 gap-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 my-10 italic underline">
        Speedometer
      </h1>
      <div
        className="text-6xl w-[200px]  border-2 border-black p-10 r
      rounded-xl  relative"
      >
        {speed !== -1 ? speed : "--"}

        <span className="text-[19px] absolute bottom-11">km/h</span>
        <div className="text-xl  text-zinc-700 font-bold absolute">
          Current Speed
        </div>
      </div>
    </div>
  );
};

export default Speedometer;
