import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, CheckCircle2, Car, Briefcase, Wrench, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OmpAiAgentModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [promptInput, setPromptInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your OMP AI Marketplace Agent. Ask me in plain English to locate any car, local service, job opening, or business across our 8 categories.',
      suggestions: [
        'OMP, show all sales jobs in Fort Lauderdale, FL area within 15 miles',
        'Find 1969 Chevrolet Camaro or classic muscle cars under $45k',
        'Find top-rated emergency AC repair mechanics in Fremont',
        'Show multi-family real estate properties for lease near Dallas',
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const query = textToSend || promptInput;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setPromptInput('');
    setIsTyping(true);

    // Simulate AI parsing & reasoning
    setTimeout(() => {
      setIsTyping(false);
      let responseText = '';
      let actionRoute = '/';
      let actionLabel = 'View Matching Results';
      let parsedFilters = [];

      const lower = query.toLowerCase();

      if (lower.includes('job') || lower.includes('sales')) {
        responseText = `I analyzed our Job Finder database and found 14 Sales & Management Positions in the specified radius!`;
        actionRoute = '/jobs';
        actionLabel = 'Open Job Finder with Sales Filter';
        parsedFilters = ['Category: Sales / Business Development', 'Radius: 15 Miles', 'Salary: $75k - $140k/yr'];
      } else if (lower.includes('camaro') || lower.includes('classic') || lower.includes('car') || lower.includes('suv')) {
        responseText = `Found 6 Classic & Muscle vehicles matching your criteria! Sorted by verified title and ADP partner trust.`;
        actionRoute = '/cars-trucks';
        actionLabel = 'Open AI Cars & Trucks with Filter';
        parsedFilters = ['Body Type: Classic & Muscle Coupe', 'Price: Under $45,000', 'Title: Clean NMVTIS'];
      } else if (lower.includes('ac') || lower.includes('mechanic') || lower.includes('service') || lower.includes('repair')) {
        responseText = `Located 8 Verified Local Service Technicians offering same-day diagnostic calls.`;
        actionRoute = '/services';
        actionLabel = 'Open Local Services Directory';
        parsedFilters = ['Service: AC & Mobile Auto Mechanics', 'Response: Under 30 mins', 'Rating: 4.8+ ★'];
      } else {
        responseText = `Search processed across all 8 OMP Deals marketplace categories. Here are your top matching items.`;
        actionRoute = '/for-sale';
        actionLabel = 'Browse Results in Marketplace';
        parsedFilters = ['Keyword match: Exact', 'Location: Local Radius'];
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: responseText,
          parsedFilters,
          actionRoute,
          actionLabel,
        },
      ]);
    }, 1000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '24px',
          border: '1px solid var(--border)',
          width: '100%',
          maxWidth: '720px',
          height: '620px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(2, 132, 199, 0.35)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--surface-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 0 15px rgba(2, 132, 199, 0.4)',
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  OMP Official AI Marketplace Agent
                </h3>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '4px', backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#0284c7' }}>
                  NLP ENGINE
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                Conversational natural language search across 8 categories (Cars, Jobs, Services, Real Estate)
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Stream */}
        <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '12px',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}
            >
              {msg.sender === 'bot' && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(2, 132, 199, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0284c7',
                    flexShrink: 0,
                  }}
                >
                  <Bot size={18} />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{
                    backgroundColor: msg.sender === 'user' ? '#0284c7' : 'var(--surface-secondary)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    fontSize: '13.5px',
                    lineHeight: 1.5,
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                  }}
                >
                  {msg.text}
                </div>

                {/* Suggestions if any */}
                {msg.suggestions && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                      Try asking:
                    </span>
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sug)}
                        style={{
                          textAlign: 'left',
                          backgroundColor: 'var(--surface-secondary)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          color: '#0284c7',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        💬 "{sug}"
                      </button>
                    ))}
                  </div>
                )}

                {/* Parsed Filters & Action CTA */}
                {msg.parsedFilters && (
                  <div
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      AI PARSED CRITERIA:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {msg.parsedFilters.map((filt, fIdx) => (
                        <span
                          key={fIdx}
                          style={{
                            fontSize: '11px',
                            backgroundColor: 'rgba(16, 185, 129, 0.12)',
                            color: '#10b981',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <CheckCircle2 size={11} />
                          {filt}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        navigate(msg.actionRoute);
                        onClose();
                      }}
                      style={{
                        marginTop: '6px',
                        backgroundColor: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>{msg.actionLabel}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '12.5px' }}>
              <Bot size={18} color="#0284c7" />
              <span>OMP AI is analyzing query & filtering categories...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--surface-secondary)',
            display: 'flex',
            gap: '10px',
          }}
        >
          <input
            type="text"
            placeholder="Type your natural language search request..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '13.5px',
              outline: 'none',
            }}
          />
          <button
            onClick={() => handleSend()}
            style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              padding: '0 20px',
              borderRadius: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Send size={16} />
            <span>Ask</span>
          </button>
        </div>
      </div>
    </div>
  );
};
