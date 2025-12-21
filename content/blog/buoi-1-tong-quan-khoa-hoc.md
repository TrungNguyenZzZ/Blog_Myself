+++
title = "Buổi 1 (11/11) – Tổng quan khóa học"
date = 2024-11-11T09:00:00+07:00
description = "Giới thiệu yêu cầu môn học, cấu trúc lab và các công cụ cần chuẩn bị."
categories = ["Buổi học"]
tags = ["Overview", "Quy trình học"]
session = 1
featuredImage = "images/network-placeholder.png"
+++

## Mục tiêu buổi học
- Hiểu kỳ vọng của giảng viên về báo cáo và minh chứng lab.
- Cài đặt đầy đủ JDK, IDE và công cụ kiểm tra mạng.
- Phác họa các chủ đề chính sẽ học trong 8 tuần tới.

## Kiến thức chính
1. Tóm tắt mô hình TCP/IP và vai trò của từng tầng.
2. Lộ trình bài lab: từ Socket cơ bản tới Multicast & RMI.
3. Nguyên tắc viết báo cáo: trình bày lý thuyết, sơ đồ, mã nguồn và kết quả kiểm thử.

## Phân tích & giải thích
Mình ghi chú lại cách giảng viên đánh giá: mỗi lab cần có mục tiêu, sơ đồ trao đổi gói tin và kiểm chứng kết quả bằng hình ảnh/ghi log. Việc nắm rõ tiêu chí ngay từ buổi đầu giúp tiết kiệm thời gian sửa bài. Ngoài ra, buổi này cũng nhấn mạnh mối liên hệ giữa mô hình TCP/IP với Socket API trên Java, vì vậy mình ôn lại từng layer và ví dụ loại ứng dụng phù hợp.

## Ví dụ minh họa / Code
Để chắc chắn môi trường chạy ổn, mình viết chương trình kiểm tra phiên bản Java và hostname:

```java
public class HelloNetwork {
  public static void main(String[] args) throws Exception {
    System.out.println("Java version: " + System.getProperty("java.version"));
    var localhost = java.net.InetAddress.getLocalHost();
    System.out.println("Hostname: " + localhost.getHostName());
    System.out.println("IP: " + localhost.getHostAddress());
  }
}
```

Chạy chương trình giúp xác nhận máy ảo Java hoạt động và có thể truy cập API mạng.

## Tổng kết
- Về nhà đọc syllabus để nắm rõ cách tính điểm.
- Chuẩn hóa môi trường phát triển và tạo repo GitHub ngay từ đầu.
- Sẵn sàng cho buổi 2 với phần ôn lý thuyết căn bản.
