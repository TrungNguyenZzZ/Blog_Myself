+++
title = "Buổi 6 (09/12) – Lập trình socket UDP"
date = 2024-12-09T09:00:00+07:00
description = "Triển khai DatagramSocket, xử lý timeout và bổ sung ACK thủ công."
categories = ["Buổi học"]
tags = ["UDP", "Datagram", "Timeout"]
session = 6
featuredImage = "images/buoi6.jpg"
+++

## Mục tiêu buổi học
- Tạo UDP server và client trao đổi datagram ngắn.
- Thiết lập timeout để không bị treo khi mất gói.
- Cài đặt cơ chế ACK/Retry đơn giản cho thông điệp quan trọng.
- Quản lý kích thước gói để tránh phân mảnh.
- Đánh giá ưu/nhược của UDP so với TCP trong bài lab.

## Kiến thức chính
1. `DatagramSocket`, `DatagramPacket` và cách tái sử dụng buffer.
2. UDP giữ nguyên ranh giới message (message boundary) nhưng không đảm bảo thứ tự.
3. Kích thước gói an toàn ~1400 bytes để tránh phân mảnh trong mạng LAN.
4. `setSoTimeout()` và cơ chế gửi lại khi không nhận được ACK.
5. Cách nhận biết client bằng cặp địa chỉ IP + port.

## Phân tích & giải thích
Điểm khó nhất là UDP không có kết nối cố định, nên server phải tự quản lý trạng thái dựa trên IP/port gửi đến. Nếu client đổi port, server coi như một phiên mới. Ngoài ra, gói tin có thể mất hoặc đến trễ, vì vậy cần có số thứ tự (sequence) và ACK để đảm bảo dữ liệu quan trọng.

Trong thí nghiệm, nhóm mình giới hạn kích thước gói để tránh phân mảnh. Khi gói bị phân mảnh, chỉ cần mất một mảnh là toàn bộ gói bị mất. Vì vậy, việc chia nhỏ dữ liệu thành nhiều gói nhỏ và có số thứ tự giúp việc ghép lại ổn định hơn.

## Ví dụ minh họa / Code
Server phản hồi ACK kèm số thứ tự:

```java
byte[] buffer = new byte[1024];
try (var socket = new java.net.DatagramSocket(10002)) {
  socket.setSoTimeout(3000);
  var packet = new java.net.DatagramPacket(buffer, buffer.length);
  while (true) {
    socket.receive(packet);
    String message = new String(packet.getData(), 0, packet.getLength(), java.nio.charset.StandardCharsets.UTF_8);
    String[] parts = message.split("\\|", 2);
    String seq = parts[0];
    String payload = parts.length > 1 ? parts[1] : "";
    String replyText = "ACK|" + seq + "|" + payload;
    byte[] reply = replyText.getBytes(java.nio.charset.StandardCharsets.UTF_8);
    var response = new java.net.DatagramPacket(reply, reply.length, packet.getAddress(), packet.getPort());
    socket.send(response);
  }
}
```

Client có thể gửi `"1|PING"` và chờ phản hồi `"ACK|1|PING"` để biết gói đã đến.

## Tổng kết
- Với UDP phải tự định nghĩa độ tin cậy nếu dữ liệu quan trọng.
- Kích thước gói nhỏ giúp giảm rủi ro mất gói do phân mảnh.
- Buổi sau sẽ ghép kiến thức đa luồng để cải thiện throughput.
