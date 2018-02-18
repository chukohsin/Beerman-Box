const Sequelize = require('sequelize')
const db = require('../db')

const Beer = db.define('beer', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	imgUrl: {
		type: Sequelize.STRING,
		defaultValue: 'https://www.knijff.com/markmatters/wp-content/uploads/2012/03/duff-beer.png'
	},
	abv: Sequelize.DECIMAL(10, 2),
	description: Sequelize.TEXT,
	ratingNum: Sequelize.INTEGER,
	score: Sequelize.DECIMAL(10, 2),
	rankTop: Sequelize.INTEGER,
	rankState: Sequelize.INTEGER,
	rankNew: Sequelize.INTEGER,
	rankFame: Sequelize.INTEGER
}, {
	scopes: {
		withBrewery: () => ({
			include: [{
				model: db.model('brewery')
			}]
		}),
		withStyle: () => ({
			include: [{
				model: db.model('style'),
				attributes: { include: ['name', 'shortName'] }
			}]
		})
	}
})

module.exports = Beer
