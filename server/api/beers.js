const router = require('express').Router()
const { Beer } = require('../db/models')

router.get('/', (req, res, next) => {
	Beer.scope('withBrewery', 'withStyle').findAll()
	.then(beers => {
		res.json(beers)
	})
})

router.get('/list/top', (req, res, next) => {
	Beer.scope('withBrewery', 'withStyle').findAll({ where: { rankTop: { $ne: null } } })
	.then(beers => {
		res.send(beers)
	})
})

router.get('/list/:state', (req, res, next) => {
	Beer.scope('withBrewery', 'withStyle').findAll({ where: { brewery: { state: req.params.state} } })
	.then( beers => {
		res.send(beers)
	})
})

router.get('/:id', (req, res, next) => {
	Beer.scope('withBrewery').findOne({ where: {id: req.params.id }})
	.then(beer => {
		res.json(beer)
	})
})

router.get('/:id/brewery', (req, res, next) => {
	Beer.findOne({ where: {id: req.params.id }})
	.then(beer => {
		beer.getBrewery()
		.then(brewery => {
			res.json(brewery)
		})
	})
})

router.get('/:id/reviews', (req, res, next) => {
	Beer.findOne({ where: {id: req.params.id }})
	.then(beer => {
		beer.getReviews()
		.then(reviews => {
			res.json(reviews)
		})
	})
})

module.exports = router
