const { pool } = require("../config/database");

// Function to create the table in the database for storing the speed at different times.
const createTable = async () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS speed_data(
    id SERIAL PRIMARY KEY,
    speed INT NOT NULL,
    time TIME DEFAULT CURRENT_TIMESTAMP,
    date DATE DEFAULT CURRENT_DATE
  );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("speed_data table created successfully");
  } catch (err) {
    console.log("Error while creating speed_data table -- ", err);
  }
};

// Function to generate a random speed between the range 0 - 100
const generateRandomSpeed = (min = 1, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to store the speed data in the database
const storeSpeedData = async (speed) => {
  const insertSpeedDataQuery = `
  INSERT INTO speed_data(speed)
  VALUES($1)
  RETURNING *;
  `;

  try {
    const { rows } = await pool.query(insertSpeedDataQuery, [speed]);
    console.log("Speed data stored successfully -- ", rows[0]);
  } catch (err) {
    console.log("Error while storing speed data -- ", err);
  }
};

const startGeneratingSpeedData = (sendSpeedData) => {
  console.log("Speed generation started");

  let count = 0;
  const maxCount = 500;

  const intervalId = setInterval(async () => {
    if (count >= maxCount) {
      clearInterval(intervalId);
      console.log("Speed generation stopped");
      return;
    }

    const randomSpeed = generateRandomSpeed();
    await storeSpeedData(randomSpeed);
    sendSpeedData({ speed: randomSpeed });

    count++;
  }, 1000);
};

module.exports = { createTable, startGeneratingSpeedData };
