# 백엔드 스터디

백엔드 필수 개념을 읽고 · 외우고 · 퀴즈로 복습하는 정적 사이트 (빌드 불필요, 순수 HTML/CSS/JS).

- 로컬 실행: `index.html`을 브라우저로 열기
- 진도/오답노트는 브라우저 localStorage에 저장됨
- 콘텐츠 수정: `data.js` (개념 `CONCEPTS`, 단어 `TERMS`, 퀴즈 `QUIZZES`)

## 배포 방법 (택 1, 모두 무료)

### 1) Netlify Drop (가장 쉬움, 계정만 있으면 됨)
https://app.netlify.com/drop 에 이 폴더를 통째로 드래그 & 드롭

### 2) Vercel
```
npm i -g vercel
vercel --prod
```
(Framework: Other, Build Command 비움, Output Directory `.`)

### 3) GitHub Pages
1. 이 폴더를 GitHub 저장소로 push
2. Settings → Pages → Branch: `main` / `/ (root)` 선택
3. `https://<계정>.github.io/<저장소>/` 로 접속 (`.nojekyll` 포함됨)
