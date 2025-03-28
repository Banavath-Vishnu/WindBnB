# 🏡 WindBnB (MERN Stack)

A full-stack **Airbnb-inspired** booking system that allows users to **list, search, and book properties** with a seamless experience. Built using **MongoDB, Express.js, React, and Node.js (MERN stack)**.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication (Signup/Login).
- **Property Listings**: Users can list their properties with images and details.
- **Booking System**: Users can book available properties and view their reservations.
- **User Dashboard**: Manage bookings, listings, and profiles.
- **Responsive Design**: Fully optimized for mobile and desktop users.
- **Modern UI/UX**: Intuitive design with real-time updates and smooth navigation.

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API / Redux (if applicable)

## 📸 Screenshots

*(Add images of your app here)*

## 🏗️ Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/Banavath-Vishnu/WindBnB.git
   cd WindBnB
   ```

2. **Install dependencies**
   ```sh
   # Backend
   cd api
   npm install

   # Frontend
   cd ../client
   npm install
   ```

3. **Set up environment variables** (Create a `.env` file in the `backend` directory)
   ```sh
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. **Run the application**
   ```sh
   # Start backend server
   cd api
   npm start

   # Start frontend
   cd ../client
   npm start
   ```

5. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 🏗️ Folder Structure
```
/WindBnB
│── /api        # Express.js API (Routes, Controllers, Models)
│── /client       # React.js Frontend (Components, Pages, Context API)
│── /public         # Static Assets
│── .gitignore      # Git Ignore File
│── README.md       # Project Documentation
│── package.json    # Dependencies & Scripts
---
🚀 Built with ❤️ by [Banavath Vishnu](https://github.com/Banavath-Vishnu)
