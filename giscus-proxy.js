import http from 'http'
import https from 'https'
import { URL } from 'url'
import dns from 'dns'

// Override DNS resolution to use system resolver
dns.setDefaultResultOrder('ipv4first')

const PORT = 3080

const server = http.createServer((req, res) => {
  // Build the target URL
  const targetUrl = new URL(`https://giscus.app${req.url}`)
  console.log(`[Proxy] ${req.url} -> ${targetUrl.href}`)

  const options = {
    method: req.method,
    headers: {
      ...req.headers,
      // Override Host header to match target
      'host': targetUrl.host,
    },
  }

  // Choose http/https module
  const proxyReq = https.request(targetUrl, options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, {
      ...proxyRes.headers,
      // Override CSP to allow embedding
      'content-security-policy': "frame-ancestors 'self' http://localhost:3000/ http://localhost:8000/",
    })
    console.log(`[Proxy] Response: ${proxyRes.statusCode} for ${req.url}`)

    proxyRes.pipe(res, { end: true })
  })

  proxyReq.on('error', (err) => {
    console.error('[Proxy] Error:', err)
    res.writeHead(500)
    res.end('Proxy error')
  })

  // Pipe request body (for POST, etc.)
  req.pipe(proxyReq, { end: true })
})

server.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`)
})
