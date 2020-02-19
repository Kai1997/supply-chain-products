const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema
const ROLES = ['ADMIN', 'FARMER', 'MANU', 'DISTRIBUTOR','THIRDPL', 'RETAILER', 'CUSTOMER']
const STATUS = ['blocked', 'actived', 'pending']

const UserSchema = new Schema({
    username: { type: String ,required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true  },
    metamask: { type: String, unique: true, },
    latitude: { type: String },
    longitude: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ROLES, default: 'USER' },
    status: { type: String, enum: STATUS, default: 'pending' }
}, {
    timestamps: true
})

/**
 * virtual
 */

// UserSchema.virtual('created_at').get(function () {
//     return moment(this.createdAt).format('DD-MM-YYYY hh:mm:ss')
// })

/**
 * Method
 */
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password || '', this.password)
}

module.exports = mongoose.model('User', UserSchema)
