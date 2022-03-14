import { useTimer } from "@utils/hooks/useTimer";
import React, { useEffect } from "react";
const formatTime = (timer: number) => {
  var minutes: any;
  const getSeconds = `0${timer % 60}`.slice(-2);
  minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const Timer: React.FC<{ asTimer: number }> = ({ asTimer }) => {
  const { timer, handleStart } = useTimer(asTimer);
  useEffect(() => {
    console.log(asTimer);
    if (asTimer) handleStart();
  }, [asTimer]);
  return (
    <span className="flex items-center justify-center text-green-500 rounded-full px-4 border border-black">
      {formatTime(timer)}
    </span>
  );
};

export default React.memo(Timer);
