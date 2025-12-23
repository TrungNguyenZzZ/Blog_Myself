+++
title = "Buổi 4 (29/11) – Quản lý địa chỉ kết nối mạng"
date = 2024-11-29T09:00:00+07:00
description = "Làm việc với InetAddress, NetworkInterface và phân tích IP/Port trong lập trình."
categories = ["Buổi học"]
tags = ["IP", "Port", "InetAddress"]
session = 4
featuredImage = "images/buoi4.jpg"
+++

## Mục tiêu buổi học
- Tra cứu IP cục bộ, loopback và địa chỉ site-local bằng Java.
- Hiểu cách hệ điều hành lựa chọn cổng nguồn khi mở socket.
- Phân biệt 0.0.0.0, 127.0.0.1 và IP LAN khi bind server.
- Nắm quy tắc đặt port cho dịch vụ sinh viên tự triển khai.
- Biết các bước kiểm tra xung đột port và quyền truy cập.

## Kiến thức chính
1. `InetAddress`, `InetSocketAddress` và `NetworkInterface` để thao tác IP/port.
2. Bind server vào địa chỉ cụ thể hoặc lắng nghe mọi interface (0.0.0.0).
3. Dải port: well-known (0–1023), registered (1024–49151), dynamic (49152–65535).
4. Khác biệt IPv4/IPv6 và cách Java xử lý song song hai loại địa chỉ.
5. Ảnh hưởng của NAT/firewall khi client ở ngoài mạng LAN.

## Phân tích & giải thích
Khi có nhiều card mạng (Wi-Fi, Ethernet, VM), việc bind sai IP khiến client không kết nối được. Mình đã gặp trường hợp server chỉ bind vào 127.0.0.1 nên client trong LAN không truy cập được. Sau khi đổi sang IP LAN (192.168.x.x) thì mọi thứ chạy ổn.

Giảng viên nhấn mạnh việc ghi rõ IP/port trong báo cáo để đảm bảo tái hiện. Ngoài ra, nên kiểm tra xem port có bị dịch vụ khác chiếm dụng không, nhất là khi chạy nhiều bài lab cùng lúc. Với những bài demo, nhóm mình thường chọn port 10000–11000 để tránh trùng dịch vụ hệ thống.

Trong môi trường thật, NAT và firewall có thể chặn kết nối từ ngoài vào. Dù trong phòng lab ít gặp, nhưng hiểu khái niệm này giúp mình giải thích vì sao có lúc client ở mạng khác không thể truy cập server.

## Ví dụ minh họa / Code
Bind server vào một IP cụ thể:

```java
var host = java.net.InetAddress.getByName("192.168.1.10");
var server = new java.net.ServerSocket();
server.bind(new java.net.InetSocketAddress(host, 10010));
System.out.println("Listening on " + server.getInetAddress() + ":" + server.getLocalPort());
```

Khi cần test local, có thể bind `127.0.0.1` để giới hạn truy cập nội bộ.

## Tổng kết
- Luôn xác định đúng IP interface khi triển khai trong LAN.
- Chọn port có chủ đích để tránh xung đột và ghi rõ trong báo cáo.
- Sẵn sàng bước sang phần TCP socket ở buổi 5.
