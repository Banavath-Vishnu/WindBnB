import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    // console.log('Cookies:', req.cookies);

    if (!req.cookies?.token) {
      console.log('No token found in cookies');
      return reject(new Error('No token provided'));
    }

    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
      if (err) {
        console.error('JWT Verification Error:', err.message);
        return reject(new Error('Invalid or expired token'));
      }
      // console.log('User data:', userData);
      resolve(userData);
    });
  });
}

export default getUserDataFromReq;
