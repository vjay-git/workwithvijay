/**
 * The service landing pages, one per thing people actually search for.
 *
 * /services is the studio's own framing (four layers). These pages exist for
 * the other direction: someone types "rag development company" or "hire ai
 * agent developer" into Google, and there should be one page whose title,
 * heading and body answer exactly that query. Each entry renders at
 * /services/<slug>, is listed in the sitemap and linked from the footer.
 *
 * Copy rule: describe what gets built and how. No invented client names,
 * metrics or prices - the work page carries the evidence.
 */

export interface ServiceFaq {
  q: string
  a: string
}

export interface ServicePage {
  slug: string
  /** Short name for links and breadcrumbs. */
  name: string
  /** <title>, kept under ~60 chars with the search phrase first. */
  title: string
  /** Meta description, ~150 chars, ends on the action. */
  description: string
  /** The page's H1 - the query, said plainly. */
  h1: string
  lede: string
  /** Who this is for, as problems they would recognise. */
  problems: string[]
  /** What gets delivered. */
  deliverables: { name: string; body: string }[]
  stack: string[]
  faqs: ServiceFaq[]
}

export const SERVICES: ServicePage[] = [
  {
    slug: 'ai-development',
    name: 'AI Development Services',
    title: 'AI Development Services — Custom AI Products, Built to Ship',
    description:
      'Custom AI development for startups and enterprise teams: LLM applications, RAG systems, AI agents and integrations, engineered for production. Based in Hyderabad, working worldwide.',
    h1: 'AI development services for teams that need it in production',
    lede:
      'Most AI projects stall between the demo and the real thing. We take an idea — or a prototype that works on a laptop — and engineer the full system around the model: data, retrieval, tools, interface, security, deployment and monitoring.',
    problems: [
      'You have a clear AI use case but no in-house team to build it.',
      'A proof of concept works in a notebook and falls over with real users.',
      'You need AI wired into existing systems, not a standalone toy.',
      'Answers have to be accurate, traceable and safe to put in front of customers.',
    ],
    deliverables: [
      { name: 'Discovery & architecture', body: 'Use case scoping, model and data choices, and a system design you can review before a line of code is written.' },
      { name: 'LLM application', body: 'The working product: backend, prompts, retrieval or agent logic, and a usable interface.' },
      { name: 'Integrations', body: 'Secure connections to your databases, APIs, documents and internal tools.' },
      { name: 'Evaluation & guardrails', body: 'Test sets, quality checks and limits so the system behaves predictably.' },
      { name: 'Deployment & handover', body: 'Production deployment, monitoring, documentation and a clean handover to your team.' },
    ],
    stack: ['Python', 'TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL', 'pgvector', 'OpenAI', 'Anthropic Claude', 'Open-source LLMs'],
    faqs: [
      { q: 'What kinds of AI projects do you take on?', a: 'LLM-powered applications: RAG knowledge assistants, AI agents and workflow automation, AI chatbots, text-to-SQL and data assistants, and AI features inside existing products.' },
      { q: 'Do you work with startups or enterprises?', a: 'Both. Startups usually need a first production version; enterprise teams usually need AI connected safely to systems they already run.' },
      { q: 'How long does an AI project take?', a: 'A focused first version is typically a matter of weeks, not months. The timeline is agreed after a short discovery call once the scope and data are clear.' },
      { q: 'Which AI models do you use?', a: 'Whichever fits the job — commercial models such as OpenAI GPT and Anthropic Claude, or open-source models when data must stay in your environment. The system is built so the model can be swapped.' },
      { q: 'Where are you based?', a: 'Hyderabad, India. We work with teams across Hyderabad and India, and remotely with clients in any country over email, WhatsApp and video calls.' },
    ],
  },
  {
    slug: 'ai-agent-development',
    name: 'AI Agent Development',
    title: 'AI Agent Development — Custom Agents & Workflow Automation',
    description:
      'Custom AI agent development: multi-step agents that use your tools and data, with verification, guardrails and human review. Automate real workflows. Talk to us.',
    h1: 'AI agent development: agents that actually finish the job',
    lede:
      'An agent is only useful if it can be trusted to act. We build multi-step AI agents that call your tools and APIs, check their own work, recover when a step fails, and hand off to a person when they should.',
    problems: [
      'A process needs several systems and a person copying data between them.',
      'You tried an agent framework and it loops, guesses or breaks silently.',
      'Actions need approval steps and an audit trail.',
      'You want automation that degrades safely instead of failing loudly.',
    ],
    deliverables: [
      { name: 'Workflow mapping', body: 'Which steps an agent should own, which need a human, and where the decision boundaries sit.' },
      { name: 'Tooling layer', body: 'Typed, permissioned tools over your APIs, databases and SaaS products.' },
      { name: 'Orchestration', body: 'Planning, state, retries and fallbacks, so long tasks survive partial failure.' },
      { name: 'Verification & review', body: 'Self-checks, approval gates and a full trace of what the agent did and why.' },
      { name: 'Production runtime', body: 'Deployment, monitoring and cost controls for agents running every day.' },
    ],
    stack: ['Python', 'LangGraph', 'Tool calling', 'MCP', 'OpenAI', 'Anthropic Claude', 'PostgreSQL', 'Queues & workers'],
    faqs: [
      { q: 'What is an AI agent?', a: 'Software that uses a language model to decide which steps to take and which tools to call to reach a goal — for example reading a request, querying systems, drafting a result and asking for approval.' },
      { q: 'Which tasks are good candidates for an AI agent?', a: 'Repetitive, multi-step work that follows rules but needs judgement on messy input: triage, research, data entry across systems, report preparation and support workflows.' },
      { q: 'How do you stop an agent making mistakes?', a: 'Narrow, permissioned tools; verification steps; limits on what it can do without approval; and evaluation against real examples before it goes live.' },
      { q: 'Can agents connect to our existing software?', a: 'Yes. Agents are given tools over your APIs, databases and SaaS products, with access control at every edge.' },
    ],
  },
  {
    slug: 'rag-development',
    name: 'RAG Development',
    title: 'RAG Development Services — Retrieval-Augmented Generation',
    description:
      'RAG development services: AI that answers from your own documents and data with citations, controlled retrieval and evaluation. Built for production. Get in touch.',
    h1: 'RAG development: AI that answers from your own data',
    lede:
      'Retrieval-augmented generation gives a language model a reliable memory. We build RAG systems that ingest your documents and data, retrieve the right context, and answer with citations your team can check.',
    problems: [
      'People waste hours searching documents, wikis and tickets for answers.',
      'A chatbot over your docs gives confident but wrong answers.',
      'Answers must respect who is allowed to see what.',
      'Your knowledge lives in PDFs, databases and tools that do not talk to each other.',
    ],
    deliverables: [
      { name: 'Ingestion pipeline', body: 'Parsing, cleaning and chunking for PDFs, docs, web pages, tickets and databases, kept in sync.' },
      { name: 'Retrieval', body: 'Embeddings, hybrid search and re-ranking tuned on your own questions.' },
      { name: 'Grounded answers', body: 'Responses built only from retrieved context, with citations back to the source.' },
      { name: 'Access control', body: 'Document-level permissions so users only retrieve what they may see.' },
      { name: 'Evaluation', body: 'A test set of real questions to measure accuracy before and after every change.' },
    ],
    stack: ['Python', 'pgvector', 'PostgreSQL', 'Embeddings', 'Hybrid search', 'Re-ranking', 'Next.js', 'OpenAI', 'Anthropic Claude'],
    faqs: [
      { q: 'What is RAG?', a: 'Retrieval-augmented generation: before the model answers, the system searches your own data for relevant passages and gives them to the model, so answers are grounded in your content rather than the model’s memory.' },
      { q: 'How do you reduce hallucinations?', a: 'Better retrieval, answers restricted to retrieved context, citations, refusing when the answer is not in the data, and measuring accuracy on a fixed set of real questions.' },
      { q: 'What data sources can a RAG system use?', a: 'PDFs, Word and Markdown documents, websites, wikis, support tickets, SQL databases and most systems with an API.' },
      { q: 'Can the data stay private?', a: 'Yes. The system can run in your own cloud, and open-source models can be used where data must not leave your environment.' },
    ],
  },
  {
    slug: 'ai-chatbot-development',
    name: 'AI Chatbot Development',
    title: 'Custom AI Chatbot Development for Business',
    description:
      'Custom AI chatbot development for websites, support and internal teams — trained on your data, connected to your systems, with handoff to humans. Start a project.',
    h1: 'Custom AI chatbot development for your business',
    lede:
      'A good AI chatbot knows your business, not just the internet. We build chatbots and assistants for customer support, sales and internal teams that answer from your content, take real actions, and know when to pass to a person.',
    problems: [
      'Your support team answers the same questions every day.',
      'Visitors leave your website without finding what they need.',
      'Staff need quick answers from internal policies and documents.',
      'An off-the-shelf bot cannot reach your data or systems.',
    ],
    deliverables: [
      { name: 'Knowledge base', body: 'Your website, documents and FAQs turned into a searchable source the bot answers from.' },
      { name: 'Conversation design', body: 'Tone, scope, fallbacks and clear handoff to a human agent.' },
      { name: 'Actions', body: 'Look up orders, book meetings, create tickets — connected to your tools.' },
      { name: 'Channels', body: 'Website widget, WhatsApp, Slack or inside your own app.' },
      { name: 'Analytics', body: 'See what people ask, where the bot fails, and improve it with evidence.' },
    ],
    stack: ['Next.js', 'Python', 'RAG', 'WhatsApp Business API', 'Slack', 'OpenAI', 'Anthropic Claude', 'PostgreSQL'],
    faqs: [
      { q: 'How is a custom AI chatbot different from a template bot?', a: 'It answers from your own content, connects to your systems to take actions, and is built around your workflows — instead of scripted decision trees or generic answers.' },
      { q: 'Can the chatbot work on WhatsApp?', a: 'Yes. The same assistant can serve a website widget, WhatsApp, Slack or your own app.' },
      { q: 'What happens when the chatbot does not know the answer?', a: 'It says so and hands the conversation to a person with the context attached, rather than guessing.' },
      { q: 'Can it answer questions from our database, like an SAP or SQL system?', a: 'Yes. Text-to-SQL and data assistants let people ask questions in plain language over business data, with read-only access and permission checks.' },
    ],
  },
  {
    slug: 'ai-development-company-hyderabad',
    name: 'AI Development in Hyderabad',
    title: 'AI Development Company in Hyderabad — RAG, AI Agents, Chatbots',
    description:
      'Hyderabad-based AI development company building RAG systems, AI agents, custom AI chatbots and LLM applications for startups and enterprises. Talk to Vijay today.',
    h1: 'AI development company in Hyderabad',
    lede:
      'COLLAB WITH VIJAY is a product and AI engineering studio based in Hyderabad. We build AI systems that go to production — RAG knowledge assistants, AI agents, chatbots and full-stack LLM applications — for teams in Hyderabad, across India and worldwide.',
    problems: [
      'You are a Hyderabad startup that needs an AI product built properly, not just demoed.',
      'Your company wants AI connected to internal data, SAP or business systems.',
      'You want a senior engineer you can speak to directly, in your time zone.',
      'An agency built a prototype and you need someone to take it to production.',
    ],
    deliverables: [
      { name: 'RAG systems', body: 'AI that answers from your documents and data, with citations and access control.' },
      { name: 'AI agents', body: 'Multi-step agents and workflow automation over your tools, with verification and human review.' },
      { name: 'AI chatbots', body: 'Website, WhatsApp and internal assistants trained on your content and connected to your systems.' },
      { name: 'Data assistants', body: 'Text-to-SQL and plain-language questions over SQL and SAP business data.' },
      { name: 'Full-stack AI products', body: 'The complete application: interface, backend, AI orchestration, deployment and monitoring.' },
    ],
    stack: ['Python', 'TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL', 'pgvector', 'OpenAI', 'Anthropic Claude', 'Open-source LLMs'],
    faqs: [
      { q: 'Are you based in Hyderabad?', a: 'Yes. The studio is based in Hyderabad, Telangana, and works with clients in Hyderabad, across India and internationally.' },
      { q: 'What AI services do you offer in Hyderabad?', a: 'RAG systems, AI agents and workflow automation, custom AI chatbots, text-to-SQL data assistants and full-stack LLM applications.' },
      { q: 'Do you work with startups and enterprises in Hyderabad?', a: 'Both. Startups usually need a first production version of an AI product; enterprises usually need AI connected safely to systems they already run.' },
      { q: 'How do I start an AI project with you?', a: 'Send a short message through the contact page, by email or on WhatsApp describing what you want to build. You will hear back from Vijay directly to set up a call.' },
    ],
  },
]

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}
