import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: 'User not authorized',
    });
  }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Check if the payload is what we expect (either string or object)
    const expectedPayload = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    const actualPayload = typeof token_decode === 'object' ? token_decode.id : token_decode;

    if (actualPayload !== expectedPayload) {
      return res.json({
        success: false,
        message: 'User not authorized',
      });
    }
  next();
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
};
export default adminAuth;