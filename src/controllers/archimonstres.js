const Archimonstre = require("../models/archimonstres");

exports.getAllArchimonstres = async (req, res) => {
  try {
    const archimonstres = await Archimonstre.find();
    res.json(archimonstres);
  } catch (error) {
    console.error("Erreur lors de la récupération des Archimonstres", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
};

exports.getArchimonstresByStep = async (req, res) => {
  const step = req.params.step;

  try {
    const archimonstres = await Archimonstre.find({ etape: step });
    res.json(archimonstres);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des Archimonstres de l'étape ${step}`,
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
};

exports.getArchimonstresByName = async (req, res) => {
  const name = req.params.name;

  console.log(name);

  try {
    const archimonstres = await Archimonstre.find({
      nom: { $regex: `.*${name}.*`, $options: "i" },
    });

    if (archimonstres.length === 0) {
      return res
        .status(404)
        .json({ error: `Aucun archimonstre trouvé avec le nom '${name}'` });
    }
    res.json(archimonstres);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des Archimonstres de l'étape ${name}`,
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
};

exports.getArchimonstresByZone = async (req, res) => {
  const zone = req.params.zone;

  try {
    const archimonstres = await Archimonstre.find({
      zone: { $regex: new RegExp(zone, "i") },
    });
    res.json(archimonstres);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des Archimonstres de la zone ${zone}`,
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
};

exports.getArchimonstresBySousZone = async (req, res) => {
  const sousZone = req.params.sousZone;

  try {
    const archimonstres = await Archimonstre.find({
      sousZone: { $regex: new RegExp(sousZone, "i") },
    });
    res.json(archimonstres);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des Archimonstres de la sous-zone ${sousZone}`,
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données" });
  }
};
