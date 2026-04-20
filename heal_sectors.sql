-- Normalize invalid sector values to canonical ones

-- Government → Development Finance
UPDATE institutions
SET sector = 'Development Finance'
WHERE sector = 'government';

-- Finance → Banking
UPDATE institutions
SET sector = 'Banking'
WHERE sector = 'finance';

-- Communal → Microfinance
UPDATE institutions
SET sector = 'Microfinance'
WHERE sector = 'communal';

-- Verify healing
SELECT DISTINCT sector FROM institutions;
