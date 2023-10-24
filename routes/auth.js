// Rutas de Usuarios / Auth
// host + /api/auth


const express = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const router = express.Router();



const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')



router.post('/new',
    [ // middleware

        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio y debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos

    ],
    crearUsuario);

router.post('/', [

    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio y debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos

], loginUsuario);


router.post('/renew', revalidarToken);


module.exports = router;