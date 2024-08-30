import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import React, { FC } from "react";

const MapMarker: FC<{
  location: { lat: number; lng: number };
  spotIndex: number;
  targetSpot: number | undefined;
}> = ({ location, spotIndex, targetSpot }) => {
  // @ts-ignore
  return spotIndex === targetSpot ? (
    <AdvancedMarker position={location} />
  ) : (
    <AdvancedMarker position={location}>
      <Pin
        background={"#4b90f5"}
        borderColor={"#1965c4"}
        glyphColor={"#1965c4"}
      />
    </AdvancedMarker>
  );
};

export default MapMarker;
