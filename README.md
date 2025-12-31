# Disney Plus Clone (React)

React를 활용하여 **Disney Plus 클론 애플리케이션**을 제작하는 프로젝트입니다.  
Firebase를 이용한 **배포 및 인증/인가**, The Movie DB API를 활용한 **영화 검색·조회**,  
비디오 재생 및 다양한 UI/UX 기능을 구현하며 **프론트엔드 숙련도를 향상**시켰습니다.

---

## 데모

[https://react-disney-plus-app-5aee8.web.app](https://react-disney-plus-app-5aee8.web.app/)

---
## 배운점
1. **SPA 라우팅 설계와 레이아웃 구성**: **`App.js`**에서 공통 **`Nav`**를 감싼 **`Layout`**을 두고 로그인(**`/`**), 메인(**`/main`**), 상세(**`/:movieId`**), 검색(**`/search`**) 라우트를 정의해 확장 가능한 페이지 구성을 익힐 수 있습니다.

2. **Firebase 인증 플로우 실습**: **`Nav`** 컴포넌트에서 **`onAuthStateChanged`**로 로그인 상태를 감시하고, **`signInWithPopup`**·**`signOut`**으로 구글 로그인/로그아웃을 처리하며 라우팅까지 제어하는 패턴을 배울 수 있습니다.

3. **전역 상태 관리와 영속화**: Redux Toolkit 슬라이스로 사용자 프로필을 저장하고 Redux-Persist로 로컬 스토리지에 동기화하여 새로고침에도 인증 정보가 유지되는 구조를 경험할 수 있습니다.

4. **검색 UX 최적화(디바운스 + URL 동기화)**: 네비게이션과 검색 페이지 모두 **`useDebounce`** 훅을 활용해 입력을 완화하고 쿼리스트링과 상태를 맞춰 불필요한 API 호출을 줄이는 방법을 익힙니다.

5. **TMDB API 연동과 데이터 처리**: Axios 인스턴스에 공통 파라미터를 설정한 뒤 검색 페이지에서 **`/search/multi`** 요청을 보내 결과를 조건부 렌더링하며, 오류 처리·로딩 제어 패턴을 적용하는 연습이 됩니다.

6. **스타일드 컴포넌트로 UI/상태 연동**: 상단 바의 배경 투명도, 로그인 버튼, 검색 입력 포커스 등 UI 상태를 스타일드 컴포넌트로 표현해 재사용성과 유지보수성을 높이는 방식을 체득할 수 있습니다.

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

---
## Redux란?
복잡한 애플리케이션의 상태를 효율적으로 관리하기 위한 도구
모든 상태를 중앙의 **스토어(Store)**에 한데 모아 관리하며, 예측 불가능한 상태 변화를 방지