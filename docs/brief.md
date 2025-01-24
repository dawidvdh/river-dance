# Build a Bitcoin Price Chart - React Native

## Requirements

- Use React Native.
- Fetch data from the River API to:
  - Show the current Bitcoin price.
  - Create a price chart for the different user-selected time frame options.
- Add any additional price context you think is necessary (e.g., high/low prices) for an intuitive chart.
- Ensure the chart data stays updated and refreshed within a timeframe that makes sense for users.

## River API

The River API uses GraphQL to handle requests. While you could use a GraphQL client, it is not recommended. Fetching the data in RESTful requests should suffice for this task. Below are examples of how to request the price and chart data.

### Curl Query Examples

#### Current Price Only

```bash
$ curl 'https://river.com/api' -H 'content-type: application/json' \
--data-binary '{"query":"query { currentPrice { id  mid } }"}'
```

### Current Price and Chart History

```bash
$ curl 'https://river.com/api' -H 'content-type: application/json' \
--data-binary '{"operationName": "CurrentPriceOnly", "query": "query CurrentPriceOnly($timeFrame: TimeFrame!) { 
  currentPrice {  
    __typename 
    ...PriceFragment 
  } 
  chartPrices(timeFrame: $timeFrame) {  
    __typename 
    ...ChartPriceFragment 
  } 
} 
fragment PriceFragment on Price { 
  __typename 
  id  
  datetime  
  mid 
} 
fragment ChartPriceFragment on ChartPrice {  
  __typename  
  datetime  
  rate 
}", 
"variables": {"timeFrame": "MONTH"}}'

```

### Time Frame Options

The available time frame options are:

- `ALL`
- `DAY`
- `WEEK`
- `MONTH`
- `YEAR`