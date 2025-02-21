import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  // add a custom request header to read the nonce value
  requestHeaders.set('x-nonce', nonce)

  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  // Create new response
  const response = NextResponse.next({
    request: {
      // parse the new request headers
      headers: requestHeaders,
    },
  })
  // Also set the CSP header in the response so that it is outputted to the browser
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}
