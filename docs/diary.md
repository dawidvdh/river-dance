# Technical Decisions made

Based on [the brief](./brief.md) given, the following decisions have been made:

### Base Requirements

1. Display current bitcoin price.
2. Display bitcoin price chart.
3. Update Chart data based on timeframe of `ALL, DAY, WEEK, MONTH, YEAR`.

### Nice-to-have (more intuitive chart)

1. Display "Change": `Change: +$241.48 (+0.23%)` with color.
2. Display Current Price
3. Display "Last Updated": `Last updated: 10 minutes ago`

### Things that will be ignored in the interest of time

1. i18n
2. Accessibility
3. Connectivity Indication / Warning
4. API health checks / warnings
5. Analytics and Monitoring
6. Contextual loading and Error States
7. Style theme / Styling system
8. `.env` - this is good practice but overkill for this exercise.
9. Testing - some unit tests will be included however this I will focus the least on as I don't believe it to be very important for this exercise.

### Tech

Ideally will keep this as bare as possible.

1. **Expo Go** - this is a "test" codebase not production and its really simple to run and contains all the dependancies required for this exercise.
2. **React Native Skia** - ideal for the chart that needs to update and incredibly high performing.
3. **React Query** - for caching, polling, updates and error / retries.
4. **date-fns** - for working with dates
5. **d3** - for the charting, but could likely also just use skia.

### Discoveries

1. The api is not realtime, so the chart will not update in realtime.
2. I can set cache per time frame as they all appear to update on different time frames.
3. All - literally starts at like 2010 when it was 0.08 cents.

### Conclusion

I hope that this is enough for the assessment, some assumptions about the API were made which I would typically prefer concrete information on but given the information at hand and the time to complete this task I decided to dangerously assume some things.

There are places were I feel optimizations could be made in how data is processed and also how its transformed and resampled for the graph but in the interest of time this solution should be good enough, the organization of the project could also be somewhat better but I feel that the structure is good enough for a small project like this.

[`react-native-graph`](https://github.com/margelo/react-native-graph/tree/main) - this could have been used and may very well be the correct solution for a production project, however I was really curious about how to implement this myself and this seemed like a good opportunity to do so.

Other than all of that, this was fun and probably something I will expand on to implement touch panning and such.
