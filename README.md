# Kultur Ausstellungsplattform BackEnd DCI_FBW_WD22_D10 is here 👇

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- ajv
- cookie-parser
- cors
- jsonwebtoken
- dotenv

## Setup

### To run this project, install it locally using npm:
- `npm install`
- `npm run dev`

## API Endpoints

### Auth

| Method | Endpoint                             | Description                    | Body Data                                     |
| ------ | -------------------------------------| -------------------------------| ----------------------------------------------|
| POST   | `/auth/register/organizer`           | Register new organizer         | `firstname`, `lastname`, `email`, `password`  |
| POST   | `/auth/register/user`                | Register new user              | `username`, `email`, `password`               |
| POST   | `/auth/login`                        | Login user                     | `email / username`, `password`                |
| GET    | `/auth/logout`                       | Logout user                    |                                               |
| POST   | `/api/event`                         | Create new event               |   Shee below body data                        |
| PATCH  | `/api/event/:id`                     | Update event by id             |   Your Id shod mach to the event org id data  |
| DELETE | `/api/event/:id`                     | Delete event                   |   Your Id shod mach to the event org id data  |
| GET    | `/api/event/:id`                     | Get event by id                |                                               |
| PUT    | `/api/events/organizer/:organizerId` | Get all events by organizer id |                                               |
| PUT    | `/api/events/deactivate/:id`         | Get dezactivate a event        |                                               |
| GET    | `/api/events`                        | Get all events                 |                                               |
| GET    | `/api/artists`                       | Get all astists                |                                               |
| GET    | `/users/`                            | Get all users                  |                                               |
| GET    | `/users/:id`                         | Get user by id                 |                                               |
| PUT    | `/users/:id`                         | Update user by id              |     `firstname`, `lastname`, `password`       |

### Event to be created or modified need to be logged in as organizer or admin before you try to create or modify an event, please login as organizer or admin
#### Event body data

| Key                   | Type    | Required | Description              |
| --------------------- | ------- | ---      | ----------------------------- |
| eventTitle            | String  | Yes      | Event title                   |
| eventCategory         | String  | Yes      | Event category                |
| eventType             | String  | Yes      | Event type                    |
| img                   | String  | Yes      | Event image                   |
| description           | String  | Yes      | Event description             |
| homepage              | String  | Yes      | Event homepage                |
| dateStart             | Date    | Yes      | Event start date              |
| dateEnd               | Date    | Yes      | Event end date                |
| timeStart             | String  | Yes      | Event start time              |
| timeEnd               | String  | Yes      | Event end time                |
| isActive              | Boolean | Yes      | Event is active               |
| organizerId           | String  | Yes      | Event organizer must be login |
| venueName             | String  | Yes      | Event venue name              |
| venueType             | String  | Yes      | Event venue type              |
| city                  | String  | Yes      | Event city                    |
| street                | String  | Yes      | Event street                  |
| houseNumber           | String  | Yes      | Event house number            |
| zipCode               | String  | Yes      | Event zip code                |
| additionalAddressInfo | String  | No       | Event additional address info |
| artistName            | String  | No       | Event artist name             |
| artistType            | String  | No       | Event artist type             |
| artistDescription     | String  | No       | Event artist description      |
| artistHomepage        | String  | No       | Event artist homepage         |
| artistImg             | String  | No       | Event artist image            |



## For more information please visit the frontend repository

- [Frontend GitHub Repo][GitHub-frontend]

## .env file example

- ATLAS_URI=your mongodb atlas uri
- PORT=your port
- JWT_SECRET=your jwt secret
- ORIGIN=your origin url for cors like http://localhost:5000


# For any problem please open an issue on GitHub, we will try to fix it as soon as possible
# Happy Coding 🚀 and Happy Learning 📚

[GitHub-frontend]: https://github.com/NAMASTECH/Kultur-Ausstellungsplattform-frontend