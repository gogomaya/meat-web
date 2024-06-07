DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_pk` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `category` enum('cow','pork','simple') NOT NULL,
  `category_menu` varchar(500) NOT NULL,
  `price` int(11) NOT NULL,
  -- `discounted_price` int(11) NOT NULL,
  -- `discounted_price` int(11) NOT NULL,
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
