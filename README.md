![CI](https://github.com/egallardop13/WorkPoint-frontend/actions/workflows/ci.yml/badge.svg)

# WorkPoint - A platform that helps you manage your company in a simple and efficient way

**Your Organization, Simplified**  
WorkPoint is a high-performance, enterprise-level management dashboard designed to optimize and streamline company operations. It is designed to help you organize your work and keep track of your progress

## Features

- **Comprehensive Dashboards**  
  Visualize key metrics with interactive charts, graphs, and tables using Material UI.

- **Budget Tracking**  
  Monitor and manage budgets with ease, ensuring financial clarity at all levels.

- **Employee Monitoring**  
  Gain insights into employee activity and individual performance metrics.

- **Department-Level Analysis**  
  Dive deep into department-specific data for targeted decision-making.

- **Authentication & Authorization**  
  Secure user accounts with robust authentication mechanisms.

- **Full CRUD Operations**  
  Seamlessly create, read, update, and delete data throughout the application.

## Technology Stack

### Frontend

- **Next.js 14**: Fast, server-side rendered React framework with App Router.
- **React 18**: Dynamic, reusable components for a consistent user interface.
- **TypeScript 5**: Static type-checking across the entire codebase (`strict: true`).
- **TailwindCSS**: Utility-first CSS framework for responsive and modern interfaces.
- **Material UI**: Advanced UI components for charts, tables, and data grids.
- **Vitest + Testing Library**: Unit, integration, and component testing with jsdom environment.

### Backend

- **.NET C#**: Powers the backend with scalable, high-performance API endpoints, ensuring reliable data processing and management.
- **Dapper**: Used for database interactions, leveraging dynamic parameters for efficient and flexible querying.
- **SQL**: A relational database deployed on Azure for robust and scalable data management, with stored procedures to optimize query performance.
- **JWT Authorization**: Implements JSON Web Tokens for secure user authentication.

### Deployment

- **Frontend**: Deployed to **Vercel** for fast, scalable hosting.
- **Backend**: Deployed to **Azure** for reliable and secure cloud services.

## Live Demo

Experience the application [live](https://frontend-orcin-six-60.vercel.app/).

## Installation & Setup

To run the application locally, follow these steps:

### Prerequisites

- **Node.js**: Ensure Node.js (v20 or later) is installed on your system.
- **SQL Express**: Set up and configure SQL Express.

### Steps

1. **Clone the repository**  
   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/egallardop13/WorkPoint-frontend.git
   ```

2. **Install frontend dependencies**  
   Navigate to the frontend directory and install the required packages:

   ```bash
   cd WorkPoint-frontend
   npm install
   ```

3. **Create environment variables**

   Copy the example environment file and adjust as needed:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` to set `NEXT_BACKEND_URL` to your backend server address (default: `http://localhost:5000`).

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**  
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Running Tests

Run the full test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

Run tests with coverage report:

```bash
npm run test:coverage
```

## Backend Setup

The backend for this project is hosted in a separate [repository](https://github.com/egallardop13/WorkPoint-backend.git). Follow the steps below to set up the backend:

1. Clone the backend repository:

   ```bash
   git clone https://github.com/egallardop13/WorkPoint-backend.git
   cd WorkPoint-backend
   ```

2. Install dependencies:

   ```bash
   dotnet restore
   ```

3. Create an `appsettings.json` file:  
   If the file is not included in the repository, create it in the root directory of the backend project. Use the following structure as an example, updating the connection string with your SQL Express instance details:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=YOUR_DATABASE_NAME;Trusted_Connection=True;"
     },
     "Logging": {
       "LogLevel": {
         "Default": "Information",
         "Microsoft": "Warning",
         "Microsoft.Hosting.Lifetime": "Information"
       }
     },
     "AllowedHosts": "*"
   }
   ```

4. Update the database connection string in the `appsettings.json` file to match your local SQL Express instance.

5. Start the backend server:

   ```bash
   dotnet run
   ```

## CI/CD

Pull requests to `master` are automatically validated by GitHub Actions:

- **Lint** — ESLint with Next.js core-web-vitals rules
- **Type-check** — TypeScript strict mode compilation
- **Test** — Vitest test suite (72 tests)
- **Build** — Full Next.js production build

Merges to `master` are auto-deployed to Vercel.

## Contact

For any inquiries or support, reach out to [egallardodev@gmail.com](mailto:egallardodev@gmail.com).
