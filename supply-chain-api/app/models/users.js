const mongoose = require("mongoose"),
    bcrypt = require('bcryptjs'),
    ROLES = ['ADMIN', 'FARMER', 'MANU', 'DISTRIBUTOR','THIRDPL', 'RETAILER', 'CUSTOMER'],
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    tel: String,
    address: {
        lati: { type: String, default: null},
        longi: {type: String, default: null}
    },
    metamask: {type: String, default: null},
    identify: {type: String, default: null},
    background: {type: String, default: null},
    isActive: { type: Boolean, default: false },
    coin: { type: String, default: 0 },
    role: { type: String, default: 6 },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    deviceTokens: [{ type: String, default: [] }],
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
}, {
        usePushEach: true
    }, {
        collection: "users"
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password || '', this.password)
}
module.exports =  mongoose.model("User", userSchema);

