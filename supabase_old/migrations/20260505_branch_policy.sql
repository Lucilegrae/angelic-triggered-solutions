-- Allow each branch to only see its own lineage logs
CREATE POLICY branch_select_policy
ON lineage_logs
FOR SELECT
USING (
  branch = current_setting('request.jwt.claims.branch', true)
);
