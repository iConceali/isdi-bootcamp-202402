import { expect } from "chai";
import { fetchHistoricalData } from "../../technicalIndicatorsController.js";

describe("fetchHistoricalData Tests", () => {
  it("should correctly process and return historical data for a valid symbol", async () => {
    const symbol = "BTCUSDT";
    const data = await fetchHistoricalData(symbol);

    expect(data).to.be.an("array");
    // Verifica que el array no esté vacío
    expect(data.length).to.be.greaterThan(0);
    // Verifica que cada elemento del array tenga las propiedades esperadas
    expect(data[0]).to.have.all.keys("open", "high", "low", "close", "volume");
    // Verifica que los valores sean números
    expect(data[0].open).to.be.a("number");
    expect(data[0].high).to.be.a("number");
    expect(data[0].low).to.be.a("number");
    expect(data[0].close).to.be.a("number");
    expect(data[0].volume).to.be.a("number");
  });

  it("should handle non-existent symbols gracefully", async () => {
    const symbol = "FAKESYMBOL";
    const data = await fetchHistoricalData(symbol);

    // Espera que la respuesta sea un array vacío si el símbolo no existe
    expect(data).to.be.an("array");
    expect(data.length).to.equal(0);
  });
});
