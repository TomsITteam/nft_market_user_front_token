# NFT 마켓 플라이스 사용자 프론트
## 프로젝트 설명
1. 시작하기
2. 디렉토리 구조
3. 브라우저 지원 범위
4. env 파일 설정
5. 로고 및 배너 이미지 변경
6. 빌드 하여 라이브 웹서버에 반영하기
7. 주의사항
8. 라이센스

### 1. 시작하기
1. 터미널 실행
2. `git clone https://github.com/Block-Chen/nft-market-user-front.git` 실행하여 저장소 복제
3. 프로젝트 디렉토리로 이동하여 `npm install` 실행
4. 시작 `npm run start`
5. 앱은 `vue.config.js` 파일에 설정된 host로 연결됩니다.

### 2. 디렉토리 구조
```
dist                    // 'npm run build'로 빌드 된 파일
public                  // index.html, favicon, 폰트 등이 폴더에 존재

1. src
src - assets          // scss 파일들로 구성되어있습니다
src - contract        // 컨트렉트 쓰기를 실행하는 함수들로 구성되어 있습니다.
src - mixins          // 전역 Function 또는 vuex 모듈 , 컴포넌트에서 사용 되고 있는 mixin이 구성되어 있습니다.
src - locales         //각 페이지 및 컴포넌트 별로 다국어 정보가 구성 되어 있습니다.
src - data            //회사 정보 , 수수료 정보 , 푸터 하단 정보 들이 json 형태 구성됩니다
src - api             //백엔드로 호출하는 Json API
src - wallet          //브라우저와 연동되는 지갑 연동
src - exchange_api    //거래소 API 로 구성
```

### 3. 브라우저 지원 범위
크롬 | 사파리 | 파이어폭스 | 익스플로러
---------------------- | ---------------------- | ---------------------- | ----------------------
지원됨 (최적화) | 지원됨 | 지원됨 | 지원안됨

### 4. env 파일 설정
````
이 파일의 설정은 개발자 모드에서만 적용되며 배포 모드로 빌드된경우
백엔드 구성 파일 중 `resources/views/vue.blade.php` 에서

<script>
window.front_env = {!! frontEnvJson() !!};
</script>
위 코드 부분 에 window.front_env 에 반영된 설정 값으로 적용됩니다.

function frontEnvJson() 위치
app/Functions/env.php
백엔드에 구성되어 있습니다.

VUE_APP_NAME                        //앱이름
VUE_APP_BASE_MAINNET                //스마트 계약이 발행된 네트워크 심볼 (ETH,BSC,KLAY)
VUE_APP_SINGLENFT_CONTRACT_ADDRESS //ERC721 발행된 스마트 계약의 주소
VUE_APP_MULTINFT_CONTRACT_ADDRESS //ERC1155 발행된 스마트 계약의 주소
VUE_APP_BASE_WALLET                 //발행,거래 등을 할때 사용될 브라우저 와 연동되어 사용되는 월렛 (METAMASK,KAIKAS)
VUE_APP_BASE_API_URI                //API 백엔드 주소 접두사
VUE_APP_BASE_EXCHANGE_API_URI       //거래소 API 주소 접두사
VUE_APP_COMPANY_ADDRESS             //회사 주소
VUE_APP_COMPANY_BLOG                //블로그 URL
VUE_APP_COMPANY_EMAIL               //공식 이메일
VUE_APP_COMPANY_FACEBOOK            //페이스북 URL
VUE_APP_COMPANY_INSTAGRAM           //인스타그램 URL
VUE_APP_COMPANY_NAME                //회사 상호
VUE_APP_COMPANY_NUMBER              //사업자 등록 번호
VUE_APP_COMPANY_PHONE               //공식 전화번호
VUE_APP_COMPANY_TWITTER             //트위터 URL
VUE_APP_COMPANY_TELEGRAM            //텔레그램 URL
VUE_APP_COMPANY_TEXT                //하단 회사 설명 , 문의 페이지에 노출될 회사 소개
VUE_APP_PRIVACY                     //개인정보 처리 방침 내용
VUE_APP_SERVICE                     //서비스 이용약관 내용
VUE_APP_FOOTER_TEXT                 //맨하단 내용

````

### 5. 로고 및 배너 이미지 변경
````
/public/img/logo.png                상단바 로고
/public/img/footer-logo.png         하단바 로고
로고 변경의 경우 위 두 이미지 파일을 변경 하시거나,


/src/views/Home/Components/Hero.vue
메인 페이지 배너의 경우 위 컴포넌트 파일에서 수정 하시면 됩니다.
배너는 PC용 , 모바일용 나눠집니다.
````

### 6. 빌드 하여 라이브 웹서버에 반영하기
1. 프로젝트 디렉토리로 이동하여 `npm build` 를 실행해주세요.
2. dist 폴더에 빌드된 파일들이 생성 됩니다.
3. `index.html` 를 제외하고 웹서버의 백엔드 프로젝트 디렉토리로 의 하위에 있는 `public` 디렉토리에 업로드 해주세요. 기존에 있던 파일은 덮여 씌우기를 합니다.
4. 빌드하여 생성된 `index.html` 파일 안에 파일 이름이 변경된 `js , css` 파일 이름과 동일하게 백엔드 프로젝트의 `resources/views/vue.blade.php` 안에 `js,css` 링크를 수정해주세요.
5. 위 방법에 대해서 잘 모르시겠다면 BLOCKSDK 에 연락 바랍니다.

### 7. 주의사항
````
페이지 제목 (title) 수정시 views 의 vue 코드 내부에서 document.title 와
백엔드에서 title 기입시키는 부분 둘다 수정 진행하셔야 합니다
````
### 8. 라이센스
````
배포 및 변형하여 판매하는 행위가 금지 됩니다
````
