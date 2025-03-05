"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import TableView from "@/components/TableView";
import NavBar from "@/components/NavBar";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

export default function Home() {
  const [view, setView] = useState("map");
  const [markers, setMarkers] = useState([]);

  // Fetch GeoJSON Data From "/geo-data/markers.geojson"
  useEffect(() => {
    fetch("/geo-data/markers.geojson")
      .then((response) => response.json())
      .then((data) => {
        const transformedMarkers = data.features.map((feature) => ({
          geocode: feature.geometry.coordinates.reverse(),
          popUp: feature.properties.popUp,
        }));
        setMarkers(transformedMarkers);
      });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <main className="flex-1">
        {view === "map" ? <LeafletMap markers={markers} /> : <TableView />}
      </main>

      <NavBar view={view} setView={setView} />
    </div>
  );
}
