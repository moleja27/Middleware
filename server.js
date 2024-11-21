import express from "express";
const app = express();

const PORT = 3000;

// Global middleware to log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request made to: ${req.url}`);
    next(); // Pass the request to the next middleware or route handler
});

// Route-specific middleware to check user authentication
const checkAuth = (req, res, next) => {
    const isAuthenticated = req.headers["x-auth-token"] === "12345"; // Example token check
    if (!isAuthenticated) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
    next(); // User is authenticated, proceed to the route handler
};

// Public route (no authentication required)
app.get("/", (req, res) => {
    res.send("Welcome to the public home page!");
});

// Protected route (authentication required)
app.get("/protected", checkAuth, (req, res) => {
    res.send("Welcome to the protected route! You are authenticated.");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

