# HRMS Lite

## Overview
A lightweight Human Resource Management System (HRMS Lite) that allows admins to manage employees and track attendance.

## Tech Stack
Frontend: React (Vite, TailwindCSS)  
Backend: Node.js, Express  
Database: MongoDB Atlas  
Deployment: Vercel (Frontend), Render (Backend)

## Features
- Add, view, delete employees
- Mark attendance (Present/Absent)
- View attendance records
- RESTful API with validations

## Run Locally

### Backend
cd hrms-backend
npm install
npm run dev

### Frontend
cd hrms-frontend
npm install
npm run dev

## Environment Variables

Backend:
MONGO_URI=your_mongodb_uri
PORT=5000

Frontend:
VITE_API_URL=your_backend_url

## Assumptions
- Single admin user
- No authentication implemented

## Limitations
- No pagination
- No edit employee feature
