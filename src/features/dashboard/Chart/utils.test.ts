import { createGraphPath, resampleData } from "./utils";

jest.mock("@shopify/react-native-skia", () => ({
  Skia: {
    Path: {
      MakeFromSVGString: jest.fn(() => ({ mockPath: true })),
      Make: jest.fn(() => ({ mockPath: true })),
    },
  },
}));

describe("createGraphPath", () => {
  it("should create a graph path with correct max and min values", () => {
    const data = [
      { date: new Date("2023-01-01"), value: 10 },
      { date: new Date("2023-01-02"), value: 20 },
      { date: new Date("2023-01-03"), value: 5 },
    ];

    const result = createGraphPath({ data });

    expect(result.max).toBe(20);
    expect(result.min).toBe(5);
  });
});

describe("resampleData", () => {
  it("should resample data to the specified number of points", () => {
    const data = [
      { date: new Date("2023-01-01"), value: 10 },
      { date: new Date("2023-01-02"), value: 20 },
      { date: new Date("2023-01-03"), value: 5 },
    ];

    const result = resampleData(data, 5);

    expect(result).toHaveLength(5);
    expect(result[0].date).toBeInstanceOf(Date);
    expect(result[0].value).toBeDefined();
  });
});
