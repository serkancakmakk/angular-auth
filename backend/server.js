const app = require('./app');
const sequelize = require('./config/db.config'); // Sequelize bağlantısı

const PORT = process.env.PORT || 5000;

// Sequelize ile veritabanı bağlantısını başlat
sequelize.authenticate()
  .then(() => {
    console.log('Veritabanı bağlantısı başarılı!');
    // Veritabanı tablolarını oluştur
    sequelize.sync()
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Sunucu ${PORT} portunda çalışıyor`);
        });
      })
      .catch(err => {
        console.error('Veritabanı tabloları oluşturulamadı:', err);
      });
  })
  .catch(err => {
    console.error('Veritabanı bağlantısı sağlanamadı:', err);
  });
