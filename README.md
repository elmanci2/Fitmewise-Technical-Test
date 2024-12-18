# Fitmewise Technical Test

This document provides instructions for setting up and running the Fitmewise technical test, which consists of both frontend and backend components.

## Frontend Setup and Execution

1. Install dependencies:
   Open your terminal, navigate to the frontend project directory, and run:

   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the root of your frontend project and add the following line:

   ```dotenv
   VITE_API_URL=your_api_url
   ```

   Replace `your_api_url` with the actual URL of your backend API.

3. Run the application:
   In the terminal, execute:

   ```bash
   npm run dev
   ```

4. Access the application:
   Open your web browser and navigate to `http://localhost:5173` or the port specified in your terminal output.

## Backend Setup and Execution

1. Start the Laravel server:
   Open a new terminal window, navigate to your backend project directory, and run:

   ```bash
   php artisan serve
   ```

2. Access the backend:
   The Laravel server will typically start at `http://localhost:8000`. Confirm the exact URL in your terminal output.

3. Configure environment variables:
   Create a `.env` file in the root of your backend project and add the following line:

   ```dotenv
   OPENWEATHER_API_KEY=your_api_key
   ```

   Replace `your_api_key` with your actual OpenWeather API key.

4. Test API endpoints:
   You can test the following API endpoints using your browser or a tool like Postman:

   - Current weather:
     ```
     http://localhost:8000/api/weather/current?city=Madrid&country=ES
     ```

   - Weather forecast:
     ```
     http://localhost:8000/api/weather/forecast?city=Madrid&country=ES&days=5
     ```

   Note: Replace `Madrid` and `ES` with the desired city and country code, respectively. Adjust the `days` parameter in the forecast endpoint as needed.

## Additional Notes

- Ensure that you have Node.js and PHP installed on your system before running the frontend and backend, respectively.
- If you encounter any issues with CORS (Cross-Origin Resource Sharing) when the frontend tries to communicate with the backend, you may need to configure CORS settings in your Laravel application.
- Remember to keep your API keys confidential and never commit them to version control systems.
