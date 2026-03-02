#!/usr/bin/env bash
#
# 파일별 커밋 스크립트 (제목 + 본문)
# 사용: 프로젝트 루트에서 ./scripts/commit-by-scope.sh
#
set -euo pipefail
cd "$(dirname "$0")/.."

_commit() {
  local path="$1"
  local subject="$2"
  local body="$3"
  if [[ -f "$path" || -d "$path" ]]; then
    git add "$path"
    git commit -m "$subject" -m "$body"
  else
    echo "[skip] 없음: $path"
  fi
}

# --- 지금 git diff --name-only 에 있는 파일들만 커밋 ---
# src/api/imageDetection.js
# src/components/verify/ImageVerify/index.js
# src/data/audioVerify.js
# src/data/home.js
# src/data/imageVerify.js
# src/data/mypage.js
# src/data/privacyPolicy.js
# src/data/termsOfService.js

# 1) 이미지 검증 결과 매핑·신뢰도 퍼센트 보정 (상세 페이지)
_commit "src/api/imageDetection.js" "[Fix](imageDetection): 이미지 검증 결과 매핑 및 신뢰도 퍼센트 보정" "이미지 검증 상세 결과를 UI에서 자연스럽게 보이도록 매핑 로직을 보완했습니다.
- final_ai_probability, binary/multi confidence를 0~1 값일 경우 0~100%로 변환하는 toPercent 유틸 추가
- 이진분류/다중분류/최종 결과의 신뢰도가 사람이 기대하는 퍼센트(예: 95%)로 노출되도록 수정
- C2PA details 키에서 불필요한 따옴표를 제거하고, Prettier 스타일에 맞게 포맷 정리"

# 2) 이미지 검증 모듈 index 파일 포맷 정리
_commit "src/components/verify/ImageVerify/index.js" "[Style](ImageVerify/index): export 정리 및 Prettier 포맷 적용" "이미지 검증 컴포넌트 index 파일에 Prettier 포맷을 적용했습니다.
- import/export 구문 줄바꿈 및 들여쓰기를 정리해 가독성을 개선
- 로직 변경 없이 스타일만 정리해 다른 파일과 일관된 코드 스타일 유지"

# 3) 오디오 검증 가이드 데이터 포맷 정리
_commit "src/data/audioVerify.js" "[Style](audioVerify): 오디오 검증 설명 데이터 줄바꿈 및 정렬" "오디오 검증 가이드용 데이터 정의에 Prettier 포맷을 적용했습니다.
- 이진분류/다중분류 등 항목 객체를 여러 줄로 나누어 읽기 쉽도록 정렬
- 내용(텍스트)은 유지하고 들여쓰기·줄바꿈만 정리해 스타일 일관성을 확보"

# 4) 홈 데이터(인트로 등) 포맷 및 줄바꿈 정리
_commit "src/data/home.js" "[Docs](home): 홈 인트로·섹션 데이터 포맷 및 줄바꿈 정리" "홈 화면에서 사용하는 텍스트 데이터에 Prettier 포맷을 적용하고, 인트로 문구 줄바꿈을 정리했습니다.
- 인트로 설명은 두 줄로 분리해 가독성을 유지하면서 코드 상에서도 명확히 표현
- 섹션 데이터 배열의 들여쓰기와 줄바꿈을 통일해 유지보수성을 높임"

# 5) 이미지 검증 가이드 데이터 포맷 정리
_commit "src/data/imageVerify.js" "[Style](imageVerify): 이미지 검증 가이드 데이터 포맷 정리" "이미지 검증 가이드 데이터(imageAnalysisMethods, imageFrameworkCards 등)에 Prettier 포맷을 적용했습니다.
- 각 카드/항목 객체를 여러 줄로 나누어 필드별로 한눈에 들어오도록 정렬
- 설명 문구는 그대로 유지하면서, 들여쓰기와 줄바꿈만 정리해 스타일 일관성 확보"

# 6) 마이페이지 더미 데이터 포맷 정리
_commit "src/data/mypage.js" "[Style](mypage): 마이페이지 더미 데이터 포맷 및 SVG 플레이스홀더 포맷 정리" "마이페이지에서 사용하는 더미 데이터 및 SVG 플레이스홀더 문자열에 Prettier 포맷을 적용했습니다.
- data:image/svg+xml 텍스트를 여러 줄로 분리해 가독성을 개선
- 분석 방법 예시 데이터의 필드들을 줄바꿈/들여쓰기로 정리해 코드 가독성 향상"

# 7) 개인정보처리방침 데이터 포맷 정리
_commit "src/data/privacyPolicy.js" "[Docs](privacyPolicy): 개인정보처리방침 데이터 구조 포맷 정리" "개인정보처리방침을 정의한 데이터 객체에 Prettier 포맷을 적용했습니다.
- type, text, items 등의 필드를 줄바꿈으로 분리해 구조를 명확히 표현
- 경고 블록(warn: true) 등 기존 의미는 유지하면서 들여쓰기·배열 포맷만 정리"

# 8) 이용약관 데이터 포맷 정리
_commit "src/data/termsOfService.js" "[Docs](termsOfService): 이용약관 데이터 구조 포맷 정리" "이용약관을 정의한 데이터 객체에 Prettier 포맷을 적용했습니다.
- 조항별 body, ol/ul items 등을 여러 줄로 나누어 구조를 명확하게 표시
- 약관 내용은 변경하지 않고, 들여쓰기와 줄바꿈만 정리해 코드 스타일을 일관되게 맞춤"

echo "완료: 파일별 커밋 끝"
