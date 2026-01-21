'use client'

interface DiagramProps {
  className?: string
}

// RAG System Diagram - AI Knowledge Assistant
export function RAGSystemDiagram({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Documents/Knowledge Base */}
      <rect
        x="20"
        y="40"
        width="80"
        height="100"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="30"
        y1="60"
        x2="90"
        y2="60"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <line
        x1="30"
        y1="80"
        x2="90"
        y2="80"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <line
        x1="30"
        y1="100"
        x2="70"
        y2="100"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />

      {/* Embedding Process */}
      <circle
        cx="160"
        cy="90"
        r="25"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 150 90 L 155 85 M 150 90 L 155 95"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Vector Database */}
      <rect
        x="220"
        y="50"
        width="100"
        height="80"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Vector points */}
      <circle cx="240" cy="70" r="2" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="260" cy="75" r="2" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="280" cy="65" r="2" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="250" cy="90" r="2" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="270" cy="95" r="2" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="290" cy="85" r="2" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="300" cy="100" r="2" className="fill-neutral-400 dark:fill-neon-cyan/50" />

      {/* Query */}
      <rect
        x="20"
        y="180"
        width="100"
        height="40"
        rx="4"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="30"
        y1="195"
        x2="110"
        y2="195"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="1"
      />
      <line
        x1="30"
        y1="205"
        x2="90"
        y2="205"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="1"
      />

      {/* Retrieval */}
      <path
        d="M 120 200 L 240 80"
        className="stroke-neutral-400 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* LLM Generation */}
      <rect
        x="260"
        y="180"
        width="100"
        height="60"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-600"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 270 200 Q 280 195 290 200 T 310 200"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 270 220 Q 280 215 290 220 T 310 220"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Flow arrows */}
      <path
        d="M 100 90 L 135 90"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <path
        d="M 185 90 L 220 90"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <path
        d="M 320 200 L 260 200"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead)"
      />

      {/* Arrow marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 6 3, 0 6"
            className="fill-neutral-400 dark:fill-neon-cyan/40"
          />
        </marker>
      </defs>
    </svg>
  )
}

// Agent Workflow Diagram - Agent-Based Workflow Automation
export function AgentWorkflowDiagram({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Input/Trigger */}
      <rect
        x="20"
        y="120"
        width="80"
        height="50"
        rx="4"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="30"
        y1="135"
        x2="90"
        y2="135"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="1"
      />
      <line
        x1="30"
        y1="150"
        x2="80"
        y2="150"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="1"
      />

      {/* Agent 1 - Decision */}
      <circle
        cx="160"
        cy="145"
        r="30"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 145 145 L 155 140 M 145 145 L 155 150"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x="160"
        y="150"
        textAnchor="middle"
        className="text-[10px] fill-neutral-500 dark:fill-neutral-400"
        fontSize="10"
      >
        Agent 1
      </text>

      {/* Decision paths */}
      <path
        d="M 190 135 L 240 100"
        className="stroke-neutral-400 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <path
        d="M 190 155 L 240 190"
        className="stroke-neutral-400 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />

      {/* Agent 2 - Action */}
      <rect
        x="260"
        y="70"
        width="80"
        height="50"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 270 90 L 280 85 L 290 90 L 300 85 L 310 90 L 320 85"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="300"
        y="105"
        textAnchor="middle"
        className="text-[10px] fill-neutral-500 dark:fill-neutral-400"
        fontSize="10"
      >
        Agent 2
      </text>

      {/* Agent 3 - Validation */}
      <rect
        x="260"
        y="160"
        width="80"
        height="50"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="300"
        cy="185"
        r="8"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 295 185 L 298 188 L 305 180"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x="300"
        y="215"
        textAnchor="middle"
        className="text-[10px] fill-neutral-500 dark:fill-neutral-400"
        fontSize="10"
      >
        Agent 3
      </text>

      {/* Audit Trail */}
      <rect
        x="20"
        y="220"
        width="320"
        height="40"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="30"
        y1="235"
        x2="330"
        y2="235"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <line
        x1="30"
        y1="245"
        x2="330"
        y2="245"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <text
        x="30"
        y="255"
        className="text-[9px] fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Audit Trail
      </text>

      {/* Flow arrows */}
      <path
        d="M 100 145 L 130 145"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead2)"
      />
      <path
        d="M 340 95 L 340 155"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead2)"
      />
      <path
        d="M 300 220 L 300 240"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead2)"
      />

      {/* Arrow marker */}
      <defs>
        <marker
          id="arrowhead2"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 6 3, 0 6"
            className="fill-neutral-400 dark:fill-neon-cyan/40"
          />
        </marker>
      </defs>
    </svg>
  )
}

// Scalable Architecture Diagram - Scalable Web Platform
export function ScalableArchitectureDiagram({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Client Layer */}
      <rect
        x="20"
        y="20"
        width="360"
        height="50"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="60" cy="45" r="8" className="fill-neutral-300 dark:fill-neutral-700" />
      <circle cx="100" cy="45" r="8" className="fill-neutral-300 dark:fill-neutral-700" />
      <circle cx="140" cy="45" r="8" className="fill-neutral-300 dark:fill-neutral-700" />
      <text
        x="200"
        y="50"
        textAnchor="middle"
        className="text-[10px] fill-neutral-500 dark:fill-neutral-400"
        fontSize="10"
      >
        Clients
      </text>

      {/* Load Balancer */}
      <rect
        x="160"
        y="90"
        width="80"
        height="40"
        rx="4"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="170"
        y1="105"
        x2="230"
        y2="105"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="1"
      />
      <line
        x1="170"
        y1="115"
        x2="220"
        y2="115"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="1"
      />

      {/* Application Servers */}
      <rect
        x="40"
        y="150"
        width="100"
        height="60"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="150"
        y="150"
        width="100"
        height="60"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="260"
        y="150"
        width="100"
        height="60"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 50 170 L 90 170 M 50 180 L 90 180 M 50 190 L 80 190"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1"
      />
      <path
        d="M 160 170 L 200 170 M 160 180 L 200 180 M 160 190 L 190 190"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1"
      />
      <path
        d="M 270 170 L 310 170 M 270 180 L 310 180 M 270 190 L 300 190"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1"
      />
      <text
        x="90"
        y="220"
        textAnchor="middle"
        className="text-[9px] fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        App 1
      </text>
      <text
        x="200"
        y="220"
        textAnchor="middle"
        className="text-[9px] fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        App 2
      </text>
      <text
        x="310"
        y="220"
        textAnchor="middle"
        className="text-[9px] fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        App 3
      </text>

      {/* Database Layer */}
      <rect
        x="120"
        y="240"
        width="160"
        height="40"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="140" cy="260" r="4" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="160" cy="260" r="4" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="180" cy="260" r="4" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="220" cy="260" r="4" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="240" cy="260" r="4" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <circle cx="260" cy="260" r="4" className="fill-neutral-400 dark:fill-neon-cyan/50" />
      <text
        x="200"
        y="275"
        textAnchor="middle"
        className="text-[9px] fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Database Cluster
      </text>

      {/* Flow arrows */}
      <path
        d="M 200 70 L 200 90"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead3)"
      />
      <path
        d="M 90 130 L 90 150 M 200 130 L 200 150 M 310 130 L 310 150"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead3)"
      />
      <path
        d="M 200 210 L 200 240"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead3)"
      />

      {/* Arrow marker */}
      <defs>
        <marker
          id="arrowhead3"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 6 3, 0 6"
            className="fill-neutral-400 dark:fill-neon-cyan/40"
          />
        </marker>
      </defs>
    </svg>
  )
}
