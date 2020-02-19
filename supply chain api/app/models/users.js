const mongoose = require("mongoose"),
    bcrypt = require('bcryptjs'),
    ROLES = ['ADMIN', 'FARMER', 'MANU', 'DISTRIBUTOR','THIRDPL', 'RETAILER', 'CUSTOMER'],
    STATUS = ['blocked', 'actived', 'pending'],
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    tel: String,
    address: String,
    background: String,
    isActive: { type: Boolean, default: false },
    coin: { type: String, default: 0 },
    role: { type: String, default: 0 },
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
    role: { type: String, enum: ROLES, default: 'USER' },
    status: { type: String, enum: STATUS, default: 'pending' },
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

