package com.hebee.fleet_tracker.websocket;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class WebSocketPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendVehicleUpdate(Object vehicle) {

        messagingTemplate.convertAndSend(
                "/topic/vehicles",
                vehicle
        );

    }

}