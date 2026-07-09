package com.hebee.fleet_tracker.websocket;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.hebee.fleet_tracker.dto.VehicleLocationDTO;

@Component
public class VehicleLocationPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public VehicleLocationPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void publish(VehicleLocationDTO dto) {

        messagingTemplate.convertAndSend(
                "/topic/vehicles",
                dto);

    }

}