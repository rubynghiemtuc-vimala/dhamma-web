import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";

// Đọc mọi thư mục trong /content/ như một "chủ đề" (topic).
// Thêm chủ đề mới = thêm 1 thư mục mới vào content/, không cần sửa code này.
const CONTENT_DIR = path.resolve("content");

function loadTopic(slug) {
  const topicDir = path.join(CONTENT_DIR, slug);
  const metaPath = path.join(topicDir, "topic.json");
  if (!existsSync(metaPath)) return null;

  const meta = JSON.parse(readFileSync(metaPath, "utf-8"));
  const itemsDir = path.join(topicDir, "items");
  const itemFiles = existsSync(itemsDir)
    ? readdirSync(itemsDir).filter((f) => f.endsWith(".json")).sort()
    : [];

  const items = itemFiles
    .map((f) => JSON.parse(readFileSync(path.join(itemsDir, f), "utf-8")))
    .sort((a, b) => a.order - b.order)
    .map((it) => ({ ...it, order_padded: String(it.order).padStart(2, "0") }));

  return { ...meta, items };
}

export default function () {
  if (!existsSync(CONTENT_DIR)) return [];
  const topicSlugs = readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return topicSlugs.map(loadTopic).filter(Boolean);
}
