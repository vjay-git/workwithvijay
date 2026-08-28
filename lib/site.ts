/**
 * Canonical site identity. One source of truth, imported everywhere.
 *
 * This exists because the domain used to be hardcoded in six places, drifted,
 * and ended up pointing every canonical signal - og:url, the Organization
 * schema, the sitemap and the robots.txt Sitemap: line - at
 * https://workwithvijay.com, which redirects to an unrelated site belonging to
 * someone else. Search engines were being told this studio lived there.
 *
 * Apex, not www: Netlify already 301s www.collabwithvijay.com to the apex, so
 * declaring www here would point canonicals at a redirect.
 *
 * If the domain ever moves again, change it here and nowhere else.
 */
export const SITE_URL = 'https://collabwithvijay.com'

/** Bare host, for display and for the title template. */
export const SITE_HOST = 'collabwithvijay.com'

export const SITE_NAME = 'COLLAB WITH VIJAY'

export const SITE_TAGLINE = 'Product & AI Engineering Studio'
