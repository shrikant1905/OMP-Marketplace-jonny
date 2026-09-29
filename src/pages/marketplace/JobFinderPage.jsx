import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, CheckCircle2, Send, Building } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { JobApplicationModal } from '../../components/JobApplicationModal';
import { JobStatusModal } from '../../components/JobStatusModal';

export const JobFinderPage = () => {
  const { selectedLocation } = useAuth();
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [appliedJobIds, setAppliedJobIds] = useState(['job-1']);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const domains = [
    { id: 'all', label: 'All 35+ Domains' },
    { id: 'auto', label: 'Automotive & DMS' },
    { id: 'sales', label: 'Sales & Business Dev' },
    { id: 'tech', label: 'AI, Software & IT' },
    { id: 'health', label: 'Healthcare & Nursing' },
    { id: 'trades', label: 'Construction & Trades' },
    { id: 'remote', label: 'Work From Home / Remote' },
  ];

  const jobs = [
    {
      id: 'job-1',
      domain: 'auto',
      title: 'Senior Automotive Desking & Finance Manager',
      company: 'Metro West Motors Franchise',
      salary: '$120,000 - $165,000 / yr + Commission',
      type: 'Full-Time',
      location: 'Fremont, CA',
      tags: ['4-Square Desking', 'OAL Lenders', 'CDK DMS'],
      desc: 'Lead our finance & desking department. Oversee sub-prime and prime auto loans, lender submissions, and digital e-sign jackets.',
    },
    {
      id: 'job-2',
      domain: 'sales',
      title: 'Commercial Fleet & Truck Sales Executive',
      company: 'Dallas Central Motors',
      salary: '$95,000 - $140,000 / yr OTE',
      type: 'Full-Time (Remote / Lot)',
      location: 'Dallas, TX',
      tags: ['B2B Sales', 'Heavy Duty Trucks', 'Lead Radar'],
      desc: 'Sell commercial box trucks, cargo vans, and fleet vehicles to local businesses and enterprise logistics companies.',
    },
    {
      id: 'job-3',
      domain: 'tech',
      title: 'Full-Stack AI Application Developer (React & Python)',
      company: 'CRM nErgy AI & OMP Suite',
      salary: '$130,000 - $170,000 / yr',
      type: '100% Remote',
      location: 'Remote (US Nationwide)',
      tags: ['React', 'Node.js', 'LLM AI Agents'],
      desc: 'Build next-generation conversational AI search agents, NLP classifiers, and high-frequency DMS synchronization pipelines.',
    },
    {
      id: 'job-4',
      domain: 'trades',
      title: 'Certified Master Automotive Recon & Collision Tech',
      company: 'Bay Area Auto Reconditioning Center',
      salary: '$42 - $55 / hr ($90k - $115k/yr)',
      type: 'Full-Time',
      location: 'San Jose, CA',
      tags: ['ASE Certified', 'Frame Pulling', 'Paint Matching'],
      desc: 'Perform 150-point vehicle reconditioning, paint touch-ups, and structural repair orders (ROM) for verified dealer lot inventory.',
    },
  ];

  const filteredJobs = jobs.filter(
    (j) => selectedDomain === 'all' || j.domain === selectedDomain
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: '11.5px', color: '#8b5cf6', fontWeight: 700, textTransform: 'uppercase' }}>
          LOCAL & REMOTE JOB FINDER (35+ DOMAINS)
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          Find High-Paying Local Jobs & Careers
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Explore full-time, part-time, and remote career opportunities in {selectedLocation}.
        </p>
      </div>

      {/* Domains Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
        {domains.map((dm) => (
          <button
            key={dm.id}
            onClick={() => setSelectedDomain(dm.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: selectedDomain === dm.id ? '1px solid #8b5cf6' : '1px solid var(--border)',
              backgroundColor: selectedDomain === dm.id ? '#8b5cf6' : 'var(--surface)',
              color: selectedDomain === dm.id ? '#ffffff' : 'var(--text-primary)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {dm.label}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Building size={14} color="#8b5cf6" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#8b5cf6' }}>{job.company}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>• {job.type}</span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {job.title}
                </h3>
              </div>
              <div style={{ fontSize: '17px', fontWeight: 900, color: '#10b981' }}>{job.salary}</div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {job.desc}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {job.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '11.5px',
                    backgroundColor: 'var(--surface-secondary)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <MapPin size={13} color="#0284c7" />
                <span>{job.location}</span>
              </div>

              {appliedJobIds.includes(job.id) ? (
                <button
                  id={`job-status-btn-${job.id}`}
                  onClick={() => {
                    setSelectedJob(job);
                    setIsStatusModalOpen(true);
                  }}
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>Applied ✓</span>
                </button>
              ) : (
                <button
                  id={`job-apply-btn-${job.id}`}
                  onClick={() => {
                    setSelectedJob(job);
                    setIsApplyModalOpen(true);
                  }}
                  style={{
                    backgroundColor: '#8b5cf6',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Send size={13} />
                  <span>1-Click Apply</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 1-Click Fast Job Application Modal */}
      <JobApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={selectedJob}
        onApplySuccess={(jobId) => {
          setAppliedJobIds((prev) => [...prev, jobId]);
        }}
      />

      {/* Application Status Modal */}
      <JobStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        job={selectedJob}
        onWithdraw={(jobId) => {
          setAppliedJobIds((prev) => prev.filter((id) => id !== jobId));
        }}
      />
    </div>
  );
};
