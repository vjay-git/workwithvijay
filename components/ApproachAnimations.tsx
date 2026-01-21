'use client'

interface AnimationProps {
  className?: string
}

// Animated Data Flow - Professional, subtle
export function AnimatedDataFlow({ className = '' }: AnimationProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 200"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Data Nodes */}
        <circle cx="80" cy="100" r="12" className="fill-neutral-300 dark:fill-neon-cyan/30">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="100" r="12" className="fill-neutral-300 dark:fill-neon-cyan/30">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            begin="0.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="320" cy="100" r="12" className="fill-neutral-300 dark:fill-neon-cyan/30">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            begin="0.8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Flow Lines */}
        <path
          d="M 92 100 L 188 100"
          className="stroke-neutral-300 dark:stroke-neon-cyan/20"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,96;96,0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 212 100 L 308 100"
          className="stroke-neutral-300 dark:stroke-neon-cyan/20"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,96;96,0"
            dur="2s"
            begin="0.4s"
            repeatCount="indefinite"
          />
        </path>

        {/* Processing Indicator */}
        <rect
          x="170"
          y="80"
          width="60"
          height="40"
          rx="4"
          className="stroke-neutral-400 dark:stroke-neon-cyan/40"
          strokeWidth="1.5"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  )
}

// Animated System Layers - Abstract representation
export function AnimatedSystemLayers({ className = '' }: AnimationProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 200"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1 - Base */}
        <rect
          x="50"
          y="140"
          width="300"
          height="30"
          rx="4"
          className="stroke-neutral-300 dark:stroke-neutral-700"
          strokeWidth="1.5"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Layer 2 - Middle */}
        <rect
          x="80"
          y="100"
          width="240"
          height="30"
          rx="4"
          className="stroke-neutral-300 dark:stroke-neutral-700"
          strokeWidth="1.5"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.7;0.4"
            dur="3s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Layer 3 - Top */}
        <rect
          x="110"
          y="60"
          width="180"
          height="30"
          rx="4"
          className="stroke-neutral-400 dark:stroke-neon-cyan/50"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="3s"
            begin="1s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Connection Lines */}
        <path
          d="M 200 90 L 200 130"
          className="stroke-neutral-300 dark:stroke-neon-cyan/20"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;8"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 200 130 L 200 170"
          className="stroke-neutral-300 dark:stroke-neon-cyan/20"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;8"
            dur="2s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}

// Animated Neural Network - Abstract AI representation
export function AnimatedNeuralNetwork({ className = '' }: AnimationProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 200"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Input Layer */}
        <circle cx="80" cy="100" r="8" className="fill-neutral-300 dark:fill-neon-cyan/30">
          <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="60" r="8" className="fill-neutral-300 dark:fill-neon-cyan/30">
          <animate attributeName="r" values="8;10;8" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="140" r="8" className="fill-neutral-300 dark:fill-neon-cyan/30">
          <animate attributeName="r" values="8;10;8" dur="2s" begin="0.6s" repeatCount="indefinite" />
        </circle>

        {/* Hidden Layer */}
        <circle cx="200" cy="80" r="10" className="fill-neutral-400 dark:fill-neon-cyan/40">
          <animate attributeName="r" values="10;12;10" dur="2s" begin="0.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="120" r="10" className="fill-neutral-400 dark:fill-neon-cyan/40">
          <animate attributeName="r" values="10;12;10" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>

        {/* Output Layer */}
        <circle cx="320" cy="100" r="12" className="fill-neutral-400 dark:fill-neon-cyan/50">
          <animate attributeName="r" values="12;14;12" dur="2s" begin="0.4s" repeatCount="indefinite" />
        </circle>

        {/* Connections */}
        <path
          d="M 88 60 L 190 80"
          className="stroke-neutral-300 dark:stroke-neon-cyan/20"
          strokeWidth="1"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 88 100 L 190 80"
          className="stroke-neutral-300 dark:stroke-neon-cyan/20"
          strokeWidth="1"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur="2s"
            begin="0.3s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 88 140 L 190 80"
          className="stroke-neutral-300 dark:stroke-neon-cyan/20"
          strokeWidth="1"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur="2s"
            begin="0.6s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 210 80 L 308 100"
          className="stroke-neutral-300 dark:stroke-neon-cyan/30"
          strokeWidth="1.5"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="2s"
            begin="0.4s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 210 120 L 308 100"
          className="stroke-neutral-300 dark:stroke-neon-cyan/30"
          strokeWidth="1.5"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="2s"
            begin="0.7s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}

// Animated Code Flow - Engineering representation
export function AnimatedCodeFlow({ className = '' }: AnimationProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 200"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Code Blocks */}
        <rect
          x="40"
          y="40"
          width="80"
          height="50"
          rx="4"
          className="stroke-neutral-300 dark:stroke-neutral-700"
          strokeWidth="1.5"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.7;0.4"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </rect>
        <line x1="50" y1="60" x2="110" y2="60" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
        <line x1="50" y1="75" x2="100" y2="75" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />

        <rect
          x="160"
          y="80"
          width="80"
          height="50"
          rx="4"
          className="stroke-neutral-400 dark:stroke-neon-cyan/40"
          strokeWidth="1.5"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0.5;0.9;0.5"
            dur="2.5s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </rect>
        <line x1="170" y1="100" x2="230" y2="100" className="stroke-neutral-400 dark:stroke-neon-cyan/40" strokeWidth="1" />
        <line x1="170" y1="115" x2="220" y2="115" className="stroke-neutral-400 dark:stroke-neon-cyan/40" strokeWidth="1" />

        <rect
          x="280"
          y="120"
          width="80"
          height="50"
          rx="4"
          className="stroke-neutral-300 dark:stroke-neutral-700"
          strokeWidth="1.5"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.7;0.4"
            dur="2.5s"
            begin="1s"
            repeatCount="indefinite"
          />
        </rect>
        <line x1="290" y1="140" x2="350" y2="140" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
        <line x1="290" y1="155" x2="340" y2="155" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />

        {/* Flow Arrows */}
        <path
          d="M 120 65 L 160 105"
          className="stroke-neutral-300 dark:stroke-neon-cyan/20"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arrowhead-code)"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,60;60,0"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 240 105 L 280 145"
          className="stroke-neutral-300 dark:stroke-neon-cyan/20"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arrowhead-code)"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,60;60,0"
            dur="2.5s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </path>

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead-code"
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
    </div>
  )
}
