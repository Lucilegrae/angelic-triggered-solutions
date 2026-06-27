-- Drop the old constraint
ALTER TABLE institutions
DROP CONSTRAINT institutions_sector_check;

-- Recreate with the actual allowed values
ALTER TABLE institutions
ADD CONSTRAINT institutions_sector_check
CHECK (sector IN (
  'Insurance',
  'Telecoms',
  'Banking',
  'Microfinance',
  'Development Finance',
  'Fund'
));

-- Validate against existing rows
ALTER TABLE institutions VALIDATE CONSTRAINT institutions_sector_check;
