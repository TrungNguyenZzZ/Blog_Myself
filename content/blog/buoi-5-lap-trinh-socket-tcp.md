+++
title = "Buổi 5 (02/12) – Lập trình sockets TCP"
date = 2024-12-02T09:00:00+07:00
description = "Xây dựng server TCP đơn giản, xử lý nhiều client và thiết kế giao thức text."
categories = ["Buổi học"]
tags = ["TCP", "ServerSocket", "Protocol"]
session = 5
featuredImage = "images/buoi5.jpg"
+++

## Mục tiêu buổi học
- Viết server TCP có khả năng phục vụ nhiều client tuần tự hoặc song song.
- Thiết kế giao thức dạng text gồm phần lệnh và dữ liệu.
- Quản lý vòng đời kết nối: mở, xử lý, đóng an toàn.
- Ghi log kết nối để dễ debug và báo cáo.
- Nhận biết các lỗi phổ biến: treo kết nối, timeout, client ngắt giữa chừng.

## Kiến thức chính
1. Quy trình `ServerSocket.accept()` và `Socket` phía client.
2. TCP là stream nên cần quy ước tách message (newline hoặc length-prefix).
3. Đóng kết nối đúng thứ tự để tránh rò rỉ tài nguyên.
4. Chiến lược xử lý nhiều client: tuần tự, đa luồng, thread pool.
5. Thiết lập timeout bằng `setSoTimeout()` để tránh treo vô hạn.

## Phân tích & giải thích
Mình bắt đầu bằng server echo cơ bản, sau đó chuyển sang giao thức text: `COMMAND|DATA`. Quy ước này giúp server phân tách lệnh rõ ràng, ví dụ `PING`, `TIME`, `QUIT`. Khi chưa có quy ước, client gửi chuỗi bất kỳ khiến server khó xử lý và dễ lỗi.

TCP là stream nên một lần đọc có thể chứa nhiều lệnh hoặc chỉ một phần lệnh. Vì vậy, việc đọc theo dòng (`readLine`) hoặc theo length-prefix giúp ổn định hơn. Trong báo cáo, mình so sánh hai cách này và chọn `readLine` cho bài lab đơn giản.

Cuối cùng, mình thêm log địa chỉ client và timestamp để kiểm tra lại. Khi có lỗi, log là bằng chứng rõ ràng để giải thích trong báo cáo cuối kỳ.

## Ví dụ minh họa / Code
Server xử lý lệnh text cơ bản:

```java
private static void handleClient(java.net.Socket socket) {
  try (socket;
       var reader = new java.io.BufferedReader(new java.io.InputStreamReader(socket.getInputStream()));
       var writer = new java.io.PrintWriter(socket.getOutputStream(), true)) {
    String line;
    while ((line = reader.readLine()) != null) {
      String[] parts = line.split("\\|", 2);
      String command = parts[0].trim().toUpperCase();
      String data = parts.length > 1 ? parts[1] : "";
      if ("QUIT".equals(command)) break;
      if ("TIME".equals(command)) {
        writer.println("TIME|" + java.time.LocalDateTime.now());
      } else {
        writer.println("ECHO|" + data);
      }
    }
  } catch (Exception e) {
    e.printStackTrace();
  }
}
```

Quy ước `COMMAND|DATA` giúp server xử lý rõ ràng và dễ mở rộng.

## Tổng kết
- TCP ổn định nhưng cần quy ước message để tránh đọc sai.
- Nên ghi log kết nối và lệnh để phục vụ debug.
- Chuẩn bị chuyển sang UDP ở buổi 6 để so sánh điểm khác nhau.
