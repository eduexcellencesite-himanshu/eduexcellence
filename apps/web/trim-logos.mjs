import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = "public/assets";
const backupDir = "logo-backup";

const files = [
  "Avishkaar.png",
  "class-teacher-learning-system.png",
  "Codevidhya.png",
  "Creya.png",
  "Edunext.png",
  "Eduvate.png",
  "Losignite.png",
  "Mapmystudy.png",
  "MKCL.png",
  "NU.png",
  "Oracle.png",
  "parenting-orb.png",
  "pepsi.png",
  "primary-plus.png",
  "qfs.png",
  "rancho-labs.png",
  "rishihood-university.png",
  "scholarly.png",
  "Sonacore.png",
  "ViewSonic.png",
  "p-ryan.png",
  "p1.png",
  "p2.png",
];

fs.mkdirSync(backupDir, { recursive: true });

for (const file of files) {
  const filePath = path.join(dir, file);

  if (!fs.existsSync(filePath)) {
    console.log("MISSING:", file);
    continue;
  }

  fs.copyFileSync(filePath, path.join(backupDir, file));

  const output = await sharp(filePath)
    .trim({ threshold: 10 })
    .resize({
      width: 600,
      height: 300,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();

  fs.writeFileSync(filePath, output);

  console.log("DONE:", file);
}
