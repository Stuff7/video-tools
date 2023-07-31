import { copyFile } from "fs";

const sourceFolder = [
  ["public/index.html", "dist/extension/index.html"],
  ["public/manifest.json", "dist/manifest.json"],
];

sourceFolder.forEach(([source, destination]) => {
  copyFile(source, destination, (err) => {
    if (err) {
      console.error("Failed to copy", source);
      throw err;
    }
  });
});
