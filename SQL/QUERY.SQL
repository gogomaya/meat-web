-- Active: 1717429630666@@125.176.102.143@23306@meat_web
SELECT * FROM orders;
SELECT * FROM orders ORDER BY created_at desc;
SELECT * FROM order_items;
SELECT * FROM order_items ORDER BY created_at desc;
SELECT * FROM order_items WHERE order_pk = 999;

SELECT * FROM products;
SELECT * FROM products_images;


SELECT * FROM bookmarks;

---------------------------------------------------------------
-- 주문 항목, 상품, 상품이미지 조인
SELECT 
    oi.order_item_pk,
    oi.order_pk,
    oi.product_pk,
    oi.quantity,
    oi.price,
    oi.created_at AS order_item_created_at,
    p.*, 
    pi.file_name AS image_file_name
FROM 
    order_items oi
    LEFT OUTER JOIN 
        products p ON oi.product_pk = p.product_pk
    LEFT OUTER JOIN 
        products_images pi ON p.product_pk = pi.product_pk AND ISNULL(pi.uuid)
WHERE  ("" = 2 OR order_pk = 2)
;


TRUNCATE orders;
TRUNCATE order_items;


SELECT * FROM users;
SELECT * FROM address;

DELETE FROM address WHERE user_pk = 7;



------------------------------------------------------------------------------