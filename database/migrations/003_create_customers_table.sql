-- Migration: 003_create_customers_table
-- Description: Create customers table for managing customer data
-- Date: 2026-04-02

CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  industry VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip_code VARCHAR(20),
  country VARCHAR(255),
  status ENUM('active', 'inactive', 'prospect') DEFAULT 'prospect',
  total_spent DECIMAL(12, 2) DEFAULT 0.00,
  notes TEXT,
  assigned_to INT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_assigned_to (assigned_to),
  INDEX idx_email (email)
);
