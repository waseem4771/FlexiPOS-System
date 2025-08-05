const fs = require("fs");
const { parse } = require("json2csv");

const files = ["orders", "products", "users", "customers", "settings", "suppliers"];

files.forEach((name) => {
  const filePath = `${name}.json`;

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Skipped ${name}.json (file not found)`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!Array.isArray(data) || data.length === 0) {
    console.warn(`⚠️  Skipped ${name}.json (no data)`);
    return;
  }

  const csv = parse(data);
  fs.writeFileSync(`${name}.csv`, csv);
  console.log(`✅ Converted ${name}.json → ${name}.csv`);
});
