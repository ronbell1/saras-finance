// SARAS FINANCE - ENTERPRISE MOCK DATA

// Domain topics for search
const TOPICS = [
  // Finance Intelligence
  { d: "Finance Intelligence", t: "Ledger Analysis", k: ["ledger scrutiny", "journal entries", "GL review"] },
  { d: "Finance Intelligence", t: "Inter-Company Reconciliation", k: ["IC balances", "cross-entity charges"] },
  { d: "Finance Intelligence", t: "Smart MIS Reporting", k: ["management reports", "financial dashboards"] },
  { d: "Finance Intelligence", t: "Financial Close Management", k: ["month-end close", "year-end close"] },

  // Audit & Due Diligence
  { d: "Audits & Due Diligence", t: "Audit Automation", k: ["audit workflows", "control testing"] },
  { d: "Audits & Due Diligence", t: "Due Diligence Review", k: ["financial diligence", "compliance health"] },
  { d: "Audits & Due Diligence", t: "Risk & Control Assessment", k: ["SOX controls", "internal controls"] },

  // Contracts Intelligence
  { d: "Contracts Intelligence", t: "Agreement Analysis", k: ["contract clauses", "risk flags"] },
  { d: "Contracts Intelligence", t: "Contract Obligation Tracking", k: ["renewals", "compliance clauses"] },
  { d: "Contracts Intelligence", t: "Vendor & Customer Contracts", k: ["SLAs", "penalties"] },

  // Litigation & Compliance
  { d: "Litigation & Compliance", t: "Legal Notice Tracking", k: ["court notices", "legal updates"] },
  { d: "Litigation & Compliance", t: "Litigation Monitoring", k: ["case status", "legal exposure"] },
  { d: "Litigation & Compliance", t: "Regulatory Compliance Checklist", k: ["filings", "statutory deadlines"] },

  // Tax & Regulatory
  { d: "Tax & Regulatory", t: "Tax Compliance Monitoring", k: ["GST filings", "income tax"] },
  { d: "Tax & Regulatory", t: "Regulatory Reporting", k: ["ROC filings", "SEBI compliance"] },

  // AI & Agentic Platform
  { d: "Agentic AI Platform", t: "Autonomous Finance Agents", k: ["self-learning agents", "continuous monitoring"] },
  { d: "Agentic AI Platform", t: "Anomaly Detection Engine", k: ["outliers", "suspicious entries"] },
  { d: "Agentic AI Platform", t: "Compliance Automation Agents", k: ["auto-reminders", "auto-drafting"] },

  // Knowledge & Advisory
  { d: "Knowledge Hub", t: "Regulatory Intelligence", k: ["law updates", "case law"] },
  { d: "Knowledge Hub", t: "Finance & Compliance Advisory", k: ["best practices", "expert insights"] }
];

// Qualifiers
const ADJECTIVES = [
  "Automated",
  "AI-powered",
  "Autonomous",
  "Real-time",
  "Continuous",
  "Risk-aware",
  "Proactive",
  "Intelligent",
  "Compliance-ready",
  "Enterprise-grade"
];

// Product objects
const NOUNS = [
  "Engine",
  "Analyzer",
  "Workflow",
  "System",
  "Dashboard",
  "Control Framework",
  "Monitoring Module",
  "Review Pipeline",
  "Intelligence Layer",
  "Automation Suite"
];

// Action verbs
const ACTIONS = [
  "detects anomalies",
  "flags risks",
  "automates reconciliations",
  "tracks obligations",
  "monitors filings",
  "validates data accuracy",
  "reduces manual effort",
  "improves audit readiness",
  "ensures regulatory compliance"
];

// Generate mock data
const MOCK_DATA = Array.from({ length: 300 }, (_, i) => {
  const topic = TOPICS[i % TOPICS.length];
  const adj = ADJECTIVES[i % ADJECTIVES.length];
  const noun = NOUNS[i % NOUNS.length];
  const action = ACTIONS[i % ACTIONS.length];

  return {
    id: i + 1,
    domain: topic.d,
    title: `${topic.t} ${noun}`,
    snippet: `${adj} ${noun.toLowerCase()} for ${topic.t.toLowerCase()} that ${action}.`,
    details: `
This ${adj.toLowerCase()} ${topic.t.toLowerCase()} ${noun.toLowerCase()} helps finance, audit, legal, and compliance teams
by continuously scanning ledgers, contracts, and regulatory data. It ${action}, supports audit trails,
improves due diligence accuracy, and enables proactive decision-making.

Key capabilities include ${topic.k.join(", ")}, AI-driven checks,
automated documentation, regulatory deadline monitoring, and enterprise-grade controls.
    `.trim()
  };
});

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const searchService = {
  async search(query, page = 1, limit = 10) {
    await delay(800);

    const q = query.toLowerCase();
    let filtered = MOCK_DATA.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q)
    );

    let isRelatedFallback = false;

    if (filtered.length === 0) {
      filtered = MOCK_DATA.slice(0, 6);
      isRelatedFallback = true;
    }

    const start = (page - 1) * limit;
    const pagedResults = filtered.slice(start, start + limit);

    try {
      const response = await fetch("https://postman-echo.com/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          results: pagedResults,
          total: filtered.length,
          isRelatedFallback,
          page,
          query
        })
      });

      const echoData = await response.json();
      return echoData.json;

    } catch {
      return {
        results: pagedResults,
        total: filtered.length,
        isRelatedFallback
      };
    }
  }
};
