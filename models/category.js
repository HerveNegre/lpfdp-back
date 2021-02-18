const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Le nom est obligatoire',
            minLength: [2, 'Nom trop court'],
            maxlength: [32, 'Nom trop long'],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index:true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);