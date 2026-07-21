import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

function MapUpdater({ selectedVehicle }) {
    const map = useMap();
    const previousVehicleId = useRef(null);

    useEffect(() => {
        if (!selectedVehicle) return;

        if (previousVehicleId.current !== selectedVehicle.id) {
            previousVehicleId.current = selectedVehicle.id;

            map.flyTo(
                [
                    selectedVehicle.currentLatitude,
                    selectedVehicle.currentLongitude
                ],
                16,
                {
                    duration: 1.2
                }
            );
        }
    }, [selectedVehicle?.id]);

    return null;
}

export default MapUpdater;
