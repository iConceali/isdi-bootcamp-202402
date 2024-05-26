# Crypto Arbitrage Application

## Introduction

This application is designed to automate the process of obtaining cryptocurrency arbitrage signals on various exchanges. It continuously obtains and compares cryptocurrency prices from different platforms and gives trading signals when profitable opportunities arise, maximizing returns with user intervention.

![](https://steemitimages.com/0x0/https://media.giphy.com/media/lyVfVNRtHUKOs/giphy.gif)

### Key Features

- **Real-time price monitoring**: Get live cryptocurrency prices from multiple exchanges.
- **Opportunity Notifications**: Execute trades when arbitrage opportunities reach predefined profit thresholds.
- **User administration**: manage user accounts.
- **Trading History**: Records and displays historical trading data for performance analysis.
- **Responsive UI**: Provides a seamless user interface that adapts to various devices.

## Functional description

### Use cases

- see the introduction and description of the application (anonymous user)
- view dashboard (orders, prices, statistics, watchlist, arbitrage opportunities, ...)
- list cryptocurrency prices
- list cryptocurrency prices from your watchlist.
- list opportunities (standard strategy, triangular strategy)
- filter opportunities (by exchange, strategy, profitability threshold)
- list opportunities (technical indicators strategy)
- Add orders to a registration table to track user operations
- view and monitor the statistics of the user's operations.

#### Comming soon

- automation of the operation of cryptocurrency arbitration signals.
- visualization of a graph to follow the crypto market.
- more relevant information about cryptocurrencies and their whitepaper
- more strategies to generate profits with cryptocurrencies.
- basic, medium and advanced training in the world of cryptocurrencies to learn how to invest.

### Modules

- api
- app
- com
- doc

## Technical description

### Technologies

- **Frontend**: React.js with Material-UI for a responsive design.
- **Backend**: Node.js with Express for API management and Socket.io for real-time communication.
- **Database**: MongoDB, utilized for storing user data, orders records, crypto prices and arbitrage signals.
- **Additional Tools**: Mongoose for database schema modeling, axios for HTTP requests, and dotenv for environment variable management.

### Data Model

- **User**

  - `id`: Unique identifier, auto
  - `name`: User's name, string, required
  - `email`: User's email for login, string, required, unique
  - `password`: Hashed password for security, string, required, unique
  - `watchlist`: Reference to cryptoPrice-specific, [CryptoPrice], objectId
  - `deposit`: User deposit, number

- **Opportunity**

  - `id`: Unique identifier, auto
  - `type`: Standard o Traingular, string, required
  - `symbol`: Crypto symbol, string
  - `buyExchange`: Buying exchange name, string
  - `buyPrice`: Crypto purchase price, number
  - `sellExchange`: Selling exchange name, string
  - `sellPrice`: Crypto sale price, number
  - `profit`: Potential profit from the transaction, number
  - `from`: string
  - `to`: string
  - `amount`: number
  - `trades`: object, [from, to, amount]
  - `exchange`: Exchange name, string

- **Technical Opportunity**

  - `id`: Unique identifier, auto
  - `symbol`: Crypto symbol, string, required
  - `strategy`: Strategy name, string, required
  - `message`: Message to user, string, required
  - `rsi`: Rsi indicator value, number, required
  - `stochastic`: Stochastic indicator value, number, required

- **Crypto Price**

  - `id`: Unique identifier, auto
  - `symbol`: Crypto symbol, string, required, unique
  - `price`: Crypto price, number, required
  - `price24Hr`: Percentage of the crypto price variation in the last 24 hours, number, required
  - `marketCap`: Market capitalization, number, required

- **Orders Record**

  - `id`: Unique identifier, auto
  - `userId`: Reference to user-specific, [User], required
  - `symbol`: Crypto symbol, string, required
  - `date`: Date of the order, date, required
  - `investment`: Invested capital, number, required
  - `profitPercent`: Profit percentage, number, required
  - `profitDollars`: Profit dollars, number, required
