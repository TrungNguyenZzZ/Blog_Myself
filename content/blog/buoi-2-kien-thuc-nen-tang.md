+++
title = "Buổi 2 (18/11) – Kiến thức nền tảng"
date = 2024-11-18T09:00:00+07:00
description = "Ôn lại mô hình OSI/TCP-IP, phân biệt TCP và UDP, giới thiệu Socket API."
categories = ["Buổi học"]
tags = ["TCP", "UDP", "Socket"]
session = 2
featuredImage = "images/buoi2.jpg"
+++

## Mục tiêu buổi học
- Ghi nhớ mối liên hệ giữa OSI 7 lớp và TCP/IP 4 lớp để định vị lỗi nhanh.
- Nhận biết khi nào nên chọn TCP hay UDP dựa trên độ tin cậy và độ trễ.
- Hiểu vai trò của IP, port và socket trong một kết nối mạng.
- Nắm quy trình bắt tay TCP và cơ chế đóng kết nối an toàn.
- Biết các tham số cơ bản khi khởi tạo socket (timeout, backlog, buffer).

## Kiến thức chính
1. Ánh xạ tầng OSI sang TCP/IP: Application ↔ (Application), Transport ↔ (TCP/UDP), Internet ↔ (IP), Link ↔ (Ethernet/Wi-Fi).
2. TCP header và ý nghĩa các trường: Source/Dest port, Sequence, ACK, Window, Flags (SYN/ACK/FIN).
3. UDP header tối giản (Source/Dest port, Length, Checksum) và đặc tính không đảm bảo.
4. Vòng đời kết nối TCP: DNS → connect → 3-way handshake → truyền dữ liệu → FIN/ACK → TIME_WAIT.
5. Công cụ quan sát kết nối: `netstat`/`ss` để xem trạng thái port, Wireshark để bắt gói.

## Phân tích & giải thích
Khi ghép OSI với TCP/IP, mình dễ dàng xác định lớp nào đang gặp vấn đề. Ví dụ lỗi ở tầng Application thường xuất hiện dưới dạng sai định dạng dữ liệu, còn lỗi ở tầng Transport liên quan đến timeout hoặc mất gói. Cách suy nghĩ theo lớp giúp mình viết báo cáo có cấu trúc hơn và giải thích được nguyên nhân.

TCP tạo kết nối đáng tin cậy nhờ sequence/acknowledgment và cơ chế cửa sổ trượt (window). Ngược lại, UDP nhẹ hơn nhưng không đảm bảo thứ tự hay giao hàng. Vì vậy, bài toán truyền file, đăng nhập, hoặc giao dịch nên dùng TCP, còn thông báo thời gian thực, game, hoặc streaming ngắn có thể cân nhắc UDP để giảm độ trễ.

Khi gọi `new Socket()` trong Java, chương trình sẽ tiến hành phân giải DNS và bắt tay TCP. Nếu không đặt timeout, thao tác có thể treo lâu khi mạng lỗi. Đây là lý do giảng viên yêu cầu luôn ghi rõ timeout và thông số kết nối trong báo cáo.

## Ví dụ minh họa / Code
Đoạn code sau kết nối TCP có timeout và in thông tin socket:

```java
var host = java.net.InetAddress.getByName("example.com");
try (var socket = new java.net.Socket()) {
  socket.connect(new java.net.InetSocketAddress(host, 80), 3000);
  socket.setSoTimeout(3000);
  System.out.println("Local: " + socket.getLocalAddress() + ":" + socket.getLocalPort());
  System.out.println("Remote: " + socket.getInetAddress() + ":" + socket.getPort());
}
```

Kết quả cho thấy port nguồn do hệ điều hành cấp phát (thường trong dải 49152–65535).

## Tổng kết
- Nắm rõ handshake giúp giải thích được vì sao kết nối TCP ổn định hơn.
- Xác định đúng lớp và giao thức trước khi viết code giúp giảm lỗi logic.
- Chuẩn bị kiến thức nền tảng cho các buổi lập trình socket tiếp theo.
