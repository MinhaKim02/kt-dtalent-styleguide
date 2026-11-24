# KT디지털인재장학생 스타일가이드

KT디지털인재장학생 통합 운영 플랫폼의 디자인 기준과 컴포넌트 문서입니다.

- 사이트: https://minhakim02.github.io/kt-dtalent-styleguide/
- 서비스 코드: https://github.com/kt-dtalent-platform/frontend

## 서비스 코드와 연결되는 방식

| 무엇 | 어디서 |
| --- | --- |
| 색, 글자, 간격, 모서리, 그림자, 모션 값 | 프론트 레포 `design/tokens.json` |
| 버튼, 배지, 표, 대화상자 같은 컴포넌트 | 프론트 레포 `src/components` |
| 아이콘 목록 | 프론트 레포에서 `lucide-react`로 불러온 아이콘을 빌드할 때 모음 |
| 설명 글 | 이 레포 `src/pages` |

빌드할 때 `scripts/fetch-frontend.mjs`가 프론트 레포 main을 `.frontend`에 받아 옵니다. 그래서 프론트에서 토큰이나 컴포넌트를 고치면 다음 빌드에 그대로 반영됩니다.

## 배포

GitHub Actions(`.github/workflows/deploy.yml`)가 GitHub Pages에 올립니다.

- 이 레포 main에 올릴 때
- 매일 새벽 4시(한국 시간)
- Actions 탭의 deploy → Run workflow

프론트에서 컴포넌트 사용법(props)이 크게 바뀌면 빌드가 실패할 수 있습니다. 이때는 이전 사이트가 그대로 남아 있고, `src/pages`의 해당 예시만 고치면 됩니다.

## 내 컴퓨터에서 보기

```bash
npm install
npm run dev
```

프론트 레포를 내 컴퓨터에서 고치면서 바로 보려면 그 폴더를 지정합니다.

```bash
FRONTEND_DIR=../frontend npm run dev
```

## 폴더

```txt
scripts/fetch-frontend.mjs   프론트 레포 받기
src/nav.ts                   왼쪽 메뉴
src/docs/                    문서 공통 조각(페이지, 미리보기, 규칙 표), 토큰 읽기
src/pages/Foundations.tsx    기본 요소(색, 글자, 간격, 면, 상태, 아이콘, 모션)
src/pages/Components.tsx     컴포넌트
src/pages/Guides.tsx         소개, 패턴, 글쓰기
```
