-- Migration: 005_create_activities_table
-- Description: Create activities table for tracking interactions with leads, customers, and deals
-- Date: 2026-04-02

CREATE TABLE IF NOT EXISTS activities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  lead_id INT,
  customer_id INT,
  deal_id INT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
  FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_type (type),
  INDEX idx_created_at (created_at)
);
