--------------------------- [MEAT-WEB] ---------------------------
-- orders
-- order_items


--------------------------- [orders] ---------------------------
--------------------------- [주  문] ---------------------------
DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
	`order_pk`	INT(11)	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user_pk`	INT(11)	NULL	COMMENT '회원인 경우 사용자 ID, 비회원인 경우 NULL',
	`shipment_pk`	INT(11)	NOT NULL,
	`title`	VARCHAR(100)	NOT NULL	COMMENT '한우 소고기 외 3건',
	`guest_mobile`	VARCHAR(20)	NULL	COMMENT '비회원인 경우 전화번호',
	`total_price`	INT	NULL,
	`total_quantity`	INT	NULL,
	`total_count`	INT	NOT NULL	DEFAULT current_timestamp(),
	`status`	ENUM('pending','paid','shipping','delivered','cancelled')	NOT NULL	DEFAULT 'pending'	COMMENT '결제대기, 결제완료, 배송중,배송완료,주문취소',
	`created_at`	DATETIME	NOT NULL	DEFAULT current_timestamp()
);





--------------------------- [order_items] ---------------------------
--------------------------- [주 문 항 목] ---------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
	`order_item_pk`	INT(11)	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`order_pk`	INT(11)	NOT NULL,
	`product_pk`	INT(11)	NOT NULL,
	`quantity`	INT	NOT NULL	DEFAULT 1,
	`price`	INT	NOT NULL,
	`created_at`	DATETIME	NOT NULL	DEFAULT current_timestamp()
);

