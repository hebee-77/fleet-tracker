import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {

    const socket = new SockJS("http://localhost:8080/fleet-tracker");

    stompClient = new Client({

        webSocketFactory: () => socket,

        reconnectDelay: 5000,

        onConnect: () => {

            console.log("✅ Connected to WebSocket");

       stompClient.subscribe(
    "/topic/vehicles",
    (message) => {

        console.log("📩 Message received");

        console.log(message.body);

        const vehicle = JSON.parse(message.body);

        onMessageReceived(vehicle);

    }
);
        },

        onStompError: (frame) => {

            console.error("STOMP Error:", frame);

        }

    });

    stompClient.activate();

};

export const disconnectWebSocket = () => {

    if (stompClient) {

        stompClient.deactivate();

    }

};