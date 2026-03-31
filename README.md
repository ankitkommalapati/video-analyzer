# Video Upload, Processing & Streaming Platform

A full-stack application that allows users to upload videos, processes them for content sensitivity, and streams them efficiently with real-time progress updates.


## Overview

This project implements a complete video management system with:
* Secure video upload and storage
* Asynchronous processing pipeline (sensitivity detection)
* Real-time progress updates using WebSockets
* Efficient video streaming using HTTP Range Requests
* Multi-tenant architecture with role-based access control (RBAC)

## Tech Stack

### Backend
* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.io
* Multer (file uploads)
* JWT Authentication

### Frontend (optional / planned)
* React (Vite)
* Axios
* Socket.io Client

## Key Features

### Video Upload
* Upload videos (max 50MB)
* Stored locally in /uploads/videos
* Metadata stored in MongoDB

### Processing Pipeline
* Asynchronous video processing
* Simulated sensitivity analysis (safe / flagged)
* Status flow: ``` uploaded → processing → processed ```

### Real-Time Updates
* Socket.io emits:
  * Processing progress (20%, 50%, 80%, 100%)
  * Completion events

### Video Streaming
* HTTP Range Request support
* Enables:
  *	Partial loading
  *	Smooth playback
  *	Seeking
 
### Authentication & Authorization
* JWT-based authentication
* Role-based access control:
  
  | Role | Permissions |
  |---|---|
  | Admin | Full Access |
  | Editor | Upload & manage videos |
  | Viewer | Read-only access |

### Multi-Tenant Architecture
* Users belong to organizations
* Data isolation enforced at query level
* No cross-organization access

### Architecture Flow
```
Upload → Save File → Save Metadata → Trigger Processing
        → Emit Progress (Socket.io)
        → Update DB → Stream via Range Requests
```

## API Endpoints

### Auth
* POST /api/auth/register → Register user
* POST /api/auth/login → Login & get JWT

### Videos
* POST /api/videos/upload → Upload video (Admin, Editor)
* GET /api/videos → List videos (with filters)
* GET /api/videos/:id/stream → Stream video

## Query Parameters

### Filter videos:
```
/api/videos?status=processed
/api/videos?sensitivity=flagged
/api/videos?status=processed&sensitivity=safe
```

## Setup Instructions

### Clone Repository
```
git clone https://github.com/ankitkommalapati/video-analyzer
cd backend
```

### Install dependencies
```
npm install
```

### Setup environment variables
Create a .env file:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run server
```
npm run dev
```

## Testing

Use tools like:
* Postman

### Upload Video:
* Method: POST
* Route: /api/videos/upload
* Headers: ```Authorization: Bearer <token>```
* Body: form-data → video (file)

## Demo Flow
* Register/Login
* Upload video
* Observe processing (real-time updates)
* Check status (safe / flagged)
* Stream video
* Filter videos

## Deployment
* Backend: Render
* Database: MongoDB Atlas

## Design Decisions
* Used service layer abstraction for scalability
* Implemented non-blocking processing pipeline
* Designed storage abstraction for future S3 integration
* Used HTTP range streaming for performance
* Enforced multi-tenant isolation at query level

## Future Improvements
* Real ML-based sensitivity detection
* Cloud storage (AWS S3)
* Video compression & adaptive streaming
* CDN integration
* Frontend dashboard

Made with 🩵, by Ankit!
