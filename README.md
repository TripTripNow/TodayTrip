## TodayTrip | 다양한 체험을 한 눈에!

TodayTrip은 세계 각지에서 즐길 수 있는 **다양한 체험을 등록하고 예약할 수 있는 플랫폼**입니다.

여행자들과 일정을 조율하는 데 어려움을 겪으셨나요? 다양한 체험을 관리하는 것이 번거로우셨나요? TodayTrip에서는 간편하게 체험을 등록하고 예약을 편리하게 관리할 수 있습니다.

여행을 계획할 때 어떤 활동을 선택해야 할지 고민이 되셨다면, 여행을 떠나기 전 TodayTrip에서 원하는 체험을 예약해보세요!

#### ⏰ 개발기간: 2024.01.20 ~ 2024.02.29

#### 🌐 Deploy: https://today-trip.vercel.app/

## 👥 Team

|                                                                                                                   |                                                                                                                       |                                                                                                        |                                                                                                                  |                                                                                                                             |
| :---------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
|          <img src="https://avatars.githubusercontent.com/u/111335529?v=4" width="125PX" height="125PX">           |             <img src="https://avatars.githubusercontent.com/u/91651812?v=4" width="125PX" height="125PX">             |     <img src="https://avatars.githubusercontent.com/u/97735859?v=4" width="125PX" height="125PX">      |          <img src="https://avatars.githubusercontent.com/u/77039033?v=4" width="125PX" height="125PX">           |               <img src="https://avatars.githubusercontent.com/u/112458620?v=4" width="125PX" height="125PX">                |
| [김소은](https://github.com/summerkimm) <br/>예약 상세 페이지<br/>버튼 컴포넌트 <br/> 드롭다운 컴포넌트<br/><br/> | [박경서](https://github.com/zermzerm)<br/>체험관리 페이지<br/>체험 등록/수정 페이지<br/>navbar 및 알림 기능<br/><br/> | [박종민](https://github.com/qooktree1)<br/> 메인페이지<br/>예약현황 페이지<br/>페이지네이션<br/>캐러셀 | [전수빈](https://github.com/SoobinJ)<br/>로그인 및 회원가입<br/>마이페이지<br/>토큰 관리<br/>navbar 및 알림 기능 | [조유담](https://github.com/youdame)<br/> 체험 상세 페이지<br/>예약내역 페이지<br/>무한스크롤 custom hook<br/>모달 컴포넌트 |

## ⚒️ Stacks

<img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3776AB.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp;&nbsp;&nbsp;
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=white"/>&nbsp;&nbsp;
<img alt="Next.js" src ="https://img.shields.io/badge/Next.js-000000.svg?&style=for-the-badge&logo=Next.js&logoColor=white"/>&nbsp;&nbsp;
<img alt="CSS Modules" src ="https://img.shields.io/badge/CSS Modules-000000.svg?&style=for-the-badge&logo=css-modules&logoColor=white"/>&nbsp;&nbsp;
<img alt="React Query" src ="https://img.shields.io/badge/React Query-FF4154.svg?&style=for-the-badge&logo=react query&logoColor=white"/>&nbsp;&nbsp;
<img alt="Vercel" src ="https://img.shields.io/badge/Vercel-black.svg?&style=for-the-badge&logo=Vercel&logoColor=white"/>

## 📝 서비스 내용

#### 메인 페이지

- 체험 검색 기능: 사용자의 최신 검색어를 로컬 스토리지에 저장하여 편리한 검색 기능 제공
- 인기 체험은 캐러셀, 전체 체험 페이지네이션으로 구현
- 카테고리 및 가격 필터링

#### 체험 상세 페이지

- 각 체험에 대한 상세 정보 제공
- 체험 장소 : 전 세계 체험을 대상으로 하기에 **Google Maps API**을 이용해 지도 제공
- 체험 후기 : 페이지네이션으로 구현
- 체험 예약 : 캘린더를 이용해 가능한 날짜와 시간에 체험 예약 가능

#### 내 정보 페이지

- 개인정보 수정 : 닉네임, 비밀번호, 프로필 이미지 수정 가능

#### 예약 내역 페이지

- 예약 내역 확인 : 예약 신청, 예약 취소, 예약 승인, 예약 거절, 체험 완료 등 예약 상태에 따라 필터링
- 예약 취소 및 후기 작성 : 예약 신청 상태의 예약 취소 및 체험 완료인 예약의 후기 작성이 가능

#### 예약 상세 페이지

- 각 예약의 상세 정보 제공
- 예약 취소 및 후기 작성 : 예약 신청 상태의 예약 취소 및 체험 완료인 예약의 후기 작성이 가능

#### 내 체험 관리

- 체험 등록 및 등록한 체험 수정
- 제목, 카테고리, 설명, 가격, 주소, 예약 시간대, 배너 이미지, 소개 이미지 설정 및 수정 가능
  - 주소는 **Google Maps API**를 활용하여 자동 완성 기능 구현

#### 예약 현황

- 예약 현황을 한 눈에 볼 수 있는 캘린더 제공
- 캘린더 내에서 각 날짜를 클릭하면 모달을 통해 예약 수락 및 거절 가능

## 서비스 화면
![main](https://github.com/TripTripNow/TodayTrip/assets/97735859/a50e9785-efae-4222-8a09-80468d48601e)
![experienceDetailed](https://github.com/TripTripNow/TodayTrip/assets/97735859/73eee9e7-5827-4e4d-bf7e-e9b41fa62144)


## 🪧 협업

- git flow 전략 사용
- PR, Commit, Naming Convention 및 Ground Rule 설정
- 10 a.m. - 팀 회의(Github Discussion 이용)

- 주초에 마일스톤을 설정하여 해야할 일 분배
- 이슈 발행 후 각 이슈에 맞는 브랜치 생성 후 작업
- 모든 PR에 대해 팀원들이 코드 리뷰를 진행하고 Feedback
- 1차 코드 리뷰 -> 리뷰 반영 -> 리뷰 반영 확인 및 2차 코드 리뷰 -> 머지
- 매주 회고를 통한 협업 프로세스 강화

## 📁 폴더 구조

```
./
├── README.md
├── public/       -> 폰트, 이미지, 아이콘 모음
├── src/
    ├── apis/         -> api
    ├── components/   -> 컴포넌트
    ├── constants/    -> 상수
    ├── hooks/        -> 커스텀 훅
    ├── pages/        -> 페이지
    ├── styles/       -> 스타일 관련
    ├── types/        -> 타입 관련
    ├── utils/        -> 함수 관련
└──
```
