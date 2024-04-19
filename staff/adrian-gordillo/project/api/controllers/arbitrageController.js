// api/controllers/arbitrageController.js

const ArbitrageConfig = require("../models/ArbitrageConfig");
const { getIo } = require("../socket"); // Importa la instancia de socket.io desde socket.js
const { detectArbitrageOpportunities } = require("../utils/arbitrageDetector");

exports.getAllConfigs = async (req, res) => {
  try {
    const configs = await ArbitrageConfig.find();
    res.json(configs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching configs: " + error.message });
  }
};

exports.createConfig = async (req, res) => {
  const config = new ArbitrageConfig(req.body);
  try {
    const newConfig = await config.save();
    res.status(201).json(newConfig);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating config: " + error.message });
  }
};

exports.getConfig = async (req, res) => {
  try {
    const config = await ArbitrageConfig.findById(req.params.id);
    if (!config) {
      return res.status(404).json({ message: "Cannot find configuration" });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateConfig = async (req, res) => {
  try {
    const config = await ArbitrageConfig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(config);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteConfig = async (req, res) => {
  try {
    await ArbitrageConfig.findByIdAndDelete(req.params.id);
    res.json({ message: "Configuration deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.detectArbitrageAndNotify = async (req, res) => {
  try {
    const opportunities = await detectArbitrageOpportunities();
    const io = getIo();
    if (opportunities && opportunities.length > 0) {
      opportunities.forEach((opportunity) => {
        io.emit("arbitrageOpportunity", {
          message: `Oportunidad de arbitraje detectada: Compra en ${opportunity.buyExchange} por ${opportunity.buyPrice} y vende en ${opportunity.sellExchange} por ${opportunity.sellPrice} para un beneficio potencial.`,
          details: opportunity,
        });
      });
      res.send("Detección de arbitraje iniciada y usuarios notificados.");
    } else {
      res.send("No se encontraron oportunidades de arbitraje.");
    }
  } catch (error) {
    console.error("Error al detectar oportunidades de arbitraje:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
