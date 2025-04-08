# LesGo

A web-based student queuing system built with a **Vite** frontend (React) and an **Express** backend. This project uses **MongoDB** for the database, and the frontend and backend are merged into one project.

## Features
- **Frontend**: Built using React (Vite), styled with Tailwind CSS.
- **Backend**: API server using Express.js and MongoDB with Mongoose.
- Production build served by Express after the Vite frontend build.

## Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local or use MongoDB Atlas)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/UnoDosOne/LesGo-WebApp.git
    cd LesGo-WebApp
    ```

2. **Install the dependencies**:
    Run the following command in the root of the project directory:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root of your project and configure it for MongoDB and other environment variables:
    ```bash
    MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/your-db-name?retryWrites=true&w=majority
    PORT=5000
    ```

## Running the Application

### 1. Development Environment
To run both the **frontend** (Vite) and **backend** (Express) in development mode, use the following command:

```bash
npm run dev
```

## License

This project is licensed under the MIT License. See the full text below:

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



