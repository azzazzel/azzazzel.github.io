import fs from 'fs'
import path from 'path'
import { globby } from 'globby'

async function run() {
  const publicDir = '.output/public'
  // Find all .html files that aren't index.html
  const files = await globby('**/*.html', {
    cwd: publicDir,
    ignore: ['index.html', '404.html', '200.html'],
  })

  for (const file of files) {
    const route = file.replace('.html', '')
    const dir = path.join(publicDir, route)

    // Create the directory (e.g., .output/public/my-post/)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    // Create the redirector index.html
    const content = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/${route}"><link rel="canonical" href="/${route}"><script>window.location.replace("/${route}" + window.location.search + window.location.hash);</script></head></html>`

    fs.writeFileSync(path.join(dir, 'index.html'), content)
    console.log(`✅ Created redirect: /${route}/ -> /${route}`)
  }
}

run()
