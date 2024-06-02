SELECT * FROM orders;
SELECT * FROM orders ORDER BY created_at desc;
SELECT * FROM order_items;
SELECT * FROM order_items ORDER BY created_at desc;
SELECT * FROM order_items WHERE order_pk = 999;

SELECT * FROM products;
SELECT * FROM products_images;


SELECT * FROM bookmarks;