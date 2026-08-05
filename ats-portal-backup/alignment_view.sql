create or replace view stakeholder_alignment_view as
select
  s.id,
  s.name,
  s.role,
  s.sector,
  s.legitimacy_score,
  s.upliftment_score,

  -- Blessings count
  (select count(*) 
   from stakeholder_blessings b 
   where b.stakeholder_id = s.id) as blessings_count,

  -- Compliance count
  (select count(*) 
   from stakeholder_compliance c 
   where c.stakeholder_id = s.id) as compliance_count,

  -- Mechanisation count
  (select count(*) 
   from stakeholder_mechanisation m 
   where m.stakeholder_id = s.id) as mechanisation_count

from stakeholders s;
