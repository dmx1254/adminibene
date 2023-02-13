/* @ts-nocheck */
/* eslint-disable */

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import Loader from "./Loader";

const ChartUsers = () => {
  const [chartUserLoading, setChartUserLoading] = useState(true);
  const [dataUserMonth, setDataUserMonth] = useState([]);

  useEffect(() => {
    const getStatsUser = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_CLIENT_URL}/users/v2/stats`,
      }).then((res) => {
        setDataUserMonth(res?.data);
        setChartUserLoading(false);
      });
    };

    getStatsUser();
  }, []);

  return chartUserLoading ? (
    <Loader />
  ) : (
    <div className="mt-2 mb-4 flex justify-center flex-col items-center bg-white p-10">
      <h1 className="mt-4 mb-6 text-2xl text-blue-600">
        Nombre de clients inscrits par mois.
      </h1>
      <LineChart
        width={600}
        height={300}
        data={dataUserMonth}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="count" stroke="#0d2753" />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default ChartUsers;
