+++
title = "Buổi 5 (02/12) – Lập trình sockets TCP"
date = 2024-12-02T09:00:00+07:00
description = "Xây dựng server TCP đơn giản, xử lý nhiều client và thiết kế giao thức text."
categories = ["Buổi học"]
tags = ["TCP", "ServerSocket", "Protocol"]
session = 5
featuredImage = "images/network-placeholder.png"
+++

## Mục tiêu buổi học
- Viết server TCP có khả năng phục vụ nhiều client tuần tự.
- Thiết kế giao thức dạng text gồm phần header và payload.
- Biết cách log kết nối để dễ debug.

## Kiến thức chính
1. Quy trình `ServerSocket.accept()` và `Socket` ở phía client.
2. Phương pháp đóng kết nối an toàn sau khi hoàn thành phiên làm việc.
3. Chiến lược xử lý nhiều client: tuần tự, đa luồng, thread pool.

## Phân tích & giải thích
Mình bắt đầu bằng server echo cơ bản sau đó bổ sung lớp xử lý message. Quan trọng nhất là quy ước format: `[COMMAND]|[DATA]`. Nhờ format này, server có thể phân tách lệnh `PING`, `TIME`, `QUIT`. Trong báo cáo mình vẽ sơ đồ sequence thể hiện handshake và luồng dữ liệu giữa client-server.

## Ví dụ minh họa / Code

```java
try (var server = new java.net.ServerSocket(10001)) {
  System.out.println("Server đang lắng nghe 10001...");
  while (true) {
    var socket = server.accept();
    new Thread(() -> handleClient(socket)).start();
  }
}

private static void handleClient(java.net.Socket socket) {
  try (socket;
       var reader = new java.io.BufferedReader(new java.io.InputStreamReader(socket.getInputStream()));
       var writer = new java.io.PrintWriter(socket.getOutputStream(), true)) {
    String line;
    while ((line = reader.readLine()) != null) {
      if ("QUIT".equalsIgnoreCase(line)) break;
      writer.println("SERVER>" + line.toUpperCase());
    }
  } catch (Exception e) {
    e.printStackTrace();
  }
}
```

Ví dụ dùng thread mới cho mỗi client để minh họa dễ hiểu trước khi tối ưu.

## Tổng kết
- Luôn tách riêng logic đọc/ghi, tránh viết tất cả vào `main`.
- Ghi log cả địa chỉ client để tiện theo dõi.
- Chuẩn bị chuyển sang UDP ở buổi 6 để so sánh điểm khác nhau.
