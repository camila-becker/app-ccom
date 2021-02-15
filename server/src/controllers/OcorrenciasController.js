const nodemailer = require("nodemailer");
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

  async storeOcOperacional(req, res) {
    const emailOcorrencia = process.env.EMAIL_OC;
    const senhaOcorrencia = process.env.SENHA_OC;
    try {
      const {
        placa,
        origem,
        destino,
        valor,
        motivo,
        tipo,
        registro,
        usuario,
      } = req.body;
      const output = `
      <p>${motivo} / ${origem}<strong>${placa ? placa : ""}</strong></p>
      <h3>Dados da ocorrência</h3>
      <ul>
        <li><strong>Placa:</strong> ${placa ? placa : ""}</li>
        <li><strong>Origem:</strong> ${origem ? origem : ""}</li>
        <li><strong>Destino:</strong> ${destino ? destino : ""}</li>
        <li><strong>Valor da carga:</strong> ${valor ? valor : ""}</li>
        <li><strong>Ocorrência:</strong> ${motivo ? motivo : ""}</li>
      </ul>
      <p>E-mail informativo sobre o registro de ocorrência do tipo ${motivo} para a filial ${origem}</p>
      <p>Não é necessário responder esse e-mail, apenas corrigir o problema.</p>
    `;
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: emailOcorrencia,
          pass: senhaOcorrencia,
        },
      });
      transporter
        .sendMail({
          from: "ccom.ocorrencias@gmail.com",
          to: `camila.becker01@gmail.com`,
          subject: `Registro de Ocorrência - ${motivo} / ${placa} / ${origem}`,
          text: "",
          html: output,
        })
        .then((message) => {
          console.log(message);
        })
        .catch((err) => {
          console.log(err);
        });

      const ocorrencia = await Ocorrencias.create({
        placa,
        origem,
        destino,
        valor,
        motivo,
        tipo,
        registro,
        usuario,
        data: Date.now(),
      });
      return res.json(ocorrencia);
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error);
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
