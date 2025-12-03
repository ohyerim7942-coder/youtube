<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# YouTube Creator AI - 대본 생성기

AI를 활용한 유튜브 크리에이터를 위한 대본 생성 도구입니다.

## 주요 기능

- 📝 참고 대본을 분석하여 새로운 주제 추천
- 🤖 AI 기반 자동 대본 생성
- 💾 대본 히스토리 관리 (로컬 스토리지)
- ✏️ 생성된 대본 편집 기능
- 📋 클립보드 복사 기능

## 로컬 실행 방법

**필수 조건:** Node.js 18 이상

1. 의존성 설치:
   ```bash
   npm install
   ```

2. 환경 변수 설정:
   - `.env` 파일을 생성하고 Gemini API 키를 설정하세요
   - API 키는 https://aistudio.google.com/apikey 에서 발급받을 수 있습니다
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

3. 개발 서버 실행:
   ```bash
   npm run dev
   ```

4. 브라우저에서 `http://localhost:5173` 접속

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini API
