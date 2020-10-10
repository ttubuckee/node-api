# REST API Reference (ARmera)
<br>

* version: 1.0.0
* Servers: http://api.ar.konk.uk/   

건국대학교 졸업프로젝트 ARmera 서버통신 api입니다.<br><br>
<br>   

## /beacon    
| Members | Descriptions |
|:---|:---|
| GET /beacon/ | 전체 비콘 좌표 리스트 조회 |
| GET /beacon/{beacon_id} | 해당 beacon_id 비콘 정보 조회 |
<br>

### GET /beacon/ : 전체 비콘 좌표 리스트 조회 
<br>
 HTTP Result Code가 200 OK일 때 전체 비콘 좌표 리스트를 반환합니다. 
<br>

 * #### Response   
<br> 

 | Field | Type | Description |
 |:---|:---|:---|
 | id | int | 파라미터로 수신한 비콘의 id |
 | title | string | 비콘의 이름 |
 | latitude | double | 비콘의 경도 |
 | longitude | double | 비콘의 위도 |   
 <br>
 
 #### 성공 예제:
 
 ``` javascript
  [{"id":1,"title":"수의학관","latitude":37.539097,"longitude":127.074711},{"id":2,"title":"공학관","latitude":37.541591,"longitude":127.078893},{"id":3,"title":"인문학관","latitude":37.542436,"longitude":127.078709},{"id":4,"title":"새천년관","latitude":37.543684,"longitude":127.077522},{"id":5,"title":"상허기념도서관","latitude":37.542024,"longitude":127.073852},{"id":6,"title":"법학관","latitude":37.541604,"longitude":127.075089},{"id":7,"title":"황소상","latitude":37.543097,"longitude":127.076151},{"id":8,"title":"와우도","latitude":37.540066,"longitude":127.076585},{"id":9,"title":"산학협동관","latitude":37.54003,"longitude":127.073323},{"id":10,"title":"상허유석창박사동상","latitude":37.54131,"longitude":127.073432},{"id":12,"title":"KU시네마테크","latitude":37.5413385,"longitude":127.0764793},{"id":13,"title":"건국대학교병원","latitude":37.540432,"longitude":127.072298},{"id":14,"title":"건국대학교 기숙사","latitude":37.539296,"longitude":127.077187},{"id":15,"title":"상허유석창박사의묘","latitude":37.540447,"longitude":127.077831},{"id":17,"title":"신공학관","latitude":37.540532,"longitude":127.079462},{"id":18,"title":"이과대학","latitude":37.541479,"longitude":127.080421},{"id":19,"title":"도정궁 경원당","latitude":37.542163,"longitude":127.080389},{"id":20,"title":"경영관","latitude":37.54413,"longitude":127.076368},{"id":24,"title":"학생회관","latitude":37.542205,"longitude":127.077558},{"id":25,"title":"상허연구관","latitude":37.543893,"longitude":127.075482},{"id":26,"title":"행정관","latitude":37.54303,"longitude":127.07531},{"id":29,"title":"상허박물관","latitude":37.542303,"longitude":127.075793},{"id":31,"title":"동물생명과학관","latitude":37.540053,"longitude":127.074401},{"id":32,"title":"생명과학관","latitude":37.541106,"longitude":127.073955},{"id":33,"title":"민주항쟁 동상","latitude":37.543767,"longitude":127.076418}]
 ```   
 <br>
 
### GET /beacon/{beacon_id}/ : 해당 beacon_id 비콘 정보 조회   
<br>
 HTTP Result Code가 200 OK일 때 해당 beacon_id 비콘 좌표 리스트를 반환합니다.


  * #### Request Parameters   
<br> 

 | Parameter | Type | Description |
 |:---|:---|:---|
 | user_id | | 조회할 사용자 ID |   
 
 * #### Response   
<br> 

 | Field | Type | Description |
 |:---|:---|:---|
 | id | int | 파라미터로 수신한 비콘의 id |
 | title | string | 비콘의 이름 |
 | description | string | 비콘에 대한 설명 |
 | stamp | object | 등록 되어있는 스탬프 정보 |
 | latitude | double | 비콘의 경도 |
 | longitude | double | 비콘의 위도 |
 | image_list | array | object detection 이미지 정보 |
 <br>
 
 #### 성공 예제:
 
 ``` javascript
 {"id":1,"title":"수의학관","description":"수의학관에 대한 정보를 입력합니다.","stamp":null,"latitude":37.539097,"longitude":127.074711,"image_list":[]}
 ```
 <br>

## /image   
| Members | Descriptions |
|:---|:---|
| GET /image/ | 이미지 업로드 페이지 렌더링 |
| GET /image/{image_id} | 해당 image_id 이미지 전송 |
<br>

### GET /image/ : 이미지 업로드 페이지 렌더링
<br>

이미지를 업로드할 수 있는 페이지를 렌더링합니다.
<br><br>

### GET /image/{image_id}/ : 해당 image_id 이미지 전송
<br>
HTTP Result Code가 200 OK일 때 image_id에 해당하는 이미지를 반환합니다.

  * #### Request Parameters   
<br> 

 | Parameter | Type | Description |
 |:---|:---|:---|
 | image_id | int | 이미지 아이디 |
 
   * #### Response
<br> 

| Field | Type | Description |
|:---|:---|:---|
| image | object | 이미지 파일 전송 |
<br>


## /main   
| Members | Descriptions |
|:---|:---|
| GET /main/weather | 현재 날씨 정보 조회 |
| GET /main/{user_id} | 현재 스탬프 수집 정보 조회 |
<br>

### GET /main/weather/ : 현재 날씨 정보 조회
<br>

 HTTP Result Code가 200 OK일 때 현재 날씨 정보를 반환 합니다.

 <br>
 
 * #### Response
 <br>
 
 | Field | Type | Description |
 |:---|:---|:---|
 | weather | string | 현재 날씨 정보 |
 | dust | string | 현재 미세먼지 정보 |
 <br>
 
 #### 성공 예제:
 <br>
 
 ``` javascript
 {"weather":"구름많음, 어제보다 0˚ 높아요","dust":"23㎍/㎥ 좋음"}
 ```
 <br>
 
 ### GET /main/{user_id} : 현재 스탬프 수집 정보 조회
 <br>
 
 * #### Request Parameters
 <br>
 
 | Parameters | Type | Description |
 |:---|:---|:---|
 | user_id | int | 유저 아이디 |
 
 * #### Response
 <br>
 
 | Field | Type | Description |
 |:---|:---|:---|
 | stamp_status | array | 스탬프 번호 리스트 |
 | stamp_ahcievement | double | 획득 퍼센트 |
 
 #### 성공 예제:
 <br>
 
 ``` javascript
 {"stamp_status":[1,2],"stamp_achievement":7.6923076923076925}
 ```
 

## /route   
| Members | Descriptions |
|:---|:---|
| GET /route/ | 전체 경로 리스트 조회 |
| GET /route/{route_id} | 해당 route_id 경로 정보 조회 |
| POST /route/{route_id} | 투어 시작시 유저의 경로 정보 업데이트 |
| POST /route/{route_id}/complete | 투어 종료시 유저의 경로 정보 업데이트 |
<br>


### GET /route/ : 전체 경로 리스트 조회
<br>

HTTP Result Code가 200 OK일 때 전체 경로 리스트를 반환 합니다.
<br>

* #### Response
<br>

| Field | Type | Description |
|:---|:---|:---|
| id | int | 경로 id |
| title | string | 경로 이름 |
| estimated_time | int | 예상 투어 소요 시간 |
| total_distance | double | 경로의 총 길이 |
<br>

#### 성공 예제:
<br>

``` javascript
[{"id":1,"title":"캠퍼스 이모저모","estimated_time":52,"total_distance":15.2},{"id":2,"title":"일감호 주변 한바퀴","estimated_time":52,"total_distance":15.2},{"id":3,"title":"설립자 발자취","estimated_time":52,"total_distance":15.2},{"id":4,"title":"교내 역사유적 탐방","estimated_time":52,"total_distance":15.2},{"id":5,"title":"이과계열 강의실 둘러보기","estimated_time":52,"total_distance":15.2},{"id":6,"title":"문과계열 강의실 둘러보기","estimated_time":52,"total_distance":15.2},{"id":7,"title":"공대생의 하루","estimated_time":52,"total_distance":15.2},{"id":8,"title":"경영대 새내기의 하루","estimated_time":52,"total_distance":15.2},{"id":9,"title":"축산대학 탐방","estimated_time":52,"total_distance":15.2},{"id":10,"title":"학생회관 부터 도서관까지","estimated_time":13,"total_distance":9.2}]
```
<br>

### GET /route/{route_id} : 해당 route_id 경로 정보 조회
<br>

HTTP Result Code가 200 OK일 때 해당 경로 정보를 반환 합니다.
<br>

* #### Request Parameters
<br>

| Parameters | Type | Description |
|:---|:---|:---|
| route_id | int | 경로 id |

* #### Response
<br>

| Field | Type | Description |
|:---|:---|:---|
| id | int | 경로 id |
| estimated_time | int | 예상 투어 소요 시간 |
| total_distance | string | 경로의 총 길이 |
| beacon_list | array | 비콘 리스트 |

#### 성공 예제:
<br>

``` javascript
{"id":1,"title":"캠퍼스 이모저모","estimated_time":52,"total_distance":15.2,"beacon_list":[{"id":1,"title":"수의학관","description":"수의학관에 대한 정보를 입력합니다.","longitude":127.074711,"latitude":37.539097,"index":1},{"id":8,"title":"와우도","description":"와우도 정보를 입력합니다","longitude":127.076585,"latitude":37.540066,"index":2},{"id":2,"title":"공학관","description":"공과대학에 대한 정보를 기록합니다.","longitude":127.078893,"latitude":37.541591,"index":3},{"id":3,"title":"인문학관","description":"문과대학 정보를 입력합니다.","longitude":127.078709,"latitude":37.542436,"index":4},{"id":4,"title":"새천년관","description":"정보통신대학에 관한 정보를 입력합니다.","longitude":127.077522,"latitude":37.543684,"index":5},{"id":6,"title":"법학관","description":"법과대학 정보를 입력합니다.","longitude":127.075089,"latitude":37.541604,"index":6},{"id":5,"title":"상허기념도서관","description":"중도 관련 설명을 입력합니다.","longitude":127.073852,"latitude":37.542024,"index":7},{"id":7,"title":"황소상","description":"황소상!","longitude":127.076151,"latitude":37.543097,"index":8}]}
```
<br>

### POST /route/{route_id} : 투어 시작시 유저의 정보 업데이트
<br>

HTTP Result Code가 200 OK일 때 유저의 최근 경로 정보를 업데이트 합니다.
<br>

* #### Request Parameters
<br>

| Parameters | Type | Description |
|:---|:---|:---|
| route_id | int | 경로 id|

* #### Body 
<br>

|Parameters| Type | Description | 
|:---|:---|:---|
| user_id | int | 유저 id |

* #### Response
<br>

| Field | Type | Description |
|:---|:---|:---|
| result | string | 업데이트 성공 메세지 |
<br>

#### 성공 예제:
<br>

``` javascript
{"result":"complete"}
```
<br>

### POST /route/{route_id} : 투어 종료시 유저의 경로 정보 업데이트
<br>

HTTP Result Code가 200 OK일 때 유저의 경로 정보를 업데이트 합니다.
<br>

* #### Request Parameters
<br>

| Parameters | Type | Description |
|:---|:---|:---|
| route_id | int | 경로 id |

* #### Body
<br>

| Parameters | Type | Description |
|:---|:---|:---|
| uesr_id | int | 유저 id |

* #### Response
<br>

| Field | Type | Description |
|:---|:---|:---|
| result | string | 업데이트 성공 메세지 |
<br>

#### 성공 예제:
<br>

``` javascript
{"result":"complete"}
```
<br>

## /stamp   
| Members | Descriptions |
|:---|:---|
| POST /stamp/ | 스탬프 식별 결과 전송 |
<br>

### POST /stamp/ : 스탬프 식별 결과 전송
<br>

HTTP Result Code가 200 OK일 때 스탬프 식별 결과를 전송
<br>

* #### Body
<br>

| Parameters | Type | Description |
|:---|:---|:---|
| image | object | 이미지 파일 |

* #### Response
<br>

| Field | Type | Description |
|:---|:---|:---|
| result | string | 이미지 비교 결과 반환 |

#### 성공 예제:
<br>

``` javascript
{"result":"1"}
```



