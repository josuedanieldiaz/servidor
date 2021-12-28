const mongoose = require('mongoose');

const PersonaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Persona', PersonaSchema);