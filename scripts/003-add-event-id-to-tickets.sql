-- Add event_id column to tickets table to link tickets to events
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS event_id INTEGER REFERENCES events(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_tickets_event_id ON tickets(event_id);
