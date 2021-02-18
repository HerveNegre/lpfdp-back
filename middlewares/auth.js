const admin = require('../firebase');
const User = require('../models/user');

//verifier si user existe
exports.authCheck = async (req, res, next) => {
    // console.log(req.headers); //token
    try {
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
        // console.log('VERIFICATION DE L\'UTILISATEUR DANS FIREBASE', firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Token invalide ou expiré',
        });
    }
};

//verifier si user est admin 
exports.adminCheck = async (req, res, next) => {
    const {email} = req.user;
    const adminUser = await User.findOne({email}).exec();

    if(adminUser.role !== 'admin') {
        res.status(403).json({
            err: "Vous n'avez pas les droits !",
        });
    } else {
        next();
    }
};