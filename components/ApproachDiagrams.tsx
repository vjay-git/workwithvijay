'use client'

interface DiagramProps {
  className?: string
}

// Systems Thinking Diagram - Data flow and component interactions
export function SystemsThinkingDiagram({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Input Layer */}
      <rect
        x="20"
        y="40"
        width="100"
        height="50"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="30"
        y1="60"
        x2="110"
        y2="60"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <line
        x1="30"
        y1="75"
        x2="100"
        y2="75"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <text
        x="70"
        y="105"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Input
      </text>

      {/* Processing Layer */}
      <rect
        x="150"
        y="120"
        width="100"
        height="60"
        rx="4"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 160 140 L 175 155 L 190 140 L 205 155 L 240 140"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="200"
        y="200"
        textAnchor="middle"
        className="text-xs fill-neutral-600 dark:fill-neon-cyan"
        fontSize="10"
        fontWeight="500"
      >
        Processing
      </text>

      {/* Output Layer */}
      <rect
        x="280"
        y="40"
        width="100"
        height="50"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="290"
        y1="60"
        x2="370"
        y2="60"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <line
        x1="290"
        y1="75"
        x2="360"
        y2="75"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <text
        x="330"
        y="105"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Output
      </text>

      {/* Feedback Loop */}
      <rect
        x="150"
        y="220"
        width="100"
        height="40"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="160"
        y1="235"
        x2="240"
        y2="235"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <text
        x="200"
        y="275"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Feedback
      </text>

      {/* Flow Arrows */}
      <path
        d="M 120 65 L 150 150"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead-systems)"
      />
      <path
        d="M 250 150 L 280 65"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead-systems)"
      />
      <path
        d="M 200 180 L 200 220"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
        markerEnd="url(#arrowhead-systems)"
      />
      <path
        d="M 150 240 L 120 200 L 150 150"
        className="stroke-neutral-300 dark:stroke-neon-cyan/20"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
        markerEnd="url(#arrowhead-systems)"
      />

      {/* Arrow marker */}
      <defs>
        <marker
          id="arrowhead-systems"
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

// Engineering Discipline Diagram - Layered architecture with quality gates
export function EngineeringDisciplineDiagram({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Foundation Layer */}
      <rect
        x="50"
        y="220"
        width="300"
        height="40"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="200"
        y="245"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="10"
      >
        Foundation
      </text>

      {/* Architecture Layer */}
      <rect
        x="70"
        y="160"
        width="260"
        height="40"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="200"
        y="185"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="10"
      >
        Architecture
      </text>

      {/* Code Quality Layer */}
      <rect
        x="90"
        y="100"
        width="220"
        height="40"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="200"
        y="125"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="10"
      >
        Code Quality
      </text>

      {/* Production Layer */}
      <rect
        x="110"
        y="40"
        width="180"
        height="40"
        rx="4"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="2"
        fill="none"
      />
      <text
        x="200"
        y="65"
        textAnchor="middle"
        className="text-xs fill-neutral-600 dark:fill-neon-cyan"
        fontSize="10"
        fontWeight="500"
      >
        Production
      </text>

      {/* Quality Gates - Checkmarks */}
      <path
        d="M 60 100 L 75 115 L 100 90"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 60 160 L 75 175 L 100 150"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 60 220 L 75 235 L 100 210"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Flow Arrows */}
      <path
        d="M 200 140 L 200 160"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead-approach)"
      />
      <path
        d="M 200 200 L 200 220"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead-approach)"
      />

      {/* Arrow marker */}
      <defs>
        <marker
          id="arrowhead-approach"
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

// Production-First Diagram - System with monitoring, security, scalability
export function ProductionFirstDiagram({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Core System */}
      <rect
        x="150"
        y="100"
        width="100"
        height="100"
        rx="6"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="2"
        fill="none"
      />
      <text
        x="200"
        y="155"
        textAnchor="middle"
        className="text-xs fill-neutral-600 dark:fill-neon-cyan"
        fontSize="11"
        fontWeight="500"
      >
        System
      </text>

      {/* Security Layer */}
      <rect
        x="140"
        y="90"
        width="120"
        height="120"
        rx="6"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />
      <text
        x="200"
        y="85"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Security
      </text>

      {/* Monitoring Layer */}
      <circle
        cx="200"
        cy="50"
        r="15"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 195 50 L 198 53 L 205 46"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <text
        x="200"
        y="75"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Monitoring
      </text>

      {/* Scalability Indicators */}
      <rect
        x="80"
        y="220"
        width="60"
        height="30"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="110"
        y="238"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Scale
      </text>

      <rect
        x="260"
        y="220"
        width="60"
        height="30"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="290"
        y="238"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Scale
      </text>

      {/* Connection Lines */}
      <path
        d="M 200 90 L 200 65"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <path
        d="M 150 150 L 110 235"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <path
        d="M 250 150 L 290 235"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />

      {/* Guardrails - AI Systems */}
      <rect
        x="50"
        y="120"
        width="50"
        height="60"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="55"
        y1="135"
        x2="95"
        y2="135"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <line
        x1="55"
        y1="150"
        x2="90"
        y2="150"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <text
        x="75"
        y="195"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Guardrails
      </text>

      <rect
        x="300"
        y="120"
        width="50"
        height="60"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="305"
        y1="135"
        x2="345"
        y2="135"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <line
        x1="305"
        y1="150"
        x2="340"
        y2="150"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
      />
      <text
        x="325"
        y="195"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Audit
      </text>

      {/* Connection to guardrails */}
      <path
        d="M 150 130 L 100 150"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <path
        d="M 250 130 L 300 150"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
    </svg>
  )
}

// How We Think Diagram - Engineering and AI convergence
export function HowWeThinkDiagram({ className = '' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Engineering Foundation */}
      <rect
        x="50"
        y="180"
        width="120"
        height="60"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 60 200 L 75 215 L 90 200 L 105 215 L 120 200 L 135 215 L 160 200"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1"
        fill="none"
      />
      <text
        x="110"
        y="255"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="10"
      >
        Engineering
      </text>

      {/* AI Layer */}
      <rect
        x="230"
        y="180"
        width="120"
        height="60"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="250" cy="210" r="8" className="stroke-neutral-400 dark:stroke-neon-cyan/40" strokeWidth="1.5" fill="none" />
      <circle cx="270" cy="210" r="8" className="stroke-neutral-400 dark:stroke-neon-cyan/40" strokeWidth="1.5" fill="none" />
      <circle cx="290" cy="210" r="8" className="stroke-neutral-400 dark:stroke-neon-cyan/40" strokeWidth="1.5" fill="none" />
      <circle cx="310" cy="210" r="8" className="stroke-neutral-400 dark:stroke-neon-cyan/40" strokeWidth="1.5" fill="none" />
      <circle cx="330" cy="210" r="8" className="stroke-neutral-400 dark:stroke-neon-cyan/40" strokeWidth="1.5" fill="none" />
      <text
        x="290"
        y="255"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="10"
      >
        AI Systems
      </text>

      {/* Convergence Point - Production Ready */}
      <rect
        x="150"
        y="80"
        width="100"
        height="60"
        rx="6"
        className="stroke-neutral-400 dark:stroke-neon-cyan/50"
        strokeWidth="2.5"
        fill="none"
      />
      <text
        x="200"
        y="105"
        textAnchor="middle"
        className="text-xs fill-neutral-700 dark:fill-neon-cyan"
        fontSize="11"
        fontWeight="600"
      >
        Production
      </text>
      <text
        x="200"
        y="120"
        textAnchor="middle"
        className="text-xs fill-neutral-700 dark:fill-neon-cyan"
        fontSize="11"
        fontWeight="600"
      >
        Ready
      </text>

      {/* Connection Lines */}
      <path
        d="M 200 140 L 200 180"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrowhead-think)"
      />
      <path
        d="M 170 110 L 110 210"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
        markerEnd="url(#arrowhead-think)"
      />
      <path
        d="M 230 110 L 290 210"
        className="stroke-neutral-300 dark:stroke-neon-cyan/30"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
        markerEnd="url(#arrowhead-think)"
      />

      {/* Quality Pillars */}
      <rect
        x="30"
        y="40"
        width="70"
        height="30"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 40 55 L 50 60 L 60 50"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <text
        x="65"
        y="60"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Reliable
      </text>

      <rect
        x="300"
        y="40"
        width="70"
        height="30"
        rx="4"
        className="stroke-neutral-300 dark:stroke-neutral-700"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 310 55 L 320 60 L 330 50"
        className="stroke-neutral-400 dark:stroke-neon-cyan/40"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <text
        x="335"
        y="60"
        textAnchor="middle"
        className="text-xs fill-neutral-500 dark:fill-neutral-400"
        fontSize="9"
      >
        Explainable
      </text>

      {/* Arrow marker */}
      <defs>
        <marker
          id="arrowhead-think"
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
