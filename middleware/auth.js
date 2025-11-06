const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const header = req.headers['authorization'];
  if(!header) return res.status(401).json({ message: 'Unauthorized: No token' });
  const token = header.split(' ')[1]; // Bearer <token>
  if(!token) return res.status(401).json({ message: 'Unauthorized: No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, phone, role }
    next();
  } catch(err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
