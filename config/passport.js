import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { config } from 'dotenv'
config()
import User from '../models/userModel.js'

const opts = {}
opts.jwtFormRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_KEY

const passportConfig = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload)

      if (!user) {
        return 
      }
    })
  )
}

export default passportConfig