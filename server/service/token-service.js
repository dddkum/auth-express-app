const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

const secretAccessTokenKey = process.env.JWT_ACCESS_SECRET_KEY;
const secretRefreshTokenKey = process.env.JWT_REFRESH_SECRET_KEY;

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, secretAccessTokenKey, {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, secretRefreshTokenKey, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save();
        }
        await tokenModel.create({user: userId, refreshToken})
    }

    async removeToken(refreshToken) {
        const token = await tokenModel.deleteOne({refreshToken});
        return token;
    }
}

module.exports = new TokenService();