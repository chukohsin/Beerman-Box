const Sequelize = require('sequelize')
const db = require('../db')

const Style = db.define('style', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	shortName: Sequelize.STRING,
	description: {
		type: Sequelize.TEXT
	},
	ibuMin: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0
		}
	},
	ibuMax: {
		type: Sequelize.INTEGER,
		validate: {
			max: 120
		}
	},
	abvMin: {
		type: Sequelize.DECIMAL(10, 2),
		validate: {
			min: 0
		}
	},
	abvMax: {
		type: Sequelize.DECIMAL(10, 2),
		validate: {
			max: 100
		}
	},
	srmMin: Sequelize.INTEGER,
	srmMax: Sequelize.INTEGER,
	ogMin: Sequelize.DECIMAL(10, 3),
	fgMin: Sequelize.DECIMAL(10, 3),
	fgMax: Sequelize.DECIMAL(10, 3),
	ibuRange: {
		type: Sequelize.VIRTUAL,
		get() {
			return this.getDataValue('ibuMin') + ' - ' + this.getDataValue('ibuMax')
		}
	},
	abvRange: {
		type: Sequelize.VIRTUAL,
		get() {
			return this.getDataValue('abvMin') + ' - ' + this.getDataValue('abvMax')
		}
	},
	srmRange: {
		type: Sequelize.VIRTUAL,
		get() {
			return this.getDataValue('srmMin') + ' - ' + this.getDataValue('srmMax')
		}
	}
})

module.exports = Style
