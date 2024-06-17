-- Active: 1718630384205@@125.176.102.143@23306@meat_web
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
      WHERE  order_pk = 13
      ;

-----------------------------------------------------------
SELECT o.* 
          ,0 shipfee
          ,0 discount 
         ,
         (SELECT file_name
         FROM products_images
         WHERE product_pk = (
                            SELECT product_pk
                            FROM order_items
                            WHERE order_item_pk = (SELECT MIN(order_item_pk) FROM order_items oi WHERE oi.order_pk = o.order_pk ) 
                            )
         ) file_name
    FROM orders o
    WHERE user_pk IS NOT NULL
    AND user_pk = 7
;



---
SELECT *
FROM cancellations
WHERE order_pk IN ( SELECT order_pk FROM orders WHERE user_pk = 7 )
;




---

SELECT c.* 
      ,o.*
      ,o.created_at as ordered_at
      ,o.status as order_status
FROM cancellations c JOIN orders o ON (c.order_pk = o.order_pk)
      ;