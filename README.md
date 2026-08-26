# Heimdall

이미지·음성 콘텐츠의 **AI 생성 여부**를 판별하는 웹 서비스 프론트엔드입니다.  
C2PA, 딥러닝 기반 다중 모델, 메타데이터 분석을 종합해 신뢰도 높은 검증 결과를 제공합니다.

- **서비스:** [heimdall.ai.kr](https://heimdall.ai.kr) *(배포 환경에 따라 다를 수 있음)*
- **GitHub:** [Pr0j3c7-Heimdall](https://github.com/Pr0j3c7-Heimdall)

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **이미지 AI 검증** | 업로드 → 비동기 분석 → C2PA·이진분류·다중분류·메타데이터 결과 |
| **음성 AI 검증** | 일반 음성 / 가창 선택 후 업로드 → 다중 모델 판별 결과 |
| **마이페이지** | Google 로그인, 검증 이력 조회, 결과 상세 |
| **가이드** | 프레임워크 설명, 업로드 조건, 분석 방법 안내 |
| **다크 모드** | 전역 테마 전환 지원 |

---

## 기술 스택

- **Framework:** Next.js 15 (App Router), React 19
- **HTTP:** Axios
- **Auth:** Google OAuth (`@react-oauth/google`) + JWT (Bearer)
- **Animation:** Framer Motion
- **API Types:** OpenAPI → TypeScript (`openapi-typescript`)
- **Style:** CSS (Design tokens), Storybook (UI 컴포넌트 개발용)

---

## 시작하기

### 사전 요구사항

- Node.js 20+
- npm
- Heimdall **백엔드 API** (로컬 기본: `http://localhost:8000`)
- Google OAuth 클라이언트 ID

### 1. 설치

```bash
git clone <repository-url>
cd heimdall
npm ci
```

### 2. 환경 변수

`.env.local.example`을 복사해 `.env.local`을 만듭니다.

```bash
cp .env.local.example .env.local
```

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_API_BASE_URL` | 백엔드 API URL (예: `http://localhost:8000`) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth 클라이언트 ID |
| `NEXT_PUBLIC_SITE_URL` | 배포 시 사이트 URL (OG/메타데이터용, 선택) |

### 3. 개발 서버

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

백엔드 OpenAPI 스키마를 갱신할 때:

```bash
# 백엔드가 http://localhost:8000 에서 실행 중이어야 합니다
npm run openapi:generate
```

---

## npm scripts

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 |
| `npm run lint` | ESLint |
| `npm run openapi:generate` | `src/api/api.ts` 타입 재생성 |
| `npm run storybook` | Storybook (포트 6006) |

---

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router 페이지
├── api/              # API 클라이언트 (imageDetection, audioDetection, api.ts)
├── components/       # UI·레이아웃·검증 페이지 컴포넌트
├── contexts/         # Auth, Theme, AuthModal
├── data/             # 페이지별 정적 콘텐츠 (home, imageVerify, audioVerify 등)
├── lib/              # auth, parseApiError 등 유틸
└── styles/           # 전역·페이지 CSS

docs/
└── FRONTEND.md       # 프론트엔드 상세 기술 문서
public/
└── assets/           # 이미지, 영상 등 정적 자산
```

---

## 주요 URL

| 경로 | 설명 |
|------|------|
| `/` | 홈 |
| `/verify/image` | 이미지 AI 검증 |
| `/verify/audio` | 음성 AI 검증 |
| `/docs` | 서비스 가이드 |
| `/mypage/profile` | 회원정보 |
| `/mypage/history/image` | 이미지 검증 내역 |
| `/mypage/history/audio` | 음성 검증 내역 |
| `/policy` | 이용약관·개인정보처리방침 |

---

## API 연동 개요

프론트엔드는 백엔드 REST API (`/api/v1/...`)와 통신합니다.

- **이미지:** 업로드 → 상태 폴링 → 결과 조회 → 마이페이지 이력
- **음성:** 업로드(`track`: `speech` \| `singing`) → 상태 폴링 → 결과 조회 → 마이페이지 이력
- **인증:** `POST /api/v1/auth/login` (Google ID Token)

---

## 라이선스

본 프로젝트의 라이선스는 저장소 설정을 따릅니다.
