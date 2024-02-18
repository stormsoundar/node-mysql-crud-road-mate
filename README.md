# node-mysql-crud-road-mate

# before start the app follow the below steps:

# step 1:
create database using "road-mate"

create tables using below queries:
```
CREATE TABLE users (
    id VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT null UNIQUE,
    password VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```
CREATE TABLE billing (
    id INT AUTO_INCREMENT PRIMARY key unique,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    eway_bill_no VARCHAR(50) NOT null unique,
    delivery_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_name VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT null,
	delivery_address VARCHAR(100) NOT null,
	transaction_mode ENUM('cash', 'debit_card', 'credit_card', 'upi') NOT NULL,
    is_igst BOOLEAN,
    items varchar(1000) not null,
    note varchar(100),
    vehicle_no varchar(50) not null,
    delivery_charge float not null,
    total_taxable_amount float not null,
    discount float not null,
    gst_amount float not null,
    outstanding_amount float not null,
    payment_mode ENUM('cheque', 'net banking', 'cash') NOT NULL,
    amount float not null,
    is_hold Boolean,
    is_return BOOLEAN,
    round_off float not null,
    grand_total float not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

# step 2:
Environment variables to .env file
```
NODE_ENV =dev
PORT =5004
API_URL =http://localhost:5004
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME = road_mate
AUTH_TOKEN_SECRET = qwertyuiopasdfghjklzxcvbnm
AUTH_TOKEN_EXPIRE = '1d'
```

# step 3:
 ``` npm install ``` and ```npm start```