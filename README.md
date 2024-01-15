# 🖥️ 프로젝트 소개

Vanilla.js + TMDB API를 사용한 영화 소개 및 검색 사이트입니다.
<br><br>
# ⏰ 개발 기간

2024.01.06 ~ 2024.01.15 (10일)
<br><br>
# ⚙️ 사용 기술

+ **Development**: HTML, CSS, JavaScript
+ **Design** : Figma
+ **API** : TMDb API


<br>

# 🎬 시작 가이드

**1. git clone**

   ```shell
   $ git clone https://github.com/MyNameSieun/Cin-Search.git
   $ cd CineSearch
   ```

**2. vs code에서 라이브서버를 켜주세요.**

<br>

# ✒️ 와이어프레임
|  메인페이지, 상세페이지  |  리뷰 작성 탭   |   예고편 탭  |
| ---- | ---- | ---- |
|   ![image-20240115192419216](https://github.com/MyNameSieun/Cin-Search/assets/103973797/347a6f33-344b-45cd-9fb7-a37a269f2793)   |  ![image-20240115192528196](https://github.com/MyNameSieun/Cin-Search/assets/103973797/db0cdd85-0be6-4271-a8e2-34fda399824e)| ![image-20240115192506840](https://github.com/MyNameSieun/Cin-Search/assets/103973797/30d9e4ab-2e63-4c4a-aff2-93fd0ac729d2)  |


<br>

# 🗒️ 구현 항목

### 🔽메인페이지

- TMDB 오픈 API를 사용하여 인기영화 데이터를 가져옵니다.
- TMDB에서 받아온 데이터를 브라우저 화면에 카드 형태의 데이터로 보여줍니다.
- 카드에 마우스를 가져다대면 카드가 뒤집히면서 영화 줄거리와 버튼이 나타납니다.
- 버튼 클릭시 클릭한 영화의 상세페이지로 이동합니다.
- 영화 제목을 검색하여 찾을 수 있도록 합니다.

![Ciné Search](<assets/video/Ciné Search.gif>)
|  <p align="center"><img src="https://github.com/MyNameSieun/Cin-Search/assets/103973797/0c3924be-e144-4678-ad37-dd131080353c" style="width:80%" /></p>    |
| ---- |

<br>

### 🔽상세페이지 - 상세정보

+ **상세정보 포스터**
  +   포스터 이미지와 영화 평점, 개봉일, 러닝타임, 장르 등을 확인할 수 있습니다.
+ **탭 메뉴**
  + 영화 상세 정보, 리뷰, 그리고 예고편을 표시하는 세 가지 탭으로 구성되어있습니다. 각 탭을 클릭하면 해당 섹션의 내용이 화면에 나타납니다.
+ **상세정보**
  + 영화의 제목, 태그라인, 개요, 제작사를 화면에 표시합니다.

|  <p align="center"><img src="https://github.com/MyNameSieun/Cin-Search/assets/103973797/aab5dc05-1884-4dbc-a164-56284e1d685e" style="width:60%"/></p>    |
| ---- |
<br>

### 🔽상세페이지 - 영화 리뷰 작성

+ 리뷰 작성
  + 닉네임과 비밀번호를 입력하고 리뷰 작성 후 등록하여 리뷰를 저장할 수 있습니다. 
  + 리뷰 작성 시 로컬 스토리지에 저장됩니다.
  + 작성된 리뷰는 해당 영화의 리뷰 목록에 동적으로 추가되어 화면에 표시됩니다.

 |  <p align="center"><img src="https://github.com/MyNameSieun/Cin-Search/assets/103973797/9722ff98-e417-4acc-a46c-00f9e0de409c" style="width:80%"/></p>    |
| ---- |


+ 리뷰 삭제
  + 작성된 리뷰는 삭제할 수 있습니다.
  + 삭제를 시도할 때 비밀번호 확인 모달이 나타나며, 비밀번호를 확인한 후 삭제를 진행합니다.
 
|  <p align="center"><img src="https://github.com/MyNameSieun/Cin-Search/assets/103973797/dcf38771-2a01-4b60-8be1-2077821d27ce" style="width:80%"/></p>  |  <p align="center"><img src="https://github.com/MyNameSieun/Cin-Search/assets/103973797/dd672c69-fe10-430a-9778-b55b66f67558" style="width:80%"/></p>  |
| ---- | ---- | 

<br>

### 🔽상세페이지 - 예고편

+ 예고편
  + TMDb API를 통해 영화 예고편 데이터를 가져와 유튜브에 업로드되어 있는 예고편을 시청할 수 있습니다.

 |  <p align="center"><img src="https://github.com/MyNameSieun/Cin-Search/assets/103973797/ff824efc-1d31-4a1c-85fa-9255af1c9745" style="width:80%"/></p>    |
| ---- |

<br><br><br>
---
