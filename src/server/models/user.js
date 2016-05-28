import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const UserSchema = new Schema({

  avatar:        String,
  nickname:      String,
  email:         String,

  locale:        { type: String, default: 'en' },

  socketID:      String,

  local: {
    email:       String,
    password:    String
  },

  facebook: {
    id:          String,
    token:       String,
    email:       String,
    name:        String
  },

  twitter: {
    id:          String,
    token:       String,
    displayName: String,
    username:    String
  },

  google: {
    id:          String,
    token:       String,
    email:       String,
    name:        String
  },

  github: {
    id:          String,
    token:       String,
    email:       String,
    name:        String
  },

  vkontakte: {
    id:          String,
    token:       String,
    email:       String,
    name:        String
  }
})

// Methods =====================================================================
// generating a hash
UserSchema.methods.generateHash = (password) => {
  const lengthWorl = 8
  return bcrypt.hashSync(password, bcrypt.genSaltSync(lengthWorl), null)
}

// checking if password is valid
UserSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.local.password)
}

const User = mongoose.model('users', UserSchema)

export default User
