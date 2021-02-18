const Sub = require('../models/sub');
const Product = require("../models/product");
const slugify = require('slugify');

//créer une categorie
exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        res.json(await new Sub(
            { 
                name,
                parent,
                slug: slugify(name)
            }
        ).save());
    } catch (error) {
        console.log(error);
        res.status(400).send('La création de la sous-categorie a échoué, verifiez que cette sous-catégorie n\'existe pas déja.');
    }
};

//afficher toutes les categories
exports.list = async (req, res) => {
    res.json(await Sub
        .find({})
        .sort({ createdAt: -1 })
        .exec()
    );
};

//afficher une categorie
exports.read = async (req, res) => {
    let sub = await Sub
        .findOne({ slug: req.params.slug })
        .exec();
    const products = await Product
        .find({ subs: sub })
        .populate("category")
        .exec();
    res.json({sub, products});
};

//modifier une categorie
exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updated = await Sub
            .findOneAndUpdate(
                { slug: req.params.slug },
                { name, parent, slug: slugofy(name) },
                { new: true }
            );
        res.json(updated);
    } catch (error) {
        res.status(400).send('Les modifications de la sous-categorie ont échoué, verifiez que cette sous-catégorie n\'existe pas déja.');
    }
};

//supprimer une categorie
exports.remove = async (req, res) => {
    try {
        const deleted = await Sub
            .findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (error) {
        res.status(400).send('La suppression de la sous-categorie a échoué');
    }
};