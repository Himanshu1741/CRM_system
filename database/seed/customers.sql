-- Seed file: customers.sql
-- Description: Insert sample customers for testing

INSERT INTO customers (first_name, last_name, email, phone, company, industry, city, state, country, status, total_spent, assigned_to, created_by) VALUES
('Michael', 'Anderson', 'michael@techcorp.com', '555-1001', 'Tech Corp', 'Technology', 'San Francisco', 'CA', 'USA', 'active', 15000.00, 3, 1),
('Sarah', 'Martinez', 'sarah@financeinc.com', '555-1002', 'Finance Inc', 'Finance', 'New York', 'NY', 'USA', 'active', 25000.00, 4, 1),
('David', 'Taylor', 'david@marketingplus.com', '555-1003', 'Marketing Plus', 'Marketing', 'Boston', 'MA', 'USA', 'prospect', 0.00, 3, 2),
('Emily', 'Garcia', 'emily@startuplabs.com', '555-1004', 'Startup Labs', 'Technology', 'Austin', 'TX', 'USA', 'inactive', 5000.00, 4, 2);
