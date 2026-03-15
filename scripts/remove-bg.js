const sharp = require("sharp");
const path = require("path");

const inputPath = path.join(__dirname, "..", "src", "app", "icon.png");
const outputPath = path.join(__dirname, "..", "src", "app", "icon-transparent.png");

// Black/dark background threshold (0-255). Pixels darker than this become transparent.
const BLACK_THRESHOLD = 35;

async function removeBlackBackground() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const bytesPerPixel = channels;

  for (let i = 0; i < data.length; i += bytesPerPixel) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Make pixel transparent if it's black or very dark
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png()
    .toFile(outputPath);

  console.log("Done: black background removed, saved as", outputPath);
}

removeBlackBackground().catch((err) => {
  console.error(err);
  process.exit(1);
});
