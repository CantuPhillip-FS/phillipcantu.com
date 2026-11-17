export type Role = {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  highlights: string[];
  /** Optional link to a full write-up page */
  more?: { href: string; label: string };
};

export const EXPERIENCE: Role[] = [
  {
    title: "Software Engineer",
    company: "Hgraph",
    companyUrl: "https://www.hgraph.com",
    period: "Nov 2026 – Present",
    location: "Remote",
    highlights: [
      "Rejoined Hgraph and became the primary engineer on LionEyes Records, a client music label whose fans buy albums as NFTs on Hedera, stream the songs they own, and unlock perks by tier — shipping 36 merged PRs and 8 production releases in my first two and a half weeks.",
      "Built crypto checkout (pay with HBAR or USDC from your own wallet) where payment and the album NFT move in one atomic Hedera transaction, plus HashPack wallet sign-in with multi-wallet accounts.",
      "Shipped holder-only extras: artists send videos or photos to every album holder, chosen tiers, or one fan, each minted as its own NFT that carries the album's resale royalties.",
      "Cut first-play time for full songs from up to a minute to about a second by streaming masters while they decrypt, and cut production deploys from ~9 to ~5 minutes.",
      "Own growth engineering for hgraph.com: GA4 lead tracking, UTM attribution through to sign-up, llms.txt, canonical-URL redirects, a rebuilt campaign landing page, and in-house onboarding and newsletter email replacing Loops and beehiiv.",
    ],
  },
  {
    title: "Software Engineer Apprentice → Junior Software Engineer",
    company: "Hgraph",
    companyUrl: "https://www.hgraph.com",
    period: "Jun – Sep 2026",
    location: "Remote",
    highlights: [
      "Merged 143+ PRs across 16 services and packages in under three months, progressing from single-component UI tickets to owning multi-service features end to end.",
      "Built enterprise SAML single sign-on: an organization security boundary enforced in RLS and the GraphQL layer, JIT user provisioning, an admin provisioning endpoint, and the customer-facing setup guide — covered by 67 integration tests.",
      "Rebuilt the company's AI agent (hgraph.ai) as a full-stack streaming product: an SSE chat backend, a persistent thread store under RLS, org-scoped spend ceilings, and credential isolation so API keys never reach the browser.",
      "Delivered the customer-facing API usage dashboard from ClickHouse SQL through GraphQL resolvers to the React interface, adding bloom-filter skip indexes and bounded joins so tenant-scoped queries stopped scanning every granule.",
    ],
    more: { href: "/hgraph/", label: "Read the full work record" },
  },
  {
    title: "Software Engineering Apprentice",
    company: "Flatiron School",
    companyUrl: "https://flatironschool.com",
    period: "Apr – Jun 2026",
    location: "Remote",
    highlights: [
      "Selected for Flatiron's paid apprenticeship; worked on a four-engineer remote team under an industry mentor, with all work delivered through pull-request review.",
      "Ramped on an unfamiliar production Next.js codebase, then scoped and built new features into it, owning the lesson-planner demo end to end.",
      "Co-built MatchPoint, an AI-powered job-matching app, from scratch — built the backend scaffold, Supabase auth with Google OAuth, and the core database schema and migrations.",
      "Recruited away by Hgraph two months into the 14-month apprenticeship to join their engineering team.",
    ],
  },
];
