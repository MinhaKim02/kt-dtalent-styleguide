import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { usedIn } from 'virtual:used-icons'
import { BrandFlow } from '@fe/components/brand/BrandFlow'
import { buttonClass } from '@fe/components/ui/buttonClass'
import { KtSquare } from '@fe/components/ui/KtSquare'
import { Code, DocPage, RuleTable, Rules, Section, Text } from '../docs/Doc'
import { useCountUp } from '../docs/motion'
import { tokens } from '../docs/tokens'
import { nav } from '../nav'

/* ───────── 소개 ───────── */

const principles = [
  ['흑백이 일을 하고, 레드는 서명만 한다', '글자, 버튼, 선은 회색 단계로만 만듭니다. KT 레드는 KT 스퀘어와 로고, 첫 화면 그래픽에만 씁니다.'],
  ['조용한 업무 도구', '담당자는 수십 건을 이어서 검토합니다. 오래 봐도 피곤하지 않게 그림자와 테두리를 줄이고, 면의 차이로 나눕니다.'],
  ['할 일이 먼저 보인다', '상태 바탕색은 손댈 일이 있는 상태에만 깔고, 목록은 담당자가 손댈 순서로 보여 줍니다.'],
  ['모양으로도 구분한다', '색만으로 뜻을 전하지 않습니다. 상태 배지는 점과 글자, 비고는 아이콘과 글자입니다.'],
  ['주요 버튼은 화면에 하나', '검정 버튼은 그 화면의 결정 하나에만 씁니다.'],
  ['할 행동을 먼저 쓴다', '화면 문구는 사용자가 할 일을 먼저 말하고, 오류는 이유와 고치는 법을 함께 씁니다.'],
]

const iconCount = Object.keys(usedIn).length
const styleCount = tokens.type.groups.reduce((n, g) => n + g.styles.length, 0)
const componentCount = nav.find((g) => g.label === '컴포넌트')!.items.length

function Stat({ value, label }: { value: number; label: string }) {
  const n = useCountUp(value)
  return (
    <div className="flex flex-col gap-1">
      <span className="text-number tabular-nums">{n}</span>
      <span className="text-caption text-ink-3">{label}</span>
    </div>
  )
}

export function HomePage() {
  return (
    <article className="flex flex-col gap-20 md:gap-24">
      {/* 첫 화면: 서비스 로그인 화면과 같은 브랜드 플로우가 흐른다 */}
      <header className="hero relative isolate -mx-5 overflow-hidden md:-mx-0 md:rounded-xl">
        <BrandFlow />
        <div className="relative flex min-h-[26rem] flex-col justify-end gap-6 px-6 pt-24 pb-10 md:min-h-[32rem] md:px-12 md:pb-12">
          <p className="hero-line flex items-center gap-2 text-caption font-semibold text-ink-2" style={{ animationDelay: '0.2s' }}>
            <KtSquare />
            KT그룹희망나눔재단
          </p>
          <h1 className="m-0 text-display-sm md:text-display">
            <span className="hero-line block" style={{ animationDelay: '0.35s' }}>
              KT디지털인재장학생
            </span>
            <span className="hero-line block text-ink-3" style={{ animationDelay: '0.5s' }}>
              스타일가이드
            </span>
          </h1>
          <p className="hero-line max-w-xl text-title-2 font-normal text-ink-2" style={{ animationDelay: '0.65s' }}>
            장학생은 서류를 내고, 담당자는 검토합니다. 두 사람이 쓰는 화면의 색, 글자, 컴포넌트를 한곳에 모았습니다.
          </p>
          <div className="hero-line flex flex-wrap gap-3 pt-2" style={{ animationDelay: '0.8s' }}>
            <Link to="/foundations/color" className={buttonClass({ variant: 'primary' })}>
              기본 요소 보기
            </Link>
            <Link to="/components/button" className={buttonClass({ className: 'bg-surface/70 backdrop-blur-sm' })}>
              컴포넌트 보기
            </Link>
          </div>
        </div>
      </header>

      <section data-reveal className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line-subtle py-10 md:grid-cols-4">
        <Stat value={tokens.color.tokens.length} label="색 토큰" />
        <Stat value={styleCount} label="글자 스타일" />
        <Stat value={componentCount} label="컴포넌트 문서" />
        <Stat value={iconCount} label="서비스에서 쓰는 아이콘" />
      </section>

      <Section title="디자인 원칙">
        <ol className="m-0 grid list-none gap-x-10 gap-y-10 p-0 md:grid-cols-2 xl:grid-cols-3">
          {principles.map(([t, d], i) => (
            <li key={t} className="flex flex-col gap-3 border-t border-ink pt-5">
              <span className="text-label-sm text-ink-3 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-title-2">{t}</span>
              <span className="text-body-long text-ink-2">{d}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="누가 쓰나">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['장학생', '주로 휴대폰', '마감 전에 성적을 입력하고 성적증명서를 올려 제출합니다. 보완 요청을 받으면 고쳐서 다시 냅니다.'],
            ['재단 담당자', '주로 PC', '요청을 만들어 공개하고, 제출 현황을 보며 하나씩 검토합니다. 장학생 명단을 관리하고 엑셀로 내려받습니다.'],
          ].map(([who, device, what]) => (
            <div key={who} className="flex flex-col gap-3 rounded-lg bg-canvas p-6">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-title-2">{who}</span>
                <span className="text-caption text-ink-3">{device}</span>
              </div>
              <p className="text-body-long text-ink-2">{what}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="구성">
        <div className="grid gap-4 md:grid-cols-2">
          {nav.slice(1).map((g) => (
            <Link key={g.label} to={g.items[0].path} className="group flex flex-col gap-3 rounded-lg p-6 text-ink no-underline ring-1 ring-line-subtle transition-shadow hover:ring-line">
              <span className="flex items-center justify-between text-label">
                {g.label}
                <ArrowRight size={16} strokeWidth={2} aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
              </span>
              <span className="text-body text-ink-3">{g.items.map((it) => it.label).join(', ')}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="코드와 함께 바뀝니다">
        <Rules
          items={[
            <>색, 글자, 간격 같은 값은 프론트 레포의 <Code>design/tokens.json</Code>에서 읽습니다.</>,
            <>버튼, 배지, 표 같은 컴포넌트는 프론트 레포의 <Code>src/components</Code>를 그대로 불러와 그립니다.</>,
            '이 사이트는 매일 새벽 프론트 main을 받아 다시 만듭니다. 서비스에서 컴포넌트를 고치면 다음 날 여기도 바뀝니다.',
            '설명 글은 이 사이트 레포에 있어서, 규칙이 바뀌면 글은 따로 고칩니다.',
          ]}
        />
      </Section>
    </article>
  )
}

/* ───────── 패턴 ───────── */

const P = '패턴'

export function FeedbackPatternPage() {
  return (
    <DocPage group={P} title="알림 고르기" lead="알릴 내용의 범위와 사용자가 해야 할 일에 따라 알림 방법을 고릅니다.">
      <Section title="어떤 걸 쓸까">
        <RuleTable
          head={['방법', '범위', '사라짐', '예']}
          rows={[
            ['칸 아래 문구', '입력칸 하나', '고칠 때까지', '"만점 기준(4.5)보다 커요"'],
            ['줄 안 문구', '버튼 하나', '다음 행동까지', '"11:42 저장됨"'],
            ['폼 오류(FormError)', '작은 폼의 서버 실패', '다시 보낼 때까지', '로그인 실패, 대화상자 실패'],
            ['배너', '화면 전체, 읽고 행동해야 함', '해결될 때까지', '마감 지남, 제출 실패, 보완 요청 받음'],
            ['보완 요청 메모', '담당자가 남긴 사유', '다시 제출할 때까지', '"평점이 보이지 않습니다"'],
            ['토스트', '끝난 일의 결과', '4초', '"보완 요청을 보냈어요"'],
            ['확인 대화상자', '되돌릴 수 없는 행동 전', '고를 때까지', '요청 공개, 최종 제출'],
          ]}
        />
      </Section>
      <Section title="규칙">
        <Rules items={['성공은 토스트, 실패는 배너입니다.', '되돌릴 수 없는 행동만 대화상자로 한 번 더 묻습니다. 버튼 글자는 "확인" 대신 행동 이름입니다.', '화면의 버튼이나 결과가 이미 말하는 내용은 안내 문장으로 다시 쓰지 않습니다.']} />
      </Section>
    </DocPage>
  )
}

export function SubmitPatternPage() {
  return (
    <DocPage group={P} title="저장과 제출" lead="장학생이 성적을 입력하고 제출하는 흐름입니다.">
      <Section title="흐름">
        <RuleTable
          head={['단계', '화면에서']}
          rows={[
            ['임시 저장', '버튼 옆에 "11:42 저장됨"이 남습니다. 토스트를 띄우지 않습니다.'],
            ['제출', '확인 대화상자 → 버튼이 "제출하는 중"으로 바뀌고 비활성 → 제출 완료 알림'],
            ['실패', '입력값은 그대로 두고, 화면 위 배너로 이유와 다시 시도를 보여 줍니다.'],
            ['보완 요청', '보완 요청 메모와 "고칠 항목" 표시. 고칠 칸만 입력할 수 있고 나머지는 읽기 전용'],
            ['재제출', '고친 칸이 있을 때만 다시 제출할 수 있습니다.'],
          ]}
        />
      </Section>
      <Section title="파일 올리기">
        <Rules
          items={[
            '파일 첨부 버튼은 점선 테두리의 보조 버튼(32px)이고, 아래에 허용 형식과 용량을 한 줄로 씁니다.',
            '끌어 놓는 동안에만 항목 둘레에 점선을 보여 줍니다.',
            '올리는 중에는 진행률, 끝나면 체크 표시가 나타납니다. 실패하면 이유와 [다시 시도].',
            '올리다 실패한 파일은 서버에서도 지워서, 바로 다시 올릴 수 있게 합니다.',
          ]}
        />
      </Section>
      <Section title="화면을 떠날 때">
        <Text>저장하지 않은 내용이 있는데 다른 화면으로 옮기거나 로그아웃하면 "저장하지 않고 나가기"를 묻습니다. 제목과 주요 버튼 글자가 같습니다.</Text>
      </Section>
      <Section title="버튼 자리">
        <Rules items={['저장과 제출 버튼은 폼 끝에 둡니다. 화면 아래에 고정하지 않습니다(짧은 폼을 가리고 아이폰 키보드와 부딪힘).', 'PC는 오른쪽, 휴대폰은 두 버튼이 반씩 전체 폭입니다.']} />
      </Section>
    </DocPage>
  )
}

export function ListPatternPage() {
  return (
    <DocPage group={P} title="목록" lead="담당자 목록 화면 세 곳(요청 관리, 제출 현황, 장학생)은 같은 구조입니다.">
      <Section title="위에서 아래로">
        <RuleTable
          head={['줄', '내용']}
          rows={[
            ['제목 줄', '제목과 인원 수, 오른쪽에 페이지 행동 버튼'],
            ['필터 줄', '상태 칩, 기수 고르기, 찾기, 오른쪽 끝에 내보내기. 모두 32px'],
            ['표', '필터 줄과 16px 띄움. 열 순서는 누구 → 상태 → 소속 → 숫자 → 비고'],
            ['아래 줄', '가운데 페이지네이션, 오른쪽 페이지당 개수와 자주 쓰지 않는 만들기 버튼'],
          ]}
        />
      </Section>
      <Section title="규칙">
        <Rules
          items={[
            '고른 필터, 정렬, 쪽, 페이지당 개수는 주소에 남겨 새로고침과 링크 공유에도 유지합니다.',
            '새 결과가 오면 행 목록만 다시 나타납니다. 제목과 필터 줄은 움직이지 않습니다.',
            '서버가 아직 못 하는 기능의 버튼은 보이지 않게 합니다. 예: 마감 연장은 진행 중인 요청에서만.',
            '만들기 버튼은 목록을 불러오는 중이거나 실패해도 보입니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

export function ImportPatternPage() {
  return (
    <DocPage group={P} title="엑셀 일괄 등록" lead="새 기수 장학생을 엑셀 한 파일로 한 번에 등록합니다.">
      <Section title="흐름">
        <ol className="prose m-0 flex flex-col gap-3 pl-5 text-body-long text-ink-2">
          <li>기수를 고릅니다. 없으면 새 기수를 만듭니다(선발 연도 4자리만 입력 → "2027년 선발").</li>
          <li>양식을 받아 채운 뒤 올립니다. 끌어다 놓거나 눌러서 고릅니다(휴대폰은 고르기만).</li>
          <li>파일은 화면에서 바로 읽어 검사합니다. 서버로 보내기 전에 고칠 것을 모두 보여 줍니다.</li>
          <li>고칠 것이 없으면 "N명을 등록해요" 표와 [N명 등록하기].</li>
          <li>등록이 끝나면 결과 화면에서 로그인 안내 메일을 보냅니다.</li>
        </ol>
      </Section>
      <Section title="고칠 것 보여 주기">
        <Rules
          items={[
            '"N줄을 고쳐야 해요" 아래에 고칠 줄만 모든 열과 함께 보여 줍니다. 첫 열은 엑셀 줄 번호입니다.',
            '문제 칸은 빨간 글자(빈 칸은 "빈칸"), 이유는 마지막 "고칠 점" 열입니다. 칸 바탕색과 툴팁은 쓰지 않습니다.',
            '이미 등록된 이메일처럼 서버가 알려 주는 문제도 같은 표에 넣습니다.',
            '표는 1280px 이상에서만, 좁으면 줄마다 카드로 보여 줍니다.',
            '연락처는 0으로 시작하는 숫자 9~11자리입니다. 보낼 때 숫자만 보냅니다.',
          ]}
        />
      </Section>
    </DocPage>
  )
}

export function PasswordPatternPage() {
  return (
    <DocPage group={P} title="임시 비밀번호 전달" lead="장학생을 등록하면 임시 비밀번호가 만들어집니다. 로그인 안내 메일로 보내는 것이 기본이고, 파일과 화면 표시는 메일을 쓸 수 없을 때의 보조입니다.">
      <Section title="등록 결과 화면">
        <Rules
          items={[
            '제목은 결과("3명을 등록했어요")입니다. 바로 아래 [메일 보내기] 줄이 할 일을 말합니다.',
            '그 아래 "메일을 쓸 수 없을 때" 묶음에 안내 파일(여러 명) 또는 임시 비밀번호와 [복사](한 명).',
            '메일을 보내면 비밀번호가 새로 만들어지므로 파일과 화면의 비밀번호는 숨깁니다.',
            '파일은 이 화면에서 한 번만 받을 수 있어서, 받기 전에 화면을 떠나면 한 번 묻습니다.',
            '엑셀의 모든 칸을 글자로 넣어 =, -로 시작하는 값이 수식으로 바뀌거나 앞자리 0이 사라지지 않게 합니다.',
          ]}
        />
      </Section>
      <Section title="다시 보내기">
        <Rules items={['장학생 상세의 [임시 비밀번호 다시 보내기]로 새 임시 비밀번호를 메일로 보냅니다.', '계정이 잠겼거나 사용 중지면 버튼을 숨기고 이유를 보여 줍니다.']} />
      </Section>
    </DocPage>
  )
}

/* ───────── 글쓰기 ───────── */

const W = '글쓰기'

export function WritingPage() {
  return (
    <DocPage group={W} title="화면 문구" lead="사용자가 할 일을 먼저, 짧고 쉬운 말로 씁니다.">
      <Section title="규칙">
        <RuleTable
          head={['규칙', '이렇게', '이렇게 쓰지 않음']}
          rows={[
            ['할 행동을 먼저', '직전 학기 평점을 입력하세요', '평점 입력이 필요합니다'],
            ['버튼은 동사로 끝냄', '보완 요청 보내기, 확인 완료', '확인, 예'],
            ['결과는 "~했어요"', '보완 요청을 보냈어요', '보완 요청이 완료되었습니다'],
            ['나열은 간격, 쉼표, 줄바꿈', '2025년 선발   한양대학교', '가운뎃점으로 잇기'],
            ['방어하는 말을 빼기', '마감 뒤에도 낼 수 있어요', '단, 마감 이후 제출 시 불이익이 있을 수 있음'],
            ['같은 것은 같은 이름으로', '메뉴 이름 = 화면 제목', '메뉴 "요청 관리", 제목 "제출 요청 목록"'],
          ]}
        />
      </Section>
      <Section title="자주 쓰는 이름">
        <RuleTable
          head={['이름', '뜻']}
          rows={[
            ['요청', '담당자가 장학생에게 보내는 제출 요청(예: 2026학년도 1학기 성적증명서 제출)'],
            ['제출 상태', '미제출, 작성 중, 검토 대기, 보완 필요, 확인 완료. 다섯 개로 고정'],
            ['장학생 상태', '재학, 휴학, 수료, 중단'],
            ['보완 요청', '담당자가 고칠 것을 알려 다시 내게 하는 것'],
            ['마감 후', '마감이 지난 뒤 낸 제출(허용된 일)'],
            ['서류와 다름', '입력값과 성적증명서에서 읽은 값이 다름'],
          ]}
        />
      </Section>
    </DocPage>
  )
}

export function ErrorWritingPage() {
  return (
    <DocPage group={W} title="오류 문구" lead="무엇이 안 됐는지, 왜 그런지, 다음에 할 일을 씁니다. 서버의 오류 코드는 한곳에서 화면 문구로 바꿉니다.">
      <Section title="규칙">
        <RuleTable
          head={['규칙', '이렇게', '이렇게 쓰지 않음']}
          rows={[
            ['무엇이 안 됐는지와 이유', '메일 서버가 아직 설정되지 않아 보낼 수 없어요.', '오류가 발생했습니다.'],
            ['다음에 할 일', '새로고침해서 지금 상태를 확인하세요.', '잠시 뒤 다시 시도하세요.'],
            ['서버 메시지를 그대로 보여 주지 않음', '형식이 맞지 않는 항목이 있어요. 입력한 내용을 확인하세요.', '요청 값이 올바르지 않습니다.'],
            ['사용자 탓을 하지 않음', '이메일이나 비밀번호가 맞지 않아요.', '잘못 입력했어요.'],
            ['입력이 남아 있으면 알림', '서버에 연결하지 못했어요. 입력한 내용은 그대로 있어요.', '연결 실패'],
            ['물어볼 곳', '담당자 화면은 개발팀, 장학생 화면은 담당자', '고객센터에 문의하세요'],
          ]}
        />
      </Section>
      <Section title="어디에 두나">
        <RuleTable
          head={['원인', '자리']}
          rows={[
            ['입력칸 하나', '그 칸 아래 빨간 글자. 그 칸으로 포커스를 옮김'],
            ['로그인, 대화상자 같은 작은 폼의 서버 실패', '버튼 가까이에 상자 없는 한 줄(FormError)'],
            ['화면 전체', '배너. 제목은 실패한 행동("저장하지 못했어요"), 본문은 이유와 할 일'],
          ]}
        />
      </Section>
      <Section title="코드">
        <Text>
          <p>
            서버 오류 코드를 문구로 바꾸는 곳은 <Code>src/api/errorText.ts</Code> 하나입니다. 새 오류 코드가 생기면 여기에 문구를 더합니다.
          </p>
        </Text>
      </Section>
    </DocPage>
  )
}
