# API

TODO

## Installation and execution

TODO

## Endpoints

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
