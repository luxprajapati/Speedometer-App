# Speedometer-App

Speedometer is a web application in which the sensor speed data are inserted into the
database and at the same time we can show that speed data on the UI.

## System Architecture

The speedometer consists of three main components: frontend, backend, and database.

### Architecture Block Diagram

![Architecture Diagram](images/Architecture%20Block%20Diagram.png)

### Frontend

- The frontend is developed using React.js, enabling efficient state management
  and real-time data rendering. It establishes a WebSocket connection with the backend to
  fetch live speed updates and renders them dynamically on a visually appealing UI.
- Frontend Technologies: JavaScript, React.js, Tailwind CSS

### Backend

- The backend is implemented with Node.js and Express.js, and a WebSocket
  server for real-time data communication. It handles data generation, storage, and
  broadcasting to the frontend efficiently.
- Backend Technologies: JavaScript, Node.js, Express, WebSocket
- The backend generates speed data, inserts it into the database, and displays it on the UI. The data can also be collected from sensors and inserted into the database.

### Database

- The application utilizes PostgreSQL, a powerful relational database
  management system (RDBMS), to store sensor speed data securely. The database is
  optimized for real-time reads and writes, ensuring smooth and reliable performance.

## Usage Guide with Docker

1. Clone the repository from GitHub:

   ```sh
   git clone <repository-url>
   ```

2. Open Docker Desktop and pull the images from Docker Hub:

   ```sh
   docker pull luxprajapati/speedometer:frontend
   docker pull luxprajapati/speedometer:backend
   ```

3. Update the `DATABASE_URL` in the `docker-compose.yml` file to your database URL and the PostgreSQL environment variables to your credentials.

   ```
   DATABASE_URL= postgresql://Your_username"Your_password@postgres:5432/Your_DB_Name
   ```

4. Compose the cloned project:

   ```sh
   docker-compose up -d
   ```

5. After successfully composing, go to:
   [http://localhost:80](http://localhost:80)

6. To check the backend logs, go to Docker Desktop, navigate to the container section, and view the backend logs.

7. To check the PostgreSQL database:
   ```sh
   docker exec -it <postgres_container_id> bash
   psql -U postgres -d speedometer_DB
   \dt
   SELECT * FROM speed_data;
   ```

## Usage in Local System

### Prerequisites

- Ensure pgAdmin 4 is installed on your local system.

### Steps

1. Go to the `speedometer-app` directory and install the npm packages:

   ```sh
   npm install
   ```

2. Go to the `server` directory and install the npm packages:

   ```sh
   npm install
   ```

3. Add a `.env` file in your `server` folder with the following content:

   ```
   PORT=5000
   DATABASE_URL=postgresql://your-user-name:your-pgadmin-4-password@localhost:5432/database-name-you-created
   ```

4. Open pgAdmin 4 and create a new database.

5. Run the backend and frontend:

   ```sh
   # In the server directory
   npm run dev

   # In the speedometer-app directory
   npm start
   ```
