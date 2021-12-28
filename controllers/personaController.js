const Persona = require("../models/Persona");

exports.crearPersona = async (req, res) => {
    
    try {
        let persona;        
        
        persona = new Persona(req.body);

        const edad = calcularEdad(persona.fecha);

        if (edad>=18) {
            await persona.save();
            res.send(persona);
            console.log('guardado');
        } else {
            res.send("Es menor de edad");
            console.log('es menor de edad');
        }

        
        
    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

exports.obtenerPersonas = async (req, res) => {

    try {
        const personas = await Persona.find();
        res.json(personas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarPersona = async (req, res) => {

    try {
        const {nombre, fecha, sexo } = req.body;
        let persona = await Persona.findById(req.params.id);

        if(!persona){
            res.status(404).json({ msg: 'No existe el registro'})
        }

        persona.nombre = nombre;
        persona.fecha = fecha;
        persona.sexo = sexo;

        persona = await Persona.findOneAndUpdate({_id:req.params.id}, persona, {new:true});
        res.json(persona);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerPersona = async (req, res) => {

    try {
        let persona = await Persona.findById(req.params.id);

        if(!persona){
            res.status(404).json({ msg: 'No existe el registro'})
        }

        res.json(persona);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarPersona = async (req, res) => {

    try {
        let persona = await Persona.findById(req.params.id);

        if(!persona){
            res.status(404).json({ msg: 'No existe el registro'})
        }
        
        await Persona.findOneAndRemove({_id: req.params.id});
        res.json( {msg: 'Datos eliminados con exito'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}