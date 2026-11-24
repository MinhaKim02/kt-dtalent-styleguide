// 프론트 레포(kt-dtalent-platform/frontend)의 main을 .frontend에 받아 둔다.
// 스타일가이드는 이 폴더의 tokens.json과 공통 컴포넌트를 그대로 불러와 그린다.
// FRONTEND_DIR을 주면 받지 않고 그 폴더를 쓴다(내 컴퓨터의 프론트 폴더로 바로 확인할 때).
import { execSync } from 'node:child_process'
import { existsSync, rmSync, symlinkSync } from 'node:fs'
import { resolve } from 'node:path'

const target = resolve('.frontend')
const repo = 'https://github.com/kt-dtalent-platform/frontend.git'
const local = process.env.FRONTEND_DIR

if (local) {
  rmSync(target, { recursive: true, force: true })
  symlinkSync(resolve(local), target, 'dir')
  console.log(`프론트: ${local} 사용`)
} else if (existsSync(resolve(target, '.git'))) {
  execSync('git fetch --depth 1 origin main && git reset --hard origin/main', { cwd: target, stdio: 'inherit' })
} else {
  rmSync(target, { recursive: true, force: true })
  execSync(`git clone --depth 1 ${repo} .frontend`, { stdio: 'inherit' })
}

const sha = execSync('git rev-parse --short HEAD', { cwd: target }).toString().trim()
const date = execSync('git log -1 --format=%cs', { cwd: target }).toString().trim()
console.log(`프론트 main ${sha} (${date})`)
