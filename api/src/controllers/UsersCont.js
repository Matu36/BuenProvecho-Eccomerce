const { Users } = require("../db.js");
// const sendEmailWithTemplate = require("../mailer/sendEmailWithTemplate");

const getUsers = async (req, res) => {
  try {
    if (!req.query?.id || !req.query?.email) throw "No query params";

    console.log(req.query);
    let requestUser = await Users.findOne({
      where: { id: req.query.id, email: req.query.email },
    });

    if (!requestUser) return res.status(403).send("Wrong user");

    let returnedUsers;

    if (requestUser.dataValues.role !== null)
      returnedUsers = await Users.findAll();
    else returnedUsers = await Users.findAll({ where: { id: req.query.id } });

    return !returnedUsers
      ? res.status(404).send("Users Not Found")
      : res.send(returnedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


const postUser = async (req, res) => {
  try {
    if (!req.body?.email) throw "No body params";

    const [instance, created] = await Users.findOrCreate({
      where: { email: req.body.email.toLowerCase() },
    });

    if (created) {
      console.log("Usuario Creado");
      // sendEmailWithTemplate(instance.email, "newUser");
    }

    res.send(instance);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
    getUsers,
    postUser
}