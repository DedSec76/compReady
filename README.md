# compReady
# 🛒 Multi-API Price Comparison Tool

A web application that compares products using **two different external APIs**, allowing users to clearly and visually evaluate **price, rating, and relative value**.

The project simulates a real-world marketplace comparison scenario using **HTML, CSS, and Vanilla JavaScript**.

---

## 📌 Project Description

Today, users must visit multiple online stores to compare product prices and quality.

This project solves that problem by centralizing information and displaying objective and visual comparisons.

The application consumes data from:
- **FakeStore API**
- **DummyJSON API**

Because both APIs have different structures, the data is **normalized** before being processed and compared.

---

## 🎯 Target Audience

- Online shoppers
- General public
- Students
- Users who want to make informed purchasing decisions

---

## ⚙️ Main Features

1. Consumption of multiple REST APIs
2. Data normalization with different structures
3. Product filtering by category:

- Men

- Women

- Jewelry

- Electronics
4. Product listing in parallel columns
5. Visual product matching
6. Automatic comparison by:

- Price

- Rating

- Best value (rating/price)
7. Detailed comparison view
8. Animated visual comparison bars
9. Time persistence using `localStorage`

---

## 🧠 Comparison Logic

- **Price:** lower is better
- **Rating:** higher is better
- **Best value:** highest rating/price ratio

Results are calculated automatically and Objective.

---

## 🧱 Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Public REST APIs

No external frameworks or libraries are used.

---

## 🌐 APIs Used

- FakeStore API

https://fakestoreapi.com/products

- DummyJSON API

https://dummyjson.com/products?limit=200

Each product is transformed into a common structure before being used by the application.

---

## 📁 Project Structure