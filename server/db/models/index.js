const User = require('./user')
const Beer = require('./Beer')
const Brewery = require('./Brewery')
const Style = require('./Style')

Beer.belongsTo(Brewery)
Beer.belongsTo(Style)
Brewery.hasMany(Beer)
User.hasMany(Beer)
User.hasMany(Brewery)

module.exports = {
  User,
  Beer,
  Brewery,
  Style
}
