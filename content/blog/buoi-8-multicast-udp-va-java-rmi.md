+++
title = "Buổi 8 (23/12) – Multicast UDP & Java RMI"
date = 2024-12-23T09:00:00+07:00
description = "Kết hợp MulticastSocket cho thông báo nhóm và triển khai dịch vụ Java RMI đơn giản."
categories = ["Buổi học"]
tags = ["Multicast", "UDP", "RMI"]
session = 8
featuredImage = "images/network-placeholder.png"
+++

## Mục tiêu buổi học
- Gửi thông báo tới nhiều client cùng nhóm multicast.
- Hiểu kiến trúc Java RMI và cách tạo interface dịch vụ.
- Tổng hợp toàn bộ kiến thức để chuẩn bị báo cáo cuối kỳ.

## Kiến thức chính
1. `MulticastSocket` và quy trình join/leave group.
2. Yêu cầu firewall khi dùng địa chỉ 224.0.0.0/4.
3. Component của RMI: interface, implementation, registry, client.

## Phân tích & giải thích
Multicast phù hợp cho các thông báo không yêu cầu xác nhận từng client, ví dụ cập nhật trạng thái lớp học. Ngược lại, RMI giúp gọi hàm từ xa nhưng cần registry hoạt động ổn định. Trong báo cáo mình vẽ sơ đồ tổng hợp: client nhận thông báo multicast, đồng thời có thể gọi RMI để lấy danh sách bài lab.

## Ví dụ minh họa / Code

```java
// Multicast sender
try (var socket = new java.net.MulticastSocket()) {
  var group = java.net.InetAddress.getByName("230.0.0.123");
  byte[] data = "Thông báo: kiểm tra cuối kỳ tuần sau!".getBytes();
  var packet = new java.net.DatagramPacket(data, data.length, group, 4446);
  socket.send(packet);
}

// RMI interface
public interface CourseService extends java.rmi.Remote {
  java.util.List<String> getLabs() throws java.rmi.RemoteException;
}
```

Ví dụ minh họa hai kỹ thuật trọng tâm của buổi cuối.

## Tổng kết
- Đã hoàn thành 8 buổi học với đầy đủ ghi chép trên blog.
- Cần rà soát lại code, bổ sung hình ảnh minh chứng trước khi nộp.
- Tự tin deploy blog lên GitHub Pages để giảng viên truy cập thuận tiện.
