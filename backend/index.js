const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const User = require("../backend/models/user");
const Order = require("../backend/models/order");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://ziyamuslum:ziya@ecom-cluster.py0vfbp.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => console.log("MongoDB Connection error: ", err));

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

// Function for sending a verification email

const sendVerificationEmail = async (email, verificationToken) => {
  // Nodemailer transport

  const transporter = nodemailer.createTransport({
    // Confiuring an email address

    service: "gmail",
    auth: {
      user: "kamil.ismayilzade.2016@gmail.com",
      pass: "tcms kkgx ethi jbzp",
    },
  });

  // Compose the email message

  const mailOptions = {
    from: "ecommerce.com",
    to: email,
    subject: "Ecommerce email verification",
    text: `Please click the following link to verify your email address: http://10.0.2.2:8000/verify/${verificationToken}`,
  };

  // Sending an email

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending a verification email: ", error);
  }
};

// Register endpoint

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received request payload:", req.body);

    // Check if the user is already registered

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Create a new user

    const newUser = new User({ name, email, password });

    // Generate and store the verification token

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Saving a user to the database

    await newUser.save();

    // Sending a verification email to the user

    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log("Error registering: ", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Email verification endpoint

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // Find the user with the provided token

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    // Mark the user as verified

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified succesfully!" });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
});

// Generating a secret key function

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// Login endpoint

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user is already exists

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generating a token

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
