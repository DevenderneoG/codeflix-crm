"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartThree = ({ filteredLeads, closedLeads, pipelineCount }) => {
  const [series, setSeries] = useState([0, 0]);

  useEffect(() => {
    setSeries([closedLeads, pipelineCount]);
  }, [closedLeads, pipelineCount]);

  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Closed", "Pipeline"],
    colors: ["#10B981", "#259AE6"],
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-[#e2e8f0] bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-[#313d4a] dark:bg-[#313d4a] sm:px-7.5 xl:col-span-6">
      <h5 className="mb-4 text-xl font-semibold text-black dark:text-white">
        Lead Status Overview
      </h5>

      {closedLeads + pipelineCount > 0 ? (
        <>
          <div className="flex justify-center mb-4">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={250}
            />
          </div>

          <div className="flex justify-around text-sm font-medium text-black dark:text-white">
            <div className="flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full bg-[#10B981]"></span>
              Closed ({series[0]})
            </div>
            <div className="flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full bg-[#259AE6]"></span>
              Pipeline ({series[1]})
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-sm text-gray-500">
          No closed or pipeline leads found in the last 7 days.
        </p>
      )}
    </div>
  );
};

export default ChartThree;
