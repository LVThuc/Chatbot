# Docstring tổng hợp cho backend models và server

## models/chat.js

"""
Định nghĩa schema cho collection `chat` trong MongoDB.
- Lưu trữ lịch sử hội thoại giữa người dùng và AI.
- Mỗi document gồm:
    - userId: ID người dùng (bắt buộc).
    - history: Mảng các tin nhắn, mỗi tin nhắn gồm:
        - role: "user" hoặc "model" (bắt buộc).
        - parts: Mảng các phần nội dung (text, bắt buộc).
        - img: Đường dẫn ảnh (nếu có).
- Sử dụng timestamps để lưu thời gian tạo và cập nhật.
"""

## models/userChats.js

"""
Định nghĩa schema cho collection `userchats` trong MongoDB.
- Lưu trữ danh sách các cuộc trò chuyện (chat) của từng người dùng.
- Mỗi document gồm:
    - userId: ID người dùng (bắt buộc).
    - chats: Mảng các cuộc trò chuyện, mỗi phần tử gồm:
        - _id: ID của chat (bắt buộc).
        - title: Tiêu đề chat (bắt buộc).
        - createdAt: Thời gian tạo chat.
- Sử dụng timestamps để lưu thời gian tạo và cập nhật.
"""

## index.js

"""
File khởi tạo và cấu hình server Express cho backend.
- Kết nối MongoDB, cấu hình CORS, parse JSON.
- Tích hợp xác thực Clerk cho các route bảo mật.
- Cung cấp các API chính:
    - /api/upload: Lấy thông tin xác thực upload ảnh với ImageKit.
    - /api/chats (POST): Tạo cuộc trò chuyện mới.
    - /api/userchats (GET): Lấy danh sách chat của người dùng.
    - /api/chats/:id (GET): Lấy chi tiết một chat.
    - /api/chats/:id (PUT): Thêm tin nhắn mới vào chat.
- Xử lý lỗi và trả về thông báo phù hợp.
- Lắng nghe server trên cổng chỉ định.
"""