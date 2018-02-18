const Sequelize = require('sequelize')
const db = require('../db')

const Brewery = db.define('brewery', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	imgUrl: {
		type: Sequelize.STRING,
		defaultValue: "https://www.ironhillbrewery.com/assets/images/graphic_brewery-footer.png"
	},
	description: Sequelize.TEXT,
	established: Sequelize.INTEGER,
	city: Sequelize.STRING,
	state: Sequelize.STRING,
	country: Sequelize.STRING,
	website: Sequelize.STRING
})

module.exports = Brewery
