# Crypto Arbitrage Application

## Introduction

This application is designed to automate the process of cryptocurrency arbitrage across various exchanges. It continuously fetches and compares cryptocurrency prices from different platforms and executes trades when profitable opportunities arise, maximizing returns with minimal user intervention.

## Key Features

- **Real-time Price Monitoring**: Fetches live cryptocurrency prices from multiple exchanges.
- **Automated Trading**: Executes trades when arbitrage opportunities meet predefined profit thresholds.
- **User Management**: Handles user accounts including settings for arbitrage configurations.
- **Trade History**: Records and displays historical trading data for performance analysis.
- **Responsive UI**: Provides a seamless user interface that adapts to various devices.

## Technologies

- **Frontend**: React.js with Material-UI for a responsive design.
- **Backend**: Node.js with Express for API management and Socket.io for real-time communication.
- **Database**: MongoDB, utilized for storing user data, trade records, and arbitrage configurations.
- **Additional Tools**: Mongoose for database schema modeling, axios for HTTP requests, and dotenv for environment variable management.

## Data Model

- **User**

  - `_id`: Unique identifier
  - `name`: User's name
  - `email`: User's email for login
  - `password`: Hashed password for security
  - `arbitrageConfig`: Reference to user-specific arbitrage settings

- **Arbitrage Configuration**

  - `_id`: Unique identifier
  - `user`: Reference to the user
  - `updateInterval`: Frequency of price updates
  - `cryptocurrencyPairs`: Selected pairs for arbitrage
  - `profitThreshold`: Minimum profit required to initiate a trade
  - `arbitrageStrategy`: Type of arbitrage strategy (e.g., triangular, spatial)

- **Trade Record**

  - `_id`: Unique identifier
  - `user`: Reference to the user
  - `cryptocurrencyPair`: Traded pair
  - `type`: Trade type (buy or sell)
  - `price`: Execution price
  - `quantity`: Amount traded
  - `date`: Timestamp of the trade

- **Price Data**
  - `_id`: Unique identifier
  - `cryptocurrencyPair`: Relevant pair
  - `price`: Recorded price
  - `date`: Timestamp of price recording

## API Endpoints

- **User Management**

  - `GET /api/users`: Fetch all users
  - `POST /api/users`: Create a new user
  - `GET /api/users/{id}`: Get user details
  - `PUT /api/users/{id}`: Update user details
  - `DELETE /api/users/{id}`: Delete a user

- **Arbitrage Configuration**

  - `GET /api/arbitrage-configs`: Fetch all configurations
  - `POST /api/arbitrage-configs`: Create new configuration
  - `GET /api/arbitrage-configs/{id}`: Get configuration details
  - `PUT /api/arbitrage-configs/{id}`: Update configuration
  - `DELETE /api/arbitrage-configs/{id}`: Delete configuration

- **Price Data**

  - `GET /api/crypto-prices`: Fetch current prices for all pairs
  - `GET /api/crypto-prices/{pair}`: Fetch current price for a specific pair

- **Trading**
  - `POST /api/arbitrage-trades`: Execute a new arbitrage trade

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/crypto-arbitrage.git
   ```
