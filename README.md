# Travel Management System

![Artboard-2](https://github.com/user-attachments/assets/4b941c54-f5d8-40ab-9049-a44412c88042)

## Overview
Our web application allows travel businesses to attract more customers, offering services such as vehicle rental, hotel booking, travel guides, and location reviews. It enhances customer experience by providing detailed information about travel destinations, offering special event services, and supporting customers throughout their journey planning. This easy-to-use application is designed to be user-friendly, making it easier for customers to plan and enjoy their travels.


## Key Features

- **Vehicle Rental:** Customers can rent vehicles suited to their travel needs.
- **Hotel Booking:** Book accommodations at preferred travel destinations.
- **Travel Guide:** Access information about various travel destinations.
- **Location Reviews:** Customers can leave reviews based on their experiences.
- **Special Event Planning:** Organize surprise parties or special events.
- **Customer Support:** Get assistance with travel planning or website issues.
- **Weather Updates:** Integrated weather chatbot for real-time weather updates.

## Installation

### Prerequisites

- **Node.js** (v16 or above)
- **MongoDB Atlas Account** and Cluster
- **Git** (Optional, but recommended for version control)

### Clone the Repository

```bash
git clone https://github.com/your-repo/travel-management-system.git
cd travel-management-system
```

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install Backend Dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   MONGODB_URL=<Your MongoDB Atlas URL>
   WEATHER_API_KEY=8ec3ac71de234ff6f0a41ac53177b7f1
   ```

4. Start the Backend Server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```

2. Install Frontend Dependencies:
   ```bash
   npm install
   ```

3. Start the Frontend Server:
   ```bash
   npm start
   ```

---

## Project Structure

```
/frontend  # React.js front-end code
/backend   # Express.js and Node.js back-end code
```

### Backend Dependencies

```json
"dependencies": {
  "axios": "^1.7.7",
  "bcrypt": "^5.1.1",
  "bcryptjs": "^2.4.3",
  "body-parser": "^1.20.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "express-async-handler": "^1.2.0",
  "express-validator": "^7.2.0",
  "jsonwebtoken": "^9.0.2",
  "mongodb": "^6.9.0",
  "mongodb-connection-string-url": "^3.0.1",
  "mongoose": "^8.7.0",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.9.15",
  "nodemon": "^3.1.3",
  "openai": "^4.67.3",
  "react-router-dom": "^6.26.2"
}
```

### Frontend Dependencies

```json
"dependencies": {
  "@fortawesome/fontawesome-svg-core": "^6.5.1",
  "@fortawesome/free-brands-svg-icons": "^6.5.1",
  "@fortawesome/free-regular-svg-icons": "^6.5.1",
  "@fortawesome/free-solid-svg-icons": "^6.5.1",
  "@fortawesome/react-fontawesome": "^0.2.0",
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "apexcharts": "^3.48.0",
  "axios": "^1.6.7",
  "firebase": "^10.11.0",
  "flowbite": "^2.3.0",
  "flowbite-react": "^0.7.3",
  "history": "^5.3.0",
  "pdfmake": "^0.2.10",
  "html2canvas": "^1.4.1",
  "html2pdf": "^0.0.11",
  "jspdf": "^2.5.1",
  "react": "^18.2.0",
  "react-apexcharts": "^1.4.1",
  "react-dom": "^18.2.0",
  "react-google-charts": "^4.0.1",
  "react-icons": "^5.0.1",
  "react-router-dom": "^6.22.0",
  "react-scripts": "^5.0.1",
  "react-to-print": "^2.15.1",
  "recharts": "^2.12.4",
  "sweetalert2": "^11.10.8",
  "web-vitals": "^2.1.4"
}
```

---

## MongoDB Setup

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a cluster.
3. Replace `MONGODB_URL` in the backend `.env` file with your cluster's connection string.

---

## Weather API Key Setup

Replace `WEATHER_API_KEY` in the backend `.env` file with your weather API key:
```
WEATHER_API_KEY=8ec3ac71de234ff6f0a41ac53177b7f1
```

# Contributors

We'd like to extend our heartfelt thanks to the following individuals who have contributed to the development of our Travel Management System:

| Contributor | GitHub Profile | Roles |
|-------------|----------------|-------|
| **Vidura**  | [vidura-12](https://github.com/vidura-12) | Project Owner, Full Stack Developer |
| **Buwaneka** | [Buwaneka99](https://github.com/Buwaneka99) | Backend Developer, API Integration |
| **Kalpa Vidusha** | [KalpaVidusha](https://github.com/KalpaVidusha) | Frontend Developer, UI/UX Design |
| **Sonadi** | [Sonadi](https://github.com/Sonadi) | Quality Assurance, Testing |
| **Dilshani** | [Dilshani16](https://github.com/Dilshani16) | Database Management, Data Modeling |
| **Nimesha** | [Nimesha4](https://github.com/Nimesha4) | DevOps, Deployment, CI/CD |
| **Harini Hettiarachchi** | [HariniHettiarachchi](https://github.com/HariniHettiarachchi) | Documentation, User Support |
| **Kavitha Niwandi** | [kavithaniwandi](https://github.com/kavithaniwandi) | Frontend Developer, Feature Implementation |

Each of these individuals has played a crucial role in making this project successful. Thank you for your time, energy, and dedication to building this platform!

---

## License

[MIT License](LICENSE)

