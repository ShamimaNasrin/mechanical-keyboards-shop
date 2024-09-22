# KeyClicks

### Live Preview:

## Introduction

Welcome to **KeyClicks**, the ultimate destination for mechanical keyboard enthusiasts. Whether you're a gamer, developer, or typing aficionado, **KeyClicks** offers a curated selection of mechanical keyboards to elevate your experience.

## Project Overview

**KeyClicks** is a modern e-commerce platform designed to provide a seamless and enjoyable shopping experience for anyone passionate about mechanical keyboards. Our website features a clean and intuitive interface, making it easy for users to find their perfect keyboard.

### Key Features

- **Homepage**: Engaging design with featured products, top brands, and customer testimonials.
- **Product Listings**: Easily browse through a variety of keyboards with advanced search, filtering, and sorting options.
- **Product Details**: In-depth product pages with images, specifications, and customer reviews.
- **Shopping Cart**: Manage your selections, adjust quantities, and proceed to checkout with ease.
- **Checkout Process**: Simple and secure, with options for Cash on Delivery and Stripe payment integration.
- **Dashboard**: Powerful tools for managing products, inventory, and orders.
- **About & Contact Pages**: Learn more about our mission and get in touch with us.
- **facqs**: Find your question answers here.

### Project Goals

The primary objective of **KeyClicks** is to deliver a top-notch online shopping experience for mechanical keyboard enthusiasts. Our goals include:

- Providing an intuitive and responsive user interface.
- Offering robust management tools for administrators.
- Ensuring secure transactions with multiple payment options.
- Creating a visually appealing and user-friendly website.

## Technology Stack

- **Frontend**: Built with `React` and `Vite`, leveraging `TypeScript` for type safety and maintainability.
- **State Management**: Utilizes `Redux` and `RTK Query` for efficient state and data management.
- **Backend**: Powered by `Node.js` and `Express.js`, with `MongoDB` as the database solution.
- **Authentication**: Secured with `JWT` (JSON Web Tokens) for user authentication.
- **Validation**: Uses `Zod` for robust schema validation.
- **UI/UX**: Designed with responsiveness and usability in mind, ensuring a smooth experience across all devices.

## Installation & Setup

### Prerequisites

- **Node.js**
- **MongoDB**
- **npm**

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ShamimaNasrin/mechanical-keyboards-shop.git
   cd mechanical-keyboards-client
   npm i
   ```

2. Run the app:

````bash
  npm run dev
  ```

## Usage

### Accessing the Frontend

After starting the development server, the frontend will be available at `http://localhost:5173`. Explore the platform by:

- Browsing through various mechanical keyboards and accessories.
- Viewing detailed product information, including specifications and customer reviews.
- Adding items to your cart and adjusting quantities.
- Proceeding to checkout and selecting your preferred payment method.

### Interacting with the Backend

With the backend server up and running, it will be accessible on the port defined in your `.env` file (default: `http://localhost:5000`). You can:

- Utilize the API to fetch, create, update, or delete product data.
- Manage user authentication and authorization using JWT tokens.
- Handle administrative tasks like inventory management and order processing through the provided endpoints.
````
