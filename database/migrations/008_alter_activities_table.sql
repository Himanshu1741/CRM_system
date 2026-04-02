-- Migration: 008_alter_activities_table
-- Description: Update activities table structure
-- Date: 2026-04-02

ALTER TABLE activities
ADD COLUMN IF NOT EXISTS type VARCHAR(255) NOT NULL DEFAULT 'note',
ADD COLUMN IF NOT EXISTS description TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS lead_id INT,
ADD COLUMN IF NOT EXISTS customer_id INT,
ADD COLUMN IF NOT EXISTS deal_id INT,
ADD COLUMN IF NOT EXISTS created_by INT NOT NULL,
ADD FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
ADD FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
ADD FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE SET NULL,
ADD FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
ADD INDEX idx_type (type),
ADD INDEX idx_created_at (created_at);
