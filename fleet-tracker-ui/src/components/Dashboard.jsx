import { useEffect, useState } from "react";
import { getAllVehicles } from "../services/vehicleService";

function Dashboard() {

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            const response = await getAllVehicles();
            setVehicles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1>Fleet Tracker Dashboard</h1>

            <hr />

            <h2>Total Vehicles : {vehicles.length}</h2>

            <hr />

            {vehicles.map(vehicle => (

                <div
                    key={vehicle.id}
                    style={{
                        border: "1px solid gray",
                        padding: "15px",
                        marginBottom: "15px",
                        borderRadius: "10px"
                    }}
                >

                    <h3>{vehicle.vehicleNumber}</h3>

                    <p>
                        <strong>Driver :</strong> {vehicle.driverName}
                    </p>

                    <p>
                        <strong>Status :</strong> {vehicle.status}
                    </p>

                    <p>
                        <strong>Speed :</strong> {vehicle.speed}
                    </p>

                    <p>
                        <strong>Latitude :</strong> {vehicle.currentLatitude}
                    </p>

                    <p>
                        <strong>Longitude :</strong> {vehicle.currentLongitude}
                    </p>

                </div>

            ))}

        </div>
    );
}

export default Dashboard;