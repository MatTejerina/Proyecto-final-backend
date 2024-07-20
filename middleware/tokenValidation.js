const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenValidation = (request, response, next) => {
  let token = request.header('Authorization');

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  } else {
    const cookies = request.headers.cookie;
    if (cookies) {
      const cookieArray = cookies.split(';');
      for (let cookie of cookieArray) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'refreshToken') {
          token = value;
          break;
        }
      }
    }
  }

  if (!token) {
    return response.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
    if (error) {
      const refreshToken = request.headers.cookie?.split('; ').find(cookie => cookie.startsWith('refreshToken='))?.split('=')[1];
      if (!refreshToken) {
        return response.status(401).json({ message: 'Token expired' });
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (refreshError, refreshDecoded) => {
        if (refreshError) {
          return response.status(401).json({ message: 'Refresh token expired' });
        }

        const newAccessToken = jwt.sign(
          { id: refreshDecoded.id, firstName: refreshDecoded.firstName, isAdmin: refreshDecoded.isAdmin },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: '3m' }
        );
        response.status(200).json({ accessToken: newAccessToken });
      });
    } else {
      request.user = decoded;
      next();
    }
  });
};

module.exports = { tokenValidation };