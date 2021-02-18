const Category = require('../models/category');
const Product = require("../models/product");
const Sub = require("../models/sub");
const slugify = require('slugify');

//créer une categorie
exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        res.json(await new Category(
            { 
                name,
                slug: slugify(name)
            }
        ).save());
    } catch (error) {
        // console.log(error);
        res.status(400).send('La création de la categorie a échoué, vérifiez qu\'elle n\'existe pas déjà')
    }
};

//afficher toutes les categories
exports.list = async (req, res) => {
    res.json(await Category
        .find({})
        .sort({ createdAt: -1 })
        .exec()
    );
};

//afficher une categorie
exports.read = async (req, res) => {
    let category = await Category
        .findOne({ slug: req.params.slug })
        .exec();
    const products = await Product
        .find({ category })
        .populate("category")
        .exec();

    res.json({ category, products });
};

//modifier une categorie
exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Category
        .findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(400).send('Les modifications de la categorie ont échoué');
    }
};

//supprimer une categorie
exports.remove = async (req, res) => {
    try {
        const deleted = await Category
        .findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (error) {
        res.status(400).send('La suppression de la categorie a échoué');
    }
};

//récupérer les sous catégories
exports.getSubs = (req, res) => {
    Sub.find({ parent: req.params._id })
        .exec((err, subs) => {
            if (err) {
                console.log(err);
            }
            res.json(subs);
        });
};