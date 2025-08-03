# Full-Stack E-commerce Project 🚀

This is a comprehensive full-stack e-commerce application designed to provide a seamless online shopping experience for users  Built with modern web technologies, it features a robust backend, and secure payment processing.

# Features 📌

✔️ **User Authentication:** Secure user registration, login, and session management using <i>JWT</i>

✔️ **Product Catalog:** view detailed information for a wide range of products.

✔️ **Shopping Cart:** Add, remove, and update quantities of items in the shopping cart.

✔️ **Checkout Process:** A smooth and intuitive checkout flow.

✔️ **Payment Integration:** Secure online payment processing <i>Razorpay<i>

✔️ **Order Management:** Users can view their order history; Admin can manage all orders.

✔️ **Admin Dashboard:**  Track and update order statuses.


# Technologies Used 📌


This project is built with <strong>React</strong> for the frontend, <strong>Java Spring Boot</strong> for the backend, and <b>Neon Postgres</b> for the database.

## Frontend: 📌

✅ **React.js:** A JavaScript library for building user interfaces. 

✅ **React Router DOM:** For declarative routing in React applications.

✅ **React Redux:** Implemented Redux for state management.

✅ **Axios:** A promise-based HTTP client for making API requests.

✅ **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

✅ **State Management:** Redux Toolkit




## Backend: 📌

✅ **Java:** The primary programming language.
  
✅ **Spring Boot:** A framework that simplifies the development of production-ready, stand-alone Spring applications.

✅ **Spring Data JPA:** For easy database interaction and object-relational mapping.

✅ **Database:** Neon PostgreSQL

✅ **Build Tool:** Maven 

✅ **Authentication/Authorization:** Spring Security JWT

✅ **RESTful APIs:** For communication between frontend and backend.

✅ **Payment Gateway Integration:** Razorpay API.

## DevOps: 📌

✅ Docker - Containerization(backend)

✅ Netlify - Frontend deployment

✅ Render - Backend deployment


```diff
git clone https://github.com/JatinTekam/full-stack-e-commerce.git
cd fullstack-ecommerce

```


```diff
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

```



## 🌐 API Endpoints
The backend API is available at http://localhost:3000/api/v1

### Authentication Endpoints
<table>
  <tr>
  <th>
    method
  </th>
  <th>
    endpoint
  </th>
  <th>
    for
  </th>
  </tr>
    <tr>
  <td>
      POST 
  </td>
  <td>
      /api/v1/signup 
  </td>
  <td>
      User registration 
  </td>
    </tr>

  <tr>
    <td>
      POST 
    </td>
    <td>
      /api/v1/login 
    </td>
    <td>
      User login 
    </td>
  </tr>
</table>


 ### Order Management Endpoints
 <table>
  <tr>
  <th>
    method
  </th>
  <th>
    endpoint
  </th>
  <th>
    for
  </th>
  </tr>
    <tr>
  <td>
      POST 
  </td>
  <td>
      /api/v1/orders/place-order
  </td>
  <td>
      Place a new order
  </td>
    </tr>
  <tr>
    <td>
      GET 
    </td>
    <td>
      /api/v1/orders/order/{id}
    </td>
    <td>
       Get specific order details
    </td>
  </tr>
  <tr>
    <td>
      GET 
    </td>
    <td>
      /api/v1/orders/all
    </td>
    <td>
       Get all orders (user-specific)
    </td>
  </tr>
  <tr>
    <td>
      GET 
    </td>
    <td>
      /api/v1/orders/order/{id}
    </td>
    <td>
       Get specific order details
    </td>
  </tr>
  <tr>
    <td>
      POST 
    </td>
    <td>
      /api/v1/orders/verify
    </td>
    <td>
      Verify order payment
    </td>
  </tr>
</table>

## Admin Endpoints

 <table>
  <tr>
  <th>
    method
  </th>
  <th>
    endpoint
  </th>
  <th>
    for
  </th>
  </tr>
   <tr>
    <td>
      GET
    </td>
    <td>
     /api/v1/orders/all
    </td>
    <td>
      Get all orders (admin view)
    </td>
  </tr>
   <tr>
    <td>
      PUT
    </td>
    <td>
     /api/v1/orders/status/{id}?status={status}
    </td>
    <td>
      Update order status
    </td>
  </tr>
   
 </table>


 ## API Response Examples

### User registration

```ruby
{
    + "id": 2,
    "username": "JatinTekam",
    "createdAt": "2025-08-01T05:34:05.714829",
    "message": "User registered successfully Please login to proceed",
    "active": true
}

```

### User login

```ruby
{
    "id": 2,
    "username": "JatinTekam",
    "accessToken": "access token",
    "email": "tekamjatin@@gmail.com",
    "expiresIn": 1200,
    "tokenType": "Bearer",
    "message": "Welcome Jatin Tekam",
    "status": 200,
    "request": "tekamjatin@gmail.com"
}

```


###  Get all orders (user-specific)

```ruby
[
    {
        "id": 1,
        "userId": 1,
        "userAddress": "Jatin Tekam, Mahal, Nagpur Maharshtra, 440032",
        "phoneNumber": "97XX7895XXX",
        "email": "tekamjatin@gmail.com",
        "amount": 1200.0,
        "paymentStatus": "Paid",
        "razorpayOrderId": "order_QzvGedZsf9iURB",
        "orderStatus": "In process",
        "orderedProducts": [
            {
                "productId": 5,
                "url": "",
                "title": "Velvet Ember Jacket",
                "category": "Men",
                "color": "Oval Black",
                "description": "",
                "price": 700.0,
                "quantity": 1,
                "rating": 4.0,
                "size": "M"
            },
            {
                "productId": 8,
                "url": "",
                "title": "Ivory Drift Tee",
                "category": "Men",
                "color": "Oval Black",
                "description": "",
                "price": 500.0,
                "quantity": 1,
                "rating": 3.5,
                "size": "M"
            }
        ]
    }
]

```


### Get all orders (admin view)

```ruby
[
    {
        "id": 1,
        "userId": 1,
        "userAddress": "Jatin Tekam, Mahal, Nagpur Maharshtra, 440032",
        "phoneNumber": "97XXX56XX",
        "email": "tekamjatin@gmail.com",
        "amount": 1200.0,
        "paymentStatus": "Paid",
        "razorpayOrderId": "order_QzvGedZsf9iURB",
        "orderStatus": "In process",
        "orderedProducts": [
            {
                "productId": 5,
                "url": "",
                "title": "Velvet Ember Jacket",
                "category": "Men",
                "color": "Oval Black",
                "description": null,
                "price": 700.0,
                "quantity": 1,
                "rating": 4.0,
                "size": "M"
            },
            {
                "productId": 8,
                "url": "",
                "title": "Ivory Drift Tee",
                "category": "Men",
                "color": "Oval Black",
                "description": null,
                "price": 500.0,
                "quantity": 1,
                "rating": 3.5,
                "size": "M"
            }
        ]
    },
    {
        "id": 2,
        "userId": 2,
        "userAddress": "Harsh Sharma, Civil Line, Pune Maharashtra, 440012",
        "phoneNumber": "67XX65X147",
        "email": "Harsh@gmail.com",
        "amount": 700.0,
        "paymentStatus": "Paid",
        "razorpayOrderId": "order_Qzy6cjt6cjjeRw",
        "orderStatus": "In process",
        "orderedProducts": [
            {
                "productId": 3,
                "url": "",
                "title": "Urban Moss",
                "category": "Men",
                "color": "Oval Black",
                "description": null,
                "price": 700.0,
                "quantity": 1,
                "rating": 4.2,
                "size": "M"
            }
        ]
    }
]


```
