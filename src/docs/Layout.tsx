import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { KtSquare } from '@fe/components/ui/KtSquare'
import { cn } from '@fe/lib/cn'
import { flatNav, nav } from '../nav'

export function Layout() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // 화면을 옮기면 맨 위로, 휴대폰 메뉴는 닫는다
  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
  }, [pathname])

  const index = flatNav.findIndex((n) => n.path === pathname)
  const prev = index > 0 ? flatNav[index - 1] : null
  const next = index >= 0 && index < flatNav.length - 1 ? flatNav[index + 1] : null

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      {/* 휴대폰과 좁은 화면: 위 줄에 이름과 메뉴 버튼 */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line-subtle bg-surface px-5 lg:hidden">
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
          open ? 'fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto' : 'hidden',
        )}
      >
        <div className="hidden px-6 pt-8 pb-6 lg:block">
          <Brand />
        </div>
        <nav aria-label="문서" className="flex flex-col gap-6 px-4 pt-6 pb-10 lg:pt-2">
          {nav.map((g) => (
            <div key={g.label} className="flex flex-col gap-1">
              <p className="px-3 pb-1 text-overline text-ink-3">{g.label}</p>
              {g.items.map((it) => (
                <NavLink
                  key={it.path}
                  to={it.path}
                  end
                  className={({ isActive }) =>
                    cn(
                      'relative flex min-h-10 items-center rounded-md px-3 text-body text-ink-2 no-underline transition-colors hover:bg-control-tonal hover:text-ink',
                      isActive && 'bg-surface font-semibold text-ink hover:bg-surface',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <KtSquare className="absolute -left-1" />}
                      {it.label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-col">
        <main className="mx-auto w-full max-w-[60rem] px-5 pt-10 pb-20 md:px-10 lg:px-16 lg:pt-16">
          <Outlet />
          {(prev || next) && (
            <nav aria-label="이전, 다음 문서" className="mt-20 grid grid-cols-2 gap-4 border-t border-line-subtle pt-8">
              {prev ? (
                <Link to={prev.path} className="group flex flex-col gap-1 rounded-lg p-4 text-ink no-underline hover:bg-surface-hover">
                  <span className="flex items-center gap-1 text-caption text-ink-3">
                    <ChevronLeft size={16} strokeWidth={2} aria-hidden />
                    이전
                  </span>
                  <span className="text-label">{prev.label}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link to={next.path} className="flex flex-col items-end gap-1 rounded-lg p-4 text-ink no-underline hover:bg-surface-hover">
                  <span className="flex items-center gap-1 text-caption text-ink-3">
                    다음
                    <ChevronRight size={16} strokeWidth={2} aria-hidden />
                  </span>
                  <span className="text-label">{next.label}</span>
                </Link>
              )}
            </nav>
          )}
        </main>
        <footer className="mt-auto border-t border-line-subtle py-6 text-caption text-ink-3">
          <div className="mx-auto flex w-full max-w-[60rem] flex-wrap justify-between gap-x-6 gap-y-1 px-5 md:px-10 lg:px-16">
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
