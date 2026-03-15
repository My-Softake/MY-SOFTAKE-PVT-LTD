const sharp = require("sharp");
const path = require("path");

const iconPath = path.join(__dirname, "..", "src", "app", "icon.png");
const applePath = path.join(__dirname, "..", "src", "app", "apple-icon.png");
// Target size: a bit bigger. 192px is good for favicons (sharp on all screens).
const TARGET_SIZE = 192;

async function resize() {
  const outIcon = path.join(__dirname, "..", "src", "app", "icon-resized.png");
  const outApple = path.join(__dirname, "..", "src", "app", "apple-icon-resized.png");

  await sharp(iconPath)
    .resize(TARGET_SIZE, TARGET_SIZE)
    .png()
    .toFile(outIcon);
  console.log("Resized icon to", TARGET_SIZE + "x" + TARGET_SIZE);

  await sharp(applePath)
    .resize(TARGET_SIZE, TARGET_SIZE)
    .png()
    .toFile(outApple);
  console.log("Resized apple-icon to", TARGET_SIZE + "x" + TARGET_SIZE);
  console.log("Now replace icon.png and apple-icon.png with icon-resized.png and apple-icon-resized.png");
}

resize().catch((err) => {
  console.error(err);
  process.exit(1);
});
