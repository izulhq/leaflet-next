"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MapIcon, TableIcon } from "lucide-react";
import TableView from "@/components/TableView";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

const markers = [
  {
    geocode: [-7.56131769, 110.7687198],
    popUp: "Stasiun Pabelan",
  },
  {
    geocode: [-7.97460004, 110.93],
    popUp: "Stasiun Baturetno",
  },
  {
    geocode: [-7.75000004, 110.902],
    popUp: "Stasiun Bendung Colo",
  },
];

export default function Home() {
  const [view, setView] = useState("map");

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <main className="flex-1">
        {view === "map" ? <LeafletMap markers={markers} /> : <TableView />}
      </main>

      <div className="fixed z-[9999] w-auto min-w-[320px] h-16 -translate-x-1/2 bg-blue backdrop-blur-lg border-[1px] border-black-900 rounded-[12px] bottom-4 left-1/2 shadow-lg">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={80} height={30} />
          </div>

          <div className="flex items-center gap-4 ml-6">
            <button
              data-tooltip-target="tooltip-map"
              onClick={() => setView("map")}
              className={`p-2 rounded-full shadow-md ${
                view === "map"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700"
                  : "bg-gray-600"
              } hover:bg-gradient-to-br focus:outline-none`}
            >
              <MapIcon
                className={`w-5 h-5 ${
                  view === "map" ? "text-white" : "text-gray-200"
                }`}
              />
            </button>
            <div
              id="tooltip-map"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Map View
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <button
              data-tooltip-target="tooltip-table"
              onClick={() => setView("table")}
              className={`p-2 rounded-full shadow-md ${
                view === "table"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700"
                  : "bg-gray-600"
              } hover:bg-gradient-to-br focus:outline-none`}
            >
              <TableIcon
                className={`w-5 h-5 ${
                  view === "table" ? "text-white" : "text-gray-200"
                }`}
              />
            </button>
            <div
              id="tooltip-table"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Table View
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
