// 왼쪽 메뉴. 주소와 화면 이름을 한곳에서 정한다
export type NavItem = { path: string; label: string }
export type NavGroup = { label: string; items: NavItem[] }

export const nav: NavGroup[] = [
  {
    label: '시작하기',
    items: [{ path: '/', label: '소개' }],
  },
  {
    label: '기본 요소',
    items: [
      { path: '/foundations/color', label: '색' },
      { path: '/foundations/typography', label: '글자' },
      { path: '/foundations/layout', label: '간격과 레이아웃' },
      { path: '/foundations/surface', label: '모서리와 면' },
      { path: '/foundations/interaction', label: '상호작용 상태' },
      { path: '/foundations/icons', label: '아이콘' },
      { path: '/foundations/motion', label: '모션' },
    ],
  },
  {
    label: '컴포넌트',
    items: [
      { path: '/components/button', label: '버튼' },
      { path: '/components/menu-button', label: '메뉴 버튼' },
      { path: '/components/badge', label: '상태 배지와 태그' },
      { path: '/components/field', label: '입력 항목' },
      { path: '/components/selection', label: '체크박스와 라디오' },
      { path: '/components/filter-chips', label: '필터 칩' },
      { path: '/components/table', label: '데이터 테이블' },
      { path: '/components/dialog', label: '대화상자' },
      { path: '/components/banner', label: '배너' },
      { path: '/components/toast', label: '토스트' },
      { path: '/components/state', label: '불러오는 중과 빈 화면' },
      { path: '/components/revision-note', label: '보완 요청 메모' },
      { path: '/components/navigation', label: '페이지 제목과 메뉴' },
    ],
  },
  {
    label: '패턴',
    items: [
      { path: '/patterns/feedback', label: '알림 고르기' },
      { path: '/patterns/submit', label: '저장과 제출' },
      { path: '/patterns/list', label: '목록' },
      { path: '/patterns/import', label: '엑셀 일괄 등록' },
      { path: '/patterns/password', label: '임시 비밀번호 전달' },
    ],
  },
  {
    label: '글쓰기',
    items: [
      { path: '/writing', label: '화면 문구' },
      { path: '/writing/errors', label: '오류 문구' },
    ],
  },
]

export const flatNav = nav.flatMap((g) => g.items)
