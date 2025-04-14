const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secretkey';  // jwt anahtarı tanımlama

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kullanıcı adı veya email zaten varsa, hata döndürüyoruz
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Kullanıcı adı zaten mevcut!' });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Bu email ile bir hesap mevcut!' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı oluşturuyoruz
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // JWT token oluşturuyoruz
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Kayıt sırasında bir hata oluştu!', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Şifre hatalı' });

    // JWT token oluşturuyoruz
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Giriş başarılı', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Giriş sırasında bir hata oluştu!', error: error.message });
  }
});

module.exports = router;
