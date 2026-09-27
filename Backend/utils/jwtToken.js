export const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        expires: new Date(
    Date.now() + Number(process.env.EXPIRE_COOKIE) * 24 * 60 * 60 * 1000
),
        httpOnly: true
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
}