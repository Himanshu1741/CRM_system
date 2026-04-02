-- Seed file: users.sql
-- Description: Insert sample users for testing

INSERT INTO users (name, email, password, role, is_active) VALUES
('Admin User', 'admin@crm.local', '$2a$10$Y9i8R7K5vN3X8Z2Q1P0M9rW7U5T4R3S2N1M0L9O8P7Q6R5S4T3U2V1', 'admin', true),
('Manager User', 'manager@crm.local', '$2a$10$Y9i8R7K5vN3X8Z2Q1P0M9rW7U5T4R3S2N1M0L9O8P7Q6R5S4T3U2V1', 'manager', true),
('Sales Rep 1', 'john@crm.local', '$2a$10$Y9i8R7K5vN3X8Z2Q1P0M9rW7U5T4R3S2N1M0L9O8P7Q6R5S4T3U2V1', 'user', true),
('Sales Rep 2', 'jane@crm.local', '$2a$10$Y9i8R7K5vN3X8Z2Q1P0M9rW7U5T4R3S2N1M0L9O8P7Q6R5S4T3U2V1', 'user', true);
