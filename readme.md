
# Gigaintel Truecaller API

## Description

This is a REST API to be consumed by a mobile app, similar to popular apps that identify spam numbers or allow users to find a person’s name by searching for their phone number.

## How to Run

1. Clone this repository to your local machine.
2. Install dependencies using npm:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and define the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=<your_MongoDB_URI>
   SESSION_SECRET=truecaller_maybe??
   ```
   Replace `<your_MongoDB_URI>` with your actual MongoDB URI.
4. Start the server:
   ```
   npm start
   ```

## Endpoints

### RESTful Endpoints

1. **Register User**
   - Endpoint: `POST /auth/register`
   - Action: Creates a new user resource.
   - HTTP Method: POST

2. **Login User**
   - Endpoint: `POST /auth/login`
   - Action: Authenticates a user and provides a token.
   - HTTP Method: POST

3. **Get User Profile**
   - Endpoint: `GET /profile`
   - Action: Retrieves the profile of the authenticated user.
   - HTTP Method: GET

4. **Mark a Number as Spam**
   - Endpoint: `POST /spam`
   - Action: Creates or updates a spam record for a phone number.
   - HTTP Method: POST

5. **Search by Phone Number**
   - Endpoint: `GET /search`
   - Action: Searches for a person by phone number.
   - HTTP Method: GET

6. **Get contact by clicking search result**
   - Endpoint: `GET /contacts`
   - HTTP Method: GET
   
   Retrieves a single contact based on two query parameters.

---

Make sure to replace `<your_MongoDB_URI>` with your actual MongoDB URI.