import { copyFile, existsSync, mkdirSync } from "fs";

const iconsFolder = "dist/icons";

const sourceFolder = [
  ...[16, 32, 48, 128].map((n) => (
    [`public/icons/icon${n}.png`, `${iconsFolder}/icon${n}.png`]
  )),
  ["public/index.html", "dist/extension/index.html"],
  ["public/manifest.json", "dist/manifest.json"],
];


if (!existsSync(iconsFolder)) {
  mkdirSync(iconsFolder);
}

sourceFolder.forEach(([source, destination]) => {
  copyFile(source, destination, (err) => {
    if (err) {
      console.error("Failed to copy", source);
      throw err;
    }
  });
});
