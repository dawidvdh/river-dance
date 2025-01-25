export const priceQuery = `
  {
    currentPrice {
      id
      mid
      datetime
    }
  }
`;

export const chartQuery = `
  query CurrentPriceOnly($timeFrame: TimeFrame!) {
    currentPrice {
      ...PriceFragment
    }
    chartPrices(timeFrame: $timeFrame) {
      ...ChartPriceFragment
    }
  }

  fragment PriceFragment on Price {
    id
    datetime
    mid
  }

  fragment ChartPriceFragment on ChartPrice {
    datetime
    rate
  }
`;
