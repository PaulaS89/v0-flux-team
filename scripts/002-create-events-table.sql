-- Create events table to store conference events
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  venue VARCHAR(255),
  event_date DATE NOT NULL,
  event_time VARCHAR(100),
  image_url VARCHAR(500),
  ticket_price DECIMAL(10, 2),
  vip_price DECIMAL(10, 2),
  virtual_price DECIMAL(10, 2),
  max_attendees INTEGER,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some sample events
INSERT INTO events (name, description, location, venue, event_date, event_time, ticket_price, vip_price, virtual_price, is_featured) VALUES
('FLUX 26', 'The premier tech conference for innovators and creators. Join us for inspiring talks, hands-on workshops, and networking opportunities.', 'San Francisco, CA', 'Moscone Center', '2026-06-15', '9:00 AM - 6:00 PM', 299.00, 599.00, 99.00, true),
('FLUX Summit 26', 'A focused deep-dive into AI and machine learning. Two days of intensive learning and collaboration.', 'New York, NY', 'Javits Center', '2026-09-20', '10:00 AM - 5:00 PM', 349.00, 699.00, 149.00, true),
('FLUX Connect', 'Networking-focused event bringing together tech professionals from around the world.', 'Austin, TX', 'Austin Convention Center', '2026-11-10', '2:00 PM - 9:00 PM', 199.00, 399.00, 79.00, false),
('FLUX Workshop: Design Systems', 'Hands-on workshop for building scalable design systems. Limited seats available.', 'Seattle, WA', 'Amazon Meeting Center', '2026-08-05', '9:00 AM - 4:00 PM', 249.00, NULL, 99.00, false),
('FLUX Europe 27', 'Bringing FLUX to Europe! Join us in London for an unforgettable experience.', 'London, UK', 'ExCeL London', '2027-03-15', '9:00 AM - 6:00 PM', 329.00, 649.00, 119.00, true);
