import { useEffect, useState } from 'react'
import { cn } from '@fe/lib/cn'

// 오른쪽 "이 페이지에서" 목차. 본문의 구역 제목(h2)을 모아 만들고, 스크롤하면 지금 읽는 구역을 표시한다
export function Toc() {
  const [items, setItems] = useState<{ id: string; label: string }[]>([])
  const [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    const heads = [...document.querySelectorAll<HTMLElement>('main section[id] > h2')]
    setItems(heads.map((h) => ({ id: h.parentElement!.id, label: h.textContent ?? '' })))
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setCurrent((visible[0].target as HTMLElement).parentElement!.id)
      },
      { rootMargin: '-10% 0px -70% 0px' },
    )
    heads.forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [])

  if (items.length < 2) return null
  return (
    <nav aria-label="이 페이지에서" className="sticky top-16 flex flex-col gap-3">
      <p className="text-overline text-ink-3">이 페이지에서</p>
      <ul className="m-0 flex list-none flex-col border-l border-line-subtle p-0">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(it.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
                history.replaceState(null, '', `#${it.id}`)
              }}
              className={cn(
                '-ml-px block border-l py-1.5 pl-4 text-caption no-underline transition-colors',
                current === it.id ? 'border-ink font-semibold text-ink' : 'border-transparent text-ink-3 hover:text-ink',
              )}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
