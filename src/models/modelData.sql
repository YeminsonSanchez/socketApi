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

CREATE  FUNCTION update_updated_at_client()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_client_updated_at
    BEFORE UPDATE
    ON
        client
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_client();

---------------------------------------------------------------------------------------------------------

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

CREATE  FUNCTION update_updated_at_employed()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_employed_updated_at
    BEFORE UPDATE
    ON
        employed
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_employed();

---------------------------------------------------------------------------------------------------------

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

CREATE  FUNCTION update_updated_at_product()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_updated_at
    BEFORE UPDATE
    ON
        product
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_product();

---------------------------------------------------------------------------------------------------------

CREATE TABLE purchase_order (
  id SERIAL PRIMARY KEY,
  client_id INT NOT NULL,
  oc INT NOT NULL,
  employed_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (client_id) REFERENCES client(id),
  FOREIGN KEY (employed_id) REFERENCES employed(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE  FUNCTION update_updated_at_purchase_order()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_purchase_order_updated_at
    BEFORE UPDATE
    ON
        purchase_order
    FOR EACH ROW 
EXECUTE PROCEDURE update_updated_at_purchase_order();

---------------------------------------------------------------------------------------------------------

CREATE TABLE depleted_products (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  product_id INT NOT NULL,
  employed_id INT NOT NULL,
  quantity INT NOT NULL,
  product_damage VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (employed_id) REFERENCES employed(id)
);

CREATE  FUNCTION update_updated_at_depleted_products()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_depleted_products_updated_at
    BEFORE UPDATE
    ON
        depleted_products
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_depleted_products();

---------------------------------------------------------------------------------------------------------