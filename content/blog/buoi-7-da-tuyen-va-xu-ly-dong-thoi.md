+++
title = "Buổi 7 (16/12) – Đa tuyến và xử lý đồng thời"
date = 2024-12-16T09:00:00+07:00
description = "Ứng dụng Thread, ExecutorService và cơ chế đồng bộ để phục vụ nhiều client."
categories = ["Buổi học"]
tags = ["Threads", "Executor", "Concurrency"]
session = 7
featuredImage = "images/network-placeholder.png"
+++

## Mục tiêu buổi học
- Biết lựa chọn mô hình thread phù hợp (per-connection, thread-pool).
- Ngăn chặn race condition khi chia sẻ tài nguyên chung.
- Ghi nhận số lượng client đang kết nối theo thời gian thực.

## Kiến thức chính
1. `ExecutorService` và pattern submit task cho từng client.
2. Sử dụng `ConcurrentHashMap` để lưu trạng thái kết nối.
3. Kết hợp synchronized/lock để bảo vệ tài nguyên quan trọng.

## Phân tích & giải thích
Mình refactor bài TCP trước đó để tận dụng `Executors.newFixedThreadPool(8)`. Nhờ vậy server không tạo quá nhiều thread dẫn đến cạn kiệt tài nguyên. Ngoài ra, mình thêm bộ đếm `AtomicInteger` để biết hiện có bao nhiêu client online. Báo cáo cũng so sánh thời gian phản hồi giữa mô hình tuần tự và thread-pool.

## Ví dụ minh họa / Code

```java
var executor = java.util.concurrent.Executors.newFixedThreadPool(8);
var connections = new java.util.concurrent.atomic.AtomicInteger();
try (var server = new java.net.ServerSocket(10003)) {
  while (true) {
    var socket = server.accept();
    executor.submit(() -> {
      int current = connections.incrementAndGet();
      System.out.println("Client vào, tổng: " + current);
      handle(socket);
      current = connections.decrementAndGet();
      System.out.println("Client thoát, còn: " + current);
    });
  }
}
```

`handle` tái sử dụng logic đọc/ghi cũ nhưng giờ an toàn hơn.

## Tổng kết
- Thống nhất giới hạn thread để tránh server bị DOS.
- Ghi log trạng thái để dễ làm báo cáo phân tích tải.
- Chuẩn bị cho buổi cuối về multicast và RMI.
