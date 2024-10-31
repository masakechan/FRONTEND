import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối đến MongoDB (thay đổi URL theo cấu hình của bạn)
mongoose.connect('mongodb://localhost:27017/contactbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Định nghĩa schema cho liên hệ
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// API để lấy danh sách liên hệ
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API để thêm liên hệ mới
app.post('/api/contacts', async (req, res) => {
  const newContact = new Contact(req.body);
  try {
    await newContact.save();
    res.status(201).send(newContact);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
