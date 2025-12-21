+++
title = "Buổi 2 (18/11) – Kiến thức nền tảng"
date = 2024-11-18T09:00:00+07:00
description = "Ôn lại mô hình OSI/TCP-IP, phân biệt TCP và UDP, giới thiệu Socket API."
categories = ["Buổi học"]
tags = ["TCP", "UDP", "Socket"]
session = 2
featuredImage = "images/network-placeholder.png"
+++

## Mục tiêu buổi học
- Ghi nhớ mối liên hệ giữa OSI 7 lớp và TCP/IP.
- Nhận biết khi nào nên chọn TCP hay UDP.
- Hiểu cấu trúc cơ bản của Socket API trong Java.

## Kiến thức chính
1. Layer Transport và nhiệm vụ đảm bảo tin cậy/không tin cậy.
2. Định dạng tiêu đề TCP/UDP, ý nghĩa từng trường.
3. Luồng xử lý khi gọi `new Socket()` và `new ServerSocket()`.

## Phân tích & giải thích
Giảng viên yêu cầu trình bày lại quá trình handshake của TCP và cách UDP gửi datagram độc lập. Mình rút ra rằng socket chỉ là điểm cuối của kết nối, còn logic truyền thông phụ thuộc vào cách đóng gói dữ liệu. Khi viết báo cáo, mình so sánh ưu/nhược từng giao thức và minh họa bằng trường hợp sử dụng thực tế như truyền file (TCP) hay gửi thông báo nhanh (UDP).

## Ví dụ minh họa / Code
Đoạn code nhỏ sau mô tả cách mở socket TCP và in thông tin kết nối:

```java
try (var socket = new java.net.Socket("example.com", 80)) {
  System.out.println("Local: " + socket.getLocalAddress() + ":" + socket.getLocalPort());
  System.out.println("Remote: " + socket.getInetAddress() + ":" + socket.getPort());
}
```

Chỉ cần chạy đoạn code là có thể quan sát port được OS cấp phát và kiểm tra firewall.

## Tổng kết
- Ghi nhớ rõ các trường trong header TCP/UDP để dễ debug.
- Khi thiết kế bài lab nên quyết định giao thức trước khi viết code.
- Chuẩn bị slide mô tả handshake để dùng ở các lab tiếp theo.
