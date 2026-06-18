# 🏀 SportsCenter - Premium Full-Stack E-Commerce

A professional, high-performance E-Commerce application built with **Java 21**, **Spring Boot 3.2**, and **React**. This project features a modern UI, real-time basket management with Redis, and a secure payment integration with Stripe.

## 🚀 Features

- **Modern UI/UX**: Overhauled Home and Contact pages with cinematic hero sections and glassmorphism design.
- **Secure Authentication**: JWT-based security with custom user credentials.
- **Real-time Shopping Cart**: Powered by **Redis** for lightning-fast basket updates.
- **Dual-Mode Payments**: 
    - **Stripe Integration**: Secure real-time card processing (Test Mode).
    - **Mock Payment Mode**: Simulates UPI, QR Code, and Net Banking flows for rapid testing.
- **Professional Catalog**: Advanced filtering by Brand and Type using MySQL.
- **Deployment Ready**: Fully dockerized with specialized production configurations.

## 🛠️ Tech Stack

- **Backend**: Java 21, Spring Boot 3.2, Spring Security, Spring Data JPA.
- **Frontend**: React (Vite), Redux Toolkit, Material UI (MUI).
- **Databases**: MySQL (Persistent Storage), Redis (Caching/Basket).
- **Tools**: Docker, Maven, Stripe API.

## 📦 Getting Started

### 1. Prerequisites
- **Java 21 JDK**
- **Node.js** (v18+)
- **Docker Desktop** (for MySQL and Redis)

### 2. Database Setup
The easiest way to start is using Docker:
```bash
docker compose -f docker/docker-compose.yml up -d
```

### 3. Run Backend
```bash
$env:JAVA_HOME = "C:\Program Files\Java\jdk-22" # Adjust path for your system
./mvnw spring-boot:run
```
*Backend runs at `http://localhost:8081`*

### 4. Run Frontend
```bash
cd client
npm install
npm run dev
```
*Frontend runs at `http://localhost:3000`*

## 💳 Payment Testing (Mock Mode)
By default, the Checkout page is in **Mock Mode**. You can toggle it to **Stripe Mode** at the top of the checkout screen.
- To use Stripe, add your `STRIPE_SECRET_KEY` to `src/main/resources/application.yaml` and your Publishable Key to `client/src/main.tsx`.

## 🌐 Deployment
This project is pre-configured for deployment on **Railway.app**, **Render**, or **Vercel**. 
- Use the provided `Dockerfile` for the backend.
- Set `VITE_API_URL` on the frontend to point to your live backend service.

---
Developed by [Aditi](https://github.com/Aditi-id)