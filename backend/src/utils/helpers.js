const generateTrackingNumber = () => {
  const prefix = 'SHP';
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${timestamp.slice(-6)}${random}`;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

const calculateEstimatedDelivery = (packageSize) => {
  const now = new Date();
  let daysToAdd = 3; // Default 3 days

  switch (packageSize) {
    case 'small':
      daysToAdd = 2;
      break;
    case 'medium':
      daysToAdd = 3;
      break;
    case 'large':
      daysToAdd = 4;
      break;
    case 'extra-large':
      daysToAdd = 5;
      break;
  }

  now.setDate(now.getDate() + daysToAdd);
  return now;
};

module.exports = {
  generateTrackingNumber,
  validateEmail,
  validatePhone,
  calculateEstimatedDelivery,
};
