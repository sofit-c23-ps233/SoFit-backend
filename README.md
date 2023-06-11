# SoFit API Installation Guide

This guide will walk you through the process of setting up and installing an API using Express.js.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- Google App Engine
- Google Cloud SQL

## Getting Started

Follow the steps below to set up your API:

1. **Clone the Repository in Google Cloud Platform**

   Start by cloning the repository:

   ```
   git clone https://github.com/sofit-c23-ps233/SoFit-backend.git
   ```
2. **Create Cloud SQL**

   Before you set up the instances, you need to establish a connection to Cloud SQL:
   - Create and set up your Cloud SQL database.
   - Open "database" folder
   - Import the sofit_dev.sql file to define the table structure.

3. **Navigate to the Project Directory**

   Change to the project directory using the following command:

   ```
   cd SoFit-backend
   ```

4. **Install Dependencies**

   Install the project dependencies by running the following command:

   ```
   npm install / npm i
   ```

5. **Edit Environment Variables**

   Rename the file by deleting `.sample` in `.env.sample` file and edit a file named `.env` in the root directory of your project. This file will contain your environment-specific configurations. **Please ensure that all configurations match the ones you set up in Google Cloud SQL.**
   
5. **Start the Server**

   To start the API server, run the following command:

   ```
   npm run start
   ```

6. **Deploy in Google App Engine**

   To deploy the API server, run the following command:

   ```
   gcloud init
   gcloud app deploy
   ```

## Additional Configuration

- **Port Configuration**

  If you want to change the default port on which the server runs, you can specify it in the `.env` file by setting the `PORT` variable.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTORS -->
## Contributors

1. Rifqi Alamsyah - https://www.linkedin.com/in/rifqialamsyh/
2. Rastra Wardana Nanditama - https://www.linkedin.com/in/rastrawrdn/

<p align="right">(<a href="#readme-top">back to top</a>)</p>
