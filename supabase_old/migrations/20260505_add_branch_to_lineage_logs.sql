-- Add branch column to lineage_logs for aura mapping
ALTER TABLE lineage_logs
ADD COLUMN branch TEXT CHECK (branch IN ('Banking','Veterans','Cement','Steel','Government'));

-- Optional: default branch if not provided
ALTER TABLE lineage_logs
ALTER COLUMN branch SET DEFAULT 'Banking';

-- Index for faster filtering by branch
CREATE INDEX IF NOT EXISTS lineage_logs_branch_idx
ON lineage_logs (branch);
