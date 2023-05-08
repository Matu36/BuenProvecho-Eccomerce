const { Users } = require("../db.js");
// const sendEmailWithTemplate = require("../mailer/sendEmailWithTemplate");

const getUsers = async (req, res) => {
  try {
    if (!req.query?.email) throw "No query params";

    console.log(req.query);
    let requestUser = await Users.findOne({
      where: { email: req.query.email },
    });

    if (!requestUser) return res.status(403).send("Wrong user");

    let returnedUsers;

    if (requestUser.dataValues.role !== null)
      returnedUsers = await Users.findAll();
    else returnedUsers = await Users.findAll({ where: { email: req.query.email } });

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

const putUser = async (req, res) => {
  try{
    let user = await Users.findOne({where: {id: req.body.id}});

    if (!user) return res.status(404).send('No se encontro el usuario');

    await user.update({...req.body});
    return (!user)
    ? res.status(404).send('No se encontro el usuario')
    : res.send(await user.reload());

}
catch(error) {
  console.log(error);
  return res.status(500).send(error);
}
};

module.exports = {
    getUsers,
    postUser,
    putUser
}