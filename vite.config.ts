import { execSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 어느 프론트 커밋으로 그렸는지 화면 아래에 보여 준다
const git = (cmd: string) => {
  try {
    return execSync(cmd, { cwd: resolve('.frontend') }).toString().trim()
  } catch {
    return ''
  }
}

// 서비스 코드에서 lucide-react로 불러온 아이콘을 모아 'virtual:used-icons'로 내보낸다.
// 아이콘 페이지가 서비스에서 실제로 쓰는 것만 보여 주고, 프론트가 바뀌면 다음 빌드에 따라 바뀐다
function usedIcons() {
  const id = 'virtual:used-icons'
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((f) => {
      const p = join(dir, f)
      return statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(f) ? [p] : []
    })
  return {
    name: 'used-icons',
    resolveId: (s: string) => (s === id ? '\0' + id : undefined),
    load(s: string) {
      if (s !== '\0' + id) return
      const root = resolve('.frontend/src')
      const where: Record<string, string[]> = {}
      for (const file of walk(root)) {
        const src = readFileSync(file, 'utf8')
        for (const m of src.matchAll(/import\s*(?:type\s*)?\{([^}]+)\}\s*from\s*'lucide-react'/g)) {
          for (const raw of m[1].split(',')) {
            const name = raw.trim().split(/\s+as\s+/)[0]
            if (!/^[A-Z]/.test(name) || name.startsWith('type ') || name === 'LucideIcon' || name === 'LucideProps') continue
            ;(where[name] ??= []).push(relative(root, file))
          }
        }
      }
      const names = Object.keys(where).sort()
      return `export { ${names.join(', ')} } from 'lucide-react'\nexport const usedIn = ${JSON.stringify(where)}`
    },
  }
}

export default defineConfig({
  base: '/kt-dtalent-styleguide/',
  plugins: [react(), tailwindcss(), usedIcons()],
  resolve: {
    alias: {
      '@fe': resolve('.frontend/src'),
      '@fe-design': resolve('.frontend/design'),
    },
  },
  define: {
    __FRONTEND_SHA__: JSON.stringify(git('git rev-parse --short HEAD')),
    __FRONTEND_DATE__: JSON.stringify(git('git log -1 --format=%cs')),
  },
})
