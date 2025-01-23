CREATE DATABASE markit;
USE markit;

CREATE TABLE COMPANYDETAILS (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255),
  DESCRIPTION VARCHAR(255),
  TYPE VARCHAR(30)
);

CREATE TABLE CUSTOMERS (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255),
  EMAIL VARCHAR(255),
  MARKETING_TYPE VARCHAR(255),
  COMPANY_ID INT,
  FOREIGN KEY (COMPANY_ID) REFERENCES COMPANYDETAILS(ID) ON DELETE CASCADE
);

CREATE TABLE AI_MARKETING_MESSAGE (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  MARKETING_DRAFT VARCHAR(255),
  COMPANY_ID INT,
  FOREIGN KEY (COMPANY_ID) REFERENCES COMPANYDETAILS(ID) ON DELETE CASCADE
);