const express = require('express')
let router = express.Router();
const controller = require('.././controllers')


router.get('/', controller.main.index)
router.get('/all', controller.main.all)
router.post('/add', controller.main.add)
router.delete('/delete/:id', controller.main.delete)
router.get('/edit/:id', controller.main.edit)
router.put('/update/:id', controller.main.update)



module.exports = router;