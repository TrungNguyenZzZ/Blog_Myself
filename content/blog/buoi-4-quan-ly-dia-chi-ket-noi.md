+++
title = "Buổi 4 (29/11) – Quản lý địa chỉ kết nối mạng"
date = 2024-11-29T09:00:00+07:00
description = "Làm việc với InetAddress, NetworkInterface và phân tích IP/Port trong lập trình."
categories = ["Buổi học"]
tags = ["IP", "Port", "InetAddress"]
session = 4
featuredImage = "images/network-placeholder.png"
+++

## Mục tiêu buổi học
- Tra cứu IP cục bộ, gateway và card mạng bằng Java.
- Hiểu cách hệ điều hành lựa chọn cổng nguồn khi mở socket.
- Nắm quy tắc đặt port cho dịch vụ sinh viên tự triển khai.

## Kiến thức chính
1. Lớp `InetAddress`, `InetSocketAddress` và `NetworkInterface`.
2. Cách bind server vào một địa chỉ cụ thể thay vì 0.0.0.0.
3. Ý nghĩa dải port well-known, registered và dynamic.

## Phân tích & giải thích
Giảng viên yêu cầu mỗi nhóm phải mô tả được server đang lắng nghe ở interface nào và vì sao. Mình thực hành liệt kê toàn bộ adapter và ghi lại trong báo cáo. Nhờ vậy, khi chạy trên máy ảo hoặc lab LAN, mình dễ dàng chỉ định đúng IP để client kết nối. Buổi học cũng nhấn mạnh việc kiểm tra xung đột port khi deploy nhiều dịch vụ.

## Ví dụ minh họa / Code
Đoạn code liệt kê interface và địa chỉ IPv4:

```java
var interfaces = java.net.NetworkInterface.getNetworkInterfaces();
while (interfaces.hasMoreElements()) {
  var nif = interfaces.nextElement();
  if (!nif.isUp()) continue;
  nif.getInetAddresses().asIterator().forEachRemaining(addr -> {
    if (addr instanceof java.net.Inet4Address) {
      System.out.printf("%s -> %s%n", nif.getDisplayName(), addr.getHostAddress());
    }
  });
}
```

Kết quả giúp điền chính xác địa chỉ lắng nghe vào file cấu hình.

## Tổng kết
- Luôn ghi rõ IP và port trong báo cáo để giảng viên tái hiện.
- Đặt port trong dải 10xxx để tránh trùng với dịch vụ hệ thống.
- Sẵn sàng bước sang phần TCP socket ở buổi 5.
