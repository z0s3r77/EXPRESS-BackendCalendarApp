const {response} = require('express');
const Evento = require('../models/Evento')

const getEventos = async(req, res = response) => {

    const eventos = await Evento.find().populate('user','name');


    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async(req, res = response) => {

    console.log(req.body);
    const evento = new Evento(req.body);

    try{

        
        console.log('Evento = ' + evento);
        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado
        })

    }catch(error){

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}


const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;

    try{

        const evento = await Evento.findById(eventoId);

        console.log(evento);

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese ID'
            });
        }

        if(evento.user.toString() !== req.uid){
            
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            });

        }


        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});


        return res.status(201).json({
            ok: true,
           evento: eventoActualizado
        });



    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;

    try {


        const evento = await Evento.findById(eventoId);

        console.log(evento);

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese ID'
            });
        }

        if(evento.user.toString() !== req.uid){
            
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            });

        }

        await Evento.findByIdAndDelete(eventoId);
        res.json({ok:true});


    }catch(error){

    }


    res.json({
        ok: true,
        msg: 'eliminarEvento'
    })
}

module.exports = {
    getEventos,
    actualizarEvento,
    crearEvento,
    eliminarEvento
}