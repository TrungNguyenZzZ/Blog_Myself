+++
title = "Buổi 9 (30/12) – Tổng kết khóa học"
date = 2024-12-30T09:00:00+07:00
description = "Tổng hợp kiến thức đã học, đánh giá kỹ năng đạt được và kế hoạch ứng dụng thực tế."
categories = ["Buổi học"]
tags = ["Tổng kết", "Networking", "Socket"]
session = 9
featuredImage = "images/network-placeholder.png"
+++

## Mục tiêu buổi học
- Hệ thống lại toàn bộ kiến thức từ TCP/IP đến Multicast & RMI.
- Tự đánh giá điểm mạnh/yếu trong quá trình làm lab.
- Hoàn thiện báo cáo và chuẩn bị bài nộp cuối kỳ.
- Xác định hướng ứng dụng kiến thức vào dự án thực tế.
- Lập kế hoạch ôn tập cho các môn liên quan (Hệ điều hành, An toàn mạng).

## Kiến thức chính
1. Chuỗi kiến thức lõi: TCP/UDP → Socket → Đa luồng → Multicast/RMI.
2. Quy trình làm bài lab: phân tích yêu cầu → chọn giao thức → thiết kế message → test.
3. Lỗi thường gặp: timeout, dính gói, race condition, không đóng socket.
4. Kỹ năng báo cáo: sơ đồ kiến trúc, mô tả protocol, log kiểm thử.
5. Tiêu chí đánh giá: độ ổn định, tính đúng đắn, khả năng mở rộng.

## Phân tích & giải thích
Nhìn lại toàn khóa, phần khó nhất với mình là thiết kế giao thức đủ rõ ràng để client/server hiểu nhau trong mọi trường hợp (mất gói, trễ, hoặc client ngắt giữa chừng). Nhờ các buổi lab, mình hiểu được tầm quan trọng của format message, cơ chế timeout và log lỗi.

Các bài về đa luồng giúp mình nhận thức rõ rằng hiệu năng không chỉ phụ thuộc vào thuật toán mà còn phụ thuộc vào cách phân chia tài nguyên. Việc giới hạn thread, đóng socket đúng cách và dùng cấu trúc đồng bộ là những điểm mình cần làm chuẩn để tránh lỗi khó tái hiện.

Buổi tổng kết cũng nhấn mạnh sự liên kết giữa lý thuyết và thực hành. Khi viết báo cáo, mình phải mô tả rõ quá trình hoạt động để giảng viên có thể tái hiện lại kết quả. Điều này rèn luyện kỹ năng viết kỹ thuật rất cần thiết cho các môn chuyên ngành sau.

## Ví dụ minh họa / Code
Checklist mở rộng để rà soát dự án cuối kỳ:

```text
1. Giao thức rõ ràng: định dạng message + quy ước kết thúc.
2. Có log kết nối và log lỗi (timestamp + client IP).
3. Có cơ chế timeout/retry cho UDP hoặc heartbeat cho TCP.
4. Đa luồng có giới hạn thread và đóng socket trong finally.
5. Báo cáo có sơ đồ kiến trúc, kịch bản test, ảnh minh chứng.
6. Đánh giá kết quả: số client, độ trễ, tỉ lệ lỗi (nếu có).
```

Checklist này giúp mình rà soát nhanh trước khi nộp.

## Tổng kết
- Hoàn thành 9 buổi với ghi chép và code mẫu đầy đủ.
- Tự tin triển khai ứng dụng chat TCP đa luồng và thông báo multicast.
- Kế hoạch tiếp theo: xây dựng mini project “Chat + Notification” kết hợp TCP và Multicast UDP.
- Tiếp tục luyện kỹ năng viết báo cáo và kiểm thử để nâng chất lượng bài nộp.
