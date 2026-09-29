import React, { useState } from 'react';
import { Calculator, DollarSign, ArrowRight, ShieldCheck, CheckCircle2, Landmark } from 'lucide-react';

export const DealCalculatorPage = () => {
  const [sellingPrice, setSellingPrice] = useState(79900);
  const [downPayment, setDownPayment] = useState(10000);
  const [tradeInValue, setTradeInValue] = useState(15000);
  const [termMonths, setTermMonths] = useState(72);
  const [apr, setApr] = useState(6.49);

  const financedAmount = Math.max(0, sellingPrice - downPayment - tradeInValue);
  const monthlyInterest = apr / 100 / 12;
  const monthlyPayment =
    monthlyInterest === 0
      ? financedAmount / termMonths
      : (financedAmount * monthlyInterest * Math.pow(1 + monthlyInterest, termMonths)) /
        (Math.pow(1 + monthlyInterest, termMonths) - 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
          60-SECOND DESKING & OAL LOANS BRIDGE (TASK E-13)
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          60-Second Deal Desking Calculator (4-Square)
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Calculate instant payments, gross profit spread, and transmit deal structure directly to OAL Lending Marketplace.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Controls */}
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: '18px', border: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Vehicle Selling Price
            </label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: 700,
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Cash Down Payment
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 700,
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Trade-In Allowance
              </label>
              <input
                type="number"
                value={tradeInValue}
                onChange={(e) => setTradeInValue(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 700,
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Loan Term (Months)
              </label>
              <select
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 700,
                  outline: 'none',
                }}
              >
                <option value={36}>36 Months (3 Yrs)</option>
                <option value={48}>48 Months (4 Yrs)</option>
                <option value={60}>60 Months (5 Yrs)</option>
                <option value={72}>72 Months (6 Yrs)</option>
                <option value={84}>84 Months (7 Yrs)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                APR Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 700,
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* 4-Square Output Display */}
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: '18px', border: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
              4-SQUARE DESKING RESULT
            </div>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#10b981', margin: '8px 0 2px' }}>
              ${Math.round(monthlyPayment).toLocaleString()} <span style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 600 }}>/ month</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Total Financed Amount: <strong style={{ color: 'var(--text-primary)' }}>${Math.round(financedAmount).toLocaleString()}</strong>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface-secondary)', borderRadius: '12px', padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
            <div>
              <div style={{ color: 'var(--text-secondary)' }}>Frontend Gross Profit</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0284c7' }}>+$4,250</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)' }}>OAL Lender Tier</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#10b981' }}>Prime Tier 1 (720+)</div>
            </div>
          </div>

          <button
            onClick={() => alert('Deal Jacket submitted to OAL Lender Marketplace & DocuSign E-Sign Queue!')}
            style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Landmark size={16} />
            <span>Transmit to OAL Lending Marketplace</span>
          </button>
        </div>
      </div>
    </div>
  );
};
