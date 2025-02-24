"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@/styles/popup.css";

const LeafletMap = ({ markers }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Fix Leaflet default marker icons
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png")
          .default,
        iconUrl: require("leaflet/dist/images/marker-icon.png").default,
        shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
      });

      // Initialize map
      const map = L.map("map").setView([-7.75000004, 110.902], 10);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: "/marker.png",
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      markers.forEach((marker) => {
        const popupContent = `${marker.popUp}
          <div class="flex justify-center mt-2">
            <button type="button" class="whitespace-nowrap align-middle text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-[6px] text-[12px] px-2 py-1 text-center flex items-center">
              <img src="/table.svg" class="stroke-white w-6 h-6 mr-1.5" />View&nbsp;Table
            </button>
          </div>
        `;

        L.marker(marker.geocode, { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent, {
            className: "custom-popup",
            closeButton: false,
          });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [markers]);

  return <div id="map" className="h-full w-full" />;
};

export default LeafletMap;
