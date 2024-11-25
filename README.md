# CST_3144_Front_End
# Lesson Management Frontend

A dynamic and user-friendly front-end application built with **Vue.js** for managing lessons. Users can browse, search, sort, and purchase lessons seamlessly, with real-time updates and interactive features.

---

## Features

- **Dynamic UI**: A responsive, interactive interface designed with Vue.js.
- **Search Functionality**: Search lessons by keywords such as subject or location.
- **Sorting Options**: Sort lessons by subject, price, location, or available spaces.
- **Shopping Cart**: Add lessons to a cart, calculate total price, and proceed to checkout.
- **Real-Time Feedback**: Displays available spaces dynamically and warns users when spaces are limited.

---

## Tech Stack

- **Frontend Framework**: Vue.js
- **Styling**: Font Awesome for icons and basic CSS.
- **Data Handling**: Fetches lessons and updates from a RESTful API.

---

## Setup Instructions

### Prerequisites

1. Ensure you have a running backend server to provide lesson data.
2. Install a live server (such as VS Code’s Live Server extension or any other static server).

### Steps to Run

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/lesson-management-frontend.git
    cd lesson-management-frontend
    ```

2. Open the `index.html` file in your preferred editor.

3. Start a live server to serve the application:
    - For VS Code, right-click `index.html` and choose **Open with Live Server**.
    - Alternatively, use a tool like `http-server`:
        ```bash
        npx http-server
        ```

4. Navigate to the application in your browser at `http://localhost:<port>`.

---

## File Structure
frontend/ │ ├── index.html # Main entry point for the application ├── index.js # Vue.js logic for interactivity and data handling ├── lessonData.js # Static lesson data for fallback or testing └── public/ # Contains images and other assets

yaml
Copy code


---

## Features in Detail

### 1. Browse Lessons
The home page dynamically fetches and displays lessons from the backend. Each lesson shows:
- Subject
- Location
- Price
- Spaces remaining
- An option to add the lesson to the cart.

### 2. Search and Sort
Users can:
- Search lessons by keywords like subject or location.
- Sort lessons by various attributes such as price, subject, and availability.

### 3. Cart Management
- Add lessons to a cart.
- View the total price of selected lessons.
- Remove lessons from the cart.

### 4. Checkout and Order Placement
- Collect user details (name and phone number) during checkout.
- Validate the form for correctness before placing an order.

---

## Example Workflow

1. Open the application in the browser.
2. Use the search bar to find a specific lesson.
3. Sort the lessons to find the best option (e.g., sort by price).
4. Add lessons to your cart and view the updated total price.
5. Proceed to checkout, fill in your details, and place the order.

---

## Code Highlights

### Vue.js Data Structure
The Vue.js app manages its state using the following data structure:
```javascript
data: {
    sitename: 'Lesson App',
    lessons: [], // Fetched from the backend
    cart: [], // Lessons added to the cart
    user: { name: '', phone: '' }, // User information for checkout
    searchQuery: '', // For searching lessons
    sortAttribute: 'subject', // Default sorting attribute
    sortOrder: 'asc', // Default sorting order
}

Dynamic Cart Updates
The application dynamically calculates available spaces:

javascript
Copy code
methods: {
    spaceLeft(lesson) {
        return lesson.Space - this.cart.filter(cartLesson => cartLesson.id === lesson.id).length;
    }
}
Future Enhancements
Styling: Add CSS frameworks for improved UI design.
Responsive Design: Optimize for mobile and tablet views.
Caching: Implement local storage to save cart data between sessions.
Offline Mode: Add fallback functionality using the static lessonData.js.


Here’s a refined and professional README.md tailored specifically for the frontend part of your project:

markdown
Copy code
# Lesson Management Frontend

A dynamic and user-friendly front-end application built with **Vue.js** for managing lessons. Users can browse, search, sort, and purchase lessons seamlessly, with real-time updates and interactive features.

---

## Features

- **Dynamic UI**: A responsive, interactive interface designed with Vue.js.
- **Search Functionality**: Search lessons by keywords such as subject or location.
- **Sorting Options**: Sort lessons by subject, price, location, or available spaces.
- **Shopping Cart**: Add lessons to a cart, calculate total price, and proceed to checkout.
- **Real-Time Feedback**: Displays available spaces dynamically and warns users when spaces are limited.

---

## Tech Stack

- **Frontend Framework**: Vue.js
- **Styling**: Font Awesome for icons and basic CSS.
- **Data Handling**: Fetches lessons and updates from a RESTful API.

---

## Setup Instructions

### Prerequisites

1. Ensure you have a running backend server to provide lesson data.
2. Install a live server (such as VS Code’s Live Server extension or any other static server).

### Steps to Run

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/lesson-management-frontend.git
    cd lesson-management-frontend
    ```

2. Open the `index.html` file in your preferred editor.

3. Start a live server to serve the application:
    - For VS Code, right-click `index.html` and choose **Open with Live Server**.
    - Alternatively, use a tool like `http-server`:
        ```bash
        npx http-server
        ```

4. Navigate to the application in your browser at `http://localhost:<port>`.

---

## File Structure

frontend/ │ ├── index.html # Main entry point for the application ├── index.js # Vue.js logic for interactivity and data handling ├── lessonData.js # Static lesson data for fallback or testing └── public/ # Contains images and other assets

yaml
Copy code

---

## Features in Detail

### 1. Browse Lessons
The home page dynamically fetches and displays lessons from the backend. Each lesson shows:
- Subject
- Location
- Price
- Spaces remaining
- An option to add the lesson to the cart.

### 2. Search and Sort
Users can:
- Search lessons by keywords like subject or location.
- Sort lessons by various attributes such as price, subject, and availability.

### 3. Cart Management
- Add lessons to a cart.
- View the total price of selected lessons.
- Remove lessons from the cart.

### 4. Checkout and Order Placement
- Collect user details (name and phone number) during checkout.
- Validate the form for correctness before placing an order.

---

## Example Workflow

1. Open the application in the browser.
2. Use the search bar to find a specific lesson.
3. Sort the lessons to find the best option (e.g., sort by price).
4. Add lessons to your cart and view the updated total price.
5. Proceed to checkout, fill in your details, and place the order.

---

## Code Highlights

### Vue.js Data Structure
The Vue.js app manages its state using the following data structure:
```javascript
data: {
    sitename: 'Lesson App',
    lessons: [], // Fetched from the backend
    cart: [], // Lessons added to the cart
    user: { name: '', phone: '' }, // User information for checkout
    searchQuery: '', // For searching lessons
    sortAttribute: 'subject', // Default sorting attribute
    sortOrder: 'asc', // Default sorting order
}
Dynamic Cart Updates
The application dynamically calculates available spaces:

javascript
Copy code
methods: {
    spaceLeft(lesson) {
        return lesson.Space - this.cart.filter(cartLesson => cartLesson.id === lesson.id).length;
    }
}
Example Lesson Data
The frontend fetches lesson data from the backend in the following format:

json
Copy code
{
    "id": 1,
    "subject": "Math",
    "Location": "London",
    "Price": 100,
    "image": "images/math.webp",
    "Space": 5
}
Future Enhancements
Styling: Add CSS frameworks for improved UI design.
Responsive Design: Optimize for mobile and tablet views.
Caching: Implement local storage to save cart data between sessions.
Offline Mode: Add fallback functionality using the static lessonData.js.
Why Choose This Frontend?
Simple and Intuitive: Designed with the user in mind for seamless navigation.
Dynamic Features: Real-time updates on cart and lesson availability.
Modular Code: Easy to extend and customize for new features.

License
This project is licensed under the ISC License.

Built with ❤️ and Vue.js

markdown
Copy code

### Key Improvements in This Version:
1. **Clean Layout**: Highlights features, setup, and usage without unnecessary details.
2. **Workflow Description**: Guides users on how to interact with the application.
3. **Future Enhancements**: Suggests potential improvements to show foresight.
4. **Professional yet User-Friendly**: Uses structured sections to make it easily navigable. 



 
