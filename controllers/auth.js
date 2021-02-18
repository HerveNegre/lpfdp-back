const User = require('../models/user')

//nouvel utilisateur
exports.createOrUpdateUser = async (req, res) => {
    const {name, picture, email} = req.user;
   
    const user = await User.findOneAndUpdate(
        {email: email},
        {name: email.split('@')[0], picture},
        {new: true}
    );

    if(user) {
        console.log('USER MODIFIE', user);
        res.json(user);
    } else {
        const newUser = await new User({
            email,
            name: email.split('@')[0],
            picture,
        }).save();
        console.log('USER AJOUTE', newUser)
        res.json(newUser);
    }
};

//trouver utilisateur existant pour connexion
exports.currentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).exec((err, user) => {
      if (err) throw new Error(err);
      res.json(user);
    });
  };