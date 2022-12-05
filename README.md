안숭맛춤 - 프론트엔드 <br>
Svelte
<br><br>
Backend Github : https://github.com/hwangjokim/MoneyBaap_BackEnd
## 1. 프로젝트 소개
### 1) 배경 및 기대효과
* 음식을 먹을 때 있어서 메뉴를 고르는 일은 일상생활과 매우 밀접한 문제이다. ‘점메추’(점심 메뉴 추천의 줄임말) 라는 말이 유행어가 될 만큼 하루 세끼 식사를 해결해야하는 사람들에게는 식사 메뉴를 정하는 문제에 적지 않은 고민을 하게 된다.
* 메뉴를 정할 때에 있어서 가장 중요한 요소는 무엇이 있을까? 대표적으로 가격, 거리, 맛에 대한 평점을 뽑을 수 있겠다.
* 메뉴를 고를 때 보통 ‘배달의 민족’ 앱에서 찾아보거나, 기타 포털 사이트에서 ‘맛집 추천’을 검색해보게 되는데 이렇게 음식점을 검색하는 서비스는 이미 보편화되어있다.
* 하지만, 이 서비스들 중 어디에도 메뉴 선정에 있어서 가장 중요한 요소 중 하나인 ‘가격’을 기준으로 삼는 검색 기능은 존재하지 않는다는 점을 발견했다. 인기순, 거리순, 주문 많은 순 등이 있을 뿐, 가격순으로 정렬된 정보를 획득할 수는 없다. 우리는 이 점에 착안하여 프로젝트를 기획하였다.
* ‘안숭맛춤 : 쓰고 싶은 만큼만 쓰는 식사’ 부제목에서도 알 수 있듯이 우리의 프로젝트는 어떤 서비스에도 존재하지 않는 ‘가격’을 기준으로 한 맛집 검색 기능을 제공한다.
* 음식 메뉴를 선정할 때 ‘가격’을 가장 많이 고려하는 집단은 어디일까? 우리는 외부에서 음식을 많이 사먹는 집단 중에서 비교적 금전적 여유가 부족한 ‘대학생’을 타겟층으로 잡았다. 자신의 학교를 선택하여 학교 근처의 맛집 정보를 가격 순으로 획득할 수 있기를 기대한다.
### 2) 기능
* 학교 선정 : 시작 화면에서 학교를 선택하여 어느 학교 근처의 맛집을 찾을 것인지 설정할 수 있다.
* 가격 : 가격 범위를 설정하여, 음식점들을 자신이 원하는 가격으로 필터링 할 수 있다.
메뉴 검색바 : 자신이 원하는 메뉴 키워드를 검색하여 메뉴를 해당 키워드로 필터링할 수 있다.
* 최고가순, 최저가순, 거리순 : 자신이 설정한 가격 내에서 최고가순, 최저가순, 거리순으로 원하는 정렬을 선택할 수 있다.
* 별점 : 각 메뉴에 대한 네이버 평점이 표시된다.
* 네이버 플레이스 연동 : 가격, 거리, 메뉴를 결정한 이후에 영업시간, 위치 등의 정보를 확인하기 위헤 클릭하면 해당 가게의 네이버 플레이스도 이동한다.
## 2. 상세 매뉴얼
### 1) 설치 방법
* moneybaap.me
* www.moneybaap.me
* http://moneybaap.me </br>
-> 위 세 개의 사이트 중 하나 접속 (주의 : https 접속시 접속 불가능)
### 2) 사용법
#### [시작 페이지]
![image](https://user-images.githubusercontent.com/83453646/205599542-2c663319-61d1-48aa-9945-6118492329a3.png)
* 가격 레인지 슬라이더 바
  - 가격 범위를 설정한다.
  - 가격 범위는 0원부터 20000+ 이다.
* 학교 선택 라디오 버튼
  - 서울대학교, 숭실대학교, 중앙대학교 중 하나를 선택한다. (기본값은 숭실대학교 ^^7)
* '음식점 찾기' 버튼
  - 메인 페이지로 이동한다.
#### [메인 페이지]
![image](https://user-images.githubusercontent.com/83453646/205599847-84d740da-7b28-4fd9-8e41-7fac3751cde8.png)![image](https://user-images.githubusercontent.com/83453646/205606112-fe2ad81a-aa3d-4da7-bbed-47b9a74949c9.png)
* 왼쪽 상단 안숭맛춤 로고
  - 클릭 시, 시작 페이지로 이동한다.
* 검색창
  - 최대 5개까지의 메뉴를 필터링한다.</br>
    (ex. 돈까스, 파스타, 김밥을 검색했을 때, 3가지 메뉴들의 정보가 모두 메뉴 리스트에 표시된다.)
  - 메뉴 검색하기 : 툴팁으로 메뉴 키워드가 저장되고, 저장된 키워드의 메뉴만 메뉴 리스트에 표시된다.
  - 메뉴 키워드 삭제하기 : 이미 등록된 툴팁을 클릭하면 해당 키워드가 삭제되고, 재검색된다.
* 정렬 라디오 버튼
  - 최저가순 : 사용자가 설정한 가격 범위 내에서 가격이 낮은 순서대로 정렬된다.
  - 최고가순 : 사용자가 설정한 가격 범위 내에서 가격이 높은 순서대로 정렬된다.
  - 거리순 : 음식점의 거리가 가까운 순서대로 정렬된다.
* 0원 보여주기 체크 박스
  - 네이버 플레이스 상에서 메뉴의 가격을 따로 설정하지 않아 0원으로 검색되는 메뉴들이 존재한다.
  - 네이버 플레이스에 가격이 기재되지 않은 메뉴들을 확인하고자 할 때 사용한다.
  - 해당 체크 박스는 가격 범위 시작을 0원부터 지정했을 때 보여진다.
* 메뉴 리스트
  - 메뉴를 클릭하면 해당 음식점의 네이버 플레이스로 이동한다.
* Github 버튼
  - 오른쪽 상단 Github버튼을 클릭하면 Github MoneyBaap Repo로 이동한다.
## 3. 프로젝트 개발 참고 서적 및 참고 사이트 URL
### 1) Front
* [Github] Svelte 기본 문법 및 가이드 </br>
https://kyounghwan01.github.io/blog/Svelte/svelte-basic/
* [CSS] 사용한 css 프레임워크, Bulma </br>
https://bulma.io/documentation/
* [Github] svelte-range-slider-pips 사용 </br>
https://github.com/simeydotme/svelte-range-slider-pips
[AWS]아마존 웹 서비스에 배포하기 </br>
https://sunnyfterrain.github.io/devlog/tips-ec2.html
[Svelte] 백엔드에서 데이터 가져오기 </br>
https://freeseamew.gitbook.io/svelte/9.-ajax/untitled
[Svelte] Lazy-load 라이브러리 </br>
https://www.npmjs.com/package/@dimfeld/svelte-lazyload
### 2) Crawling
* [Selenium]크롤링 라이브러리 레퍼런스 </br>
https://www.selenium.dev/documentation/webdriver/
### 3) API
* [poiemaweb] Nods.js의 모듈화와 npm </br>
https://poiemaweb.com/nodejs-npm
* [Expressjs] DB에서 json형식으로 추출하기 </br>
https://expressjs.com/ko/api.html
* [poiemaweb] Node.js에서 비밀 설정 정보(Secrets) 관리 </br>
https://poiemaweb.com/nodejs-keeping-secrets
* [tistory] Node.js dotenv 모듈과 .env 사용하여 sql 비밀번호 숨기기 </br>
https://jacobgrowthstory.tistory.com/18
* [aws reference] API란 무엇입니까? </br>
https://aws.amazon.com/ko/what-is/api/
* [tistory] AWS 기초 이해하기 </br>
https://whatisthenext.tistory.com/122
* [Naver Developers] 네이버 Open API 사용 가이드 </br>
https://developers.naver.com/docs/common/openapiguide/apilist.md
### 4) DB
* [mongoDB reference] mongo DB에 json형식의 데이터 입력 및 추출 </br>
https://www.mongodb.com/docs/database-tools/mongoimport/
* [MySQL reference] 데이터 정렬 </br>
https://dev.mysql.com/doc/refman/8.0/en/sorting-rows.html
