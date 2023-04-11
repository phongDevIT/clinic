const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            },
        );
    } catch (error) {

        console.log(`Lỗi xảy ra khi tạo token:  + ${error}`);
        return null;
    }
};

exports.updateRefreshToken = async (username, refreshToken) => {
    try {
        await db
            .get(TABLENAME)
            .find({ username: username })
            .assign({ refreshToken: refreshToken })
            .write();
        return true;
    } catch {
        return false;
    }
};

exports.verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
};