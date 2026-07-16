import L from "leaflet";

import truckIcon from "../assets/truck.svg";

const vehicleIcon = L.icon({


    iconUrl: truckIcon,

    iconSize: [42, 42],

    iconAnchor: [21, 21],

    popupAnchor: [0, -20]

});

export default vehicleIcon;