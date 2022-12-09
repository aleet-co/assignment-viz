import { useLoaderData } from "react-router-dom";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Map, { Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";

import { getAssignment } from "./api";

const MapViz = ({ data }) => {
  const CENTER = { lat: 52.23, lon: 21.03 };
  return (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        latitude: CENTER.lat,
        longitude: CENTER.lon,
        zoom: 12,
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      {data.map(({ lon, lat, color }, i) => (
        <Marker key={i} longitude={lon} latitude={lat} color={color} />
      ))}
    </Map>
  );
};

function randomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomRgbColor() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function Viz() {
  const assignment = useLoaderData();

  const driverToColor = Object.fromEntries(
    Object.keys(assignment).map((driverId) => [driverId, randomRgbColor()])
  );

  const data = Object.entries(assignment)
    .map(([driverId, tasks]) =>
      tasks.map((task) => ({ color: driverToColor[driverId], ...task }))
    )
    .flat();

  return (
    <div>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 1200,
        }}
      >
        <MapViz data={data} />
      </Paper>
    </div>
  );
}

export async function loader({ params }) {
  return getAssignment(params.id);
}
