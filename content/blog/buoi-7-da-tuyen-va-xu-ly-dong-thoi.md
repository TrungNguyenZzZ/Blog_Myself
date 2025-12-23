+++
title = "Buổi 7 (16/12) – Đa tuyến và xử lý đồng thời"
date = 2024-12-16T09:00:00+07:00
description = "Ứng dụng Thread, ExecutorService và cơ chế đồng bộ để phục vụ nhiều client."
categories = ["Buổi học"]
tags = ["Threads", "Executor", "Concurrency"]
session = 7
featuredImage = "images/buoi7.png"
+++

## Mục tiêu buổi học
- Lựa chọn mô hình thread phù hợp (per-connection hoặc thread-pool).
- Ngăn chặn race condition khi chia sẻ tài nguyên chung.
- Theo dõi số lượng client đang kết nối theo thời gian thực.
- Tối ưu throughput mà không làm cạn tài nguyên hệ thống.
- Biết cách dừng server an toàn khi kết thúc bài lab.

## Kiến thức chính
1. `ExecutorService` và pattern submit task cho từng client.
2. `ConcurrentHashMap`/`AtomicInteger` để chia sẻ dữ liệu an toàn.
3. `synchronized`/`Lock` khi cần bảo vệ vùng dữ liệu quan trọng.
4. Chi phí tạo thread và lợi ích của thread pool cố định.
5. Quy trình đóng socket trong `try/finally` để tránh rò rỉ.

## Phân tích & giải thích
Thread-per-connection dễ hiểu nhưng có nguy cơ tạo quá nhiều thread khi client tăng đột biến, dẫn đến quá tải CPU và RAM. Vì vậy, nhóm mình chuyển sang thread pool để giới hạn số luồng xử lý đồng thời. Điều này giúp server ổn định hơn khi có nhiều client kết nối cùng lúc.

Khi chia sẻ dữ liệu (ví dụ danh sách client online), nếu không dùng cấu trúc đồng bộ, chương trình dễ gặp lỗi race condition. Trong lab, mình dùng `ConcurrentHashMap` lưu thông tin client và `AtomicInteger` đếm số kết nối. Nhờ vậy, số liệu thống kê luôn chính xác.

Một lưu ý quan trọng là luôn đóng socket trong `finally` để đảm bảo tài nguyên được giải phóng, kể cả khi xử lý gặp lỗi.

## Ví dụ minh họa / Code
Server với thread pool và bộ đếm kết nối:

```java
var executor = java.util.concurrent.Executors.newFixedThreadPool(8);
var connections = new java.util.concurrent.atomic.AtomicInteger();
try (var server = new java.net.ServerSocket(10003)) {
  while (true) {
    var socket = server.accept();
    executor.submit(() -> {
      connections.incrementAndGet();
      try {
        handle(socket);
      } finally {
        connections.decrementAndGet();
        try { socket.close(); } catch (Exception ignored) { }
      }
    });
  }
}
```

Cách này giới hạn số thread và vẫn đảm bảo đóng socket an toàn.

## Tổng kết
- Thread pool giúp server ổn định và tránh bị DOS.
- Cần dùng cấu trúc dữ liệu đồng bộ khi chia sẻ trạng thái.
- Chuẩn bị cho buổi cuối về multicast và RMI.
