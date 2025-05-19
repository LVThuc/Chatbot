# Docstring tổng hợp cho toàn bộ phần client

---

## src/App.jsx

"""
Component gốc của ứng dụng React.
- Hiển thị nội dung chính của ứng dụng (dùng cho phát triển/test nhanh).
"""

---

## src/main.jsx

"""
File entry point khởi tạo ứng dụng React.
- Thiết lập router với các route chính: trang chủ, đăng nhập, đăng ký, dashboard, chat.
- Bọc ứng dụng với RouterProvider để quản lý định tuyến.
"""

---

## src/layouts/Rootlayout/Rootlayout.jsx

"""
Layout gốc cho toàn bộ ứng dụng.
- Cung cấp header với logo và thông tin người dùng.
- Bọc các route con bằng ClerkProvider (xác thực) và QueryClientProvider (React Query).
- Hiển thị nội dung chính qua <Outlet />.
"""

---

## src/layouts/Dashboardlayout/Dashboardlayout.jsx

"""
Layout cho khu vực dashboard sau khi đăng nhập.
- Kiểm tra xác thực người dùng, chuyển hướng nếu chưa đăng nhập.
- Hiển thị menu (Chatlist) và nội dung chính (Outlet).
"""

---

## src/components/Chatlist/Chatlist.jsx

"""
Hiển thị danh sách các cuộc trò chuyện gần đây của người dùng.
- Lấy dữ liệu từ API thông qua React Query.
- Cho phép chọn chat để tiếp tục hoặc tạo chat mới.
- Hiển thị thông tin liên hệ và phản hồi.
"""

---

## src/components/NewPrompt/NewPrompt.jsx

"""
Component gửi prompt mới tới AI và hiển thị kết quả trả lời.
- Cho phép nhập câu hỏi, upload hình ảnh, gửi dữ liệu tới backend và AI.
- Hiển thị câu trả lời dạng markdown, hỗ trợ công thức toán học.
- Tự động cập nhật giao diện khi có kết quả mới.
"""

---

## src/components/upload/Upload.jsx

"""
Component upload hình ảnh lên ImageKit.
- Cho phép chọn file, upload và lấy đường dẫn ảnh.
- Tích hợp xác thực upload với backend.
- Trả về thông tin ảnh cho component cha xử lý.
"""

---

## src/routes/Homepage/Homepage.jsx

"""
Trang chủ của ứng dụng.
- Hiển thị giới thiệu, logo, slogan và nút bắt đầu sử dụng.
- Điều hướng tới dashboard khi người dùng nhấn "Get Started".
"""

---

## src/routes/Signinpage/Signinpage.jsx

"""
Trang đăng nhập cho người dùng.
- Sử dụng component SignIn của Clerk để xác thực.
- Hiển thị giao diện đăng nhập thân thiện.
"""

---

## src/routes/Signuppage/Signuppage.jsx

"""
Trang đăng ký tài khoản cho người dùng mới.
- Sử dụng component SignUp của Clerk để đăng ký.
- Hiển thị giao diện đăng ký đơn giản, dễ sử dụng.
"""

---

## src/routes/Dashboardpage/Dashboardpage.jsx

"""
Trang dashboard chính sau khi đăng nhập.
- Hiển thị logo, các lựa chọn chức năng (tạo chat, phân tích ảnh, giải toán).
- Cho phép tạo cuộc trò chuyện mới với AI.
"""

---

## src/routes/Chatpage/Chatpage.jsx

"""
Trang hiển thị chi tiết một cuộc trò chuyện.
- Lấy lịch sử chat từ backend, hiển thị từng tin nhắn, hình ảnh, markdown, công thức toán học.
- Tích hợp component NewPrompt để gửi câu hỏi mới.
"""

---

## src/lib/gemini.js

"""
Cấu hình và khởi tạo model Google Generative AI (Gemini).
- Thiết lập các tham số an toàn cho AI.
- Xuất model để sử dụng trong các component gửi prompt.
"""

---

## src/utils/autowrapmath.jsx

"""
Hàm tiện ích cho xử lý văn bản toán học.
- Hiện tại trả về nguyên văn text truyền vào.
- Có thể mở rộng để tự động nhận diện và bọc các biểu thức toán học.
"""

---

## vite.config.js

"""
Cấu hình Vite cho project React.
- Thiết lập plugin React.
- Cho phép sử dụng các tính năng hiện đại của Vite cho phát triển và build ứng dụng.
"""

---

## .eslintrc.cjs

"""
Cấu hình ESLint cho project.
- Thiết lập các rule kiểm tra code, hỗ trợ React và React Hooks.
- Đảm bảo code nhất quán, dễ bảo trì.
"""

---

## package.json

"""
Khai báo thông tin project, các script chạy, dependencies và devDependencies.
- Quản lý toàn bộ thư viện sử dụng trong client.
- Đảm bảo đồng bộ môi trường phát triển và production.
"""

---

## .env

"""
Khai báo các biến môi trường cho client.
- Chứa các key API, endpoint, public key cho các dịch vụ bên ngoài như Clerk, ImageKit, Gemini AI.
"""

---

## index.html

"""
File HTML gốc để mount ứng dụng React.
- Chứa thẻ <div id="root"></div> làm điểm mount cho ReactDOM.
- Thiết lập favicon, tiêu đề trang và import script chính.
"""

---

**Lưu ý:**  
Các docstring này mô tả chức năng chính của từng file/component/layout trong thư mục client, giúp dễ dàng tra cứu và bảo trì dự án.