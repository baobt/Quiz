# ⚡ Interactive Frontend Quiz App

Ứng dụng trắc nghiệm kiến thức Frontend (HTML, CSS, JavaScript, Tailwind) tương tác trực quan được xây dựng bằng **Vanilla JavaScript** và **Tailwind CSS**. Dự án giúp củng cố kiến thức nền tảng về xử lý DOM, quản lý trạng thái (State Management) và xử lý bất đồng bộ / thời gian thực trong JavaScript.

---

## 🔥 Tính Năng Nổi Bật

- 🔀 **Randomize Questions:** Tự động xáo trộn và rút ngẫu nhiên 25 câu hỏi từ ngân hàng câu hỏi gốc cho mỗi lượt chơi (sử dụng thuật toán Fisher-Yates).
- ⏱️ **Real-time Countdown Timer:** Đồng hồ đếm ngược 60 giây cho mỗi câu hỏi.
  - Tự động dừng đếm ngược khi người dùng đã chọn đáp án.
  - Tự động trừ 1 điểm và chuyển câu tiếp theo nếu hết thời gian.
- 🎨 **Instant Feedback UI:** Nút đáp án lập tức đổi màu Xanh (Đúng) hoặc Đỏ (Sai), đồng thời làm nổi bật đáp án đúng nếu người dùng chọn sai.
- 📊 **Dynamic Score & Results:** Cập nhật điểm số thời gian thực và tổng kết kết quả cuối bài thi.
- 📱 **Responsive Design:** Giao diện Dark Mode hiện đại, tối ưu cho cả máy tính và thiết bị di động với Tailwind CSS.

---

## 🛠️ Công Nghệ Sử Dụng

- **HTML5:** Cấu trúc giao diện ngữ nghĩa (Semantic HTML).
- **Tailwind CSS (CDN):** Style giao diện nhanh chóng, chuẩn Responsive & Dark Mode.
- **Vanilla JavaScript (ES6+):**
  - **Fetch API & Async/Await:** Tải dữ liệu câu hỏi từ file JSON.
  - **DOM Manipulation:** Tạo và biến đổi phần tử giao diện động.
  - **Timers (`setInterval`, `clearInterval`):** Quản lý đếm ngược thời gian.
  - **Array Methods (`slice`, `forEach`, Destructuring):** Xử lý mảng dữ liệu.

---

## 📂 Cấu Trúc Thư Mục

```text
quiz-app/
├── index.html       # Cấu trúc giao diện chính (Start, Quiz, End Screens)
├── questions.json   # Ngân hàng câu hỏi trắc nghiệm
├── app.js           # Logic xử lý chính (State, DOM, Timer, Event Handlers)
└── README.md        # Tài liệu hướng dẫn dự án


https://roadmap.sh/projects/quiz-app

