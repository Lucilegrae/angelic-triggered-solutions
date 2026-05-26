-- Create lineage_logs table
CREATE TABLE lineage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL,
  blessing TEXT NOT NULL,
  branch TEXT CHECK (branch IN ('Banking','Veterans','Cement','Steel','Government')) DEFAULT 'Banking',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster branch queries
CREATE INDEX IF NOT EXISTS lineage_logs_branch_idx
ON lineage_logs (branch);
