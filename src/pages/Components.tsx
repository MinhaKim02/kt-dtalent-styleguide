import { useState } from 'react'
import { Ban, ChevronRight, Clock, Download, FileWarning, Inbox, Lock, Plus, Save, Search, Send } from 'lucide-react'
import { ApiError } from '@fe/api/client'
import { Banner } from '@fe/components/ui/Banner'
import { Button } from '@fe/components/ui/Button'
import { ConfirmDialog } from '@fe/components/ui/ConfirmDialog'
import { FilterChips } from '@fe/components/ui/FilterChips'
import { FormDialog } from '@fe/components/ui/FormDialog'
import { KtSquare } from '@fe/components/ui/KtSquare'
import { Logo } from '@fe/components/ui/Logo'
import { MenuButton } from '@fe/components/ui/MenuButton'
import { MetaList } from '@fe/components/ui/MetaList'
import { PageSizeSelect } from '@fe/components/ui/PageSizeSelect'
import { PageTitle } from '@fe/components/ui/PageTitle'
import { Pagination } from '@fe/components/ui/Pagination'
import { RequestStatusBadge } from '@fe/components/ui/RequestStatusBadge'
import { RevisionNote } from '@fe/components/ui/RevisionNote'
import { RowNote } from '@fe/components/ui/RowNote'
import { ScholarStatusBadge } from '@fe/components/ui/ScholarStatusBadge'
import { SortHeader } from '@fe/components/ui/SortHeader'
import { EmptyState, ErrorState, LoadingCards } from '@fe/components/ui/StateView'
import { StatusBadge } from '@fe/components/ui/StatusBadge'
import { Tag } from '@fe/components/ui/Tag'
import { useToast } from '@fe/components/ui/useToast'
import { Checkbox } from '@fe/components/form/Checkbox'
import { FormError } from '@fe/components/form/FormError'
import { LabeledField, SelectBox } from '@fe/components/form/LabeledField'
import { Radio } from '@fe/components/form/Radio'
import { fieldBorder, fieldControl, filterField } from '@fe/components/form/fieldClass'
import type { Sort } from '@fe/lib/sort'
import { cn } from '@fe/lib/cn'
import { Code, DocPage, Preview, RuleTable, Rules, Section, Specimen, Sub, Text, UseWhen } from '../docs/Doc'

const G = '컴포넌트'

/* ───────── 버튼 ───────── */

export function ButtonPage() {
  return (
    <DocPage group={G} title="버튼" lead="행동을 실행합니다. 주요, 보조, 테두리 없음 세 종류와 네 가지 높이가 있습니다.">
      <Preview>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">제출하기</Button>
          <Button>
            <Save size={20} strokeWidth={1.75} aria-hidden />
            임시 저장
          </Button>
          <Button variant="ghost">
            <Download size={20} strokeWidth={1.75} aria-hidden />
            내보내기
          </Button>
        </div>
      </Preview>

      <Section title="종류">
        <Preview>
          <div className="grid gap-8 sm:grid-cols-3">
            <Specimen label="주요: 화면의 결정 하나">
              <Button variant="primary">확인 완료</Button>
            </Specimen>
            <Specimen label="보조: 나머지 행동">
              <Button>보완 요청</Button>
            </Specimen>
            <Specimen label="테두리 없음: 덜 중요한 행동">
              <Button variant="ghost">고르기 해제</Button>
            </Specimen>
          </div>
        </Preview>
        <RuleTable
          head={['종류', '모양', '쓰는 곳']}
          rows={[
            [<Code key="p">primary</Code>, '검정 바탕, 흰 글자', '화면에서 가장 중요한 행동 하나: 제출하기, 확인 완료, 검토 시작'],
            [<Code key="s">secondary</Code>, '반투명 회색 바탕, 테두리 없음', '나머지 행동: 임시 저장, 취소, 정보 수정'],
            [<Code key="g">ghost</Code>, '바탕 없음, 올리면 연한 바탕', '목록의 보조 행동(내보내기), 로그아웃, 아이콘 버튼'],
          ]}
        />
      </Section>

      <Section title="높이">
        <Preview>
          <div className="flex flex-wrap items-end gap-4">
            <Specimen label="cta 48">
              <Button variant="primary" size="cta">
                로그인
              </Button>
            </Specimen>
            <Specimen label="md 44 (기본)">
              <Button variant="primary">제출하기</Button>
            </Specimen>
            <Specimen label="default 40">
              <Button size="default">취소</Button>
            </Specimen>
            <Specimen label="compact 32">
              <Button size="compact">상태 바꾸기</Button>
            </Specimen>
          </div>
        </Preview>
        <RuleTable
          head={['크기', '높이', '쓰는 곳']}
          rows={[
            [<Code key="c">cta</Code>, '48px', '화면에 하나뿐인 대표 버튼(로그인, 비밀번호 바꾸기)'],
            [<Code key="m">md</Code>, '44px', '기본. 폼 끝의 임시 저장과 제출하기'],
            [<Code key="d">default</Code>, '40px', '페이지 제목 줄의 행동, 대화상자 버튼'],
            [<Code key="p">compact</Code>, '32px', '표 안, 구역 머리(정보 수정), 필터 줄, 파일 첨부'],
          ]}
        />
      </Section>

      <Section title="상태">
        <Preview>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" disabled>
              제출하는 중
            </Button>
            <Button disabled>임시 저장</Button>
          </div>
        </Preview>
        <Rules
          items={[
            '처리 중에는 비활성으로 바꾸고 글자를 "제출하는 중"처럼 바꿔 두 번 눌리지 않게 합니다.',
            '비활성은 회색 바탕과 회색 글자입니다. 흐리게(opacity) 만들지 않습니다.',
            '누르는 동안 버튼이 97%로 살짝 작아집니다.',
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <UseWhen
          yes={['주요 버튼은 화면에 하나', '글자는 동사로 끝냄: 확인 완료, 보완 요청 보내기', '아이콘은 글자 왼쪽, "다음"처럼 이동하는 버튼만 오른쪽 화살표', '대화상자와 폼 끝은 보조 왼쪽, 주요 오른쪽']}
          no={['KT 레드 버튼', '버튼에 테두리. 테두리는 입력칸에만 써서 누르는 곳과 입력하는 곳을 나눕니다', '"확인", "예"처럼 무엇을 하는지 모르는 글자', '점선 테두리(파일 첨부 자리에만 씁니다)']}
        />
      </Section>

      <Section title="코드">
        <Text>
          <p>
            <Code>{'<Button variant="primary" size="md">'}</Code> 링크를 버튼 모양으로 보여 줄 때는 <Code>buttonClass()</Code>를 씁니다.
          </p>
        </Text>
      </Section>
    </DocPage>
  )
}

/* ───────── 메뉴 버튼 ───────── */

export function MenuButtonPage() {
  return (
    <DocPage group={G} title="메뉴 버튼" lead="같은 일을 하는 방법이 여러 개일 때 버튼 하나로 묶습니다. 누르면 고를 수 있는 메뉴가 펼쳐집니다.">
      <Preview caption="눌러서 열고, 키보드 위아래 화살표로 옮길 수 있습니다.">
        <div className="flex min-h-40 items-start">
          <MenuButton
            label="장학생 등록"
            icon={<Plus size={16} strokeWidth={2} aria-hidden />}
            size="compact"
            placement="bottom"
            items={[
              { to: '/components/menu-button', label: '한 명 등록', description: '이름, 이메일, 학교를 입력해 등록해요' },
              { to: '/components/menu-button', label: '엑셀로 여러 명 등록', description: '양식에 채운 명단을 한 번에 올려요' },
            ]}
          />
        </div>
      </Preview>
      <Section title="쓰는 법">
        <Rules
          items={[
            '자주 쓰지 않는 만들기 동작에 씁니다(장학생 등록: 한 명 / 엑셀로 여러 명).',
            '항목은 이름과 설명 한 줄입니다.',
            '화면 아래에 있는 버튼은 위로 펼칩니다.',
            '키보드: 버튼에서 아래 화살표는 첫 항목, 위 화살표는 마지막 항목. 메뉴 안에서 위아래, Home, End. Esc로 닫으면 버튼으로 돌아갑니다.',
            '화면의 결정 하나(제출하기 등)는 메뉴 버튼이 아니라 주요 버튼으로 둡니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 상태 배지와 태그 ───────── */

export function BadgePage() {
  return (
    <DocPage group={G} title="상태 배지와 태그" lead="상태 배지는 점과 글자로 상태를 알립니다. 태그는 상태와 따로 붙는 짧은 표시입니다.">
      <Section title="제출 상태">
        <Preview>
          <div className="flex flex-wrap gap-3">
            {(['NOT_SUBMITTED', 'DRAFT', 'SUBMITTED', 'REVISION_REQUIRED', 'CONFIRMED'] as const).map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>
        </Preview>
        <RuleTable
          head={['상태', '서버 값', '누가 할 일']}
          rows={[
            ['미제출', <Code key="1">NOT_SUBMITTED</Code>, '장학생'],
            ['작성 중', <Code key="2">DRAFT</Code>, '장학생'],
            ['검토 대기', <><Code>SUBMITTED</Code> <Code>RESUBMITTED</Code></>, '담당자'],
            ['보완 필요', <Code key="4">REVISION_REQUIRED</Code>, '장학생'],
            ['확인 완료', <Code key="5">CONFIRMED</Code>, '없음'],
          ]}
        />
      </Section>

      <Section title="장학생 상태">
        <Preview>
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-3">
              {(['ENROLLED', 'LEAVE', 'COMPLETED', 'WITHDRAWN'] as const).map((s) => (
                <ScholarStatusBadge key={s} status={s} />
              ))}
            </div>
            <div className="flex flex-wrap gap-6">
              {(['ENROLLED', 'LEAVE', 'COMPLETED', 'WITHDRAWN'] as const).map((s) => (
                <ScholarStatusBadge key={s} status={s} plain />
              ))}
            </div>
          </div>
        </Preview>
        <Text>
          <p>
            휴대폰 목록 행처럼 좁은 자리에서는 바탕 없이 글자만 쓰는 <Code>plain</Code>을 씁니다.
          </p>
        </Text>
      </Section>

      <Section title="요청 상태">
        <Preview>
          <div className="flex flex-wrap gap-3">
            {(['DRAFT', 'IN_PROGRESS', 'CLOSED'] as const).map((s) => (
              <RequestStatusBadge key={s} status={s} />
            ))}
          </div>
        </Preview>
      </Section>

      <Section title="태그">
        <Preview>
          <div className="flex flex-wrap gap-3">
            <Tag tone="warning">D-2</Tag>
            <Tag tone="warning">3일 지남</Tag>
            <Tag tone="danger">서류와 다름</Tag>
            <Tag>마감 후</Tag>
          </div>
        </Preview>
        <RuleTable
          head={['색', '쓰는 곳']}
          rows={[
            [<Code key="d">danger</Code>, '실제 문제: 서류와 다른 값, F 과목'],
            [<Code key="w">warning</Code>, '마감 3일 안(D-3 ~ D-day), 마감 지남, 로그인 잠김'],
            [<Code key="n">neutral</Code>, '문제가 아닌 사실: 마감 뒤 제출(허용된 일)'],
          ]}
        />
      </Section>

      <Section title="규칙">
        <Rules
          items={[
            '모양으로도 구분합니다. 미제출은 빈 점, 나머지는 채운 점입니다. 색을 구분하기 어려워도 읽힙니다.',
            '바탕색은 누군가 손대야 하는 상태(검토 대기, 보완 필요, 중단)에만 깔고, 끝났거나 평범한 상태(확인 완료, 재학)는 회색 바탕에 색 점만 둡니다.',
            '배지에는 아이콘을 넣지 않습니다.',
            '배지는 누를 수 없습니다. 거르기는 필터 칩으로 합니다.',
            '모르는 값이 오면 그 값을 회색 배지로 보여 목록이 깨지지 않게 합니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 입력 항목 ───────── */

export function FieldPage() {
  const [gpa, setGpa] = useState('4.7')
  const tooBig = Number(gpa) > 4.5
  return (
    <DocPage group={G} title="입력 항목" lead="라벨, 입력칸, 도움말이나 오류 문구를 한 묶음으로 보여 줍니다.">
      <Preview surface>
        <div className="flex max-w-md flex-col gap-6">
          <LabeledField label="학기 평점" required hint="예: 3.85">
            {(p) => <input {...p} inputMode="decimal" defaultValue="3.75" className={cn(fieldControl, 'max-w-40 tabular-nums', fieldBorder(false))} />}
          </LabeledField>
          <LabeledField label="학기 평점" required error={tooBig ? '만점 기준(4.5)보다 커요. 평점이나 만점 기준을 확인하세요.' : undefined} hint="값을 4.5 이하로 바꿔 보세요">
            {(p) => <input {...p} value={gpa} onChange={(e) => setGpa(e.target.value)} inputMode="decimal" className={cn(fieldControl, 'max-w-40 tabular-nums', fieldBorder(tooBig))} />}
          </LabeledField>
          <LabeledField label="기수" required>
            {(p) => (
              <SelectBox>
                <select {...p} className={cn(fieldControl, 'appearance-none pr-10', fieldBorder(false))}>
                  <option>2026년 선발</option>
                  <option>2025년 선발</option>
                </select>
              </SelectBox>
            )}
          </LabeledField>
          <div className="flex flex-col gap-2">
            <span className="text-label">이메일</span>
            <div className="flex min-h-control-h items-center rounded-md bg-surface-sunken px-4 text-ink-2">hong@example.com</div>
            <span className="text-caption text-ink-3">바꿀 수 없는 값은 회색 칸으로 보여 줍니다</span>
          </div>
        </div>
      </Preview>

      <Section title="구성">
        <RuleTable
          head={['부분', '규칙']}
          rows={[
            ['라벨', '입력칸 위. 필수 항목은 라벨 뒤에 빨간 별표(*), 화면 낭독기에는 "(필수)"'],
            ['입력칸', '높이 44px, 테두리 line-input(#949494), 올리면 line-control로 진해짐. 포커스 선은 테두리 자리에'],
            ['도움말', '칸 아래 caption. 자주 틀리는 점을 미리 막는 문구. 예시는 칸 안이 아니라 여기에 씀'],
            ['오류', '테두리 danger-line, 칸 아래 빨간 글자. 무엇이 틀렸는지와 고치는 법'],
            ['읽기 전용', 'surface-sunken 바탕, 테두리 없음'],
          ]}
        />
      </Section>

      <Section title="필터 줄">
        <Text>목록 위 필터 줄의 입력칸은 폼과 다르게 그립니다. 칩과 같은 32px, 테두리 없이 연한 바탕이라 폼처럼 무거워 보이지 않습니다.</Text>
        <Preview>
          <div className="flex max-w-xl flex-wrap gap-2">
            <div className="relative w-36">
              <select className={cn(filterField, 'appearance-none pr-8')}>
                <option>전체 기수</option>
              </select>
            </div>
            <div className="relative min-w-48 flex-1">
              <Search size={16} strokeWidth={2} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-3" aria-hidden />
              <input placeholder="이름, 이메일" aria-label="찾기" className={cn(filterField, 'pl-9')} />
            </div>
          </div>
        </Preview>
      </Section>

      <Section title="규칙">
        <Rules
          items={[
            '휴대폰 같은 터치 기기의 입력칸 글자는 16px입니다. 16px보다 작으면 iOS Safari가 칸을 누를 때 화면을 확대합니다.',
            '정해진 값 중 하나를 고르는 칸은 직접 입력 대신 선택으로 받습니다. 필수이고 선택지가 3개 이하면 라디오로 펼쳐 보여 줍니다.',
            '숫자 칸은 넣을 글자 수에 맞게 좁게, 단위는 칸 뒤에 둡니다.',
            '연락처는 입력하는 동안 010-1234-5678 모양으로 맞추고, 서버에는 숫자만 보냅니다. 계좌번호는 쓴 모양 그대로 두고 숫자만 보냅니다.',
            '학교처럼 목록에서 고르는 칸은 콤보박스입니다. 입력하면 찾고, 목록에 없으면 쓴 그대로 둡니다.',
            '오류 문구는 aria-describedby로 입력칸과 연결합니다.',
          ]}
        />
      </Section>

      <Section title="폼 오류">
        <Text>로그인이나 대화상자처럼 작은 폼에서 서버가 실패하면, 상자 없이 버튼 가까이에 한 줄로 알립니다.</Text>
        <Preview surface>
          <FormError>이메일이나 비밀번호가 맞지 않아요.</FormError>
        </Preview>
      </Section>
    </DocPage>
  )
}

/* ───────── 체크박스와 라디오 ───────── */

export function SelectionPage() {
  const [scale, setScale] = useState('4.5')
  const [checked, setChecked] = useState([true, false, false])
  const all = checked.every(Boolean)
  const some = checked.some(Boolean) && !all
  return (
    <DocPage group={G} title="체크박스와 라디오" lead="브라우저 기본 모양은 Safari와 Chrome이 달라서 직접 그립니다. 보이는 크기는 16px이고, 누르는 영역은 감싸는 줄 전체입니다.">
      <Section title="체크박스">
        <Preview surface>
          <div className="flex max-w-sm flex-col">
            <label className="flex min-h-11 cursor-pointer items-center gap-3 border-b border-line-subtle">
              <Checkbox checked={all} indeterminate={some} onChange={() => setChecked(checked.map(() => !all))} />
              <span className="text-label">모두 고르기</span>
            </label>
            {['김민서', '윤시우', '권지호'].map((n, i) => (
              <label key={n} className="flex min-h-11 cursor-pointer items-center gap-3">
                <Checkbox checked={checked[i]} onChange={() => setChecked(checked.map((v, j) => (j === i ? !v : v)))} />
                {n}
              </label>
            ))}
          </div>
        </Preview>
        <Rules items={['일부만 고르면 가로줄로 보입니다(표 머리의 모두 고르기).', '고르면 검정 바탕에 흰 체크입니다.']} />
      </Section>
      <Section title="라디오">
        <Preview surface>
          <div role="radiogroup" aria-label="만점 기준" className="flex gap-6">
            {['4.5', '4.3'].map((v) => (
              <label key={v} className="flex min-h-control-h cursor-pointer items-center gap-2">
                <Radio name="scale" value={v} checked={scale === v} onChange={() => setScale(v)} />
                {v}
              </label>
            ))}
          </div>
        </Preview>
        <Rules items={['필수이고 선택지가 3개 이하일 때만 씁니다. 그보다 많거나 비울 수 있어야 하면 선택칸을 씁니다(라디오는 고른 것을 비울 수 없음).', '선택지는 가로로 나란히, 사이 24px입니다.']} />
      </Section>
    </DocPage>
  )
}

/* ───────── 필터 칩 ───────── */

export function FilterChipsPage() {
  const [v, setV] = useState<string | null>(null)
  return (
    <DocPage group={G} title="필터 칩" lead="목록을 상태별로 나눠 봅니다. 하나만 고를 수 있고, 고른 칩은 검정 바탕입니다.">
      <Preview>
        <FilterChips
          label="제출 상태"
          value={v}
          onChange={setV}
          items={[
            { value: null, label: '전체', count: 94 },
            { value: 'n', label: '미제출', count: 22 },
            { value: 'w', label: '검토 대기', count: 46 },
            { value: 'r', label: '보완 필요', count: 5 },
            { value: 'c', label: '확인 완료', count: 21 },
          ]}
        />
      </Preview>
      <Section title="규칙">
        <Rules
          items={[
            '높이 32px, 둥근 모서리, 테두리 없음. 고르지 않은 칩은 연한 회색 바탕입니다.',
            '건수가 있으면 이름 뒤에 숫자를 붙입니다.',
            '휴대폰에서 칩이 넘치면 줄을 바꾸지 않고 가로로 밀어 봅니다.',
            '고른 칩은 aria-pressed로 알립니다.',
            '고른 값은 주소에 남겨 새로고침과 링크 공유에도 유지합니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 데이터 테이블 ───────── */

const people = [
  { name: '김민서', cohort: '2025년 선발', school: '한양대학교', status: 'SUBMITTED' as const, gpa: '3.77', at: '11월 20일 17:16' },
  { name: '서지호', cohort: '2025년 선발', school: '충남대학교', status: 'SUBMITTED' as const, gpa: '3.03', at: '11월 20일 19:22', diff: true },
  { name: '최주원', cohort: '2025년 선발', school: '전남대학교', status: 'REVISION_REQUIRED' as const, gpa: '3.40', at: '11월 21일 10:05', late: true },
  { name: '이도윤', cohort: '2026년 선발', school: '서울과학기술대학교', status: 'NOT_SUBMITTED' as const },
]

export function TablePage() {
  const [sort, setSort] = useState<Sort>(null)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(20)
  return (
    <DocPage group={G} title="데이터 테이블" lead="담당자 목록(장학생 명단, 요청 관리, 제출 현황)에 쓰는 한 줄 표입니다. 열끼리 비교하기 쉽게 열 순서와 정렬을 모든 목록에서 같게 둡니다.">
      <Preview caption="열 이름을 누르면 정렬됩니다. 마우스를 올리면 행 전체가 반응합니다.">
        <div className="overflow-x-auto rounded-lg bg-surface">
          <div className="min-w-[54rem]">
            <div className="flex h-10 items-center gap-4 border-b border-line-subtle px-6 text-label-sm text-ink-3">
              <span className="w-28">
                <SortHeader label="이름" sortKey="name" sort={sort} onSort={setSort} />
              </span>
              <span className="w-28">상태</span>
              <span className="w-28">기수</span>
              <span className="min-w-32 flex-1">학교</span>
              <span className="w-16 text-right">
                <SortHeader label="평점" sortKey="gpa" sort={sort} onSort={setSort} align="end" />
              </span>
              <span className="w-32 text-right">제출 일시</span>
              <span className="w-24 pl-4">비고</span>
            </div>
            {people.map((p) => (
              <div key={p.name} className="flex h-row-h items-center gap-4 border-b border-line-subtle px-6 last:border-b-0 hover:bg-surface-hover">
                <span className="w-28 truncate text-body-strong">{p.name}</span>
                <span className="w-28">
                  <StatusBadge status={p.status} />
                </span>
                <span className="w-28 text-ink-2">{p.cohort}</span>
                <span className="min-w-32 flex-1 truncate text-ink-2">{p.school}</span>
                <span className="w-16 text-right tabular-nums">{p.gpa ?? <span className="text-ink-3">–</span>}</span>
                <span className="w-32 text-right text-ink-2 tabular-nums">{p.at ?? '–'}</span>
                <span className="flex w-24 flex-col items-start pl-4">
                  {p.late && <RowNote icon={Clock}>마감 후</RowNote>}
                  {p.diff && (
                    <RowNote icon={FileWarning} tone="warning">
                      서류와 다름
                    </RowNote>
                  )}
                  {!p.late && !p.diff && p.status !== 'NOT_SUBMITTED' && <ChevronRight size={16} className="text-ink-3" aria-hidden />}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-md:grid-cols-1">
          <span />
          <Pagination page={page} lastPage={5} onChange={setPage} />
          <div className="flex justify-end">
            <PageSizeSelect value={size} options={[20, 50, 100]} unit="명" onChange={setSize} />
          </div>
        </div>
      </Preview>

      <Section title="열 순서와 정렬">
        <RuleTable
          head={['순서', '열', '정렬', '폭']}
          rows={[
            ['1', '누구(이름, 요청 제목)', '왼쪽', '고정 또는 남는 폭'],
            ['2', '상태 배지', '왼쪽', '가장 긴 배지만큼'],
            ['3', '소속(기수, 학교)', '왼쪽', '기수는 고정, 학교는 남는 폭'],
            ['4', '숫자와 날짜(평점, 건수, 제출 일시)', '오른쪽, 고정폭 숫자', '가장 긴 값만큼'],
            ['5', '비고(마감 후, 서류와 다름, 잠김, 사용 중지)', '왼쪽', '맨 끝'],
          ]}
        />
        <Rules
          items={[
            '열 이름은 값과 같은 쪽에 맞춥니다.',
            '오른쪽 정렬 열 다음에 왼쪽 정렬 열이 오면 사이를 32px 띄웁니다.',
            '행 높이 52px, 행 구분선은 line-subtle입니다.',
            '행에서 바탕색이 있는 것은 상태 배지 하나뿐입니다. 보조 표시는 비고 열에 아이콘과 작은 글자로 둡니다.',
          ]}
        />
      </Section>

      <Section title="비고">
        <Preview surface>
          <div className="flex flex-wrap gap-6">
            <RowNote icon={Clock}>마감 후</RowNote>
            <RowNote icon={FileWarning} tone="warning">
              서류와 다름
            </RowNote>
            <RowNote icon={Lock} tone="warning">
              잠김
            </RowNote>
            <RowNote icon={Ban}>사용 중지</RowNote>
          </div>
        </Preview>
      </Section>

      <Section title="정렬, 고르기, 페이지">
        <RuleTable
          head={['기능', '규칙']}
          rows={[
            ['정렬 헤더', '누를 때마다 오름차순 → 내림차순 → 기본 순서. 정렬 중인 열은 굵은 글자와 화살표. 주소에 sort=name,asc로 남김'],
            ['기본 순서', '담당자가 손댈 순서. 제출 현황은 오래 기다린 검토 대기가 먼저'],
            ['고르기', '머리 행 맨 앞 체크박스는 이 페이지 전체. 고르면 머리 행이 "N명 고름"과 행동 버튼으로 바뀌고 높이는 그대로'],
            ['행', '행 전체가 링크. 열어 볼 내용이 없는 행(미제출)은 화살표 자리에 작업 버튼 하나'],
            ['페이지네이션', '표 아래 가운데. 칸 수 7개 고정. 지금 쪽은 연한 바탕과 굵은 글자'],
            ['페이지당 개수', '같은 줄 오른쪽 20 / 50 / 100. 바꾸면 1쪽으로'],
            ['인원 수', '페이지 제목 옆 숫자'],
          ]}
        />
      </Section>

      <Section title="좁은 화면">
        <Rules
          items={[
            '1280px보다 좁으면 기수와 학교를 이름 아래 한 줄로 옮깁니다.',
            '휴대폰은 표 대신 두 줄 행입니다. 윗줄은 이름과 상태(글자만), 아랫줄은 기수와 학교, 오른쪽에 비고.',
            '휴대폰 머리 행은 열 이름 대신 "모두 고르기"입니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 대화상자 ───────── */

export function DialogPage() {
  const [confirm, setConfirm] = useState(false)
  const [form, setForm] = useState(false)
  const toast = useToast()
  return (
    <DocPage group={G} title="대화상자" lead="되돌릴 수 없는 행동을 한 번 더 확인하거나, 짧은 입력을 받습니다. 한 번에 하나만 엽니다.">
      <Preview>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="default" onClick={() => setConfirm(true)}>
            확인 대화상자 열기
          </Button>
          <Button size="default" onClick={() => setForm(true)}>
            입력 대화상자 열기
          </Button>
        </div>
      </Preview>
      <ConfirmDialog
        open={confirm}
        title="요청 공개하기"
        confirmLabel="공개하기"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false)
          toast('요청을 공개했어요')
        }}
      >
        공개하면 2026년 선발 장학생 94명에게 요청이 보여요. 공개한 뒤에는 입력 항목을 바꿀 수 없어요.
      </ConfirmDialog>
      <FormDialog
        open={form}
        title="보완 요청 보내기"
        submitLabel="보완 요청 보내기"
        onCancel={() => setForm(false)}
        onSubmit={() => {
          setForm(false)
          toast('보완 요청을 보냈어요')
        }}
      >
        <LabeledField label="고칠 내용" required>
          {(p) => <textarea {...p} rows={3} defaultValue="성적증명서의 평점과 입력한 평점이 달라요." className={cn(fieldControl, 'h-auto resize-y py-3', fieldBorder(false))} />}
        </LabeledField>
      </FormDialog>

      <Section title="구성">
        <RuleTable
          head={['부분', '규칙']}
          rows={[
            ['폭', '440px. 좁은 화면에서는 양옆 여백을 두고 꽉 채움'],
            ['제목', '행동 이름: "보완 요청 보내기"'],
            ['설명', '무엇이 바뀌는지 한두 줄'],
            ['버튼', '오른쪽 아래, 취소(보조) 왼쪽, 행동(주요) 오른쪽. 높이 40px. 주요 버튼 글자는 제목과 같은 동사'],
            ['뒤 배경', '검정 40%(scrim)'],
          ]}
        />
      </Section>
      <Section title="쓰는 법">
        <UseWhen
          yes={['되돌릴 수 없는 행동: 최종 제출, 확인 완료, 요청 공개, 파일 삭제', '짧은 입력: 보완 요청, 마감 연장, 상태 바꾸기', '저장하지 않은 내용이 있는데 화면을 떠날 때']}
          no={['결과 알림(토스트를 씁니다)', '긴 폼(화면으로 만듭니다)', '대화상자 위에 또 대화상자']}
        />
        <Rules
          items={[
            'Esc와 바깥 누르기로 닫힙니다. 처리 중에는 닫히지 않습니다.',
            '열리면 첫 입력칸(없으면 취소 버튼)으로 포커스가 가고, 닫히면 연 버튼으로 돌아옵니다.',
            '대화상자 안 오류는 원인이 된 칸 아래에 붙이고 그 칸으로 포커스를 옮깁니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 배너 ───────── */

export function BannerPage() {
  return (
    <DocPage group={G} title="배너" lead="화면 전체에 해당하는 안내나 실패를 알립니다. 읽고 행동해야 하는 내용이라 사라지지 않습니다.">
      <Preview surface>
        <div className="flex flex-col gap-3">
          <Banner tone="info" title="마감 연장을 받았어요">
            12월 5일 (금) 23:59까지 제출할 수 있어요.
          </Banner>
          <Banner tone="warning" title="보완 요청을 받았어요">
            고칠 항목만 다시 입력하고 제출하세요.
          </Banner>
          <Banner
            tone="danger"
            title="저장하지 못했어요"
            action={
              <Button size="compact">다시 시도</Button>
            }
          >
            서버에 연결하지 못했어요. 입력한 내용은 그대로 있어요.
          </Banner>
          <Banner tone="success" title="제출했어요">
            담당자가 확인하면 알려 드려요.
          </Banner>
        </div>
      </Preview>
      <Section title="규칙">
        <Rules
          items={[
            '색은 바탕, 아이콘, 제목에만 씁니다. 본문은 ink-2라 긴 글 전체가 빨갛거나 주황으로 보이지 않습니다.',
            '제목은 일어난 일, 본문은 이유와 할 일입니다.',
            '실패는 배너, 성공은 토스트입니다. 실패를 토스트로 띄워 사라지게 하지 않습니다.',
            '입력칸 하나 때문이면 배너 대신 그 칸 아래에 씁니다.',
            '위험(danger)은 화면 낭독기가 바로 읽도록 role="alert", 나머지는 role="status"입니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 토스트 ───────── */

export function ToastPage() {
  const toast = useToast()
  return (
    <DocPage group={G} title="토스트" lead="끝난 일의 결과를 한 줄로 알리고 4초 뒤 사라집니다.">
      <Preview>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast('보완 요청을 보냈어요')}>토스트 띄우기</Button>
          <Button onClick={() => toast('2명의 상태를 수료로 바꿨어요')}>다른 문구</Button>
        </div>
      </Preview>
      <Section title="규칙">
        <Rules
          items={[
            '저장, 바꾸기, 등록, 공개처럼 결과가 화면에 바로 보이는 일에 씁니다.',
            '읽고 행동해야 하는 안내와 실패는 배너입니다.',
            '검정 바탕에 흰 글자, 본문 가운데 아래(PC 24px, 휴대폰 16px 위).',
            'PC는 글자 길이만큼(최대 560px), 휴대폰은 전체 폭입니다.',
            '한 번에 하나. 새 알림이 오면 바꿔 끼웁니다. PC에서 마우스를 올려 두면 멈춥니다.',
            '문구는 "~했어요"로 끝냅니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 불러오는 중과 빈 화면 ───────── */

export function StatePage() {
  return (
    <DocPage group={G} title="불러오는 중과 빈 화면" lead="목록이 비었거나, 불러오는 중이거나, 불러오지 못했을 때 보여 줍니다.">
      <Section title="불러오는 중">
        <Preview caption="0.3초 안에 끝나면 보이지 않습니다.">
          <LoadingCards count={2} />
        </Preview>
      </Section>
      <Section title="비어 있음">
        <Preview>
          <EmptyState title="지금 해야 할 일이 없어요" icon={<Inbox size={24} strokeWidth={1.75} />}>
            새 요청이 열리면 여기에 보여요.
          </EmptyState>
        </Preview>
      </Section>
      <Section title="불러오기 실패">
        <Preview>
          <ErrorState error={new ApiError(0, { code: 'NETWORK_ERROR', message: '' })} onRetry={() => {}} />
        </Preview>
      </Section>
      <Section title="문구">
        <RuleTable
          head={['상황', '보여 줄 것', '예']}
          rows={[
            ['비어 있음', '이유 한 줄과 다음에 일어날 일', '아직 제출할 일이 없어요. 새 요청이 열리면 여기에 보여요.'],
            ['찾은 결과 없음', '검색어와 고칠 방법', '"홍길동"에 맞는 장학생이 없어요. 이름이나 이메일로 다시 찾아보세요.'],
            ['불러오기 실패', '무엇이 안 됐는지와 다시 시도', '서버에 연결하지 못했어요. [다시 시도]'],
          ]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 보완 요청 메모 ───────── */

export function RevisionNotePage() {
  return (
    <DocPage group={G} title="보완 요청 메모" lead="담당자가 남긴 보완 요청 사유입니다. 경고 상자가 아니라 사람이 남긴 메모처럼 보이게, 바탕 없이 이름표와 글자로만 씁니다.">
      <Preview surface>
        <div className="flex max-w-md flex-col gap-4">
          <div className="flex items-center gap-2">
            <StatusBadge status="REVISION_REQUIRED" />
            <Tag tone="warning">D-2</Tag>
          </div>
          <p className="text-body-strong">2026학년도 1학기 성적증명서 제출</p>
          <div className="border-t border-line-subtle pt-4">
            <RevisionNote reason="성적증명서 사진이 흐려 평점이 보이지 않습니다. 원본 PDF로 다시 올려 주세요." hint="고칠 항목만 다시 입력하면 돼요." />
          </div>
        </div>
      </Preview>
      <Section title="규칙">
        <Rules
          items={[
            '이름표 "담당자 보완 요청", 사유 본문, 필요하면 안내 한 줄 순서입니다.',
            '카드 안에 바탕색 상자를 넣지 않습니다. 할 일 카드에서는 구분선 아래, 제출 화면에서는 제목 아래에 둡니다.',
            '주황은 상태 배지와 마감 표시에만 쓰고 사유 글자에는 쓰지 않습니다.',
            '제출 화면에서 고칠 칸은 라벨 옆에 "고칠 항목"을 붙이고, 나머지 칸은 읽기 전용(자물쇠)입니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

/* ───────── 페이지 제목과 메뉴 ───────── */

export function NavigationPage() {
  return (
    <DocPage group={G} title="페이지 제목과 메뉴" lead="화면 위쪽의 공통 요소입니다. 담당자 화면은 왼쪽 메뉴, 장학생 화면은 상단 바만 씁니다.">
      <Section title="로고와 KT 스퀘어">
        <Preview surface>
          <div className="flex flex-wrap items-center gap-10">
            <Logo />
            <Specimen label="KT 스퀘어 8px">
              <KtSquare className="size-6" />
            </Specimen>
          </div>
        </Preview>
        <Rules items={['KT 스퀘어는 KT 로고의 정사각형에서 가져온 8px 빨간 정사각형입니다.', '로고 옆과 펼친 메뉴의 현재 항목 앞에만 둡니다. 페이지 제목 앞에는 두지 않습니다.']} />
      </Section>
      <Section title="페이지 제목">
        <Preview surface>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-2">
                <PageTitle>장학생</PageTitle>
                <span className="text-title-1 text-ink-3 tabular-nums">94</span>
              </div>
              <Button variant="primary" size="default">
                <Send size={20} strokeWidth={1.75} aria-hidden />
                요청 만들기
              </Button>
            </div>
            <PageTitle description={<MetaList items={['2025년 선발', '마감 11월 25일 (수) 23:59']} />}>2026학년도 1학기 성적증명서 제출</PageTitle>
          </div>
        </Preview>
        <Rules
          items={[
            '제목은 왼쪽, 페이지 행동 버튼(40px)은 오른쪽, 세로 가운데입니다.',
            '설명이 없는 제목 줄은 40px 높이라, 화면을 옮겨도 제목과 아래 필터의 위치가 같습니다.',
            '목록의 인원 수는 제목 옆에 회색 숫자로 둡니다.',
            '메뉴 이름과 화면 제목은 똑같이 씁니다.',
          ]}
        />
      </Section>
      <Section title="짧은 정보 묶음">
        <Preview surface>
          <MetaList items={['2025년 선발', '한양대학교', '경영학과']} className="text-caption text-ink-3" />
        </Preview>
        <Text>짧은 정보 여러 개는 가운뎃점 같은 기호 없이 간격으로 나눕니다(MetaList).</Text>
      </Section>
      <Section title="담당자 왼쪽 메뉴">
        <RuleTable
          head={['부분', '규칙']}
          rows={[
            ['폭', '232px. 접으면 72px(아이콘만)'],
            ['항목', '높이 40px, 아이콘 20px과 글자 14px'],
            ['현재 항목', '앞에 KT 스퀘어, 연한 바탕, 굵은 글자. 고른 표시는 위아래로 미끄러져 옮겨감'],
            ['메뉴', '대시보드, 요청 관리, 장학생'],
            ['좁은 화면', '1024px보다 좁으면 상단 바의 메뉴 버튼으로 엶'],
          ]}
        />
      </Section>
      <Section title="상단 바">
        <Rules items={['높이 56px. 왼쪽 로고, 오른쪽 사용자 이름과 로그아웃.', '장학생은 이름을 누르면 마이페이지로 갑니다.', '휴대폰 좌우 여백은 20px입니다.']} />
      </Section>
    </DocPage>
  )
}
