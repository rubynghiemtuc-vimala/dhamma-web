# Pháp Âm Archive

Kho văn bản đối chiếu Pāli – Việt, nhiều nguồn chú giải. Bắt đầu với chủ đề
**32 Thể Trược** (Dvattiṃsākāra), thiết kế để dễ mở rộng thêm chủ đề khác sau này.

## Cấu trúc thư mục

```
content/                     ← NỘI DUNG (đây là phần bạn sẽ sửa/thêm thường xuyên)
  32-the-truoc/
    topic.json                 ← tiêu đề, mô tả, danh sách nguồn đối chiếu
    items/
      01.json                  ← mỗi thể/mục là 1 file riêng → dễ diff/merge trên git
      02.json
      ...

media/                        ← video minh họa (theo từng chủ đề)
  32-the-truoc/
    tóc.mp4
    ...

src/                          ← khuôn mẫu & giao diện (ít khi cần sửa)
  _includes/                    layout + component render
  _data/topics.js               tự động đọc mọi thư mục trong content/
  assets/                       CSS + JS dùng chung
  index.njk                     trang chủ liệt kê các chủ đề
  topic.njk                     trang từng chủ đề (tự sinh 1 trang / thư mục trong content/)

eleventy.config.js
```

## Thêm 1 thể/mục mới vào chủ đề đã có

Tạo file mới trong `content/<slug-chu-de>/items/`, ví dụ `content/32-the-truoc/items/33.json`:

```json
{
  "order": 33,
  "id": "33",
  "emoji": "🫀",
  "pali_name": "...",
  "translation": "(... - ...)",
  "video_link": null,
  "video_file": null,
  "sources": {
    "vbg": { "pali_html": "...", "vi_html": "<p>...</p>" },
    "psm": { "pali_html": "...", "vi_html": "<p>...</p>" },
    "khudda": { "pali_html": "...", "vi_html": "<p>...</p>" }
  }
}
```

`pali_html` / `vi_html` cho phép dùng thẻ `<strong>`, `<p>`, `<br>` như trong bản gốc.

## Thêm 1 chủ đề hoàn toàn mới (ví dụ sau này)

1. Tạo thư mục `content/<slug-moi>/`
2. Thêm `topic.json` (copy từ `content/32-the-truoc/topic.json`, sửa `title`, `subtitle`, `slug`, `sources`)
3. Thêm `items/*.json` theo mẫu ở trên
4. Nếu có video, để trong `media/<slug-moi>/`

→ Chủ đề mới tự động xuất hiện ở trang chủ và có route riêng `/<slug-moi>/` — **không cần sửa code**.

## Chạy thử ở máy local

```bash
npm install
npm start        # chạy dev server, xem tại http://localhost:8080
npm run build     # build ra thư mục _site/ (bản tĩnh, sẵn sàng deploy)
```

## Deploy lên GitHub Pages

Đã có sẵn workflow `.github/workflows/deploy.yml`. Chỉ cần:

1. Tạo repo trên GitHub, push toàn bộ thư mục này lên nhánh `main`.
2. Vào **Settings → Pages** của repo → chọn **Source: GitHub Actions**.
3. Mỗi lần push lên `main`, site tự build và deploy lại.

## Ghi chú dữ liệu cần bạn bổ sung

- Mục **#24 "Lohitesu"** (máu) đang thiếu phần dịch nghĩa ngắn (translation) — file gốc
  không có sẵn thông tin này. Sửa trong `content/32-the-truoc/items/24.json`, field `translation`.
- 13/32 mục có video minh họa (tham chiếu tên file `.mp4`), nhưng file video thật
  **chưa có trong dữ liệu gốc** — cần bạn copy các file `.mp4` tương ứng vào
  `media/32-the-truoc/` (tên file phải khớp với field `video_file` trong từng JSON).
