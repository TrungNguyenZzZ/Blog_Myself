+++
title = "Buổi 8 (23/12) – Multicast UDP & Java RMI"
date = 2024-12-23T09:00:00+07:00
description = "Kết hợp MulticastSocket cho thông báo nhóm và triển khai dịch vụ Java RMI đơn giản."
categories = ["Buổi học"]
tags = ["Multicast", "UDP", "RMI"]
session = 8
featuredImage = "images/buoi8.jpg"
+++

## Mục tiêu buổi học
- Gửi thông báo tới nhiều client cùng nhóm multicast.
- Hiểu kiến trúc Java RMI và cách tạo interface dịch vụ.
- Thiết lập registry và kết nối client gọi hàm từ xa.
- Tổng hợp kiến thức TCP/UDP vào báo cáo cuối kỳ.
- Đánh giá ưu/nhược khi dùng Multicast và RMI.

## Kiến thức chính
1. Dải địa chỉ multicast (224.0.0.0–239.255.255.255) và quy trình join/leave group.
2. `MulticastSocket` dùng chung port, các client cùng group sẽ nhận được bản tin.
3. Thiết lập TTL để giới hạn phạm vi gói multicast.
4. Thành phần RMI: `Remote` interface, implementation, registry, client.
5. RMI sử dụng serialization, mọi tham số trả về phải `Serializable`.

## Phân tích & giải thích
Multicast phù hợp khi cần gửi thông báo cho nhiều client cùng lúc (ví dụ thông báo lịch học, trạng thái lớp lab). So với gửi unicast từng client, multicast tiết kiệm băng thông hơn. Tuy nhiên, multicast phụ thuộc vào cấu hình mạng và có thể bị chặn bởi router hoặc firewall.

RMI lại phù hợp với mô hình gọi hàm từ xa, giúp code client giống như gọi hàm cục bộ. Điểm cần lưu ý là phải xử lý `RemoteException` và đảm bảo mọi đối tượng truyền qua mạng đều có thể serialize. Khi triển khai, mình chạy registry trên port 1099 và đăng ký service trong báo cáo.

## Ví dụ minh họa / Code
Multicast receiver đơn giản:

```java
var group = java.net.InetAddress.getByName("230.0.0.123");
try (var socket = new java.net.MulticastSocket(4446)) {
  socket.joinGroup(group);
  byte[] buffer = new byte[1024];
  var packet = new java.net.DatagramPacket(buffer, buffer.length);
  socket.receive(packet);
  String message = new String(packet.getData(), 0, packet.getLength(), java.nio.charset.StandardCharsets.UTF_8);
  System.out.println("Received: " + message);
  socket.leaveGroup(group);
}
```

RMI interface tối giản:

```java
public interface CourseService extends java.rmi.Remote {
  java.util.List<String> getLabs() throws java.rmi.RemoteException;
}
```

## Tổng kết
- Multicast phù hợp thông báo nhóm, RMI phù hợp gọi hàm từ xa.
- Cần kiểm tra firewall và quyền mạng khi chạy multicast/RMI.
- Hoàn thiện báo cáo tổng hợp và chuẩn bị nộp cuối kỳ.
