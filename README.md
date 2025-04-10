<!-- PROJECT SHIELDS -->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues-open][issues-open-shield]][issues-url]
[![Issues-closed][issues-closed-shield]][issues-url]
[![Contributors][contributors-shield]][contributors-url]
[![Framework][badge-framework]][framework-url]
[![contributions welcome][contributions-welcome]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Israel-Laguan/grocery-store-server">
	  <img src="docs/images/grocery-store-logo.png" alt="Logo" width ="400"/>
  </a>

  <h1 align="center">
	Grocery Store Server
  </h1>

  <p align="center">
    Backend for managing grocery store operations
    <br />
	  🖊️
    <a href="https://github.com/Israel-Laguan/grocery-store-server">Explore the docs</a>
    🐞
    <a href="https://github.com/Israel-Laguan/grocery-store-server/issues">Report a Bug</a>
    🙋‍♂️
    <a href="https://github.com/Israel-Laguan/grocery-store-server/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

1. [The Project](#the-project)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
5. [API Testing](#api-testing)
6. [Author](#author)
7. [Contributing](#contributing)
8. [Show your support](#show-your-support)
9. [License](#license)

# The Project

The Grocery Store Server project provides a backend service for managing grocery store operations, such as inventory management, order processing, and customer data.

# Features

- 🛒 Manage inventory items and stock levels  
- 📦 Process customer orders and track order history  
- 🔐 Authentication and user roles (admin, customer)  
- 📊 Order summaries and historical views  

# Prerequisites

Before running the project, ensure you have the following installed on your machine:

- 🟢 [Node.js](https://nodejs.org/) (v14 or higher)
- 📦 [npm](https://www.npmjs.com/)
- 🗃️ [PostgreSQL](https://www.postgresql.org/)
- 🐳 [Docker](https://www.docker.com/)

# Getting Started

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Israel-Laguan/grocery-store-server.git
   ```

2. **Install dependencies**
  This project uses npm for dependency management. Ensure you have Node.js ≥ 14 installed.
   ```bash
   npm install
   ```

3. **Create the container**
  This project is containerized using Docker and orchestrated via docker-compose. The default configuration sets up both the API server and a PostgreSQL database.
    ```bash
    docker-compose up
    ```

4. **Run migrations and seed data (inside the container)**
  
    The PostgreSQL service is defined in the docker-compose.yml file as postgres, meaning it is only resolvable within the Docker network created by docker-compose. Therefore, to execute the migration and seeding commands, you must do so from the server container.
    First, access the server container:
    ```bash
    docker exec -it grocery-store-server-server-1 sh
    ```
    Then, run the migration command to create the required tables:

    ```bash
    npm run migrate
    ```
    And seed the database with sample data:

    ```bash
    npm run seed
    ```

Once the server is up and running, you can verify its health by visiting: 
```bash
http://localhost:8000 
```
You can use http://localhost:8000/health to check the connection status.
<p align="center"> <img src="docs/images/api-test-interface.png" alt="API Testing Screenshot" width="800"/> </p>

# API Testing
To validate the functionality of the API endpoints, a series of HTTP requests have been pre-configured and tested using Postman. These tests cover:

User endpoints (authentication, registration, role management)

```bash
http://localhost:8000/users
```
<p align="center">
 <img src="docs/images/api-test-users.png" alt="API Test Users" width="800"/> </p> 

Product endpoints (CRUD operations)
```bash
http://localhost:8000/products
```
 <p align="center"> <img src="docs/images/api-test-products.png" alt="API Test Products" width="800"/> </p> 

Purchase endpoints (order processing and inventory adjustments)

```bash
http://localhost:8000/buys
```
 <p align="center"> <img src="docs/images/api-test-buys.png" alt="API Test Buys" width="800"/> </p>

# Author

<table style="width:100%"> <tr> <td> <div align="center"> <a href="./docs/img/photo.png" target="_blank" rel="author"> <img src="https://avatars2.githubusercontent.com/u/36519478?s=460&v=4" style="border-radius: 10%; min-width: 100px;" alt="Israel Laguan's Photo" width="200px"> </a> <h2> <a href="https://israel-laguan.github.io/" target="_blank" rel="author"> Israel Laguan </a> </h2> </div> </td> <td> <div align="center"> <a href="mailto:israellaguan@gmail.com" target="_blank" rel="author"> <img src="https://img.icons8.com/color/48/000000/message-squared.png" style="border-radius: 10%" alt="My GitHub" height="45px"> <h3> Email me to <a href="mailto:israellaguan@gmail.com"> israellaguan@gmail.com </a> </h3> </a> <a href="https://www.linkedin.com/in/israellaguan/" target="_blank" rel="author"> <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="My Linkedin" height="45px"> <h3> Connect to my Linkedin </h3> </a> <a href="https://github.com/Israel-Laguan" target="_blank" rel="author"> <img src="https://img.icons8.com/color/48/000000/github--v1.png" style="border-radius: 10%" alt="My GitHub" height="45px" > <h3> Check my GitHub Profile </h3> </a> </div> </td> </tr> </table>



# Contributing

[![contributions welcome][contributions-welcome]][issues-url]


<img src="https://user-images.githubusercontent.com/74038190/216120981-b9507c36-0e04-4469-8e27-c99271b45ba5.png" alt="Handshake" width="20" /> Contributions, issues and feature requests are welcome! Feel free to check the <a href="https://github.com/Israel-Laguan/grocery-store-server/blob/main/CONTRIBUTING.md">Issues pages</a> 

# Show your support

🤗 Give a ⭐️ if you like this project!

<img src="https://user-images.githubusercontent.com/74038190/216122041-518ac897-8d92-4c6b-9b3f-ca01dcaf38ee.png" alt="Fire" width="120" />



# License

[![License][badge-license]](http://badges.mit-license.org)

📝 This project is licensed under the [MIT](LICENSE)\
Feel free to fork this project and improve it

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/Israel-Laguan/grocery-store-server?style=for-the-badge
[contributors-url]: https://github.com/Israel-Laguan/grocery-store-server/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Israel-Laguan/grocery-store-server?style=for-the-badge
[forks-url]: https://github.com/Israel-Laguan/grocery-store-server/network/members
[stars-shield]: https://img.shields.io/github/stars/Israel-Laguan/grocery-store-server?style=for-the-badge
[stars-url]: https://github.com/Israel-Laguan/<repo>/stargazers
[issues-open-shield]: https://img.shields.io/github/issues/Israel-Laguan/grocery-store-server?style=for-the-badge
[issues-url]: https://github.com/Israel-Laguan/grocery-store-server/issues
[issues-closed-shield]: https://img.shields.io/github/issues-closed/Israel-Laguan/grocery-store-server?style=for-the-badge
[badge-framework]: https://img.shields.io/badge/framework-here-9cf?style=for-the-badge
[framework-url]: https://google.com
[contributions-welcome]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=for-the-badge
[badge-license]: https://img.shields.io/:license-mit-blue.svg?style=for-the-badge