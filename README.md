# URBANSTEP — Thailand Football Shirt + Transit Graph Project

โปรเจกต์ Interactive Web Application สำหรับรายวิชา Discrete Mathematics for IT โดยเปลี่ยนธีมเป็นร้านเสื้อฟุตบอลและใช้เส้นทางรถไฟฟ้าในกรุงเทพฯ เป็นตัวอย่าง Graph/Tree

## 4 Screens
1. `index.html` — ร้านเสื้อฟุตบอล
2. `routes.html` — ค้นหาเส้นทางกรุงเทพฯ ด้วย Weighted Graph + Dijkstra
3. `detail.html` — Order Detail และตัวอย่าง Path
4. `ticket.html` — E-Ticket

## Graph Theory
- Vertex = สถานีรถไฟฟ้า
- Edge = การเชื่อมต่อระหว่างสถานี
- Weight = เวลา/ค่าโดยสารจำลอง
- มี 7 vertices และ 10 connections
- JavaScript ใช้ adjacency list ในตัวแปร `graph`
- ใช้ Dijkstra หาเส้นทางเร็วที่สุด ค่าโดยสารต่ำสุด และแบบสมดุล

## Tree
Root = ระบบขนส่งกรุงเทพฯ
- BTS
  - สายสุขุมวิท
  - สยาม
- MRT
  - สายสีน้ำเงิน
  - สุขุมวิท
  - สวนจตุจักร
  - พระราม 9

มี Root / Parent / Child / Leaf และมีตัวอย่าง Root-to-Leaf path

## หมายเหตุข้อมูลเส้นทาง
ชื่อสถานีอ้างอิงจากระบบ BTS/MRT ในกรุงเทพฯ ส่วนเวลาและค่าโดยสารที่ใช้ใน JavaScript เป็นข้อมูลจำลองเพื่อการเรียนรู้ ไม่ใช่ข้อมูลราคาหรือเวลาเดินทางจริง

## GitHub Pages
อัปโหลดไฟล์ทั้งหมดขึ้น repository แล้วเปิด Settings → Pages → Deploy from branch → `main` / root
