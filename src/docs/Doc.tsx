import type { ReactNode } from 'react'
import { cn } from '@fe/lib/cn'

// 문서 페이지의 공통 조각. 모든 페이지가 같은 순서와 모양으로 읽히게 한다

export function DocPage({ group, title, lead, children }: { group: string; title: string; lead: ReactNode; children: ReactNode }) {
  return (
    <article className="flex flex-col gap-16">
      <header className="prose flex flex-col gap-3">
        <p className="text-label-sm text-ink-3">{group}</p>
        <h1 className="m-0 text-display-sm">{title}</h1>
        <p className="text-body-long text-ink-2">{lead}</p>
      </header>
      {children}
    </article>
  )
}

export function Section({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-5">
      <h2 className="m-0 text-title-1">{title}</h2>
      {children}
    </section>
  )
}

export function Sub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="m-0 text-title-2">{title}</h3>
      {children}
    </div>
  )
}

// 읽는 글. 문단 사이 12px
export function Text({ children }: { children: ReactNode }) {
  return <div className="prose flex flex-col gap-3 text-body-long text-ink-2">{children}</div>
}

// 실제 컴포넌트를 그리는 자리. 서비스 화면처럼 회색 바탕 위에 놓는다
export function Preview({ children, caption, className, surface }: { children: ReactNode; caption?: ReactNode; className?: string; surface?: boolean }) {
  return (
    <figure className="m-0 flex flex-col gap-2">
      <div className={cn('rounded-lg p-8 max-md:p-5', surface ? 'border border-line-subtle bg-surface' : 'bg-canvas', className)}>{children}</div>
      {caption && <figcaption className="text-caption text-ink-3">{caption}</figcaption>}
    </figure>
  )
}

// 미리보기 안에서 이름표를 붙여 나란히 보여 줄 때
export function Specimen({ label, children, className }: { label: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col items-start gap-3', className)}>
      {children}
      <span className="text-caption text-ink-3">{label}</span>
    </div>
  )
}

// 규칙 표. 첫 행은 열 이름
export function RuleTable({ head, rows, className }: { head: ReactNode[]; rows: ReactNode[][]; className?: string }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse text-left text-body">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col" className="border-b border-line px-3 py-2.5 align-bottom text-label-sm font-semibold whitespace-nowrap text-ink-3 first:pl-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="border-b border-line-subtle px-3 py-3 align-top text-ink-2 first:pl-0 first:text-ink">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// 쓴다 / 쓰지 않는다
export function UseWhen({ yes, no }: { yes: ReactNode[]; no: ReactNode[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <List title="쓴다" items={yes} />
      <List title="쓰지 않는다" items={no} muted />
    </div>
  )
}

function List({ title, items, muted }: { title: string; items: ReactNode[]; muted?: boolean }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-canvas p-6">
      <p className={cn('text-label', muted ? 'text-ink-3' : 'text-ink')}>{title}</p>
      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-body text-ink-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className={cn('mt-2 size-1.5 shrink-0 rounded-full', muted ? 'bg-ink-disabled' : 'bg-ink')} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 짧은 규칙 목록
export function Rules({ items }: { items: ReactNode[] }) {
  return (
    <ul className="prose m-0 flex list-none flex-col gap-2.5 p-0 text-body-long text-ink-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-ink-3" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="doc-code">{children}</code>
}
