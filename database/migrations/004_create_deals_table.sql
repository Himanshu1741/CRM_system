-- Migration: 004_create_deals_table
-- Description: Create deals table for sales pipeline management
-- Date: 2026-04-02

CREATE TABLE IF NOT EXISTS deals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  customer_id INT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  stage ENUM('prospect', 'negotiation', 'proposal', 'closed-won', 'closed-lost') DEFAULT 'prospect',
  probability INT DEFAULT 0,
  expected_close_date DATE,
  actual_close_date DATE,
  notes TEXT,
  assigned_to INT NOT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_stage (stage),
  INDEX idx_customer_id (customer_id),
  INDEX idx_assigned_to (assigned_to)
);
