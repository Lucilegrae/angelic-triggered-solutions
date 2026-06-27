-- Insert glyph
INSERT INTO projects (title, description, aura_overlay, created_at)
VALUES ('Urban Glow Renewal', 'Realtime glyph test', 'overlay_light', NOW());

-- Update glyph
UPDATE projects
SET description = 'Glyph updated for legitimacy flow'
WHERE title = 'Urban Glow Renewal';

-- Delete glyph
DELETE FROM projects
WHERE title = 'Urban Glow Renewal';
