# Ecommerce App

## Overview

Welcome to our Ecommerce App! This application provides a seamless online shopping experience, featuring user authentication, product browsing, searching, and a dynamic shopping cart. Users can explore a diverse range of products and conveniently manage their shopping experience.

## Features

### User Authentication

- Secure login process using [DummyJSON Auth](https://dummyjson.com/docs/auth).
- Tokens are saved for authorization purposes.

### Protected Home Page

- The home page is a protected route, ensuring only logged-in users can access it.

### Product Browsing

- Fetches products dynamically from [DummyJSON Products](https://dummyjson.com/docs/products) API on the home page.

### Search Functionality

- Allows users to search for products based on their names.

### Price Filtering

- Enables users to filter products based on price, providing a refined search experience.

### Shopping Cart

- Fully functional shopping cart.
- "Add to Cart" button on product cards for easy item addition.
- Displays the cart count for quick reference.

### Dynamic Cart Updates

- Real-time updates of the cart count, providing immediate feedback.

### Total Cart Amount

- Shows the total amount of the cart, allowing users to track expenses.

### Visual Enhancements

- Dark and light modes for a visually appealing interface.

### Persistent Storage

- Utilizes local storage to ensure the persistence of added items, preventing loss after a page refresh.

## Getting Started

1. Clone the repository to your local machine.
    ```
    git clone https://github.com/jsjunayet/ecommerce.git
    ```

2. Navigate to the project directory.
    ```
    cd ecommerce
    ```

3. Install dependencies using npm.
    ```
    npm install
    ```

4. Run the application.
    ```
    npm start
    ```

6. Access the application at [http://localhost:3000](http://localhost:3000).

## Live link

Visit the live deployment of the app: [Ecommerce App](https://ecommerce-webiste-tau.vercel.app/)

## Technologies Used

- React
- [DummyJSON API](https://dummyjson.com/docs/auth)
- Other dependencies as listed in `package.json`

## Acknowledgments

Special thanks to the contributors and the DummyJSON API for providing essential functionalities for this project.

Feel free to contribute, report issues, or provide feedback to enhance the project further!
