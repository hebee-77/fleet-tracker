import { useEffect } from "react";
import { useMap } from "react-leaflet";

function MapUpdater({ selectedVehicle }) {

    const map = useMap();

    useEffect(() => {

        if (selectedVehicle) {

            map.flyTo(
                [
                    selectedVehicle.currentLatitude,
                    selectedVehicle.currentLongitude
                ],
                15,
                {
                    duration: 2
                }
            );

        }

    }, [selectedVehicle, map]);

    return null;
}

export default MapUpdater;