const router = require('express').Router()
const { Brewery, Beer } = require('../db/models')

router.get('/', (req, res, next) => {
	Brewery.findAll()
	.then(breweries => {
		res.json(breweries)
	})
})

router.get('/:id', (req, res, next) => {
	Brewery.findOne({ where: { id: req.params.id } })
	.then(brewery => {
		res.json(brewery)
	})
})

router.get('/:id/beers', (req, res, next) => {
	Brewery.findOne({ where: { id: req.params.id } })
	.then(brewery => {
		brewery.getBeers()
		.then(beers => {
			res.json(beers)
		})
	})
})

module.exports = router
