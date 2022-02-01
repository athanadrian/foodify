import jwt from 'jsonwebtoken';
import UnAuthenticatedError from '../errors/unauthenticated.js';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to req object
    req.user = payload;
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default authenticate;
