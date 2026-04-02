-- Seed file: leads.sql
-- Description: Insert sample leads for testing

INSERT INTO leads (first_name, last_name, email, phone, company, status, source, assigned_to, created_by) VALUES
('John', 'Doe', 'john.doe@example.com', '555-0101', 'Tech Corp', 'new', 'website', 3, 1),
('Jane', 'Smith', 'jane.smith@example.com', '555-0102', 'Finance Inc', 'contacted', 'referral', 4, 1),
('Bob', 'Johnson', 'bob.j@example.com', '555-0103', 'Marketing Plus', 'qualified', 'campaign', 3, 1),
('Alice', 'Williams', 'alice.w@example.com', '555-0104', 'Startup Labs', 'new', 'cold-call', 4, 2),
('Charlie', 'Brown', 'charlie.b@example.com', '555-0105', 'Enterprise Co', 'contacted', 'website', 3, 2);
