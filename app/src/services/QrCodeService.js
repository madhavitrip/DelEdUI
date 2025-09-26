import QRCode from 'qrcode';

/**
 * Generate a QR code data URL from input data.
 * @param {Object|string} data - The data to encode in the QR code.
 * @param {Object} [options] - QR code generation options.
 * @returns {Promise<string>} - A Promise that resolves to a Base64 image URL.
 */
const generate = async (data, options = { width: 200 }) => {
  try {
    const stringified = typeof data === 'string' ? data : JSON.stringify(data);
    return await QRCode.toDataURL(stringified, options);
  } catch (err) {
    console.error('QR code generation failed:', err);
    throw err;
  }
};

// ✅ Export as named export
export const QRCodeService = {
  generate
};
