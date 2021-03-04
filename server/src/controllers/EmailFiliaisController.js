const EmailFiliais = require("../models/EmailFiliais");

let emailTeste = [];

module.exports = {
  async index(req, res) {
    try {
      const emailFiliais = await EmailFiliais.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
      });
      return res.json(emailFiliais);
    } catch (error) {
      res.status(400).json({ error: "Registro não encontrado" });
    }
  },

  async getEmailFilial(req, res) {
    try {
      const { filial } = req.query;
      const emailFiliais = await emailFiliais.findAll({
        where: {
          filial: {
            [Op.eq]: filial,
          },
        },
      });
      return res.json(emailFiliais);
    } catch (error) {
      console.log(error);
    }
  },

  store(req, res) {
    try {
      const { filial, email } = req.body;
      if (filial === "01 - CAN") {
        emailTeste.push(email);
      }
      return console.log(emailTeste);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { filial, email, nome } = req.body;
      const emailFiliais = await emailFiliais.update(
        {
          filial,
          email,
          nome,
        },
        { where: { id } }
      );
      return res.json(emailFiliais);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const emailFiliais = await EmailFiliais.destroy({ where: { id } });
      return res.json(emailFiliais);
    } catch (error) {
      console.log(error);
    }
  },
};
