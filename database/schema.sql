-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'user') DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Leads table
CREATE TABLE leads (
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

-- Customers table
CREATE TABLE customers (
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

-- Deals table
CREATE TABLE deals (
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

-- Activities table (for tracking interactions)
CREATE TABLE activities (
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
