import { Router } from "express";
import {
  ListProductsResponse,
  ListTestimonialsResponse,
  ListBlogPostsResponse,
  GetStatsResponse,
} from "@workspace/api-zod";

const router = Router();

const PRODUCTS = [
  {
    id: "prod-1",
    slug: "nexus-erp",
    name: "Nexus ERP",
    tagline: "Enterprise resource planning reimagined for the modern cloud.",
    description:
      "Nexus ERP is a fully integrated enterprise platform covering finance, procurement, inventory, HR, and CRM in a single unified system. Built for mid-to-large enterprises seeking to eliminate data silos and accelerate decision-making.",
    category: "Enterprise Software",
    status: "Live",
    features: [
      "Real-time financial reporting and analytics",
      "Multi-entity, multi-currency support",
      "Role-based access control with SSO integration",
      "Automated procurement and vendor management",
      "Integrated HR and payroll module",
      "REST API and webhook ecosystem",
    ],
    url: "https://nexus.eminencetech.io",
  },
  {
    id: "prod-2",
    slug: "servicehub",
    name: "ServiceHub",
    tagline: "The service sourcing platform that connects businesses with vetted professionals.",
    description:
      "ServiceHub is a B2B marketplace that connects companies with pre-vetted service providers across IT, legal, finance, logistics, and more. Smart matching algorithms surface the right providers for each engagement.",
    category: "Marketplace Platform",
    status: "Live",
    features: [
      "AI-powered provider matching",
      "End-to-end contract and payment management",
      "Escrow-protected milestone payments",
      "Provider rating and review system",
      "Real-time project communication tools",
      "Analytics dashboard for procurement teams",
    ],
    url: "https://servicehub.eminencetech.io",
  },
  {
    id: "prod-3",
    slug: "cloudvault",
    name: "CloudVault",
    tagline: "Secure document management and e-signature for regulated industries.",
    description:
      "CloudVault provides enterprise-grade document storage, version control, and legally-binding e-signatures for industries operating under strict compliance requirements — financial services, healthcare, legal, and government.",
    category: "Document Management",
    status: "Live",
    features: [
      "SOC 2 Type II and ISO 27001 compliant",
      "Legally binding e-signatures (eIDAS, ESIGN)",
      "Automated retention and destruction policies",
      "Granular permission management",
      "Audit trail with tamper-evident logging",
      "Integrates with SharePoint, Salesforce, and SAP",
    ],
    url: "https://cloudvault.eminencetech.io",
  },
  {
    id: "prod-4",
    slug: "insightiq",
    name: "InsightIQ",
    tagline: "Business intelligence that speaks plain English.",
    description:
      "InsightIQ is a no-code BI platform that lets business users ask questions in natural language and receive instant, accurate visualizations and reports. Connect any data source in minutes.",
    category: "Business Intelligence",
    status: "Beta",
    features: [
      "Natural language query interface",
      "Connects to 50+ data sources out of the box",
      "Auto-generated dashboards from schema inference",
      "Collaborative annotations and sharing",
      "Scheduled reports via email or Slack",
      "Embedded analytics SDK for SaaS apps",
    ],
    url: null,
  },
  {
    id: "prod-5",
    slug: "fieldops",
    name: "FieldOps",
    tagline: "Mobile-first field service management for distributed teams.",
    description:
      "FieldOps gives operations managers and field technicians everything they need to coordinate jobs, track assets, and close work orders in real time — even offline.",
    category: "Field Service Management",
    status: "Beta",
    features: [
      "Offline-capable mobile app (iOS and Android)",
      "GPS-based technician tracking and dispatch",
      "Digital work orders with photo capture",
      "Parts and inventory management",
      "Customer signature capture on-site",
      "Integration with major ERP systems",
    ],
    url: null,
  },
  {
    id: "prod-6",
    slug: "auditpilot",
    name: "AuditPilot",
    tagline: "Automated compliance auditing for ISO, SOC, and GDPR frameworks.",
    description:
      "AuditPilot continuously monitors your infrastructure and processes against compliance frameworks, identifies gaps, and auto-generates evidence packages for auditors — reducing audit preparation time by up to 80%.",
    category: "Compliance & Security",
    status: "Coming Soon",
    features: [
      "Continuous control monitoring",
      "Auto-generated evidence collection",
      "Multi-framework support (ISO 27001, SOC 2, GDPR, HIPAA)",
      "Risk register with remediation workflows",
      "Direct auditor collaboration portal",
      "Integration with AWS, GCP, Azure, and GitHub",
    ],
    url: null,
  },
];

const TESTIMONIALS = [
  {
    id: "t-1",
    clientName: "James Okafor",
    company: "Meridian Capital Group",
    role: "Chief Information Officer",
    quote:
      "EMINENCE transformed our entire technology stack in under six months. Their team brought both the strategic clarity we needed and the technical depth to execute flawlessly. The migration to their cloud infrastructure alone saved us 40% in annual operational costs.",
    rating: 5,
    service: "Cloud Hosting",
  },
  {
    id: "t-2",
    clientName: "Sophia Chen",
    company: "Arco Manufacturing Ltd",
    role: "VP of Operations",
    quote:
      "Implementing Nexus ERP across our three business units was a project we had delayed for years out of fear of disruption. EMINENCE's consultancy team made it seamless. We went live on schedule and our inventory accuracy jumped from 78% to 97% within the first quarter.",
    rating: 5,
    service: "Software Solutions",
  },
  {
    id: "t-3",
    clientName: "David Mensah",
    company: "Kora Insurance PLC",
    role: "Head of Digital Transformation",
    quote:
      "The custom document management system EMINENCE built for us handles over two million policy documents with full regulatory compliance. Their attention to security and auditability was exceptional — something our internal team simply could not have achieved at this scale.",
    rating: 5,
    service: "Software Solutions",
  },
  {
    id: "t-4",
    clientName: "Priya Nair",
    company: "TalentBridge Africa",
    role: "CEO",
    quote:
      "We chose ServiceHub as the foundation for our staffing marketplace. The platform's robustness gave us instant credibility with enterprise clients from day one. EMINENCE's support team was phenomenal through every phase of the launch.",
    rating: 5,
    service: "Consultancy",
  },
  {
    id: "t-5",
    clientName: "Marcus van der Berg",
    company: "Syntex Logistics",
    role: "Director of IT",
    quote:
      "EMINENCE's cloud team migrated our legacy on-premise system to a containerised cloud environment without a single hour of unplanned downtime. Their infrastructure expertise is genuinely world-class.",
    rating: 5,
    service: "Cloud Hosting",
  },
  {
    id: "t-6",
    clientName: "Amara Osei",
    company: "Verdant Agri-Tech",
    role: "CTO",
    quote:
      "From discovery workshops to go-live, EMINENCE's consultancy engagement was the most structured and productive we've ever experienced. They challenged our assumptions, brought fresh perspectives, and delivered a technology strategy that's guiding us for the next five years.",
    rating: 5,
    service: "Consultancy",
  },
];

const BLOG_POSTS = [
  {
    id: "blog-1",
    slug: "why-cloud-native-is-non-negotiable-in-2026",
    title: "Why Cloud-Native Architecture Is Non-Negotiable in 2026",
    excerpt:
      "The performance gap between cloud-native and legacy on-premise systems has grown too large to ignore. We break down what cloud-native actually means, why enterprises are accelerating migration, and the hidden costs of waiting.",
    author: "Emmanuel Asante",
    publishedAt: "2026-08-01",
    category: "Cloud",
    readTime: "7 min read",
  },
  {
    id: "blog-2",
    slug: "building-enterprise-software-that-actually-gets-used",
    title: "Building Enterprise Software That Actually Gets Used",
    excerpt:
      "The graveyard of unused enterprise software is vast. Adoption failure is almost never a technical problem — it's a people and process problem. Here's how EMINENCE approaches software delivery to ensure what we build gets embedded into daily workflows.",
    author: "Ife Adeyemi",
    publishedAt: "2026-07-22",
    category: "Software Solutions",
    readTime: "9 min read",
  },
  {
    id: "blog-3",
    slug: "the-real-cost-of-compliance-debt",
    title: "The Real Cost of Compliance Debt — and How to Stop Paying It",
    excerpt:
      "Compliance debt is the accumulation of unresolved gaps between your current controls and the standards you're supposed to meet. Like technical debt, it compounds. We quantify what it actually costs and how continuous compliance monitoring changes the economics.",
    author: "Sandra Mensah-Bonsu",
    publishedAt: "2026-07-10",
    category: "Security & Compliance",
    readTime: "6 min read",
  },
  {
    id: "blog-4",
    slug: "five-signs-your-business-needs-a-technology-consultant",
    title: "Five Signs Your Business Needs a Technology Consultant",
    excerpt:
      "Most businesses bring in a technology consultant too late — after costly decisions have already been made. Learn the early warning signs that it's time to bring in external expertise before the pain becomes expensive.",
    author: "Kwame Darko",
    publishedAt: "2026-06-28",
    category: "Consultancy",
    readTime: "5 min read",
  },
  {
    id: "blog-5",
    slug: "designing-multi-tenant-saas-architecture",
    title: "Designing Multi-Tenant SaaS Architecture for Scale",
    excerpt:
      "Multi-tenancy is one of the most consequential architectural decisions a SaaS product will make. We walk through the three primary models — pooled, siloed, and hybrid — and explain when to choose each, with real-world trade-offs.",
    author: "Emmanuel Asante",
    publishedAt: "2026-06-15",
    category: "Software Solutions",
    readTime: "11 min read",
  },
  {
    id: "blog-6",
    slug: "ai-in-enterprise-separating-signal-from-noise",
    title: "AI in the Enterprise: Separating Signal from Noise",
    excerpt:
      "Every enterprise technology conversation now involves AI. We cut through the hype to identify where AI genuinely delivers ROI in enterprise operations — and where the business case simply does not hold up.",
    author: "Ife Adeyemi",
    publishedAt: "2026-06-03",
    category: "Technology",
    readTime: "8 min read",
  },
];

const STATS = {
  clientsServed: 180,
  projectsDelivered: 340,
  teamSize: 95,
  yearsActive: 8,
  countriesReached: 24,
  satisfactionRate: 98,
};

router.get("/products", async (req, res): Promise<void> => {
  res.json(ListProductsResponse.parse(PRODUCTS));
});

router.get("/testimonials", async (req, res): Promise<void> => {
  res.json(ListTestimonialsResponse.parse(TESTIMONIALS));
});

router.get("/blog/posts", async (req, res): Promise<void> => {
  res.json(ListBlogPostsResponse.parse(BLOG_POSTS));
});

router.get("/stats", async (req, res): Promise<void> => {
  res.json(GetStatsResponse.parse(STATS));
});

export default router;
