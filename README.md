# Kinh tế thị trường định hướng XHCN ở Việt Nam

Website học tập tương tác Chương 5 — Giáo trình Kinh tế chính trị Mác – Lênin.
Gồm 10 trang tĩnh (bài học, timeline, bảng so sánh, tổng hợp, quiz) và **trợ giảng AI**
(Gemini) được huấn luyện chỉ trả lời trong phạm vi bài học.

## Cấu trúc

```
├── index.html … chatbot.html   # 10 trang tĩnh
├── assets/
│   ├── css/style.css           # design system "sơn mài"
│   └── js/                     # main.js (GSAP, mục lục), quiz.js, chatbot.js
├── api/
│   └── chat.js                 # Serverless function gọi Gemini (Vercel)
└── README.md
```

## Trợ giảng AI hoạt động thế nào

- `api/chat.js` chứa **toàn bộ tri thức Chương 5** (biên soạn từ giáo trình) trong
  system instruction, kèm quy tắc nghiêm ngặt: **chỉ trả lời trong phạm vi bài học**,
  câu ngoài phạm vi hoặc yêu cầu "bỏ qua hướng dẫn" đều bị từ chối lịch sự.
- API key Gemini **chỉ nằm ở server** (biến môi trường), không bao giờ lộ ra trình duyệt.
- Nếu API lỗi / mất mạng / mở file trực tiếp: chatbot **tự chuyển sang chế độ ngoại tuyến**
  (so khớp từ khóa cục bộ) — trải nghiệm không bao giờ chết. Nhãn trạng thái trên đầu
  khung chat cho biết đang ở chế độ nào.

## Deploy lên Vercel (miễn phí)

1. **Lấy API key Gemini** (miễn phí, không cần thẻ):
   vào <https://aistudio.google.com> → **Get API key** → tạo key.

2. **Deploy** — chọn một trong hai cách:

   **Cách A — GitHub (khuyến nghị):**
   ```bash
   git init && git add . && git commit -m "website KTTT XHCN"
   # tạo repo trên github.com rồi:
   git remote add origin https://github.com/<ban>/<ten-repo>.git
   git push -u origin main
   ```
   Vào <https://vercel.com> → **Add New → Project** → import repo → **Deploy**
   (không cần chỉnh gì — Vercel tự nhận site tĩnh + thư mục `api/`).

   **Cách B — CLI:**
   ```bash
   npm i -g vercel
   vercel          # chạy trong thư mục dự án, làm theo hướng dẫn
   ```

3. **Khai báo API key:** trong project trên Vercel →
   **Settings → Environment Variables** → thêm:

   | Name | Value |
   |---|---|
   | `AI_API_KEYS` | **một hoặc nhiều key, phân tách bằng dấu phẩy** — khi một key hết hạn mức (429/403/401) server tự xoay vòng sang key kế tiếp |
   | `AI_BASE_URL` *(tùy chọn)* | mặc định `https://generativelanguage.googleapis.com/v1beta/openai` |
   | `AI_MODEL` *(tùy chọn)* | mặc định `gemini-2.5-flash-lite`; có thể đổi `gemini-2.5-flash` |

   Sau đó **Redeploy** để biến môi trường có hiệu lực.

4. Mở `https://<ten-project>.vercel.app/chatbot.html` và hỏi thử — nhãn trong khung
   chat sẽ hiện **"Trợ giảng AI"** khi gọi Gemini thành công.

## Chạy thử ở máy

- **Chỉ xem web (không có AI):** mở `index.html` trực tiếp, hoặc
  `py -3 -m http.server 8021` rồi vào `http://localhost:8021`.
  Chatbot chạy ở chế độ ngoại tuyến.
- **Có cả AI:** `vercel dev` (cần đã `vercel link` và đặt env
  `vercel env add GEMINI_API_KEY`).

## Ghi chú

- Chi phí: free tier của Google AI Studio dư cho quy mô bài tập môn học (~$0).
- `Kinh Te Thi Truong XHCN.dc.html` là bản nháp cũ để tham khảo, không liên kết
  vào site — có thể xóa hoặc bỏ khỏi repo.
