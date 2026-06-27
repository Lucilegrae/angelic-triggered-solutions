import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './OnboardingPanels.css';

function RippleButton({ label, onClick }) {
  return (
    <button className="ripple" onClick={onClick}>
      {label}
    </button>
  );
}

function GlowingIndicator({ active }) {
  return (
    <div className={`indicator ${active ? 'glow' : ''}`}>
      {active ? 'Active' : 'Inactive'}
    </div>
  );
}

function MinistryPanel() {
  const [oversightActive, setOversightActive] = useState(false);

  async function handleOnboard() {
    const { data, error } = await supabase.rpc('onboard_ministry', {
      institution_name: 'Ministry of Finance',
      stakeholder_name: 'Dr. Chikomo',
      stakeholder_email: 'finance@zim.gov.zw'
    });
    if (error) console.error(error);
    else {
      console.log('Onboarded Ministry ID:', data);
      setOversightActive(true);
    }
  }

  return (
    <div className="panel ministry">
      <h2>Ministry Oversight Dashboard</h2>
      <GlowingIndicator active={oversightActive} />
      <RippleButton label="Onboard Ministry" onClick={handleOnboard} />
    </div>
  );
}

function InvestorPanel() {
  const [riskMode, setRiskMode] = useState(false);

  async function handleOnboard() {
    const { data, error } = await supabase.rpc('onboard_investor', {
      institution_name: 'ZimFund Capital',
      stakeholder_name: 'Ms. Nyasha',
      stakeholder_email: 'nyasha@zimfund.com'
    });
    if (error) console.error(error);
    else {
      console.log('Onboarded Investor ID:', data);
      setRiskMode(true);
    }
  }

  return (
    <div className="panel investor">
      <h2>Investor Scenario Models</h2>
      <GlowingIndicator active={riskMode} />
      <RippleButton label="Onboard Investor" onClick={handleOnboard} />
    </div>
  );
}

function CommunalPanel() {
  const [affirmed, setAffirmed] = useState(false);

  async function handleOnboard() {
    const { data, error } = await supabase.rpc('onboard_communal', {
      institution_name: 'Harare Cooperative',
      stakeholder_name: 'Mr. Dube',
      stakeholder_email: 'dube@coop.org'
    });
    if (error) console.error(error);
    else {
      console.log('Onboarded Communal ID:', data);
      setAffirmed(true);
    }
  }

  return (
    <div className="panel communal">
      <h2>Communal Legitimacy Flows</h2>
      <GlowingIndicator active={affirmed} />
      <RippleButton label="Onboard Communal" onClick={handleOnboard} />
    </div>
  );
}

export default function OnboardingPanels() {
  return (
    <div className="onboarding">
      <MinistryPanel />
      <InvestorPanel />
      <CommunalPanel />
    </div>
  );
}
