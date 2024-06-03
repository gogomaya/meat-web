



--------------------------- [MEAT-WEB] ---------------------------
-- products
-- products_images
-- orders
-- order_items


--------------------------- [products] ---------------------------
--------------------------- [상 품] ---------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_pk` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `category` enum('cow','pork','simple') NOT NULL,
  `category_menu` varchar(500) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(500) DEFAULT NULL COMMENT '금액 밑에 간단한 설명',
  `origin` varchar(500) DEFAULT NULL COMMENT '원산지',
  `etc` varchar(500) DEFAULT NULL COMMENT '배송관련 간단 설명',
  `weight` varchar(500) DEFAULT NULL COMMENT '제품중량',
  `type` varchar(500) DEFAULT NULL COMMENT '식품유형',
  `part` varchar(500) DEFAULT NULL COMMENT '부위',
  `per100g` varchar(500) DEFAULT NULL COMMENT '100g당',
  `grade` varchar(500) DEFAULT NULL COMMENT '등급',
  `package` varchar(500) DEFAULT NULL COMMENT '포장방법',
  `is_today` tinyint(1) NOT NULL DEFAULT 0,
  `is_best` tinyint(1) NOT NULL DEFAULT 0,
  `is_sold_out` tinyint(1) NOT NULL DEFAULT 0,
  `contents` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`product_pk`),
  UNIQUE KEY `name` (`name`),
  KEY `category` (`category`),
  KEY `category_menu` (`category_menu`)
);



--------------------------- [products_images] ---------------------------
--------------------------- [상품 이미지] ---------------------------
DROP TABLE IF EXISTS `products_images`;
CREATE TABLE `products_images` (
  `product_image_pk` int(11) NOT NULL AUTO_INCREMENT,
  `product_pk` int(11) NOT NULL DEFAULT 0,
  `uuid` varchar(100) DEFAULT NULL,
  `file_name` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`product_image_pk`),
  UNIQUE KEY `file_name` (`file_name`),
  KEY `product_pk` (`product_pk`),
  KEY `uuid` (`uuid`)
);




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
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
	`order_item_pk`	INT(11)	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`order_pk`	INT(11)	NOT NULL,
	`product_pk`	INT(11)	NOT NULL,
	`quantity`	INT	NOT NULL	DEFAULT 1,
	`price`	INT	NOT NULL,
	`created_at`	DATETIME	NOT NULL	DEFAULT current_timestamp()
);




--------------------------- [bookmarks] ---------------------------
--------------------------- [찜 리스트] ---------------------------
DROP TABLE IF EXISTS `bookmarks`;

CREATE TABLE `bookmarks` (
	`bookmark_pk`	INT(11)	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`product_pk`	INT(11)	NOT NULL,
	`user_pk`	INT(11)	NOT NULL,
	`created_at`	DATETIME	NOT NULL	DEFAULT current_timestamp()
);


--------------------------- [address] ---------------------------
--------------------------- [주소] ---------------------------
DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
	`address_pk`	INT(11)	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user_pk`	INT(11)	NULL	COMMENT '회원인 경우 사용자 ID, 비회원인 경우 NULL',
	`mobile`	VARCHAR(20)	NULL	COMMENT '회원이든, 비회원이든 받는 사람 전화번호',
	`recipient`	VARCHAR(100)	NOT NULL,
	`address`	TEXT	NOT NULL,
	`address_detail`	TEXT	NOT NULL,
	`is_primary`	TINYINT(1)	NULL	DEFAULT 0	COMMENT '1 : 기본배송지',
	`created_at`	DATETIME	NOT NULL	DEFAULT current_timestamp()
);



