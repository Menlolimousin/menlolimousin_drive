import Card from "@components/Statistics/Card";
import { Chart } from "@components/Statistics/Chart";
import api from "@utils/lib/api";
import { Error } from "@utils/lib/Messages";
import React, { useEffect, useState } from "react";

const statistics = () => {
  const [bills, setBills] = useState([]);
  const [statistics, setStatistics] = useState<any>({});
  const [totalIncome, setTotalIncome] = useState<number>(0);
  useEffect(() => {
    const getSysInfo = async () => {
      await api()
        .get("/Admin/System/systemInformation")
        .then((data) => setStatistics(data.data))
        .catch((err) => Error("Bir Hata Oluştu Lütfen Sayfayı Yenileyin"));
    };
    const getDrive = async () => {
      await api()
        .get("/Drive/isLoggedIn")
        .then((data) => {
          setTotalIncome(data.data.data.totalIncome);
          setBills(data.data.data.bills);
        })
        .catch((err) => Error("Bir Hata Oluştu Lütfen Sayfayı Yenileyin"));
    };
    getSysInfo();
    getDrive();
  }, []);
  return (
    <>
      <Card
        icon={"calendar-check"}
        title={"Upcoming"}
        count={statistics?.upcomingCount}
        bg={"bg-green-100"}
        text={"text-green-400"}
      />
      <Card
        icon={"calendar-minus"}
        title={"Past"}
        count={statistics?.pastCount}
        bg={"bg-stone-100"}
        text={"text-stone-400"}
      />
      <Card
        icon={"calendar-times"}
        title={"Cancelled"}
        count={statistics?.cancelledCount}
        bg={"bg-red-100"}
        text={"text-red-400"}
      />
      <Card
        icon={"users"}
        title={"Total Users"}
        count={statistics?.userCount}
        bg={"bg-blue-100"}
        text={"text-blue-400"}
      />
      <Card
        icon={"dollar-sign"}
        title={"Total Turnover"}
        count={parseInt(totalIncome?.toFixed(2))}
        bg={"bg-fuchsia-100"}
        text={"text-fuchsia-400"}
      />
      <Chart bills={bills} />
    </>
  );
};

export default statistics;
