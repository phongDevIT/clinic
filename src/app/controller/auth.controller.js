const validateRequest = require('../../middleware/validate-request');
const accountService = require('../../config/db/accountDAO');
const authMethod = require('../../util/auth.methods');
const randToken = require('rand-token');
const jwtVariable = require('../../util/jwt');

exports.register = async (req, res) => {
    const username = req.body.username.toLowerCase();
    const account = await accountService.getAccountByUserName(username);
    if (account) res.status(409).send('Tên tài khoản đã tồn tại.');
    else {
        // const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
        const newUser = {
            username: username,
            password: req.body.password,
            email: req.body.email,
            roleid: 0
        };
        const createUser = await accountService.create(newUser);
        if (!createUser) {
            return res
                .status(400)
                .send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
        }
        return res.send({
            username,
        });
    }
};

exports.login = async (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    const user = await accountService.getAccountByUserName(username);
    if (!user) {
        return res.json({
            msg: 'Tài khoản không chính xác.',
            user: username,
            status: 401
        });
    }

    //const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (user.password != password) {
        // return res.status(401).send('Mật khẩu không chính xác.');
        return res.json({
            msg: 'Mật khẩu không chính xác.',
            user: user.password,
            status: 401
        });
    }

    const accessTokenLife = "2h";
    const accessTokenSecret = "Access_Token_Secret_#$%_ExpressJS_Authentication";

    const dataForAccessToken = {
        username: user.username,
    };
    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
    );
    if (!accessToken) {
        return res
            .status(401)
            .send('Đăng nhập không thành công, vui lòng thử lại.');
    }

    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
    // if (!user.refreshToken) {
    //     // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
    //     await authMethod.updateRefreshToken(user.username, refreshToken);
    // } else {
    //     // Nếu user này đã có refresh token thì lấy refresh token đó từ database
    //     refreshToken = user.refreshToken;
    // }

    return res.json({
        msg: 'Đăng nhập thành công.',
        accessToken,
        refreshToken,
        user,
    });
};