+++
title = "Buổi 6 (09/12) – Lập trình socket UDP"
date = 2024-12-09T09:00:00+07:00
description = "Triển khai DatagramSocket, xử lý timeout và bổ sung ACK thủ công."
categories = ["Buổi học"]
tags = ["UDP", "Datagram", "Timeout"]
session = 6
featuredImage = "images/network-placeholder.png"
+++

## Mục tiêu buổi học
- Tạo UDP server và client trao đổi datagram ngắn.
- Thiết lập timeout để không bị treo khi mất gói.
- Cài đặt cơ chế ACK đơn giản để đảm bảo nhận đủ thông điệp quan trọng.

## Kiến thức chính
1. `DatagramSocket`, `DatagramPacket` và cách tái sử dụng buffer.
2. Chiến lược đặt kích thước gói và xử lý phân mảnh.
3. Cơ chế định thời (timeout) và gửi lại khi không nhận được phản hồi.

## Phân tích & giải thích
Điểm khó nhất là không có kết nối cố định, nên mình phải tự quản lý trạng thái client thông qua địa chỉ/port gửi lên. Ngoài ra, việc đặt kích thước buffer hợp lý giúp tránh lãng phí băng thông. Trong báo cáo mình trình bày bảng thống kê tỷ lệ mất gói khi thử nghiệm với mạng Wi-Fi và cách tăng cường bằng việc gửi lại tối đa 3 lần.

## Ví dụ minh họa / Code

```java
byte[] buffer = new byte[1024];
try (var socket = new java.net.DatagramSocket(10002)) {
  socket.setSoTimeout(3000);
  var packet = new java.net.DatagramPacket(buffer, buffer.length);
  while (true) {
    socket.receive(packet);
    String message = new String(packet.getData(), 0, packet.getLength());
    var reply = ("ACK:" + message).getBytes();
    var response = new java.net.DatagramPacket(
        reply, reply.length, packet.getAddress(), packet.getPort());
    socket.send(response);
  }
}
```

Server phản hồi lại chuỗi ACK giúp client biết gói đã đến.

## Tổng kết
- Với UDP cần tự định nghĩa cơ chế tin cậy phù hợp với bài toán.
- Nên log lại thời gian round-trip để dễ phân tích hiệu năng.
- Buổi sau sẽ ghép kiến thức đa luồng để cải thiện throughput.
