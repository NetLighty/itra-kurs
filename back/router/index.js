const Router = require('express').Router
const userController= require('../controllers/user-controller.js')
const collectionController= require('../controllers/collections-controller.js')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware.js')

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 25}),
    body('username').isLength({min: 4, max: 20}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/block/:id', authMiddleware, userController.blockUser);
router.post('/unblock/:id', authMiddleware, userController.unBlockUser);
router.post('/makeAdmin/:id', authMiddleware, userController.setAdminRole);
router.post('/makeUser/:id', authMiddleware, userController.setUserRole);
router.post('/changeTheme/:id', authMiddleware, userController.changeTheme);
router.post('/createCollection', collectionController.createCollection);
router.get('/collections/:id', collectionController.findCollectionsByCreator);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:id', authMiddleware, userController.getUser);
router.get('/refresh', userController.refresh);

module.exports= router