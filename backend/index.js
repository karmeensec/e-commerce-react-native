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
    text: `Please click the following link to verify your email address: http://127.0.0.1:8000/verify/${verificationToken}`,
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

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
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

// Adding a new address endpoint

app.post("/address", async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Find a user by the id

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the user to the user address array

    user.address.push(address);

    // Save the updated user to the backend

    await user.save();

    res.status(200).json({ message: "Address created succesfully!" });
  } catch (error) {
    console.log("New address endpoint error: ", error);

    res.status(500).json({ message: "Error adding a new address" });
  }
});

// Get all the addresses of the specified user

app.get("/address/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.address;
    res.status(200).json({ addresses });
  } catch (error) {
    console.log("Getting all the addresses endpoint error: ", error);

    res.status(500).json({ message: "Error getting addresses!" });
  }
});

// Store all the orders endpoint

app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an array of product objects from the cart items

    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image,
    }));

    // Create a new order

    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: {
        name: shippingAddress?.name,
        houseNo: shippingAddress?.houseNo,
        mobileNo: shippingAddress?.mobileNo,
        street: shippingAddress?.street,
        landmark: shippingAddress?.landmark,
        postalCode: shippingAddress?.postalCode,
      },
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created succesfully!" });
  } catch (error) {
    console.log("Storing all the orders endpoint error: ", error);

    res.status(500).json({ message: "Error storing orders!" });
  }
});

// Get specified user profile

app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log("Getting the user profile endpoint error: ", error);

    res.status(500).json({ message: "Error getting the user profile!" });
  }
});

// Get orders for the specified user profile

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("User Id: ", userId);

    const user = await User.findById(userId);
    console.log("User itself: ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await Order.find({ user: userId }).populate("user");

    console.log("Your orders: ", orders);

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Orders not found for the specified user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.log("Getting the orders for user profile endpoint error: ", error);

    res.status(500).json({ message: "Error getting orders!" });
  }
});
