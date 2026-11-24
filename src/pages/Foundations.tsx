import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import * as used from 'virtual:used-icons'
import { Button } from '@fe/components/ui/Button'
import { cn } from '@fe/lib/cn'
import { Code, DocPage, Preview, RuleTable, Rules, Section, Specimen, Sub, Text, UseWhen } from '../docs/Doc'
import { aliasOf, contrastOnWhite, resolveColor, tokens, usage, type Token } from '../docs/tokens'

const G = '기본 요소'

/* ───────── 색 ───────── */

const colorGroups: { title: string; note?: string; match: (n: string) => boolean }[] = [
  { title: '회색 단계', note: '모든 글자, 면, 선은 색감 없는 회색 단계에서 고릅니다. 화면 코드에서는 아래 역할 이름을 씁니다.', match: (n) => n.startsWith('gray-') },
  { title: '글자', match: (n) => n.startsWith('ink') },
  { title: '면', match: (n) => ['canvas', 'surface', 'surface-hover', 'surface-sunken'].includes(n) },
  { title: '조작', match: (n) => n.startsWith('control-') || n.startsWith('action') || n === 'on-action' || n === 'focus' },
  { title: '선', match: (n) => n.startsWith('line') },
  { title: '브랜드', match: (n) => n.startsWith('kt-red') },
  { title: '덮개', match: (n) => n === 'scrim' },
]

const textLike = (n: string) => n.startsWith('gray-') || n.startsWith('ink') || n.endsWith('-text') || n.startsWith('line') || n === 'kt-red' || n === 'action'

function Swatch({ t }: { t: Token }) {
  const value = resolveColor(t.value)
  const alias = aliasOf(t.value)
  const ratio = textLike(t.name) ? contrastOnWhite(value) : null
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-surface ring-1 ring-line-subtle">
      <div className="h-16" style={{ background: value }} />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <Code>{t.name}</Code>
        <p className="text-caption whitespace-pre-wrap text-ink-3 tabular-nums">
          {alias ? `${alias}  ` : ''}
          {value}
          {ratio && `   흰 바탕 ${ratio.toFixed(1)}:1`}
        </p>
        <p className="mt-1 text-caption text-ink-2">{usage(t)}</p>
      </div>
    </div>
  )
}

const statusFamilies = [
  { key: 'neutral', label: '중립', example: '미제출, 작성 중, 마감 후' },
  { key: 'info', label: '정보', example: '검토 대기, 재학' },
  { key: 'warning', label: '주의', example: '보완 필요, 중단, 마감 임박' },
  { key: 'success', label: '완료', example: '확인 완료' },
  { key: 'danger', label: '위험', example: '서류와 다름, 오류' },
]

export function ColorPage() {
  const all = tokens.color.tokens
  const get = (n: string) => all.find((c) => c.name === n)
  return (
    <DocPage group={G} title="색" lead="흑백이 일을 하고, KT 레드는 서명만 합니다. 글자, 버튼, 선은 회색 단계로만 만들고, 레드는 KT 스퀘어와 로고, 첫 화면 그래픽에만 씁니다.">
      <Section title="원칙">
        <Rules
          items={[
            '회색은 따뜻하거나 푸른 기운이 없는 순수 무채색입니다. KT 레드와 검정이 가장 깨끗하게 보입니다.',
            '화면 코드에서는 gray-900 같은 단계 이름 대신 ink, surface처럼 역할 이름을 씁니다.',
            '읽어야 하는 글자는 흰 바탕에서 4.5:1 이상, 입력칸 테두리와 상태 점은 3:1 이상입니다.',
            '상태 색은 손댈 일이 있는 상태에만 바탕을 깔고, 끝났거나 평범한 상태는 회색 바탕에 색 점만 둡니다.',
          ]}
        />
      </Section>

      {colorGroups.map((g) => (
        <Section key={g.title} title={g.title}>
          {g.note && <Text>{g.note}</Text>}
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
            {all.filter((c) => g.match(c.name)).map((c) => (
              <Swatch key={c.name} t={c} />
            ))}
          </div>
        </Section>
      ))}

      <Section title="상태 색">
        <Text>
          상태 색은 글자, 바탕, 점이 한 벌입니다. 다섯 벌 모두 밝기와 채도를 같게 맞춰 한 가족처럼 보이게 했습니다. 글자는 바탕 위에서 6:1 안팎입니다.
        </Text>
        <div className="grid gap-4 md:grid-cols-2">
          {statusFamilies.map((f) => {
            const text = get(`${f.key}-text`)
            const bg = get(`${f.key}-bg`)
            const dot = get(`${f.key}-dot`)
            return (
              <div key={f.key} className="flex flex-col gap-4 rounded-lg bg-surface p-5 ring-1 ring-line-subtle">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-label">{f.label}</span>
                  <span
                    className="inline-flex h-badge-h items-center gap-1.5 rounded-sm px-2 text-label-sm"
                    style={{ background: bg && resolveColor(bg.value), color: text && resolveColor(text.value) }}
                  >
                    {dot && <span className="size-1.5 rounded-full" style={{ background: resolveColor(dot.value) }} />}
                    {f.example.split(',')[0]}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-caption text-ink-3 tabular-nums">
                  {[text, bg, dot, get(`${f.key}-line`)].filter(Boolean).map((t) => (
                    <span key={t!.name}>
                      <Code>{t!.name}</Code> {resolveColor(t!.value)}
                    </span>
                  ))}
                </div>
                <p className="text-caption text-ink-2">쓰는 곳: {f.example}</p>
              </div>
            )
          })}
        </div>
      </Section>

      <Section title="KT 레드">
        <UseWhen
          yes={['KT 스퀘어: 로고 옆, 펼친 메뉴의 현재 항목 앞', '로고', '첫 화면(로그인) 그래픽', <>필수 표시 별표(*): 작은 글자용 <Code>kt-red-text</Code></>]}
          no={['버튼, 배지, 카드 바탕', '페이지 제목 앞', '본문 글자', <>오류와 경고: <Code>danger-*</Code>를 씁니다</>]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 글자 ───────── */

export function TypographyPage() {
  return (
    <DocPage group={G} title="글자" lead="Pretendard 한 가지만 씁니다. 글자는 작게, 여백은 넓게 두고 위계는 크기보다 굵기와 색으로 만듭니다.">
      <Section title="글자 스타일">
        <Text>
          화면 코드에서는 <Code>text-이름</Code> 하나로 크기, 줄 간격, 굵기, 자간을 함께 씁니다.
        </Text>
        <div className="flex flex-col">
          {tokens.type.groups.map((g) => (
            <div key={g.name} className="flex flex-col">
              {g.styles.map((s) => (
                <div key={s.name} className="grid gap-x-8 gap-y-2 border-b border-line-subtle py-6 md:grid-cols-[minmax(0,1fr)_16rem]">
                  <p className={cn('m-0 truncate text-ink', `text-${s.name}`)}>{s.sample ?? '장학 활동에 필요한 일을 한곳에서'}</p>
                  <div className="flex flex-col gap-1">
                    <Code>{`text-${s.name}`}</Code>
                    <span className="text-caption text-ink-3 tabular-nums">
                      크기 {s.fontSize}, 줄 간격 {s.lineHeight}, 굵기 {s.fontWeight}
                      {s.letterSpacing ? `, 자간 ${s.letterSpacing}` : ''}
                    </span>
                    <span className="text-caption text-ink-2">{usage(s)}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section title="규칙">
        <Rules
          items={[
            '본문은 14px. 세 줄 넘게 이어지는 안내문은 줄 간격이 넓은 body-long을 씁니다.',
            '휴대폰의 입력칸 글자는 16px(input-touch)입니다. 16px보다 작으면 iOS Safari가 칸을 누를 때 화면을 확대합니다. 마우스를 쓰는 기기에서만 14px로 돌아갑니다.',
            '제목은 자간을 좁혀 단단하게, 본문은 그대로 둡니다.',
            '숫자가 세로로 줄을 맞춰야 하는 표와 현황에는 tabular-nums(고정폭 숫자)를 씁니다.',
            '읽어야 하는 글자에 ink-3보다 연한 색을 쓰지 않습니다. 비활성 글자만 예외입니다.',
            '한글은 낱말 중간에서 줄을 바꾸지 않습니다(word-break: keep-all).',
          ]}
        />
      </Section>

      <Section title="글자 색">
        <Preview surface>
          <div className="flex flex-col gap-3">
            <p className="text-body-strong text-ink">ink: 본문과 제목</p>
            <p className="text-body text-ink-2">ink-2: 보조 글자, 표 머리글</p>
            <p className="text-body text-ink-3">ink-3: 날짜, 도움말</p>
            <p className="text-body text-ink-disabled">ink-disabled: 비활성 글자</p>
          </div>
        </Preview>
      </Section>
    </DocPage>
  )
}

/* ───────── 간격과 레이아웃 ───────── */

const size = (n: string) => tokens.size.tokens.find((t) => t.name === n)!

export function LayoutPage() {
  return (
    <DocPage group={G} title="간격과 레이아웃" lead="간격은 4의 배수만 씁니다. 숫자를 외우지 않아도 되게 '무엇과 무엇 사이'로 고릅니다. 관계가 멀수록 간격도 커집니다.">
      <Section title="간격 토큰">
        <div className="flex flex-col">
          {tokens.spacing.tokens.map((t) => (
            <div key={t.name} className="grid grid-cols-[7rem_4rem_minmax(0,1fr)] items-center gap-4 border-b border-line-subtle py-3 max-md:grid-cols-[6rem_minmax(0,1fr)]">
              <Code>{t.name}</Code>
              <span className="text-caption text-ink-3 tabular-nums max-md:hidden">{t.value}</span>
              <div className="flex min-w-0 items-center gap-4">
                <span className="h-4 shrink-0 rounded-xs bg-ink" style={{ width: t.value }} />
                <span className="truncate text-caption text-ink-2">{usage(t)}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="무엇과 무엇 사이">
        <RuleTable
          head={['관계', '간격', '예']}
          rows={[
            ['한 덩어리 안', '4px', '아이콘과 글자, 점과 배지 글자'],
            ['짝을 이루는 요소', '8px', '라벨과 입력칸, 입력칸과 도움말, 버튼과 버튼'],
            ['입력 항목끼리', '24px', '폼 안의 칸 사이'],
            ['카드 제목과 내용', '16px', '카드 제목과 첫 칸'],
            ['카드끼리', '16px', '현황 숫자 카드. 구역이 다른 카드는 24px'],
            ['카드 안쪽', '32px', '휴대폰은 24px'],
            ['페이지 제목과 첫 구역', '32px', '제목과 필터 줄'],
            ['필터 줄과 목록', '16px', '목록 화면 세 곳 모두 같게'],
            ['구역끼리', '48px', '입력 구역과 파일 구역'],
          ]}
        />
      </Section>

      <Section title="정렬">
        <RuleTable
          head={['대상', '정렬']}
          rows={[
            ['제목, 본문, 라벨, 도움말', '왼쪽'],
            ['페이지 제목 줄', '제목 왼쪽, 페이지 행동 버튼 오른쪽, 세로 가운데'],
            ['표의 글자 열과 상태 배지', '왼쪽'],
            ['표의 숫자 열과 날짜 열', '오른쪽, 고정폭 숫자. 열 이름도 같은 쪽'],
            ['대화상자와 카드 아래 버튼', '오른쪽. 보조 왼쪽, 주요 오른쪽'],
            ['휴대폰 제출 폼 끝 버튼', '두 버튼이 반씩 나눠 전체 폭. 화면에 고정하지 않음'],
            ['빈 화면 문구, 첫 화면', '가운데. 가운데 정렬은 이 두 곳뿐'],
          ]}
        />
      </Section>

      <Section title="높이">
        <Text>같은 줄에 놓이는 요소는 높이를 맞춥니다.</Text>
        <Preview>
          <div className="flex flex-wrap items-end gap-6">
            {['control-compact', 'control-default', 'control-h', 'control-cta'].map((n) => (
              <Specimen key={n} label={<><Code>{n}</Code> {size(n).value}</>}>
                <div className="flex w-32 items-center justify-center rounded-md bg-surface text-caption text-ink-3 ring-1 ring-line" style={{ height: size(n).value }}>
                  {size(n).value}
                </div>
              </Specimen>
            ))}
          </div>
        </Preview>
        <RuleTable
          head={['토큰', '값', '쓰는 곳']}
          rows={['control-compact', 'control-default', 'control-h', 'control-cta', 'badge-h', 'tag-h', 'row-h', 'header-h'].map((n) => [<Code key={n}>{n}</Code>, size(n).value, usage(size(n))])}
        />
      </Section>

      <Section title="폭">
        <RuleTable
          head={['토큰', '값', '쓰는 곳']}
          rows={['page-wide', 'page-form', 'page-narrow', 'page-brand', 'dialog-w', 'login-card-w', 'toast-max-w', 'sidebar-w', 'sidebar-rail'].map((n) => [<Code key={n}>{n}</Code>, size(n).value, usage(size(n))])}
        />
        <Rules items={['목록 화면은 page-wide까지 채우고, 폼과 상세는 page-form 폭을 본문 가운데에 둡니다.', '화면이 넓어도 읽는 글 한 줄이 720px를 넘지 않게 합니다.']} />
      </Section>

      <Section title="화면 크기">
        <RuleTable
          head={['구간', '폭', '바뀌는 것']}
          rows={[
            ['휴대폰', '767px 이하', '한 칸으로 쌓음. 좌우 여백 20px. 표는 두 줄 행으로'],
            ['태블릿', '768px 이상', '표 머리 행이 보임. 입력칸 글자는 마우스 기기에서만 14px'],
            ['PC', '1024px 이상', '담당자 왼쪽 메뉴가 펼쳐짐(그보다 좁으면 위 줄의 메뉴 버튼)'],
            ['넓은 PC', '1280px 이상', '표에 기수와 학교 열이 따로 생김(좁으면 이름 아래)'],
          ]}
        />
      </Section>

      <Section title="누르는 영역">
        <Rules items={['휴대폰에서 누를 수 있는 것은 44×44px 이상입니다. 아이콘만 있는 버튼도 아이콘은 20px, 누르는 영역은 44px입니다.', 'PC 표 안의 작은 버튼은 32px까지 씁니다.']} />
      </Section>
    </DocPage>
  )
}

/* ───────── 모서리와 면 ───────── */

export function SurfacePage() {
  return (
    <DocPage group={G} title="모서리와 면" lead="업무 화면은 평평합니다. 카드는 테두리와 그림자 없이 흰 면과 회색 바탕의 차이로만 나누고, 잠깐 떠 있는 것만 그림자를 씁니다.">
      <Section title="모서리">
        <Preview>
          <div className="flex flex-wrap gap-6">
            {tokens.radius.tokens.map((t) => (
              <Specimen key={t.name} label={<><Code>{t.name}</Code> {t.value}</>}>
                <div className="size-20 bg-surface ring-1 ring-line" style={{ borderRadius: t.value }} />
              </Specimen>
            ))}
          </div>
        </Preview>
        <RuleTable head={['토큰', '값', '쓰는 곳']} rows={tokens.radius.tokens.map((t) => [<Code key={t.name}>{t.name}</Code>, t.value, usage(t)])} />
        <Text>카드 안에 둥근 요소를 넣을 때는 바깥 모서리가 안쪽 모서리보다 커야 합니다. 12px 카드 안의 버튼과 입력칸은 8px입니다.</Text>
      </Section>

      <Section title="그림자">
        <Preview>
          <div className="flex flex-wrap gap-8">
            {tokens.shadow.tokens.map((t) => (
              <Specimen key={t.name} label={<Code>{t.name}</Code>}>
                <div className="h-24 w-40 rounded-lg bg-surface" style={{ boxShadow: t.value }} />
              </Specimen>
            ))}
          </div>
        </Preview>
        <RuleTable head={['토큰', '쓰는 곳']} rows={tokens.shadow.tokens.map((t) => [<Code key={t.name}>{t.name}</Code>, usage(t)])} />
      </Section>

      <Section title="면의 단계">
        <RuleTable
          head={['단계', '무엇', '표현', '쌓임 순서']}
          rows={[
            ['바닥', '페이지', 'canvas 바탕', '0'],
            ['카드', '카드, 표', 'surface. 테두리와 그림자 없음', '0'],
            ['고정', '상단 바', '스크롤할 때만 아래 선 1px', <Code key="z1">z-sticky</Code>],
            ['펼침', '메뉴, 선택 목록', 'shadow-pop', <Code key="z2">z-popover</Code>],
            ['대화상자', '확인 창, 입력 창', 'shadow-dialog + 뒤 배경 scrim', <Code key="z3">z-dialog</Code>],
            ['알림', '토스트', 'shadow-pop', <Code key="z4">z-toast</Code>],
          ]}
        />
        <Rules items={['카드 안에 바탕색 상자를 또 넣지 않습니다. 카드 안에서 묶음을 나눌 때는 연한 구분선과 여백만 씁니다.', '왼쪽 굵은 테두리 카드와 이모지는 쓰지 않습니다.', '로그인 카드만 예외로 radius-xl과 shadow-brand를 씁니다.']} />
      </Section>
    </DocPage>
  )
}

/* ───────── 상호작용 상태 ───────── */

export function InteractionPage() {
  return (
    <DocPage group={G} title="상호작용 상태" lead="마우스, 키보드, 선택, 비활성 상태를 모든 요소에서 같은 방식으로 보여 줍니다.">
      <Section title="상태별 모양">
        <RuleTable
          head={['상태', '모양']}
          rows={[
            ['hover', '바탕이 한 단계 진해집니다. 흰 바탕은 surface-hover, 보조 버튼은 control-tonal-hover, 주요 버튼은 action-hover'],
            ['누름', '한 단계 더 진해지고, 버튼은 누르는 동안 97%로 작아집니다'],
            ['포커스', '키보드로 옮겼을 때만 검정 2px 테두리. 버튼은 바깥에 2px 띄우고, 입력칸은 테두리 자리에 겹칩니다'],
            ['선택', '메뉴는 앞에 KT 스퀘어와 굵은 글자, 필터 칩은 검정 바탕에 흰 글자'],
            ['비활성', '회색 바탕(gray-150)과 회색 글자(ink-disabled). 흐리게(opacity) 만들지 않습니다'],
            ['오류', '입력칸 테두리 danger-line과 칸 아래 오류 문구'],
            ['처리 중', '버튼을 비활성으로 바꾸고 글자를 "제출하는 중"처럼 바꿉니다'],
          ]}
        />
      </Section>
      <Section title="미리보기">
        <Preview caption="마우스를 올리거나 Tab 키로 옮겨 보세요.">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">제출하기</Button>
            <Button>임시 저장</Button>
            <Button variant="ghost">내보내기</Button>
            <Button variant="primary" disabled>
              제출하는 중
            </Button>
          </div>
        </Preview>
      </Section>
    </DocPage>
  )
}

/* ───────── 아이콘 ───────── */

const icons = Object.entries(used).filter(([k]) => k !== 'usedIn') as unknown as [string, LucideIcon][]

export function IconsPage() {
  const [q, setQ] = useState('')
  const list = icons.filter(([n]) => n.toLowerCase().includes(q.trim().toLowerCase()))
  return (
    <DocPage group={G} title="아이콘" lead="Lucide 한 벌의 선 아이콘만 씁니다. 아이콘은 글자를 돕는 표시라 혼자서 뜻을 전하지 않고 항상 글자와 함께 씁니다.">
      <Section title="크기와 굵기">
        <RuleTable
          head={['크기', '선 굵기', '쓰는 곳']}
          rows={[
            ['16px', '2', '배지, 태그, 표 안 작은 버튼, 13~14px 글자 옆'],
            ['20px', '1.75', '기본. 버튼, 메뉴, 입력칸, 배너'],
            ['24px', '1.75', '빈 화면, 대화상자 제목 옆'],
          ]}
        />
        <Rules
          items={[
            '색은 옆 글자 색을 그대로 따릅니다. 아이콘에 따로 색을 칠하지 않습니다.',
            '글자 왼쪽에 세로 가운데로 맞춥니다. "다음"처럼 이동하는 버튼만 오른쪽에 화살표를 둡니다.',
            '아이콘만 있는 버튼은 화면 낭독기가 읽을 이름(aria-label)을 꼭 붙입니다.',
            '상태 배지에는 아이콘을 넣지 않습니다. 점과 글자로 충분합니다.',
            '같은 뜻에는 같은 아이콘을 씁니다.',
          ]}
        />
      </Section>
      <Section title={`서비스에서 쓰는 아이콘 ${icons.length}개`}>
        <Text>서비스 코드에서 불러온 아이콘을 빌드할 때 자동으로 모았습니다. 이름을 누르면 어느 파일에서 쓰는지 보입니다.</Text>
        <label className="flex max-w-80 flex-col gap-2">
          <span className="text-label">이름으로 찾기</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="예: Check"
            className="h-control-default rounded-md border border-line-input bg-surface px-4 text-input-touch outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-focus md:pointer-fine:text-body"
          />
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {list.map(([name, Icon]) => (
            <details key={name} className="group rounded-lg bg-canvas p-4">
              <summary className="flex cursor-pointer list-none flex-col items-start gap-3">
                <Icon size={24} strokeWidth={1.75} aria-hidden />
                <span className="text-caption break-all text-ink-2">{name}</span>
              </summary>
              <ul className="m-0 mt-3 flex list-none flex-col gap-1 p-0 text-caption break-all text-ink-3">
                {used.usedIn[name].map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Section>
    </DocPage>
  )
}

/* ───────── 모션 ───────── */

const demos = [
  { name: '담당자 화면 전환', cls: 'animate-page-in', note: '4px 아래에서 떠오름' },
  { name: '장학생 화면 전환', cls: 'animate-page-in-expressive', note: '12px 아래에서 떠오름' },
  { name: '대화상자', cls: 'animate-dialog-in', note: '96%에서 커지며 나타남' },
  { name: '토스트', cls: 'animate-toast-in', note: '8px 아래에서 올라옴' },
  { name: '메뉴, 선택 목록', cls: 'animate-pop-down', note: '버튼 쪽에서 4px 미끄러져 나옴' },
  { name: '목록 새 결과', cls: 'animate-list-in', note: '흐린 상태에서 또렷해지며 살짝 올라옴' },
  { name: '제출 완료', cls: 'animate-success-in', note: '8px 아래, 98%에서 커지며 나타남' },
  { name: '불러오는 중 표시', cls: 'animate-loader-in', note: '0.3초 기다렸다 나타남' },
]

function MotionDemo({ name, cls, note }: { name: string; cls: string; note: string }) {
  const [n, setN] = useState(0)
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-canvas p-5">
      <div className="flex h-24 items-center justify-center">
        <div key={n} className={cn('h-14 w-32 rounded-lg bg-surface shadow-[0_0_0_1px_var(--color-line)]', n > 0 && cls)} />
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-label">{name}</span>
          <span className="text-caption text-ink-3">{note}</span>
        </div>
        <Button size="compact" onClick={() => setN((v) => v + 1)}>
          다시 보기
        </Button>
      </div>
    </div>
  )
}

export function MotionPage() {
  return (
    <DocPage group={G} title="모션" lead="움직임은 무엇이 바뀌었는지 알려 줄 때만 씁니다. 담당자 화면은 짧고 조용하게, 장학생 화면은 화면 이동과 완료 순간만 조금 더 또렷하게 움직입니다.">
      <Section title="토큰">
        <RuleTable head={['토큰', '값', '쓰는 곳']} rows={tokens.motion.tokens.map((t) => [<Code key={t.name}>{t.name}</Code>, <span key="v" className="tabular-nums">{t.value}</span>, usage(t)])} />
      </Section>
      <Section title="움직임">
        <Text>실제 서비스와 같은 애니메이션입니다. 운영체제의 동작 줄이기가 켜져 있으면 움직이지 않습니다.</Text>
        <div className="grid gap-4 md:grid-cols-2">
          {demos.map((d) => (
            <MotionDemo key={d.cls} {...d} />
          ))}
        </div>
      </Section>
      <Section title="규칙">
        <Rules
          items={[
            'transform과 opacity만 움직입니다. 폭, 높이, 위치는 움직이지 않습니다.',
            '들어올 때만 움직이고, 사라질 때는 짧게(100ms) 사라집니다.',
            '자주 하는 조작(행 hover, 칩 누름, 정렬, 페이지 넘김)에는 색 변화 말고 움직임을 넣지 않습니다.',
            '불러오는 중 표시는 0.3초 뒤에 나타납니다. 빠른 응답에서는 아예 보이지 않습니다.',
            '동작 줄이기 설정이면 움직임을 끄되, 불러오는 중 표시의 0.3초 지연은 남깁니다.',
            '첫 화면의 브랜드 그래픽은 예외로, 천천히 계속 흐릅니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}
