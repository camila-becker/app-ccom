const Viagem = require("../models/Viagem");
const nodemailer = require("nodemailer");

module.exports = {
  async index(req, res) {
    try {
      const viagem = await Viagem.findAll({
        raw: true,
        where: {
          status: "Aberto",
        },
        order: [["createdAt", "DESC"]],
      });
      return res.json(viagem);
    } catch (error) {
      res.status(400).json({ error: "Registro não encontrado" });
    }
  },

  async store(req, res) {
    try {
      const {
        placa,
        motorista,
        estadoOrigem,
        cidadeOrigem,
        estadoDestino,
        cidadeDestino,
        distancia,
        nome,
        jornada,
        observacao,
        status,
      } = req.body;
      const output = `
      <p>Frota - Viagem vazio <strong>${placa}</strong></p>
      <h3>Dados da viagem</h3>
      <ul>
        <li><strong>Autorizado por:</strong> ${nome}</li>
        <li><strong>Placa do Cavalo:</strong> ${placa}</li>
        <li><strong>Estado de Origem:</strong> ${estadoOrigem}</li>
        <li><strong>Cidade de Origem:</strong> ${cidadeOrigem}</li>
        <li><strong>Estado de Destino:</strong> ${estadoDestino}</li>
        <li><strong>Cidade de Destino:</strong> ${cidadeDestino}</li>
        <li><strong>Distancia a percorrer:</strong> ${distancia}</li>
        <li><strong>Observação:</strong> ${observacao}</li>
        <li><strong>Controle de Jornada:</strong> ${jornada}</li>
      </ul>
    `;
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ccom.viagens@gmail.com",
          pass: "ccom2020",
        },
      });
      if (
        placa === "" &&
        motorista === "" &&
        estadoOrigem === "" &&
        estadoDestino === "" &&
        distancia === "" &&
        nome === "" &&
        jornada === ""
      ) {
        return res.status(500).json({ message: "Informe todos os dados!" });
      } else {
        transporter
          .sendMail({
            from: "Viagem Vazio <ccom.viagens@gmail.com>",
            to: `camila.becker01@gmail.com`,
            subject: `Veículo em viagem vazio - ${placa}`,
            text: "",
            html: output,
          })
          .then((message) => {
            console.log(message);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      const viagem = await Viagem.create({
        placa,
        motorista,
        estadoOrigem,
        cidadeOrigem,
        estadoDestino,
        cidadeDestino,
        distancia,
        nome,
        jornada,
        observacao,
        status,
        data: Date.now(),
      });
      return res.json(viagem);
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error);
    }
  },
  async changeStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const viagem = await Viagem.update({ status }, { where: { id } });
      return res.json(viagem);
    } catch (error) {
      console.log(error);
    }
  },
};
