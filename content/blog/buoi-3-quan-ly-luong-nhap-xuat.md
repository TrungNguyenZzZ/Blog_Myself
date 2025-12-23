+++
title = "Buổi 3 (25/11) – Quản lý các luồng nhập xuất"
date = 2024-11-25T09:00:00+07:00
description = "Tìm hiểu InputStream/OutputStream, buffer và cách xử lý tài nguyên mạng đúng chuẩn."
categories = ["Buổi học"]
tags = ["IO", "Buffer", "Socket"]
session = 3
featuredImage = "images/buoi3.jpg"
+++

## Mục tiêu buổi học
- Phân biệt stream nhị phân và stream ký tự trong Java.
- Hiểu cách bọc buffer để tăng hiệu năng đọc/ghi socket.
- Chuẩn hóa định dạng thông điệp để tránh dính gói/đứt gói.
- Biết sử dụng `try-with-resources` và `flush()` đúng thời điểm.
- Kiểm soát encoding (UTF-8) để tránh lỗi ký tự khi truyền dữ liệu.

## Kiến thức chính
1. `InputStream`/`OutputStream` làm việc với byte, `Reader`/`Writer` làm việc với ký tự.
2. `BufferedInputStream`/`BufferedOutputStream` và `BufferedReader`/`BufferedWriter` giúp giảm số lần IO.
3. `DataInputStream`/`DataOutputStream` hỗ trợ kiểu dữ liệu nguyên thủy và length-prefix.
4. Hàm `read()` có thể trả về ít byte hơn yêu cầu; cần vòng lặp đọc đầy đủ.
5. `PrintWriter` có autoFlush khi ghi newline, cần cấu hình đúng để không bị trễ.

## Phân tích & giải thích
Trong lập trình mạng, dữ liệu đi theo từng gói nên việc đọc/ghi thường không trọn vẹn ở một lần gọi. Nếu không xử lý đúng, client sẽ nhận thiếu dữ liệu hoặc ghép sai message. Vì vậy, việc định nghĩa khung (framing) là bắt buộc: có thể dùng delimiter (`\n`), length-prefix (đọc trước độ dài), hoặc fixed-size.

Một lỗi phổ biến là quên thống nhất encoding giữa client và server. Khi server dùng UTF-8 mà client dùng mặc định hệ thống, dấu tiếng Việt có thể bị sai. Giảng viên yêu cầu ghi rõ encoding trong báo cáo và trong code để tránh lỗi không tái hiện được.

Mình cũng nhận ra buffer giúp giảm đáng kể thời gian truyền, nhất là khi gửi file. Thử nghiệm của nhóm cho thấy đọc/ghi theo byte đơn lẻ chậm hơn nhiều lần so với đọc/ghi theo block 4KB hoặc 8KB.

## Ví dụ minh họa / Code
Ví dụ gửi/nhận theo length-prefix để tránh dính gói:

```java
var out = new java.io.DataOutputStream(socket.getOutputStream());
byte[] payload = "HELLO SOCKET".getBytes(java.nio.charset.StandardCharsets.UTF_8);
out.writeInt(payload.length);
out.write(payload);
out.flush();

var in = new java.io.DataInputStream(socket.getInputStream());
int len = in.readInt();
byte[] data = in.readNBytes(len);
String message = new String(data, java.nio.charset.StandardCharsets.UTF_8);
```

Cách này đảm bảo đọc đủ số byte trước khi xử lý nội dung.

## Tổng kết
- Luôn xác định trước format dữ liệu để tránh lỗi dính/đứt gói.
- Buffer và encoding là hai yếu tố ảnh hưởng lớn đến độ ổn định.
- Chuẩn bị kiến thức địa chỉ mạng cho buổi 4.
