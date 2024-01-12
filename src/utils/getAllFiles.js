import fs from 'fs';
import path from 'path';

export default function getAllFiles(directory, foldersOnly = false) {
  let fileNames = [];
  const files = fs.readdirSync(directory, { withFileTypes: true });
  files.forEach(file => {
    const filePath = path.join(directory, file.name);

    if (foldersOnly && file.isDirectory()) {
      fileNames.push(filePath);
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  });
  return fileNames;
}
