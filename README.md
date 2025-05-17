# Trippy.kr - 기내 반입 금지 물품 판별 서비스

Trippy.kr은 이미지 인식 기술을 활용하여 항공기 기내 반입 가능 여부를 판별해주는 서비스입니다. 여행객들이 공항 보안 검색대에서 불필요한 지연이나 물품 압수를 방지할 수 있도록 도와줍니다.

🔗 **웹사이트 주소**: [https://trippy.kr](https://trippy.kr)

## 프로젝트 개요

여행을 준비하면서 많은 사람들이 항공기 기내 반입 가능 물품에 대한 정확한 정보를 찾는 데 어려움을 겪습니다. Trippy.kr은 이러한 문제를 해결하기 위해 개발된 서비스로, 사용자가 물품 사진을 촬영하거나 물품명을 검색하면 해당 물품의 기내 반입 가능 여부를 즉시 확인할 수 있습니다.

## 주요 기능

### 이미지 인식 기반 물품 판별

- 카메라로 물품 촬영 후 기내 반입 가능 여부 즉시 확인
- 정확한 물품 인식 및 분류 시스템

### 물품 검색

- 물품명 직접 검색을 통한 반입 가능 여부 확인
- 다양한 물품 데이터베이스 보유

### 반입 금지 물품 정보

- 카테고리별 반입 금지 물품 목록 제공
- 각 물품에 대한 상세 규정 및 예외 사항 안내

### 추천 물품

- 자주 검색되는 인기 물품 목록 제공
- 반입 금지 물품의 대체품 추천

### 챗봇 지원

- 물품 반입 관련 질문에 대한 실시간 답변 제공
- 사용자 맞춤형 여행 준비 가이드

## 기술 스택

### 프론트엔드

- [Next.js](https://nextjs.org/) - React 기반 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 지원
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 우선 CSS 프레임워크
- [Headless UI](https://headlessui.com/) - 접근성 있는 UI 컴포넌트

### 상태 관리 및 데이터 페칭

- [SWR](https://swr.vercel.app/) - React Hooks를 위한 데이터 페칭 라이브러리
- [Custom Hooks](/src/hooks) - 애플리케이션 상태 관리

### 통신

- [Axios](https://axios-http.com/) - HTTP 클라이언트
- [Socket.io-client](https://socket.io/docs/v4/client-api/) - 실시간 통신

### 백엔드 연동

- RESTful API 연동
- 이미지 처리 및 인식 API

## 프로젝트 구조

```
trippy-fe/
├── public/             # 정적 파일 (이미지, 아이콘 등)
├── src/                # 소스 코드
│   ├── app/            # Next.js App Router 페이지
│   │   ├── check/      # 물품 검사 페이지
│   │   ├── connect/    # 연결 페이지
│   │   ├── login/      # 로그인 페이지
│   │   ├── scanner/    # 스캐너 페이지
│   │   ├── layout.tsx  # 레이아웃 컴포넌트
│   │   └── page.tsx    # 메인 페이지
│   ├── components/     # 재사용 가능한 컴포넌트
│   │   ├── chatbot/    # 챗봇 관련 컴포넌트
│   │   ├── test/       # 테스트 컴포넌트
│   │   ├── CameraComponent.tsx # 카메라 컴포넌트
│   │   ├── CheckHome.tsx       # 물품 검사 홈 컴포넌트
│   │   ├── ForbidList.tsx      # 금지 물품 목록 컴포넌트
│   │   ├── IndexHero.tsx       # 메인 페이지 히어로 컴포넌트
│   │   ├── ItemDrawer.tsx      # 물품 정보 드로어 컴포넌트
│   │   ├── LoaderList.tsx      # 로딩 컴포넌트
│   │   ├── Login.tsx           # 로그인 컴포넌트
│   │   └── RecommendList.tsx   # 추천 물품 목록 컴포넌트
│   ├── constants/      # 상수 및 설정
│   ├── hooks/          # 커스텀 훅
│   ├── interfaces/     # 타입 인터페이스
│   ├── types/          # 타입 정의
│   └── utils/          # 유틸리티 함수
├── .eslintrc.json      # ESLint 설정
├── next.config.js      # Next.js 설정
├── package.json        # 의존성 및 스크립트
├── postcss.config.js   # PostCSS 설정
├── tailwind.config.ts  # Tailwind CSS 설정
└── tsconfig.json       # TypeScript 설정
```

## 주요 페이지

### 메인 페이지 (`/`)

- 서비스 소개 및 주요 기능 안내
- 물품 검사 페이지로 이동 버튼

### 물품 검사 페이지 (`/check`)

- 카메라를 통한 물품 촬영 및 인식
- 물품명 직접 검색 기능
- 검색 결과 및 반입 가능 여부 표시

### 로그인 페이지 (`/login`)

- 사용자 인증 기능

## 시작하기

### 개발 환경 설정

1. 저장소 클론

```bash
git clone [repository-url]
cd trippy-fe
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

4. 브라우저에서 확인

- [http://localhost:3000](http://localhost:3000)

## 빌드 및 배포

프로덕션 빌드를 생성하려면:

```bash
npm run build
# 또는
yarn build
```

서버를 시작하려면:

```bash
npm run start
# 또는
yarn start
```

## API 연동

Trippy.kr은 다음 API 엔드포인트를 사용합니다:

- 물품 정보 조회: `https://port-0-trippy-be-cn1vmr2clp9p0y3x.sel5.cloudtype.app/avsec/[물품명]`
- 이미지 업로드 및 인식: `https://port-0-trippy-be-cn1vmr2clp9p0y3x.sel5.cloudtype.app/image/upload`

---

# Trippy.kr - Prohibited Items Detection Service for Air Travel

Trippy.kr is a service that uses image recognition technology to determine whether items can be carried onto aircraft. It helps travelers prevent unnecessary delays or item confiscation at airport security checkpoints.

🔗 **Website URL**: [https://trippy.kr](https://trippy.kr)

## Project Overview

Many people struggle to find accurate information about items allowed on aircraft when preparing for travel. Trippy.kr was developed to solve this problem, allowing users to take photos of items or search for item names to immediately check whether they can be carried onboard.

## Key Features

### Image Recognition-Based Item Detection

- Take photos of items to instantly check if they can be carried onboard
- Accurate item recognition and classification system

### Item Search

- Check carry-on eligibility by directly searching for item names
- Extensive item database

### Prohibited Items Information

- List of prohibited items by category
- Detailed regulations and exceptions for each item

### Recommended Items

- List of popular frequently searched items
- Recommendations for alternatives to prohibited items

### Chatbot Support

- Real-time answers to questions about item carry-on regulations
- Personalized travel preparation guides

## Technology Stack

### Frontend

- [Next.js](https://nextjs.org/) - React-based framework
- [TypeScript](https://www.typescriptlang.org/) - Static typing support
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Headless UI](https://headlessui.com/) - Accessible UI components

### State Management and Data Fetching

- [SWR](https://swr.vercel.app/) - Data fetching library for React Hooks
- [Custom Hooks](/src/hooks) - Application state management

### Communication

- [Axios](https://axios-http.com/) - HTTP client
- [Socket.io-client](https://socket.io/docs/v4/client-api/) - Real-time communication

### Backend Integration

- RESTful API integration
- Image processing and recognition API

## Project Structure

```
trippy-fe/
├── public/             # Static files (images, icons, etc.)
├── src/                # Source code
│   ├── app/            # Next.js App Router pages
│   │   ├── check/      # Item checking page
│   │   ├── connect/    # Connection page
│   │   ├── login/      # Login page
│   │   ├── scanner/    # Scanner page
│   │   ├── layout.tsx  # Layout component
│   │   └── page.tsx    # Main page
│   ├── components/     # Reusable components
│   │   ├── chatbot/    # Chatbot-related components
│   │   ├── test/       # Test components
│   │   ├── CameraComponent.tsx # Camera component
│   │   ├── CheckHome.tsx       # Item check home component
│   │   ├── ForbidList.tsx      # Prohibited items list component
│   │   ├── IndexHero.tsx       # Main page hero component
│   │   ├── ItemDrawer.tsx      # Item information drawer component
│   │   ├── LoaderList.tsx      # Loading component
│   │   ├── Login.tsx           # Login component
│   │   └── RecommendList.tsx   # Recommended items list component
│   ├── constants/      # Constants and configurations
│   ├── hooks/          # Custom hooks
│   ├── interfaces/     # Type interfaces
│   ├── types/          # Type definitions
│   └── utils/          # Utility functions
├── .eslintrc.json      # ESLint configuration
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Main Pages

### Main Page (`/`)

- Service introduction and key features
- Button to navigate to the item check page

### Item Check Page (`/check`)

- Item photography and recognition through camera
- Direct item name search functionality
- Search results and carry-on eligibility display

### Login Page (`/login`)

- User authentication functionality

## Getting Started

### Development Environment Setup

1. Clone the repository

```bash
git clone [repository-url]
cd trippy-fe
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run development server

```bash
npm run dev
# or
yarn dev
```

4. View in browser

- [http://localhost:3000](http://localhost:3000)

## Build and Deploy

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the server:

```bash
npm run start
# or
yarn start
```

## API Integration

Trippy.kr uses the following API endpoints:

- Item information lookup: `https://port-0-trippy-be-cn1vmr2clp9p0y3x.sel5.cloudtype.app/avsec/[item-name]`
- Image upload and recognition: `https://port-0-trippy-be-cn1vmr2clp9p0y3x.sel5.cloudtype.app/image/upload`
