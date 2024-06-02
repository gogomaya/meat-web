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