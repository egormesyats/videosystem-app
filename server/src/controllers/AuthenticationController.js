const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async signup (req, res) {
    try {
      console.log(req.body)
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This username is already in use'
      })
    }
  },

  async login (req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })

      if (!user){
        return  res.status(403).send({
          error: 'The username does not exist'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return  res.status(403).send({
          error: 'Incorrect password'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error occured trying to login'
      })
    }
  }
}
