import axios from "axios";
import fs from "fs/promises";

async function fetchSymbols() {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets");
    const symbols = response.data.data.map((item) => item.id);
    return symbols;
  } catch (error) {
    console.error("Failed to fetch symbols:", error);
    return [];
  }
}

async function saveSymbolsToFile() {
  try {
    const symbols = await fetchSymbols();
    const symbolsData = JSON.stringify(symbols, null, 2);
    await fs.writeFile("./symbolsCoinCap.json", symbolsData);
    console.log("Symbols saved to file: symbols.json");
  } catch (error) {
    console.error("Failed to write symbols to file:", error);
  }
}

saveSymbolsToFile();
