# TFT Helper
## 내가 쓰려고 만든 Team FightTactics Helper,
## 기록
```
2023.12.16 tft 한판지고 열받아서 샤워하다가 만들어야겠다고 생각이 듬..
2023.12.17 프로젝트 시작
2023.12.18 선택된 챔피언에 따른 배치툴 페이지, 챔피언 페이지 개발
  ?? 편하게 tailwindcss 쓰려고 추가했는데 왜 styled-component가 난 더 편할까...
2023.12.19 버그 수정 및 시너지, 아이템 페이지 제작 준비.
2023.12.20 소환사 검색, 최근전적 API 추가, 라우팅 수정, 버그 수정
  ?? docs를 왜 전부 chore로 커밋하고 있었지...??
2023.12.21 휴식
2023.12.22 소환사 검색 skeleton 적용, 소환사 타입 추가
2023.12.23 ~ 2023.12.25 연말 휴식
```
---
## Getting started
1. 프로젝트 인스톨
```bash
yarn install
```

2. env.local 파일 생성
```
root에 있는 env.local.sample 파일 복사 후 env.local 파일 생성
```

3. TFT Developer key 발급 후 env.local에 입력
> 키 발급 : https://developer.riotgames.com

4. 프로젝트 실행
```bash
yarn dev
```

4. json-server 실행
```
npx json-server --port 9999 --watch db.json
```
---
## Screenshot
<img width="1000" alt="스크린샷 2023-12-20 오후 6 36 59" src="https://github.com/yongyi-gil/tft-helper/assets/46886774/c098a8d7-3483-41f5-b0d2-7d91e9e92ae8">
<img width="1255" alt="스크린샷 2023-12-20 오후 1 38 53" src="https://github.com/yongyi-gil/tft-helper/assets/46886774/97db1426-8181-4aa7-8200-301abc403368">
<img width="359" alt="스크린샷 2023-12-20 오후 1 39 06" src="https://github.com/yongyi-gil/tft-helper/assets/46886774/8e676a89-695d-4621-bc4a-9d6fcb1a7f0f">
<img width="483" alt="스크린샷 2023-12-20 오후 2 08 56" src="https://github.com/yongyi-gil/tft-helper/assets/46886774/b68376a9-43a5-4722-93c3-83a04c5b339f">
