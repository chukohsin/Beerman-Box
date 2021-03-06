const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/beers', require('./beers'))
router.use('/breweries', require('./breweries'))
router.use('/styles', require('./styles'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
