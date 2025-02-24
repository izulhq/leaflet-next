"use client";

import React, { useEffect, useState } from "react";

function TableView() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const today = new Date().toISOString().split("T")[0];
        const apiUrl = `/api/klimatologi/klimatologi/1/2025-02-22`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center mx-24 my-4 py-4 border border-gray-200 rounded-lg shadow-lg">
        <div className="px-4 py-2 text-1.5xl font-bold leading-none text-center text-white bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600 shadow-blue-500/50 rounded-full animate-pulse">
          Loading...
        </div>
      </div>
    );
  if (error)
    return (
      <div className="m-4 p-4 border border-gray-200 rounded-lg text-red-600">
        {error}
      </div>
    );

  return (
    <div className="mx-24 my-4 pb-4 border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold pt-4 pb-2">
        Data Klimatologi
      </h1>
      <h1 className="text-center text-0.8lg font-semibold pb-4">
        Date: {new Date().toLocaleDateString()}
      </h1>
      <div className="flex flex-col items-center">
        <table
          className="text-sm font-poppins font-normal rounded-lg overflow-hidden shadow-md"
          align="center"
        >
          <thead>
            <tr className="bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600 shadow-blue-500/50 text-white">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border text-left">Nama Pos</th>
              <th className="px-4 py-2 border">Curah Hujan (mm)</th>
              <th className="px-4 py-2 border">Suhu Min (°C)</th>
              <th className="px-4 py-2 border">Suhu Max (°C)</th>
              <th className="px-4 py-2 border">Kelembapan (%)</th>
              <th className="px-4 py-2 border">Kec. Angin (m/s)</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.pos.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.pos.nama}</td>
                  <td className="px-4 py-2 border text-center">
                    {item.data.ch}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item.data.suhu_min}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item.data.suhu_max}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item.data.kelembapan}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item.data.kecepatan_angin}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center px-4 py-2 border">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center text-xs font-regular mt-4 text-gray-500">
        Data from: Sistem Informasi BBWS Bengawan Solo
      </div>
    </div>
  );
}

export default TableView;
