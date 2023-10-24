const {express, Router} = require('express');
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, eliminarEvento, actualizarEvento} = require('../controllers/events');
const {validarCampos} = require('../middlewares/validar-campos');
const {isDate} = require('../helpers/isDate')

const router = Router();

// TOdas las peticiones deberían pasar por validarJWT
router.use(validarJWT);

// Todas tienen que pasar la validación del JWT
// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post('/', 
[ 
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de incio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),

    validarCampos
    

] ,crearEvento);

//Actualizar Evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;
