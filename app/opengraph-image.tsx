import { ImageResponse } from 'next/og'

/**
 * The share card for every page (Next applies a root opengraph-image to all
 * routes). Without one, links pasted into LinkedIn, WhatsApp or Slack render
 * as bare text, and Google has no image for the business.
 */
export const alt = 'COLLAB WITH VIJAY — AI products built for production'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#08090b',
          color: '#eef2f4',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, letterSpacing: 4, color: 'rgba(238,242,244,0.56)' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#5ce1e6' }} />
          COLLAB WITH VIJAY
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 96, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>AI PRODUCTS</span>
          <span>BUILT FOR</span>
          <span style={{ color: '#5ce1e6' }}>PRODUCTION.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: 'rgba(238,242,244,0.7)' }}>
          RAG systems · AI agents · AI chatbots · LLM applications
        </div>
      </div>
    ),
    size,
  )
}
