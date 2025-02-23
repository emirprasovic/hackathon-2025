# Contreebute
**Contreebute** is a platform that empowers users to support environmental causes through a secure donation system while tracking their impact via a leaderboard and personal dashboard. Users can explore eco-friendly products in the merchandise store. Our mission-driven About page highlights the platform's commitment to sustainability and environmental awareness.

## Features
-  **User Authentication**: Secure login and registration system

-  **Donation System**: Support environmental causes

-  **Leaderboard**: Track and compare environmental contributions

-  **Profile Management**: Personal environmental impact dashboard

-  **Merchandise Store**: Eco-friendly products

-  **About Page**: Information about our mission and impact

## Tech Stack

 - MongoDB
 - Express.js
 - React.js
 - Node.js
 - Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
Add `config.env` file for backend
```bash
cd backend
touch config.env
```
Then run this command to put the necessary code in this file
```bash
cat <<EOL > config.env
NODE_ENV="development"
PORT=3000

DATABASE_CONNECTION="mongodb+srv://emirprasovic:<PASSWORD>@cluster0.hnxq1.mongodb.net/contreebute?retryWrites=true&w=majority"
DATABASE_USER="emirprasovic"
DATABASE_PASSWORD="smxp.53e%40weqqNu"
DATABASE_PASSWORD_ENCODED="smxp.53e%40weqqNu"

JWT_SECRET="uRVCyfnVjwA3N30dSo8ILzrMT5brpuTa"
JWT_EXPIRATION_TIME="3d"
JWT_COOKIE_EXPIRATION_TIME="3"

TOGETHER_API_KEY="d4121cdf60814435b80cdae07df6385c92884b817d577edd59b3a499fbe248a0"

STRIPE_SECRET_KEY="sk_test_51QAavcAQvZCakeQqpSTvjWH15InPl6kpCEYWTkn00KecWd0PdOzjyqRNQiseFs20EYQ9PnBVWRtW3Eb1pwntpdPI00d8PqGZet"
EOL

```
Install dependencies for backend
```bash
npm install
```

Install dependencies for frontend
```bash
cd ../frontend/
npm install --legacy-peer-deps
```
### Run The Project
After we have downloaded the necessary dependencies, we can run the project. First let's start the backend side.
```bash
cd ../backend/
npm run start:dev
```
Now, we can start the frontend side.
```bash
cd ../frontend/
npm run dev
```
You can now visit `http://localhost:5173/` and enjoy the application :) 
### Project Structure
```bash
hackatchon-2025/
├── frontend/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   │   │   └── Chat.jsx
│   │   │   │   └── Header.jsx
│   │   │   │   └── MyDonations.jsx
│   │   │   │   └── Achievements.jsx
│   │   │   │   └── Redeem.jsx
│   │   │       └── Settings.jsx
│   │   ├── pages/
│   │   │   │   └── AboutPage.jsx
│   │   │   │   └── DonatePage.jsx
│   │   │   │   └── LandingPage.jsx
│   │   │   │   └── LeaderboardPage.jsx
│   │   │   │   └── LoginPage.jsx
│   │   │   │   └── MerchPage.jsx
│   │   │   │   └── ProfilePage.jsx
│   │   │       └── RegisterPage.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   │   └── main.jsx
│   │   └── index.css
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│   └── vite.config.js
│   └── README.md
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── controllerFactory.js
│   │   ├── donationController.js
│   │   ├── errorController.js
│   │   ├── paymentController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── donationModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── donationRouter.js
│   │   ├── paymentRouter.js
│   │   └── userRouter.js
│   ├── utils/
│   │   ├── AppError.js
│   │   └── catchAsync.js
│   │   ├── queryFeatures.js
│   ├── .gitignore
│   ├── app.js
│   ├── config.env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
```
## Tests
There is additional github repository with test for this application.
`https://github.com/salihRogo/hackaton2025-test.git`

## Our team

 - Emir Prašović
 - Ahmed Kedić
 - Haris Mešić
 - Edhem Rogo
 - Salih Rogo
 
