import http from 'http'
import fs from 'fs'
import path from 'path'

const PORT = 3000
const PUBLIC_DIR = path.resolve('.output/public')

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0] // Ignore query strings
  if (url === '/') url = '/index.html'

  // GitHub Resolution Order:
  // 1. Try the literal path (e.g., /about.html)
  // 2. Try the path + .html (e.g., /about -> /about.html)
  // 3. Try the path + /index.html (e.g., /blogs/ -> /blogs/index.html)

  const pathsToTry = [
    path.join(PUBLIC_DIR, url),
    path.join(PUBLIC_DIR, url + '.html'),
    path.join(PUBLIC_DIR, url, 'index.html'),
  ]

  for (const filePath of pathsToTry) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath)
      const contentTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' })
      res.end(fs.readFileSync(filePath))
      return
    }
  }

  res.writeHead(404)
  res.end('404 Not Found')
})

server.listen(PORT, () => {
  console.log(`🚀 GH-Pages Emulator running at http://localhost:${PORT}`)
})
