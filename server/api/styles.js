const router = require('express').Router()
const { Style } = require('../db/models')

router.get('/', (req, res, next) => {
	Style.findAll()
	.then(styles => res.send(styles))
})
module.exports = router
