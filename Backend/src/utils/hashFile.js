import crypto from 'crypto';

export const hashBuffer = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest('hex');
};

export const hashString = (str) => {
  return crypto.createHash('sha256').update(str).digest('hex');
};

export const formatBytes32Hash = (sha256Hex) => {
  if (!sha256Hex) return '0x0000000000000000000000000000000000000000000000000000000000000000';
  const cleanHex = sha256Hex.replace('sha256:', '').replace('0x', '');
  return '0x' + cleanHex.padStart(64, '0').slice(0, 64);
};
