<div align="center">

# 🚚 Fleet Tracker

### Real-Time Fleet Tracking & Management System

A full-stack fleet management platform built with **Spring Boot**, **React**, **PostgreSQL**, **Hibernate**, and **WebSocket** for monitoring vehicles, drivers, and live location updates.

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-success?style=for-the-badge&logo=springboot)
![Hibernate](https://img.shields.io/badge/Hibernate-ORM-brown?style=for-the-badge&logo=hibernate)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![Material UI](https://img.shields.io/badge/Material_UI-UI-007FFF?style=for-the-badge&logo=mui)
![Vite](https://img.shields.io/badge/Vite-Build-purple?style=for-the-badge&logo=vite)
![Maven](https://img.shields.io/badge/Maven-Build-red?style=for-the-badge&logo=apachemaven)

</div>

---

# 📖 Overview

Fleet Tracker is a modern fleet management application that simulates a real-world logistics platform similar to **Uber Fleet**, **FedEx**, and **Amazon Logistics**.

The system enables administrators to manage vehicles and drivers, monitor fleet activity, and visualize simulated GPS movement in real time through a responsive dashboard.

This project was developed to demonstrate enterprise Java backend development, REST APIs, database management, and real-time communication between frontend and backend.

---


# 📸 Screenshots

## Dashboard

<img width="1280" height="832" alt="image" src="https://github.com/user-attachments/assets/ed90bef2-3ef7-4acc-a15a-148b15852c49" />



---

## Vehicle Management

<img width="1280" height="832" alt="Screenshot 2026-07-31 at 5 13 48 PM" src="https://github.com/user-attachments/assets/fdb1adf5-2e69-4ca6-ad91-34e112e08a9c" />


---

## Driver Management

<img width="1280" height="832" alt="image" src="https://github.com/user-attachments/assets/c1797bc8-1b05-48c6-a35c-97fd34a12bb3" />


---

## Analytics


<img width="1280" height="832" alt="Screenshot 2026-07-31 at 5 17 34 PM" src="https://github.com/user-attachments/assets/0e1e7620-2cc9-4131-907e-971771952186" />


---

## User Management

<img width="1280" height="832" alt="Screenshot 2026-07-31 at 5 18 21 PM" src="https://github.com/user-attachments/assets/ee22d519-29cd-4796-b25c-65b76112e693" />


---

##Settings

<img width="1280" height="832" alt="image" src="https://github.com/user-attachments/assets/3d3f2994-52c3-418d-ad9f-56e76ecffae1" />


---

# ✨ Key Features

## 🚗 Vehicle Management

- Add new vehicles
- Update vehicle details
- Delete vehicles
- Search vehicles
- Vehicle status management
- Pagination support

---

## 👨‍✈️ Driver Management

- Add drivers
- Update driver information
- Delete drivers
- Assign drivers to vehicles
- Driver search functionality

---

## 📍 Real-Time Tracking

- Simulated GPS movement
- Automatic coordinate updates
- Dynamic speed simulation
- Vehicle status monitoring
- Live frontend updates using WebSocket

---

## 📊 Dashboard Analytics

- Total Vehicles
- Active Vehicles
- Idle Vehicles
- Offline Vehicles
- Total Drivers
- Fleet Status Overview

---

# 🛠 Technology Stack

| Category | Technologies |
|----------|--------------|
| Backend | Java 21, Spring Boot |
| ORM | Hibernate, Spring Data JPA |
| Database | PostgreSQL |
| Frontend | React, Vite |
| UI | Material UI |
| Communication | REST API, WebSocket |
| Build Tool | Maven |
| Version Control | Git & GitHub |

---

# 🏗 Architecture

```text
                   +----------------------+
                   |   React Frontend     |
                   +----------------------+
                              |
                    REST API / WebSocket
                              |
                   +----------------------+
                   |  Spring Boot Backend |
                   +----------------------+
                              |
                  Spring Data JPA / Hibernate
                              |
                   +----------------------+
                   |     PostgreSQL       |
                   +----------------------+
```

---

# 📂 Backend Structure

```text
src
└── main
    └── java
        └── com.hebee.fleet_tracker
            ├── config
            ├── controller
            ├── dto
            ├── entity
            ├── exception
            ├── mapper
            ├── repository
            ├── scheduler
            ├── service
            │      └── impl
            ├── websocket
            └── FleetTrackerApplication
```

---

# 📊 Database Design

## Vehicle

| Field | Description |
|-------|-------------|
| id | Primary Key |
| vehicleNumber | Unique Vehicle Number |
| model | Vehicle Model |
| currentLatitude | Current Latitude |
| currentLongitude | Current Longitude |
| speed | Current Speed |
| status | ACTIVE / IDLE / OFFLINE |
| createdAt | Created Timestamp |
| updatedAt | Updated Timestamp |

---

## Driver

| Field | Description |
|-------|-------------|
| id | Primary Key |
| firstName | Driver First Name |
| lastName | Driver Last Name |
| email | Email Address |
| phone | Phone Number |
| licenseNumber | License Number |
| assignedVehicle | Assigned Vehicle |

---

# 🌐 REST APIs

## Vehicle APIs

| Method | Endpoint |
|---------|----------|
| GET | `/api/vehicles` |
| GET | `/api/vehicles/{id}` |
| POST | `/api/vehicles` |
| PUT | `/api/vehicles/{id}` |
| DELETE | `/api/vehicles/{id}` |

---

## Driver APIs

| Method | Endpoint |
|---------|----------|
| GET | `/api/drivers` |
| GET | `/api/drivers/{id}` |
| POST | `/api/drivers` |
| PUT | `/api/drivers/{id}` |
| DELETE | `/api/drivers/{id}` |

---

## Dashboard API

| Method | Endpoint |
|---------|----------|
| GET | `/api/dashboard` |

---

# ⚙️ Getting Started

## Clone Repository

```bash
git clone https://github.com/hebee-77/fleet-tracker.git
```

---

## Backend

```bash
cd fleet-tracker

mvn clean install

mvn spring-boot:run
```

---

## Frontend

```bash
cd fleet-tracker-ui

npm install

npm run dev
```

---

## PostgreSQL Configuration

Create a PostgreSQL database:

```sql
CREATE DATABASE fleet_tracker;
```

Configure your `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fleet_tracker
spring.datasource.username=postgres
spring.datasource.password=your_password
```

# 🚀 Future Improvements

- JWT Authentication
- Role-Based Access Control (RBAC)
- Google Maps Integration
- Real GPS Device Integration
- Kafka Event Streaming
- Redis Caching
- Docker Support
- Kubernetes Deployment
- Microservices Architecture
- Trip History
- Route Optimization
- Fuel Analytics
- Geofencing
- Notifications & Alerts

---

# 👨‍💻 Developer

**Hebee E**

Java Full Stack Developer


💼 GitHub: https://github.com/hebee-77

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

</div>
