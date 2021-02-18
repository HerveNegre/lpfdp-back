const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema(
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
        parent: {
            type: ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Sub', subSchema);