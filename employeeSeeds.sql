DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT,
    managerId INT,
    PRIMARY KEY (id)
); 


CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE security(
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department(name) VALUES ("Engineering"), ("Human Resources"), ("Quality Assurance"), ("Accounting"), ("Sales"), ("Management");


INSERT INTO role(title, salary, department_id)
VALUE ("Engineering Lead", 100000, 1), ("Engineer", 75000, 1), ("HR", 60000, 2), ("HR Lead", 80000, 2), ("QA Lead", 55000, 3), ("Tester", 30000, 3), ("Accounting Lead", 90000, 4), ("Accountant", 60000, 4), ("Sales Lead", 75000, 5), ("Sales", 60000, 5), ("Manager", 120000, 6);

INSERT INTO employee(firstName, lastName, roleId, managerId)
VALUES ("John", "Cage", 11, null), ("Artemis", "Keening", 1, 1), ("Cat", "Bert", 4, 1), ("Data", "Dog", 7, 1), ("Creed", "Bratton", 5, 1), ("Stewart", "Mills", 2, 3), ("Fozzy", "McStew", 2, 3), ("Izzy", "Belle", 3, 4), ("Chance", "Coyle", 6, 6), ("Alice", "Stalwell", 8, 5) ("Nancy", "Connor", 9, 1), ("Autumn", "Cree", 10, 12);

INSERT INTO security (username, password) VALUES ("test", "test");
