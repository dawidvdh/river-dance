import { selectMetaData, transformChartData } from "./tranformers";

describe("Data utilities", () => {
  describe("selectMetaData", () => {
    it("should return metadata for a given dataset", () => {
      const data = [
        { date: new Date("2023-01-01"), value: 100 },
        { date: new Date("2023-01-02"), value: 200 },
        { date: new Date("2023-01-03"), value: 150 },
      ];

      const result = selectMetaData(data);

      expect(result.openingPrice).toBe(100);
      expect(result.closingPrice).toBe(150);
      expect(result.highPrice).toBe(200);
      expect(result.lowPrice).toBe(100);
      expect(result.absoluteChange).toBe(50);
      expect(result.percentageChange).toBe(50);
      expect(result.lastUpdate).toEqual(new Date("2023-01-03"));
    });

    it("should handle a dataset with one element", () => {
      const data = [{ date: new Date("2023-01-01"), value: 100 }];

      const result = selectMetaData(data);

      expect(result.openingPrice).toBe(100);
      expect(result.closingPrice).toBe(100);
      expect(result.highPrice).toBe(100);
      expect(result.lowPrice).toBe(100);
      expect(result.absoluteChange).toBe(0);
      expect(result.percentageChange).toBe(0);
      expect(result.lastUpdate).toEqual(new Date("2023-01-01"));
    });

    it("should throw an error for an empty dataset", () => {
      expect(() => selectMetaData([])).toThrow();
    });
  });

  describe("transformChartData", () => {
    it("should transform and sort chart data", () => {
      const data = [
        { datetime: "2023-01-03T00:00:00Z", rate: "150.5" },
        { datetime: "2023-01-01T00:00:00Z", rate: "100.0" },
        { datetime: "2023-01-02T00:00:00Z", rate: "200.0" },
      ];

      const result = transformChartData(data);

      expect(result).toEqual([
        { date: new Date("2023-01-01T00:00:00Z"), value: 100 },
        { date: new Date("2023-01-02T00:00:00Z"), value: 200 },
        { date: new Date("2023-01-03T00:00:00Z"), value: 150.5 },
      ]);
    });

    it("should handle an empty dataset", () => {
      const data: [] = [];

      const result = transformChartData(data);

      expect(result).toEqual([]);
    });

    it("should handle invalid rate values gracefully", () => {
      const data = [{ datetime: "2023-01-01T00:00:00Z", rate: "invalid" }];

      const result = transformChartData(data);

      expect(result).toEqual([
        { date: new Date("2023-01-01T00:00:00Z"), value: NaN },
      ]);
    });
  });
});
