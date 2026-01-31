# Disney Plus Clone (React)

React를 활용하여 **Disney Plus 클론 애플리케이션**을 제작한 프로젝트입니다.  
Firebase를 이용한 **배포 및 인증/인가**, The Movie DB API를 활용한 **영화 검색·조회**,  
비디오 재생 및 다양한 UI/UX 기능을 구현하며 **프론트엔드 숙련도를 향상**시키는 데 집중했습니다.

---

## 데모

[https://react-disney-plus-app-5aee8.web.app](https://react-disney-plus-app-5aee8.web.app/)

---

## 프로젝트 구조
```
src/
├─ api/                # TMDB 요청을 위한 Axios 설정 및 API 모듈
├─ components/         # 재사용 UI 컴포넌트
├─ hook/               # useDebounce 등 커스텀 훅
├─ pages/              # 라우트별 페이지 컴포넌트
├─ store/              # Redux Toolkit 슬라이스 및 스토어 설정
├─ firebase.js         # Firebase 초기화 및 설정
├─ App.js              # 라우팅 및 레이아웃 설정
└─ index.js            # React 엔트리 포인트
```

---
## 주요 기능

- 🔐 **Firebase 구글 로그인** — 구글 계정으로 간편 인증
- 🎥 **영화 검색 기능** — TMDB API를 활용한 영화 검색/조회
- 🖼 **이미지 클릭 시 상세 보기(Modal)** — 영화 정보 모달로 확인
- 📜 **네비게이션 바 스크롤 이벤트** — 스크롤에 따른 UI 변화
- 🎨 **Styled Components 적용** — 컴포넌트 단위 스타일링
- 🖱 **Hover 시 비디오 재생** — 마우스오버 인터랙션 구현

---

## 기술 스택

| 구분                | 사용 기술 |
|-------------------|-----------|
| **Frontend**      | React 19.1.1, React DOM 19.1.1, React Router DOM 7.8.2 |
| **Styling**       | Styled Components 6.1.19 |
| **API 요청**      | Axios 1.11.0, The Movie DB API |
| **인증/배포**     | Firebase 12.2.1 (Authentication, Hosting) |
| **기타 라이브러리**| Swiper 11.2.10 (슬라이더 UI), Testing Library |

---

## 설치 및 실행 방법

```bash
# 1. 클론하기
git clone https://github.com/Kwak1999/react-disney-plus-app.git

# 2. 폴더 이동
cd react-disney-plus-app

# 3. 패키지 설치
npm install
npm install firebase # Firebase
npm install styled-components # Styled Components (CSS-in-JS)
npm install axios # Axios (API 요청)
npm install swiper # Swiper (슬라이더 UI)
npm install @reduxjs/toolkit react-redux # redux-toolkit

# 4. 개발 서버 실행
npm run start
```

```bash
firebase init # 셋팅

firebase deploy # firebase 실행
```

## 참고자료

- MDN Web Docs
- Swiper 공식 사이트
- Firebase 공식 문서
- The Movie Database API
