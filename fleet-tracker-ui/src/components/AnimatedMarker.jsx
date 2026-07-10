import { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import vehicleIcon from "../utils/VehicleIcon";

function AnimatedMarker({

    vehicle,
    children,
    eventHandlers

}) {

    const [position, setPosition] = useState([
        vehicle.currentLatitude,
        vehicle.currentLongitude
    ]);

    useEffect(() => {

        const start = position;

        const end = [
            vehicle.currentLatitude,
            vehicle.currentLongitude
        ];

        let frame = 0;

        const totalFrames = 30;

        const interval = setInterval(() => {

            frame++;

            const lat =
                start[0] +
                ((end[0] - start[0]) * frame) / totalFrames;

            const lng =
                start[1] +
                ((end[1] - start[1]) * frame) / totalFrames;

            setPosition([lat, lng]);

            if (frame >= totalFrames) {

                clearInterval(interval);

            }

        }, 50);

        return () => clearInterval(interval);

    }, [vehicle.currentLatitude, vehicle.currentLongitude]);

    return (

        <Marker
    position={position}
    icon={vehicleIcon}
    eventHandlers={eventHandlers}
>
    {children}
</Marker>

    );

}

export default AnimatedMarker;