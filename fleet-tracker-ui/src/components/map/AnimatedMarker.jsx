import { useEffect, useRef, useState } from "react";
import { Marker } from "react-leaflet";

import vehicleIcon from "../../utils/VehicleIcon";

function AnimatedMarker({
    vehicle,
    children,
    eventHandlers
}) {
    const [position, setPosition] = useState([
        vehicle.currentLatitude,
        vehicle.currentLongitude
    ]);

    const animationRef = useRef();

    useEffect(() => {
        const start = position;
        const end = [
            vehicle.currentLatitude,
            vehicle.currentLongitude
        ];

        const duration = 700;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const lat =
                start[0] +
                (end[0] - start[0]) * progress;

            const lng =
                start[1] +
                (end[1] - start[1]) * progress;

            setPosition([lat, lng]);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [
        vehicle.currentLatitude,
        vehicle.currentLongitude
    ]);

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
