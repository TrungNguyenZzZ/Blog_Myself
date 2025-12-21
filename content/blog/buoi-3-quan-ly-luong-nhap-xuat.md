+++
title = "Buổi 3 (25/11) – Quản lý các luồng nhập xuất"
date = 2024-11-25T09:00:00+07:00
description = "Tìm hiểu InputStream/OutputStream, buffer và cách xử lý tài nguyên mạng đúng chuẩn."
categories = ["Buổi học"]
tags = ["IO", "Buffer", "Socket"]
session = 3
featuredImage = "images/network-placeholder.png"
+++

## Mục tiêu buổi học
- Phân biệt stream nhị phân và stream ký tự trên Java.
- Biết cách bọc buffer để tăng hiệu năng đọc/ghi socket.
- Viết code đóng tài nguyên chính xác, tránh rò rỉ.

## Kiến thức chính
1. Cặp `InputStream`/`OutputStream` kết hợp với `BufferedInputStream`.
2. Cách sử dụng `try-with-resources` để tự động đóng socket và stream.
3. Tại sao cần chuẩn hóa định dạng thông điệp (length-prefix, newline...).

## Phân tích & giải thích
Buổi này mình nhận ra thao tác IO ảnh hưởng trực tiếp đến độ ổn định của server. Nếu đọc từng byte mà không buffer, CPU sẽ bị kéo xuống đáng kể. Khi viết báo cáo, mình so sánh hai biểu đồ đo thời gian truyền dữ liệu có/không buffer để thấy rõ sự chênh lệch. Ngoài ra, giảng viên nhấn mạnh việc kiểm soát encoding khi chuyển qua stream ký tự để tránh lỗi phân mảnh gói tin.

## Ví dụ minh họa / Code
Mẫu server mini đọc yêu cầu theo từng dòng:

```java
try (var server = new java.net.ServerSocket(9090)) {
  try (var socket = server.accept();
       var reader = new java.io.BufferedReader(
         new java.io.InputStreamReader(socket.getInputStream()));
       var writer = new java.io.PrintWriter(socket.getOutputStream(), true)) {
    String line;
    while ((line = reader.readLine()) != null) {
      writer.println("Server nhận: " + line);
    }
  }
}
```

Code sử dụng `BufferedReader` và `PrintWriter` để thao tác với chuỗi có newline.

## Tổng kết
- Luôn bọc stream bằng buffer nếu dữ liệu có kích thước đáng kể.
- Thiết kế format thông điệp rõ ràng để client/server hiểu nhau.
- Chuẩn bị ôn phần địa chỉ mạng cho buổi 4.
