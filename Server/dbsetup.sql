CREATE TABLE `customer` (
  `CUSTOMER_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PHONE_NUMBER` varchar(10) NOT NULL,
  `CUSTOMER_NAME` varchar(50) DEFAULT NULL,
  `NO_OF_VISITS` bigint(20) DEFAULT '0',
  PRIMARY KEY (`CUSTOMER_ID`),
  UNIQUE KEY `PHONE_NUMBER` (`PHONE_NUMBER`)
);
CREATE TABLE `inventory` (
  `ITEM_ID` varchar(10) NOT NULL,
  `ITEM_NAME` varchar(100) NOT NULL,
  `QUANTITY` int(10) NOT NULL,
  `PRICE` float NOT NULL,
  `USER_ID` int(5) NOT NULL,
  `LAST_UPDATED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ITEM_ID`)
);
CREATE TABLE `billing` (
  `BILL_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `CUSTOMER_ID` bigint(20) NOT NULL,
  `ITEMS` json NOT NULL,
  `CGST` float NOT NULL,
  `SGST` float NOT NULL,
  `ITEMS_COST` float NOT NULL,
  `TOTAL_COST` float NOT NULL,
  `PAYMENT_MODE` VARCHAR(30) NOT NULL,
  `USER_ID` int(5) NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`BILL_ID`),
  KEY `CUSTOMER_ID` (`CUSTOMER_ID`),
  CONSTRAINT `billing_ibfk_1` FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `customer` (`CUSTOMER_ID`)
);
insert into inventory (ITEM_ID, ITEM_NAME, QUANTITY, PRICE, USER_ID) values ("1", "product 1", 50, 100, 1), ("2", "product 2", 75, 150, 1),("3", "product 3", 100, 200, 1), ("4", "product 4", 125, 250, 1);
insert into customer values(16, '9994655540', 'mani', 0);
insert into billing (CUSTOMER_ID, ITEMS, CGST, SGST, ITEMS_COST, TOTAL_COST, PAYMENT_MODE, USER_ID) values('16', '{\"items\": [{\"id\": \"1\", \"qty\": 1, \"name\": \"product 1\", \"unitPrice\": 100}, {\"id\": \"2\", \"qty\": 2, \"item_name\": \"product 2\", \"unitPrice\": 150}, {\"id\": \"3\", \"qty\": 3, \"item_name\": \"product 3\", \"unitPrice\": 200}]}', '1', '1', '1020', '1000', 'card', '1'),('16', '{\"items\": [{\"id\": \"1\", \"qty\": 1, \"name\": \"product 1\", \"unitPrice\": 100}, {\"id\": \"2\", \"qty\": 2, \"item_name\": \"product 2\", \"unitPrice\": 150}, {\"id\": \"3\", \"qty\": 3, \"item_name\": \"product 3\", \"unitPrice\": 200}]}', '1', '1', '1020', '1000', 'card', '1'),('16', '{\"items\": [{\"id\": \"1\", \"qty\": 1, \"name\": \"product 1\", \"unitPrice\": 100}, {\"id\": \"2\", \"qty\": 2, \"item_name\": \"product 2\", \"unitPrice\": 150}, {\"id\": \"3\", \"qty\": 3, \"item_name\": \"product 3\", \"unitPrice\": 200}]}', '1', '1', '1020', '1000', 'card', '1'),('16', '{\"items\": [{\"id\": \"1\", \"qty\": 1, \"name\": \"product 1\", \"unitPrice\": 100}, {\"id\": \"2\", \"qty\": 2, \"item_name\": \"product 2\", \"unitPrice\": 150}, {\"id\": \"3\", \"qty\": 3, \"item_name\": \"product 3\", \"unitPrice\": 200}]}', '1', '1', '1020', '1000', 'card', '1');