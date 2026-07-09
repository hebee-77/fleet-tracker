import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapView({ vehicles }) {

    return (

        <MapContainer
            center={[17.3850, 78.4867]}
            zoom={11}
            style={{
                height: "500px",
                width: "100%",
                borderRadius: "12px",
                marginBottom: "30px"
            }}
        >

            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {vehicles.map(vehicle => (

                <Marker
                    key={vehicle.id}
                    position={[
                        vehicle.currentLatitude,
                        vehicle.currentLongitude
                    ]}
                >

                    <Popup>

    <h3>{vehicle.vehicleNumber}</h3>

    <p>
        <strong>Driver :</strong> {vehicle.driverName}
    </p>

    <p>
        <strong>Type :</strong> {vehicle.vehicleType}
    </p>

    <p>
        <strong>Status :</strong> {vehicle.status}
    </p>

    <p>
        <strong>Fuel :</strong> {vehicle.fuelType}
    </p>

    <p>
        <strong>Speed :</strong> {vehicle.speed.toFixed(1)} km/h
    </p>

    <p>
        <strong>Capacity :</strong> {vehicle.capacity} kg
    </p>

</Popup>

                </Marker>

            ))}

        </MapContainer>

    );

}

export default MapView;