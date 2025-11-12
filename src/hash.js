// hash.js
const bcrypt = require('bcrypt');

bcrypt.hash('password123', 10).then(hash => {
  console.log('Hashed password:', hash);
});

//$2b$10$eF7L9rBfapoU3GMRlqWX6OwSjd2MJky4IBIs0AQMx0sptQVDnesse


