const { Sequelize } = require('sequelize');

// PostgreSQL bağlantınızı burada tanımlayın
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/auth_db', {
  dialect: 'postgres',
  logging: false // Hata mesajlarını devre dışı bırakmak için kullanabilirsiniz
});

// Bağlantıyı kontrol etme
sequelize.authenticate()
  .then(() => console.log('Veritabanı bağlantısı başarılı!'))
  .catch(err => console.error('Veritabanı bağlantısı sağlanamadı:', err));

module.exports = sequelize;
