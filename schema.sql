-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS employee_db;
-- Creates the "blogger" database --
CREATE DATABASE employee_db;
-- this used to create the database

USE employee_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(75) NOT NULL,
  last_name VARCHAR(75) NOT NULL,
  role_id INT NOT NULL, 
  manager_id INT DEFAULT NULL,
  PRIMARY KEY (id)
);