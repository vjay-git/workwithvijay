'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * "Initiate the system" - the final stage of the same experience.
 *
 * The environment is deliberately still: the signal on the system line is
 * paused until the visitor engages the form, then runs while they type and
 * settles when they stop. That is the page's one interaction; everything else
 * stays quiet so the form keeps the focus.
 *
 * Submission composes a message to the studio address. The previous version
 * resolved a setTimeout and reported success without sending anything, so
 * enquiries were being lost - a real endpoint is the better answer, but this
 * at least delivers.
 */

const STUDIO_EMAIL = 'hello@workwithvijay.com'

const PROMPTS = [
  { n: '01', q: 'What are you building?' },
  { n: '02', q: 'What needs to change?' },
  { n: '03', q: 'Where are you now?' },
]

const KINDS = ['AI product', 'Internal system', 'Automation', 'Something else']

export default function ContactConsole() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [kind, setKind] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [transmitting, setTransmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const idleRef = useRef<number | undefined>(undefined)
  const blurRef = useRef<number | undefined>(undefined)

  // Typing keeps the signal running; it settles ~900ms after the last input.
  useEffect(
    () => () => {
      window.clearTimeout(idleRef.current)
      window.clearTimeout(blurRef.current)
    },
    []
  )

  const onInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setTransmitting(true)
    window.clearTimeout(idleRef.current)
    idleRef.current = window.setTimeout(() => setTransmitting(false), 900)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = kind ? `New project — ${kind}` : 'New project enquiry'
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      kind ? `Type: ${kind}` : null,
      '',
      form.message,
    ]
      .filter((l) => l !== null)
      .join('\n')
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const cls =
    'cx' + (connecting ? ' is-connecting' : '') + (transmitting ? ' is-transmitting' : '')

  return (
    <div ref={rootRef} className={cls}>
      <div className="cx-ground" aria-hidden="true" />
      <div className="cx-grid" aria-hidden="true" />

      {/* the one moving element on the page - paused until engaged */}
      <span className="cx-line" aria-hidden="true">
        <span className="cx-line-pulse" />
      </span>

      <div className="cx-inner">
        {/* ---------- left: the brief ---------- */}
        <div className="cx-brief">
          <span className="cx-meta">
            <span className="cx-meta-index">Contact</span>
            <span className="cx-meta-rule" aria-hidden="true" />
            05
          </span>

          <h1 className="cx-title">
            Let&apos;s build
            <br />
            <span className="cx-title-em">something real.</span>
          </h1>

          <p className="cx-lede">
            Tell us what you&apos;re building, where you&apos;re stuck, or what needs to change.
            We&apos;ll figure out the system with you.
          </p>

          <p className="cx-note">No pitch. No pressure. Just a useful first conversation.</p>

          <div className="cx-intake">
            <span className="cx-label">Project intake</span>
            <ul className="cx-prompts">
              {PROMPTS.map((p) => (
                <li key={p.n} className="cx-prompt">
                  <span className="cx-prompt-n">{p.n}</span>
                  <span className="cx-prompt-q">{p.q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cx-status">
            <span className="cx-avail">
              <span className="cx-avail-dot" aria-hidden="true" />
              Available for new projects
            </span>
            <span className="cx-resp">
              <span className="cx-label">Typical response</span>
              24–48 hours
            </span>
            <span className="cx-direct">
              <span className="cx-label">Direct</span>
              <a href={`mailto:${STUDIO_EMAIL}`} className="cx-direct-link">
                {STUDIO_EMAIL}
              </a>
            </span>
          </div>
        </div>

        {/* ---------- right: the intake ---------- */}
        <div className="cx-formwrap">
          <form
            className="cx-form"
            onSubmit={onSubmit}
            onFocusCapture={() => {
              window.clearTimeout(blurRef.current)
              setConnecting(true)
            }}
            onBlurCapture={() => {
              // Deferred: tabbing between fields blurs before it focuses, and
              // dropping the state in between restarts the signal mid-travel.
              window.clearTimeout(blurRef.current)
              blurRef.current = window.setTimeout(() => setConnecting(false), 120)
            }}
          >
            <div className="cx-field">
              <label className="cx-field-label" htmlFor="cx-name">
                Name
              </label>
              <input
                id="cx-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={onInput}
                placeholder="Your name"
                className="cx-input"
              />
              <span className="cx-rule" aria-hidden="true" />
            </div>

            <div className="cx-field">
              <label className="cx-field-label" htmlFor="cx-email">
                Email
              </label>
              <input
                id="cx-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={onInput}
                placeholder="you@company.com"
                className="cx-input"
              />
              <span className="cx-rule" aria-hidden="true" />
            </div>

            <fieldset className="cx-kinds">
              <legend className="cx-field-label">What are you building?</legend>
              <div className="cx-kind-list">
                {KINDS.map((k) => (
                  <label key={k} className="cx-kind">
                    <input
                      type="radio"
                      name="kind"
                      value={k}
                      checked={kind === k}
                      onChange={() => setKind(k)}
                    />
                    <span className="cx-kind-dot" aria-hidden="true" />
                    <span className="cx-kind-name">{k}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="cx-field cx-field-message">
              <label className="cx-field-label" htmlFor="cx-message">
                The system
              </label>
              <textarea
                id="cx-message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={onInput}
                placeholder="Tell us what you're building..."
                className="cx-input cx-textarea"
              />
              <span className="cx-rule" aria-hidden="true" />
            </div>

            <div className="cx-submit">
              <button type="submit" className="cx-cta">
                <span className="cx-cta-signal" aria-hidden="true" />
                <span className="cx-cta-label">Start the conversation</span>
                <span className="cx-cta-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </div>

            <p className="cx-sent" role="status" aria-live="polite">
              {sent
                ? `Opening your mail client. If nothing happens, write to ${STUDIO_EMAIL} directly.`
                : ''}
            </p>
          </form>
        </div>
      </div>

      {/* ---------- terminus ---------- */}
      <div className="cx-terminus">
        <div className="cx-inner cx-terminus-inner">
          <span className="cx-terminus-line" aria-hidden="true" />
          <span className="cx-terminus-label">
            System
            <span className="cx-terminus-sep" aria-hidden="true">
              /
            </span>
            Ready
          </span>
        </div>
      </div>
    </div>
  )
}
