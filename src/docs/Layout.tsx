import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { KtSquare } from '@fe/components/ui/KtSquare'
import { cn } from '@fe/lib/cn'
import { flatNav, nav } from '../nav'
import { useReveal } from './motion'
import { Toc } from './Toc'

export function Layout() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const home = pathname === '/'

  // 화면을 옮기면 맨 위로, 휴대폰 메뉴는 닫는다
  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
  }, [pathname])

  useReveal(pathname)

  const index = flatNav.findIndex((n) => n.path === pathname)
  const prev = index > 0 ? flatNav[index - 1] : null
  const next = index >= 0 && index < flatNav.length - 1 ? flatNav[index + 1] : null

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      {/* 휴대폰과 좁은 화면: 위 줄에 이름과 메뉴 버튼 */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line-subtle bg-surface/90 px-5 backdrop-blur-md lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="doc-nav"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          className="press -mr-2 inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-surface-hover"
        >
          {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </header>

      <aside
        id="doc-nav"
        className={cn(
          'bg-canvas lg:sticky lg:top-0 lg:block lg:h-dvh lg:overflow-y-auto',
          open ? 'fixed inset-x-0 top-14 bottom-0 z-20 animate-fade-in overflow-y-auto' : 'hidden',
        )}
      >
        <div className="hidden px-6 pt-8 pb-6 lg:block">
          <Brand />
        </div>
        <SideNav pathname={pathname} />
      </aside>

      <div className="flex min-w-0 flex-col">
        <div className={cn('mx-auto flex w-full gap-12', home ? 'max-w-[72rem]' : 'max-w-[76rem]')}>
          <main className={cn('min-w-0 flex-1 px-5 pb-20 md:px-10 lg:px-16', home ? 'pt-6 lg:pt-10' : 'pt-10 lg:pt-16')}>
            {/* 화면을 옮길 때마다 본문이 떠오른다 */}
            <div key={pathname} className="animate-page-in-expressive">
              <Outlet />
            </div>
            {(prev || next) && (
              <nav aria-label="이전, 다음 문서" className="mt-24 grid grid-cols-2 gap-4 border-t border-line-subtle pt-8">
                {prev ? (
                  <Link to={prev.path} className="group flex flex-col gap-1 rounded-lg p-4 text-ink no-underline transition-colors hover:bg-surface-hover">
                    <span className="flex items-center gap-1 text-caption text-ink-3">
                      <ChevronLeft size={16} strokeWidth={2} aria-hidden className="transition-transform group-hover:-translate-x-0.5" />
                      이전
                    </span>
                    <span className="text-label">{prev.label}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link to={next.path} className="group flex flex-col items-end gap-1 rounded-lg p-4 text-ink no-underline transition-colors hover:bg-surface-hover">
                    <span className="flex items-center gap-1 text-caption text-ink-3">
                      다음
                      <ChevronRight size={16} strokeWidth={2} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-label">{next.label}</span>
                  </Link>
                )}
              </nav>
            )}
          </main>
          {!home && (
            <div className="hidden w-48 shrink-0 pt-16 pr-8 xl:block">
              <Toc key={pathname} />
            </div>
          )}
        </div>
        <footer className="mt-auto border-t border-line-subtle py-6 text-caption text-ink-3">
          <div className="mx-auto flex w-full max-w-[76rem] flex-wrap justify-between gap-x-6 gap-y-1 px-5 md:px-10 lg:px-16">
            <span>
              색, 글자, 컴포넌트는 서비스 코드에서 바로 불러와 그려요. 기준: 프론트 main{' '}
              <a href={`https://github.com/kt-dtalent-platform/frontend/commit/${__FRONTEND_SHA__}`} className="text-ink-2">
                {__FRONTEND_SHA__}
              </a>{' '}
              ({__FRONTEND_DATE__})
            </span>
            <a href="https://github.com/kt-dtalent-platform/frontend" className="text-ink-2">
              프론트 레포
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

// 왼쪽 메뉴. 묶음 이름은 진한 굵은 글자, 항목은 왼쪽 세로선 안쪽으로 한 단계 들여서 묶음과 항목을 나눈다.
// 고른 표시(흰 바탕) 하나가 위아래로 미끄러져 옮겨 가고, KT 스퀘어는 세로선 위에 놓인다(서비스 담당자 메뉴와 같은 움직임)
function SideNav({ pathname }: { pathname: string }) {
  const ref = useRef<HTMLElement>(null)
  const [mark, setMark] = useState<{ x: number; y: number; w: number; h: number; ready: boolean } | null>(null)

  useLayoutEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>('a[aria-current="page"]')
    if (!el) return setMark(null)
    setMark((m) => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight, ready: m !== null }))
  }, [pathname])

  return (
    <nav ref={ref} aria-label="문서" className="relative flex flex-col gap-7 px-4 pt-6 pb-10 lg:pt-2">
      {mark && (
        <span
          aria-hidden
          className={cn('absolute top-0 left-0 rounded-md bg-surface', mark.ready && 'transition-transform duration-(--motion-slow) ease-(--ease-standard)')}
          style={{ width: mark.w, height: mark.h, transform: `translate(${mark.x}px, ${mark.y}px)` }}
        >
          {/* 세로선(항목 왼쪽 8px 바깥) 한가운데에 놓는다 */}
          <KtSquare className="absolute top-1/2 -left-[13px] -translate-y-1/2" />
        </span>
      )}
      {nav.map((g) => (
        <div key={g.label} className="flex flex-col gap-2">
          <p className="px-3 text-label-sm font-bold text-ink">{g.label}</p>
          <div className="ml-3 flex flex-col gap-0.5 border-l border-line">
            {g.items.map((it) => (
              <NavLink
                key={it.path}
                to={it.path}
                end
                className={({ isActive }) =>
                  cn(
                    'relative z-10 ml-2 flex min-h-9 items-center rounded-md px-3 text-body no-underline transition-colors',
                    isActive ? 'font-semibold text-ink' : 'text-ink-3 hover:bg-control-tonal hover:text-ink',
                  )
                }
              >
                {it.label}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

function Brand() {
  return (
    <Link to="/" className="flex flex-col gap-0.5 text-ink no-underline">
      <span className="inline-flex items-center gap-2 text-label font-extrabold tracking-tight">
        KT디지털인재장학생
        <KtSquare />
      </span>
      <span className="text-caption text-ink-3">스타일가이드</span>
    </Link>
  )
}
