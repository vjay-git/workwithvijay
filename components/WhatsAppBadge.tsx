import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/lib/site'

/**
 * Floating contact badges - email over WhatsApp - mounted once in the root
 * layout.
 *
 * Both are plain links. wa.me opens the app on phones and WhatsApp Web on
 * desktop; mailto opens the visitor's mail client. Each carries an opening
 * line already typed so the first message is never a blank stare. z-index 55
 * keeps the stack over the sticky header (50) and under the nav overlay (60)
 * and the intro film (90).
 */
const MESSAGE = "Hi Vijay, I found you on collabwithvijay.com and I'd like to talk about a project."

export default function WhatsAppBadge() {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`
  const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project enquiry')}&body=${encodeURIComponent(MESSAGE)}`

  return (
    <div className="wa-stack">
      <a
        href={mail}
        className="wa-badge wa-badge-mail"
        aria-label={`Email Vijay at ${CONTACT_EMAIL}`}
        title={CONTACT_EMAIL}
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
        </svg>
      </a>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-badge"
        aria-label="Message Vijay on WhatsApp"
        title="Message on WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M16.004 3C8.832 3 3 8.83 3 16c0 2.293.6 4.533 1.74 6.51L3 29l6.67-1.71A12.95 12.95 0 0 0 16.004 29C23.17 29 29 23.17 29 16S23.17 3 16.004 3Zm0 23.67c-1.98 0-3.92-.53-5.61-1.54l-.4-.24-3.96 1.02 1.06-3.86-.26-.4A10.62 10.62 0 0 1 5.33 16c0-5.88 4.79-10.67 10.68-10.67 5.88 0 10.66 4.79 10.66 10.67 0 5.89-4.78 10.67-10.67 10.67Zm5.85-7.99c-.32-.16-1.9-.94-2.19-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69s1.16 3.12 1.32 3.34c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.62-.37Z"
          />
        </svg>
      </a>
    </div>
  )
}
