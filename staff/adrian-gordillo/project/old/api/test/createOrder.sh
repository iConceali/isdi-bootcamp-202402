curl -X POST "http://localhost:3000/orders/663b25f03602dac462c820f8" \
     -H "Content-Type: application/json" \
     -d '{
           "symbol": "BTCUSDT",
           "date": "2023-05-17",
           "investment": 1000,
           "profitPercent": 5
         }'
