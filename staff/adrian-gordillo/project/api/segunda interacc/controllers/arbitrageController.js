const ArbitrageConfig = require("../models/ArbitrageConfig");

exports.getAllConfigs = async (req, res) => {
  try {
    const configs = await ArbitrageConfig.find();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createConfig = async (req, res) => {
  const config = new ArbitrageConfig({
    usuario: req.body.usuario,
    intervaloActualización: req.body.intervaloActualización,
    paresCriptomonedas: req.body.paresCriptomonedas,
    umbralRentabilidad: req.body.umbralRentabilidad,
    estrategiaArbitraje: req.body.estrategiaArbitraje,
  });

  try {
    const newConfig = await config.save();
    res.status(201).json(newConfig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getConfig = async (req, res) => {
  try {
    const config = await ArbitrageConfig.findById(req.params.id);
    if (config == null) {
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
