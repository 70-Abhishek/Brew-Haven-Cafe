const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  displayName: { 
    type: String 
  },
  isGuest: { 
    type: Boolean, 
    default: false 
  },
  photoURL: { 
    type: String,
    default: '' 
  },
  phone: { 
    type: String, 
    default: '' 
  },
  address: { 
    type: String, 
    default: '' 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);