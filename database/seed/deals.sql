-- Seed file: deals.sql
-- Description: Insert sample deals for testing

INSERT INTO deals (title, description, customer_id, amount, stage, probability, expected_close_date, assigned_to, created_by) VALUES
('Enterprise Software License', 'Annual software license for 500 users', 1, 50000.00, 'proposal', 75, '2026-05-15', 3, 1),
('Consulting Services', 'Q2 consulting engagement', 2, 75000.00, 'negotiation', 60, '2026-06-01', 4, 1),
('Cloud Migration Project', 'Migration from on-premise to cloud', 1, 120000.00, 'closed-won', 100, '2026-04-10', 3, 2),
('Implementation Support', 'Post-sale implementation support', 3, 35000.00, 'prospect', 30, '2026-07-01', 3, 2),
('Training Program', 'Employee training and certification', 2, 45000.00, 'closed-lost', 0, '2026-03-15', 4, 1);
