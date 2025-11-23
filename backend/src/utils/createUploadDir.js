// backend/src/utils/createUploadDir.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates the uploads directory if it doesn't exist
 * This should be called when the server starts
 */
export const ensureUploadDirExists = () => {
  const uploadDir = path.join(__dirname, '../../uploads');
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✅ Uploads directory created');
  } else {
    console.log('✅ Uploads directory exists');
  }
};

export default ensureUploadDirExists;