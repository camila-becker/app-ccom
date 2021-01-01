const Ocorrencias = require("../models/Ocorrencias");

module.exports = {
  async index(req, res) {
    try {
      const ocorrencia = await Ocorrencias.findAll({
        raw: true,
        order: [["data", "DESC"]],
      });
      return res.json(ocorrencia);
    } catch (error) {
      res.status(400).json({ error: "Registro não encontrado" });
    }
  },

  async store(req, res) {
    try {
      const {
        nome,
        placa,
        expresso,
        origem,
        destino,
        gerenciadora,
        smp,
        valor,
        vinculo,
        filial,
        canal,
        motivo,
        registro,
        tipo,
        usuario,
      } = req.body;
      const ocorrencia = await Ocorrencias.create({
        nome,
        placa,
        expresso,
        origem,
        destino,
        gerenciadora,
        smp,
        valor,
        vinculo,
        filial,
        canal,
        motivo,
        registro,
        tipo,
        usuario,
        data: Date.now(),
      });
      return res.json(ocorrencia);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const ocorrencia = await Ocorrencias.destroy({ where: { id } });
      return res.json(ocorrencia);
    } catch (error) {
      console.log(error);
    }
  },
};
