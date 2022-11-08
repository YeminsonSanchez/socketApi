CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  rut_business VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  region VARCHAR(255) NOT NULL,
  comune VARCHAR(255) NOT NULL,
  zip VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE employed (
  id SERIAL PRIMARY KEY,
  rut VARCHAR(12) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  package_number INTEGER NOT NULL,
  category VARCHAR(255) NOT NULL,
  stock INT NOT NULL CHECK (stock > 0),
  location VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE purchase_order (
  id SERIAL PRIMARY KEY,
  client_id INT NOT NULL,
  oc INT NOT NULL,
  employed_id INT NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (client_id) REFERENCES client(id),
  FOREIGN KEY (employed_id) REFERENCES employed(id)
);

CREATE TABLE product_order (
  id SERIAL,
  purchase_order_id INT NOT NULL,
  quantity INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (purchase_order_id, product_id),
);

-- SELECT
--   (
--     client.id,
--     client.rut_business,
--     client.name,
--     client.email,
--     client.phone,
--     client.address,
--     client.region,
--     client.comune,
--     client.zip,
--     client.created_at,
--     client.updated_at,
--     employed.id,
--     employed.rut,
--     employed.first_name,
--     employed.last_name,
--     employed.email,
--     employed.phone,
--     product.id,
--     product.sku,
--     product.name,
--     product.price,
--     purchase_order.id,
--     purchase_order.client_id,
--     purchase_order.oc,
--     purchase_order.employed_id,
--     purchase_order.status,
--     purchase_order.created_at,
--     purchase_order.updated_at,
--     product_order.id,
--     product_order.purchase_order_id,
--     product_order.quantity,
--     product_order.product_id
--   )
-- FROM
--   purchase_order
--   INNER JOIN client ON purchase_order.client_id = client.id
--   INNER JOIN employed ON purchase_order.employed_id = employed.id
--   INNER JOIN product_order ON purchase_order.id = product_order.purchase_order_id
--   INNER JOIN product ON product_order.product_id = product.id;

-- WHERE
--   purchase_order.oc = $1 ORDER BY product.id ASC; 