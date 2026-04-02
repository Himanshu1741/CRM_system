-- Migration: 002_create_leads_table
-- Description: Create leads table for managing sales leads
-- Date: 2026-04-02

CREATE TABLE IF NOT EXISTS leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  status ENUM('new', 'contacted', 'qualified', 'unqualified') DEFAULT 'new',
  source ENUM('website', 'referral', 'campaign', 'cold-call', 'other') DEFAULT 'website',
  notes TEXT,
  assigned_to INT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_source (source),
  INDEX idx_assigned_to (assigned_to),
  INDEX idx_email (email)
);
