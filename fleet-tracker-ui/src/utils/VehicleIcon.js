import L from "leaflet";
import truckIcon from "../assets/truck.svg";

const vehicleIcon = new L.Icon({
    iconUrl: truckIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
});

export default vehicleIcon;