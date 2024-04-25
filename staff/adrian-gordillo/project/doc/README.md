# Crypto Arbitrage Application

## Introduction

This application is designed to automate the process of cryptocurrency arbitrage across various exchanges. It continuously fetches and compares cryptocurrency prices from different platforms and executes trades when profitable opportunities arise, maximizing returns with minimal user intervention.

### Key Features

- **Real-time price monitoring**: Get live cryptocurrency prices from multiple exchanges.
- **Opportunity Notifications**: Execute trades when arbitrage opportunities reach predefined profit thresholds.
- **User administration**: manage user accounts.
- **Trading History**: Records and displays historical trading data for performance analysis.
- **Responsive UI**: Provides a seamless user interface that adapts to various devices.

## Functional description

### Use cases

- view app intro and description (anonymous)
- view dashboard (orders, graphs, stats, ...)
- list crypto currency prices
- list opportunities (standard strategies)
- filter opportunities (by exchange, strategy)
- save filter
- list saved filters
- choose saved filter

## Technical description

### Technologies

- **Frontend**: React.js with Material-UI for a responsive design.
- **Backend**: Node.js with Express for API management and Socket.io for real-time communication.
- **Database**: MongoDB, utilized for storing user data, trade records, and arbitrage configurations.
- **Additional Tools**: Mongoose for database schema modeling, axios for HTTP requests, and dotenv for environment variable management.

### Data Model

- **User**

  - `id`: Unique identifier, auto
  - `name`: User's name, string, required
  - `email`: User's email for login, string, required
  - `password`: Hashed password for security, string, required
  - `arbitrageConfigs`: Reference to user-specific arbitrage settings, [ArbitrageConfig.id]

  **Exchange**

  - `id`: Unique idetifier, auto
  - `name`: Exchange's name, string, required
  - `buySaleComission`: number, required
  - `transferComission`: number, required

- **ArbitrageConfig**

  - `id`: Unique identifier, auto
  - `user`: Reference to the user, User.id, required
  - `name`: , string, required
  - `exchange`: Selected exchange, Exchange.id, required
  - `profitThreshold`: Minimum profit required to initiate a trade, number, optional
  - `arbitrageStrategy`: Type of arbitrage strategy, string (enum: triangular | standard | all), required

- **Trade Record**

  - `id`: Unique identifier
  - `user`: Reference to the user
  - `cryptocurrencyPair`: Traded pair
  - `profit`: Execution price
  - `amount`: Amount traded
  - `date`: Timestamp of the trade

- **Price Data**
  - `id`: Unique identifier
  - `cryptocurrencyPair`: Relevant pair
  - `price`: Recorded price
  - `date`: Timestamp of price recording
