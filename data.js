// 학습 콘텐츠 (로드맵: Phase 1~10)
// ※ 개념/문제 내용은 일반 지식으로 직접 작성한 요약입니다. 'resources'의 교재와 대조해 검증하며 공부하세요.
window.CATEGORIES = [
  { id: "p1", name: "Phase 1 자바 기초·협업", icon: "☕", resources: ["김영한 자바 기본~중급", "자바의 정석", "Git 교과서"] },
  { id: "p2", name: "Phase 2 객체지향", icon: "🧩", resources: ["김영한 스프링 입문", "객체지향의 사실과 오해"] },
  { id: "p3", name: "Phase 3 실무 기초", icon: "🌐", resources: ["김영한 HTTP·MVC", "주니어 백엔드 실무 지식"] },
  { id: "p4", name: "Phase 4 스프링 핵심", icon: "🌱", resources: ["김영한 스프링 핵심 원리", "토비의 스프링"] },
  { id: "p5", name: "Phase 5 DB 최적화", icon: "🗄️", resources: ["김영한 DB 강의", "Real MySQL 8.0", "SQL 레벨업"] },
  { id: "p6", name: "Phase 6 JPA", icon: "🔗", resources: ["김영한 JPA 강의", "자바 ORM 표준 JPA 프로그래밍"] },
  { id: "p7", name: "Phase 7 코드 품질", icon: "✨", resources: ["김영한 자바 고급", "실용주의 프로그래머", "이펙티브 자바", "Clean Code"] },
  { id: "p8", name: "Phase 8 레거시 다루기", icon: "🛠️", resources: ["레거시 코드 활용 전략", "리팩토링"] },
  { id: "p9", name: "Phase 9 설계 역량", icon: "🏗️", resources: ["김영한 스프링 고급", "오브젝트", "클린 아키텍처"] },
  { id: "p10", name: "Phase 10 디자인 패턴", icon: "📐", resources: ["헤드 퍼스트 디자인 패턴", "GoF 디자인 패턴"] },
];

window.CONCEPTS = [
  // ===== Phase 1 =====
  { id: "c-jvm", category: "p1", title: "JVM · JDK · JRE", summary: "자바 코드는 바이트코드로 컴파일되어 JVM 위에서 실행된다 (플랫폼 독립성)",
    detail: "<p><code>.java</code> → <b>javac</b>가 <code>.class</code>(바이트코드)로 컴파일 → <b>JVM</b>이 해석/JIT 컴파일하며 실행합니다.</p><ul><li><b>JDK</b>: 개발 도구(javac 등) + JRE</li><li><b>JRE</b>: JVM + 표준 라이브러리</li><li>메모리: Heap(객체), Stack(메서드 호출·지역변수), Metaspace(클래스 정보)</li><li>GC가 참조되지 않는 객체를 자동 회수</li></ul>", tags: ["JVM"], related: ["c-types"] },
  { id: "c-types", category: "p1", title: "기본형 vs 참조형, String", summary: "기본형은 값 자체, 참조형은 객체의 주소를 저장. String은 불변 객체",
    detail: "<ul><li>기본형 8가지: byte, short, int, long, float, double, char, boolean</li><li>참조형 변수는 힙의 객체를 가리킨다 → 대입은 '주소 복사'</li><li><code>==</code>는 참조(주소) 비교, <code>equals()</code>는 내용 비교</li><li>String은 <b>불변(immutable)</b>. 반복 연결은 StringBuilder 사용</li></ul><pre>String a = new String(\"hi\");\nString b = new String(\"hi\");\na == b       // false\na.equals(b)  // true</pre>", tags: ["문법"], related: ["c-collection"] },
  { id: "c-collection", category: "p1", title: "컬렉션 프레임워크", summary: "List(순서·중복 허용), Set(중복 불가), Map(키-값)",
    detail: "<ul><li><b>ArrayList</b>: 배열 기반, 인덱스 조회 O(1), 중간 삽입 느림</li><li><b>LinkedList</b>: 노드 기반, 삽입/삭제 유리, 조회 느림</li><li><b>HashSet/HashMap</b>: 해시 기반 O(1), 순서 없음 → <code>hashCode()</code>/<code>equals()</code> 재정의 필수</li><li><b>TreeMap/TreeSet</b>: 정렬 유지 O(log n)</li><li>LinkedHashMap: 삽입 순서 유지</li></ul>", tags: ["자료구조"], related: ["c-types", "c-exception"] },
  { id: "c-exception", category: "p1", title: "예외 처리", summary: "Checked는 처리 강제, Unchecked(RuntimeException)는 선택. 스프링은 주로 Unchecked 사용",
    detail: "<ul><li><b>Checked</b>: Exception 계열(IOException 등). try-catch 또는 throws 필수</li><li><b>Unchecked</b>: RuntimeException 계열(NPE 등). 처리 강제 없음</li><li><b>Error</b>: OutOfMemoryError 등 복구 불가</li><li>finally / try-with-resources로 자원 정리</li><li>예외를 삼키지(빈 catch) 말 것</li></ul>", tags: ["예외"], related: ["c-collection"] },
  { id: "c-git", category: "p1", title: "Git 브랜치와 협업", summary: "브랜치로 작업을 분리하고 merge/rebase로 통합, PR로 리뷰",
    detail: "<ul><li><code>git add</code> → <code>commit</code> → <code>push</code></li><li><b>merge</b>: 두 브랜치 이력을 합침(병합 커밋 생성)</li><li><b>rebase</b>: 내 커밋을 대상 브랜치 최신 위로 재배치(이력이 일직선)</li><li><b>충돌(conflict)</b>: 같은 부분을 서로 수정했을 때 직접 해결 후 커밋</li><li>이미 공유(push)한 커밋을 rebase/reset 하는 건 위험</li></ul><pre>git switch -c feature/login\ngit pull --rebase origin main</pre>", tags: ["협업"], related: [] },

  // ===== Phase 2 =====
  { id: "c-oop4", category: "p2", title: "객체지향 4대 특징", summary: "캡슐화, 상속, 다형성, 추상화",
    detail: "<ul><li><b>캡슐화</b>: 데이터와 동작을 묶고 내부를 숨김 (private + 메서드)</li><li><b>상속</b>: 부모의 특성을 재사용</li><li><b>다형성</b>: 같은 타입 참조로 다른 구현을 호출 (오버라이딩)</li><li><b>추상화</b>: 핵심만 드러내고 세부는 숨김 (인터페이스, 추상 클래스)</li></ul><p>핵심은 '객체들의 <b>협력</b>과 책임'입니다.</p>", tags: ["OOP"], related: ["c-compose", "c-di"] },
  { id: "c-compose", category: "p2", title: "상속 vs 합성(조합)", summary: "상속은 강한 결합. 가능하면 합성 + 인터페이스로 유연하게",
    detail: "<ul><li>상속: 부모 변경이 자식에 영향, 컴파일 시점에 관계 고정</li><li>합성: 객체를 필드로 가지고 위임 → 런타임에 교체 가능</li><li>'is-a' 관계가 명확할 때만 상속, 아니면 'has-a'(합성)</li></ul><pre>class Car { private Engine engine; } // 합성</pre>", tags: ["OOP", "설계"], related: ["c-oop4", "c-solid"] },
  { id: "c-di", category: "p2", title: "의존관계 주입(DI)", summary: "필요한 객체를 내가 만들지 않고 외부에서 주입받는 방식",
    detail: "<p>구체 클래스를 직접 <code>new</code> 하면 변경 시 코드를 고쳐야 합니다(OCP 위반). 인터페이스에 의존하고 구현체는 외부에서 주입하면 유연해집니다.</p><ul><li>주입 방식: <b>생성자 주입(권장)</b>, 세터, 필드</li><li>생성자 주입: 불변·필수 의존성 보장, 테스트 용이</li></ul><pre>class OrderService {\n  private final DiscountPolicy policy;\n  OrderService(DiscountPolicy policy) { this.policy = policy; }\n}</pre>", tags: ["Spring", "OOP"], related: ["c-ioc", "c-solid"] },

  // ===== Phase 3 =====
  { id: "c-http", category: "p3", title: "HTTP 요청/응답", summary: "클라이언트-서버가 주고받는 텍스트 기반, 무상태 프로토콜",
    detail: "<p>요청: <b>메서드 + URL + 헤더 + 바디</b> / 응답: <b>상태 코드 + 헤더 + 바디</b></p><ul><li>무상태(Stateless): 서버가 이전 요청을 기억하지 않음</li><li>HTTP/1.1 Keep-Alive, HTTP/2 멀티플렉싱, HTTP/3 QUIC(UDP)</li><li>HTTPS = HTTP + TLS(암호화·서버 인증)</li></ul><pre>GET /hello HTTP/1.1\nHost: example.com\nAccept: application/json</pre>", tags: ["HTTP"], related: ["c-rest", "c-status"] },
  { id: "c-rest", category: "p3", title: "REST API", summary: "자원(URI)을 HTTP 메서드로 조작하는 API 설계 스타일",
    detail: "<ul><li>GET 조회 / POST 생성 / PUT 전체 수정 / PATCH 부분 수정 / DELETE 삭제</li><li>URI는 명사(복수형), 행위는 메서드로</li><li>멱등(Idempotent): GET, PUT, DELETE는 여러 번 호출해도 결과 동일, POST는 아님</li></ul><pre>GET    /users/42\nPOST   /users\nDELETE /users/42</pre>", tags: ["API"], related: ["c-http", "c-status", "c-mvc"] },
  { id: "c-status", category: "p3", title: "HTTP 상태 코드", summary: "2xx 성공, 3xx 리다이렉트, 4xx 클라이언트 오류, 5xx 서버 오류",
    detail: "<ul><li><b>200</b> OK, <b>201</b> Created, <b>204</b> No Content</li><li><b>301/302</b> 리다이렉트, <b>304</b> Not Modified</li><li><b>400</b> 잘못된 요청, <b>401</b> 인증 필요, <b>403</b> 권한 없음, <b>404</b> 없음, <b>409</b> 충돌</li><li><b>500</b> 서버 내부 오류, <b>502</b> Bad Gateway, <b>503</b> 서비스 불가</li></ul>", tags: ["HTTP"], related: ["c-rest"] },
  { id: "c-mvc", category: "p3", title: "스프링 MVC 흐름", summary: "DispatcherServlet이 요청을 받아 핸들러(컨트롤러)로 위임하고 결과를 응답",
    detail: "<ol><li>요청 → <b>DispatcherServlet</b>(프론트 컨트롤러)</li><li>HandlerMapping이 컨트롤러 조회</li><li>HandlerAdapter가 컨트롤러 실행</li><li>컨트롤러가 ModelAndView 또는 @ResponseBody로 반환</li><li>View 렌더링 또는 HttpMessageConverter가 JSON 변환</li></ol><p>MVC = Model(데이터·로직) / View(화면) / Controller(요청 처리)</p>", tags: ["Spring", "MVC"], related: ["c-rest", "c-layer"] },
  { id: "c-session-jwt", category: "p3", title: "세션 vs JWT", summary: "세션은 서버가 상태 저장, JWT는 토큰에 정보를 담는 무상태 방식",
    detail: "<ul><li><b>세션</b>: 서버가 로그인 상태 저장, 클라이언트는 세션ID 쿠키. 즉시 만료 쉬움, 서버 확장 시 저장소 공유 필요(Redis 등)</li><li><b>JWT</b>: Header.Payload.Signature. 서버 저장 불필요하지만 발급 후 강제 만료 어려움 → 짧은 만료 + Refresh Token</li><li>JWT Payload는 암호화가 아니라 <b>인코딩</b>이므로 민감 정보를 넣지 말 것</li></ul>", tags: ["인증"], related: ["c-cors"] },
  { id: "c-cors", category: "p3", title: "CORS · XSS · CSRF", summary: "브라우저의 동일 출처 정책과 대표적인 웹 공격",
    detail: "<ul><li><b>CORS</b>: 다른 출처 요청을 서버가 <code>Access-Control-Allow-Origin</code> 등으로 허용</li><li><b>XSS</b>: 악성 스크립트 삽입 → 출력 이스케이프, CSP</li><li><b>CSRF</b>: 로그인된 사용자 권한으로 원치 않는 요청 → CSRF 토큰, SameSite 쿠키</li><li><b>SQL Injection</b>: PreparedStatement(파라미터 바인딩)로 방어</li></ul>", tags: ["보안"], related: ["c-session-jwt"] },
  { id: "c-cache", category: "p3", title: "캐시(Cache)", summary: "자주 쓰는 데이터를 빠른 저장소(Redis 등)에 임시 보관해 응답 속도를 높임",
    detail: "<ul><li>Cache Hit / Miss</li><li>전략: <b>Cache-Aside</b>(없으면 DB 조회 후 저장), Write-Through, Write-Back</li><li>TTL로 만료, 데이터 변경 시 <b>무효화</b>가 어려운 문제</li><li>캐시 스탬피드: 만료 순간 요청이 DB로 몰리는 현상</li></ul>", tags: ["성능", "Redis"], related: ["c-index"] },

  // ===== Phase 4 =====
  { id: "c-ioc", category: "p4", title: "IoC 컨테이너와 Bean", summary: "객체 생성·의존관계 연결의 제어권을 스프링 컨테이너가 가진다",
    detail: "<ul><li><b>IoC(제어의 역전)</b>: 프로그램 흐름의 제어를 프레임워크가 가짐</li><li><b>ApplicationContext</b>: 빈을 생성·관리하는 컨테이너</li><li>등록: <code>@Component</code> + 컴포넌트 스캔, 또는 <code>@Configuration</code> + <code>@Bean</code></li><li>주입: <code>@Autowired</code> / 생성자 주입</li></ul>", tags: ["Spring"], related: ["c-di", "c-singleton"] },
  { id: "c-singleton", category: "p4", title: "싱글톤 빈과 무상태 설계", summary: "스프링 빈은 기본적으로 싱글톤 → 공유 필드에 상태를 두면 안 된다",
    detail: "<p>하나의 인스턴스를 여러 요청(스레드)이 공유하므로 <b>인스턴스 필드에 변경 가능한 값</b>을 두면 동시성 문제가 생깁니다. 값은 지역변수·파라미터로 처리합니다.</p><ul><li>빈 스코프: singleton(기본), prototype, request, session</li><li><code>@Configuration</code>은 CGLIB 프록시로 싱글톤을 보장</li></ul>", tags: ["Spring", "동시성"], related: ["c-ioc", "c-thread"] },
  { id: "c-aop", category: "p4", title: "AOP", summary: "로깅·트랜잭션 같은 횡단 관심사를 핵심 로직에서 분리",
    detail: "<ul><li>용어: Aspect(모듈), Advice(실행할 코드), Pointcut(적용 대상), JoinPoint</li><li>스프링 AOP는 <b>프록시</b> 기반 (런타임)</li><li>같은 클래스 내부 메서드 호출(self-invocation)은 프록시를 거치지 않아 적용 안 됨</li></ul>", tags: ["Spring"], related: ["c-tx-spring"] },
  { id: "c-tx-spring", category: "p4", title: "@Transactional", summary: "AOP 프록시가 메서드 앞뒤로 트랜잭션 시작/커밋/롤백을 처리",
    detail: "<ul><li>선언적 트랜잭션: 비즈니스 코드에서 트랜잭션 코드 분리</li><li>기본적으로 <b>RuntimeException/Error</b> 발생 시 롤백 (Checked는 커밋!)</li><li>전파(Propagation): REQUIRED(기본), REQUIRES_NEW …</li><li>readOnly=true로 조회 최적화</li><li>self-invocation, private 메서드에는 적용 안 됨</li></ul>", tags: ["Spring", "DB"], related: ["c-aop", "c-tx"] },

  // ===== Phase 5 =====
  { id: "c-index", category: "p5", title: "인덱스(Index)", summary: "조회 속도를 높이는 정렬된 자료구조 (주로 B+Tree)",
    detail: "<ul><li>장점: WHERE/ORDER BY/JOIN 속도 향상</li><li>단점: INSERT/UPDATE/DELETE 느려짐, 공간 추가 사용</li><li>카디널리티(고유값 다양성)가 높은 컬럼에 효과적</li><li><b>복합 인덱스</b>는 왼쪽 컬럼부터(Leftmost) 사용됨</li><li>컬럼에 함수를 씌우거나 앞부분 와일드카드(LIKE '%abc')는 인덱스를 못 탄다</li></ul><pre>CREATE INDEX idx_user_email ON users(email);</pre>", tags: ["SQL", "성능"], related: ["c-explain", "c-tx"] },
  { id: "c-tx", category: "p5", title: "트랜잭션과 ACID", summary: "여러 작업을 하나로 묶어 전부 성공 또는 전부 실패시킴",
    detail: "<ul><li><b>A</b>tomicity 원자성 / <b>C</b>onsistency 일관성 / <b>I</b>solation 격리성 / <b>D</b>urability 지속성</li><li>격리 수준: READ UNCOMMITTED &lt; READ COMMITTED &lt; REPEATABLE READ &lt; SERIALIZABLE</li><li>이상 현상: Dirty Read, Non-repeatable Read, Phantom Read</li><li>MySQL InnoDB 기본: REPEATABLE READ</li></ul>", tags: ["SQL"], related: ["c-index", "c-tx-spring"] },
  { id: "c-norm", category: "p5", title: "정규화와 반정규화", summary: "중복을 줄이려 테이블을 분리(정규화), 성능을 위해 일부러 합치기도 함(반정규화)",
    detail: "<p>1NF(원자값) → 2NF(부분 종속 제거) → 3NF(이행 종속 제거). 정규화하면 이상 현상(삽입/갱신/삭제)이 줄지만 JOIN이 늘어납니다. 조회 성능이 중요하면 <b>반정규화</b>를 고려합니다.</p>", tags: ["설계"], related: ["c-index"] },
  { id: "c-explain", category: "p5", title: "실행 계획(EXPLAIN)과 JOIN", summary: "쿼리가 어떻게 실행되는지 확인해 병목을 찾는다",
    detail: "<ul><li><code>EXPLAIN</code>: type(ALL=풀스캔, ref, range, const), key(사용 인덱스), rows(예상 읽는 행)</li><li>풀 테이블 스캔을 피하고 필요한 컬럼만 SELECT</li><li>JOIN: INNER(교집합) / LEFT(왼쪽 전부 + 매칭)</li><li>대량 데이터 페이징은 OFFSET보다 커서 방식(No-Offset)이 유리</li></ul>", tags: ["SQL", "성능"], related: ["c-index"] },

  // ===== Phase 6 =====
  { id: "c-pc", category: "p6", title: "영속성 컨텍스트", summary: "엔티티를 영구 저장하는 1차 캐시 + 변경 감지 + 쓰기 지연의 작업 공간",
    detail: "<ul><li><b>1차 캐시</b>: 같은 트랜잭션에서 같은 id 조회 시 DB 재조회 없음</li><li><b>동일성 보장</b>: 같은 id는 같은 인스턴스</li><li><b>변경 감지(Dirty Checking)</b>: 커밋 시 스냅샷과 비교해 UPDATE 자동 실행</li><li><b>쓰기 지연</b>: flush 시점에 SQL을 모아 실행</li><li>엔티티 상태: 비영속 / 영속 / 준영속 / 삭제</li></ul>", tags: ["JPA"], related: ["c-fetch", "c-assoc"] },
  { id: "c-assoc", category: "p6", title: "연관관계 매핑", summary: "객체 참조와 테이블 외래키의 차이. 연관관계의 주인이 외래키를 관리",
    detail: "<ul><li>@ManyToOne(가장 많이 씀), @OneToMany, @OneToOne, @ManyToMany(실무 지양)</li><li><b>연관관계의 주인</b>: 외래키가 있는 쪽(N쪽). <code>mappedBy</code>는 주인이 아닌 쪽(읽기 전용)</li><li>양방향은 양쪽 모두 값을 세팅(편의 메서드)</li><li>가급적 단방향으로 설계하고 필요할 때만 양방향 추가</li></ul>", tags: ["JPA"], related: ["c-pc", "c-fetch"] },
  { id: "c-fetch", category: "p6", title: "지연/즉시 로딩", summary: "연관 엔티티를 언제 조회할지 결정 — 실무는 지연 로딩(LAZY)이 기본",
    detail: "<ul><li><b>LAZY</b>: 실제 사용 시점에 조회 (프록시 객체)</li><li><b>EAGER</b>: 즉시 함께 조회 → 예상치 못한 쿼리·N+1 유발</li><li>@ManyToOne/@OneToOne 기본값은 EAGER → <code>fetch = LAZY</code>로 명시</li><li>영속성 컨텍스트 밖에서 프록시 접근 시 <code>LazyInitializationException</code></li></ul>", tags: ["JPA"], related: ["c-n1", "c-pc"] },
  { id: "c-n1", category: "p6", title: "N+1 문제", summary: "목록 조회 1번 + 연관 엔티티 조회 N번이 추가 실행되는 성능 문제",
    detail: "<p>예: 주문 10개 조회(1) → 각 주문의 회원 조회(10) = 11번.</p><ul><li>해결: <b>fetch join</b>, <code>@EntityGraph</code>, <code>default_batch_fetch_size</code>(IN 쿼리 배치)</li><li>컬렉션 fetch join은 페이징 불가(메모리 페이징 경고) → batch size 사용</li></ul><pre>select o from Order o join fetch o.member</pre>", tags: ["JPA", "성능"], related: ["c-fetch"] },

  // ===== Phase 7 =====
  { id: "c-solid", category: "p7", title: "SOLID 원칙", summary: "유연하고 유지보수하기 좋은 객체지향 설계의 5가지 원칙",
    detail: "<ul><li><b>S</b>RP 단일 책임: 변경 이유는 하나</li><li><b>O</b>CP 개방-폐쇄: 확장엔 열려, 수정엔 닫혀</li><li><b>L</b>SP 리스코프 치환: 자식은 부모를 대체 가능해야</li><li><b>I</b>SP 인터페이스 분리: 쓰지 않는 메서드에 의존 X</li><li><b>D</b>IP 의존관계 역전: 구체가 아닌 추상에 의존</li></ul>", tags: ["설계"], related: ["c-di", "c-clean"] },
  { id: "c-clean", category: "p7", title: "클린 코드 기본", summary: "읽기 쉬운 코드: 의도를 드러내는 이름, 작은 함수, 중복 제거",
    detail: "<ul><li>의도가 드러나는 이름 (<code>d</code> ✗ → <code>elapsedDays</code> ✓)</li><li>함수는 한 가지 일만, 작게, 인자는 적게</li><li>주석으로 설명하기 전에 코드로 표현</li><li>DRY: 중복 제거 / 매직 넘버를 상수로</li><li>보이스카우트 규칙: 떠날 땐 처음보다 깨끗하게</li></ul>", tags: ["코드품질"], related: ["c-solid", "c-refactor"] },
  { id: "c-effective", category: "p7", title: "이펙티브 자바 핵심", summary: "정적 팩토리, 빌더, 불변 객체, equals/hashCode 규약",
    detail: "<ul><li>생성자 대신 <b>정적 팩토리 메서드</b>(of, from, valueOf): 이름을 가질 수 있고 인스턴스 통제 가능</li><li>매개변수가 많으면 <b>빌더</b></li><li><b>불변 객체</b> 선호: 스레드 안전, 단순</li><li><code>equals</code>를 재정의하면 <code>hashCode</code>도 반드시 재정의</li><li>상속보다 컴포지션</li></ul>", tags: ["Java"], related: ["c-types", "c-compose"] },
  { id: "c-thread", category: "p7", title: "스레드와 동시성", summary: "스레드는 프로세스 내부 실행 흐름. 공유 자원 접근은 동기화 필요",
    detail: "<ul><li>프로세스: 독립 메모리 / 스레드: 힙을 공유</li><li><b>Race Condition</b>: 동시 접근으로 결과가 실행 순서에 좌우</li><li>해결: <code>synchronized</code>, Lock, Atomic 클래스, <code>ConcurrentHashMap</code></li><li>Deadlock: 서로 자원을 기다리며 멈춤</li><li>실무에선 스레드를 직접 만들지 않고 ExecutorService(스레드 풀) 사용</li></ul>", tags: ["동시성"], related: ["c-singleton"] },

  // ===== Phase 8 =====
  { id: "c-refactor", category: "p8", title: "리팩토링", summary: "겉으로 드러나는 동작은 유지하면서 내부 구조를 개선하는 작업",
    detail: "<ul><li><b>테스트가 있어야</b> 안전하게 리팩토링 가능</li><li>작은 단계로, 단계마다 테스트 실행</li><li>코드 냄새: 긴 함수, 중복 코드, 거대한 클래스, 긴 매개변수 목록, 기능 편애</li><li>대표 기법: 함수 추출, 변수 인라인, 이름 변경, 조건문을 다형성으로 교체</li></ul>", tags: ["리팩토링"], related: ["c-legacy", "c-clean"] },
  { id: "c-legacy", category: "p8", title: "레거시 코드 다루기", summary: "테스트 없는 코드를 안전망(특성화 테스트)부터 만들고 조금씩 개선",
    detail: "<ul><li>레거시 코드 = 테스트가 없는 코드(마이클 페더스의 정의)</li><li><b>특성화 테스트</b>: 현재 동작을 그대로 기록하는 테스트</li><li><b>이음새(Seam)</b>: 코드를 수정하지 않고 동작을 바꿀 수 있는 지점 → 의존성을 끊어 테스트 가능하게</li><li>한 번에 갈아엎지 말고 변경이 필요한 부분부터 점진적으로</li></ul>", tags: ["레거시", "테스트"], related: ["c-refactor"] },

  // ===== Phase 9 =====
  { id: "c-layer", category: "p9", title: "계층형 아키텍처", summary: "Controller → Service → Repository로 책임을 나눈 구조",
    detail: "<ul><li><b>Controller</b>: 요청/응답, 입력 검증</li><li><b>Service</b>: 비즈니스 로직, 트랜잭션</li><li><b>Repository</b>: 데이터 접근</li><li>Entity를 API 응답으로 직접 노출하지 말고 <b>DTO</b>로 변환</li><li>의존 방향은 위→아래 단방향 유지</li></ul>", tags: ["아키텍처"], related: ["c-mvc", "c-clean-arch"] },
  { id: "c-coupling", category: "p9", title: "응집도와 결합도", summary: "좋은 설계 = 높은 응집도 + 낮은 결합도",
    detail: "<ul><li><b>응집도</b>: 모듈 내부 요소들이 얼마나 한 목적에 모여 있는가 (높을수록 좋음)</li><li><b>결합도</b>: 모듈 간 의존 정도 (낮을수록 좋음)</li><li>객체에게 데이터를 꺼내 판단하지 말고 <b>책임을 맡기자</b>(Tell, Don't Ask)</li><li>설계는 변경에 대비한 '의존성 관리'</li></ul>", tags: ["설계"], related: ["c-solid", "c-clean-arch"] },
  { id: "c-clean-arch", category: "p9", title: "클린 아키텍처 의존성 규칙", summary: "의존성은 항상 바깥(프레임워크·DB)에서 안쪽(도메인)으로만 향한다",
    detail: "<ul><li>핵심: 엔티티(도메인) → 유스케이스 → 인터페이스 어댑터 → 프레임워크/DB</li><li>안쪽 계층은 바깥 계층을 모른다 → <b>DIP</b>로 인터페이스를 안쪽에 두고 구현은 바깥에</li><li>장점: 도메인 로직을 프레임워크·DB와 독립적으로 테스트/교체 가능</li><li>유사 개념: 헥사고날(포트와 어댑터)</li></ul>", tags: ["아키텍처"], related: ["c-layer", "c-coupling"] },

  // ===== Phase 10 =====
  { id: "c-strategy", category: "p10", title: "전략 패턴", summary: "알고리즘을 캡슐화하고 런타임에 교체 가능하게 하는 패턴",
    detail: "<p>변하는 부분을 인터페이스로 분리해 구현체를 갈아끼웁니다. 예: 할인 정책(정액/정률), 결제 수단.</p><pre>interface DiscountPolicy { int discount(int price); }\nclass Order { DiscountPolicy policy; /* 주입 */ }</pre><p>스프링 DI와 궁합이 좋고 if/else 분기를 제거합니다.</p>", tags: ["행위"], related: ["c-template", "c-di"] },
  { id: "c-template", category: "p10", title: "템플릿 메서드 패턴", summary: "상위 클래스가 알고리즘 뼈대를 정의하고, 일부 단계를 하위 클래스가 구현",
    detail: "<p>변하지 않는 흐름은 부모의 <code>final</code> 메서드에, 변하는 단계는 추상 메서드로. 상속 기반이라 결합이 강해 <b>전략 패턴(합성)</b>으로 대체하기도 합니다. 스프링의 <code>JdbcTemplate</code>이 콜백 방식 응용 사례.</p>", tags: ["행위"], related: ["c-strategy"] },
  { id: "c-observer", category: "p10", title: "옵저버 패턴", summary: "한 객체의 상태 변화를 구독자들에게 자동으로 알림",
    detail: "<p>Subject가 Observer 목록을 갖고 변경 시 <code>notify</code>. 느슨한 결합의 이벤트 처리. 스프링의 <code>ApplicationEventPublisher</code>/<code>@EventListener</code>가 대표적 활용입니다.</p>", tags: ["행위"], related: ["c-strategy"] },
  { id: "c-factory", category: "p10", title: "싱글톤 · 팩토리 패턴", summary: "인스턴스를 하나만 보장(싱글톤), 객체 생성을 별도로 위임(팩토리)",
    detail: "<ul><li><b>싱글톤</b>: 전역 단일 인스턴스. 직접 구현하면 테스트·동시성에 불리 → 스프링 컨테이너가 대신 관리</li><li><b>팩토리 메서드</b>: 생성 로직을 서브클래스/메서드에 위임</li><li><b>추상 팩토리</b>: 관련 객체 군을 한꺼번에 생성</li></ul>", tags: ["생성"], related: ["c-effective", "c-singleton"] },
];

window.TERMS = [
  { id: "t1", category: "p1", term: "Immutable (불변)", definition: "생성 후 상태가 바뀌지 않는 객체 (String 등)" },
  { id: "t2", category: "p1", term: "Garbage Collection", definition: "참조되지 않는 객체를 JVM이 자동으로 메모리에서 회수하는 기능" },
  { id: "t3", category: "p1", term: "Pull Request", definition: "내 브랜치의 변경 사항을 대상 브랜치에 병합해 달라고 요청하고 리뷰받는 기능" },
  { id: "t4", category: "p2", term: "Polymorphism (다형성)", definition: "같은 타입의 참조로 서로 다른 구현의 동작을 호출할 수 있는 성질" },
  { id: "t5", category: "p2", term: "Encapsulation (캡슐화)", definition: "데이터와 동작을 하나로 묶고 내부 구현을 외부로부터 숨기는 것" },
  { id: "t6", category: "p2", term: "Dependency Injection", definition: "필요한 의존 객체를 직접 생성하지 않고 외부에서 주입받는 방식" },
  { id: "t7", category: "p3", term: "Stateless", definition: "서버가 클라이언트의 이전 요청 상태를 저장하지 않는 성질" },
  { id: "t8", category: "p3", term: "Idempotent (멱등성)", definition: "같은 요청을 여러 번 보내도 결과가 동일한 성질 (GET, PUT, DELETE)" },
  { id: "t9", category: "p3", term: "Endpoint", definition: "API가 요청을 받는 특정 URL 경로" },
  { id: "t10", category: "p3", term: "Authentication vs Authorization", definition: "인증(누구인지 확인) vs 인가(무엇을 할 수 있는지 권한 확인)" },
  { id: "t11", category: "p4", term: "IoC", definition: "Inversion of Control: 객체 생성과 흐름 제어권을 프레임워크가 가지는 것" },
  { id: "t12", category: "p4", term: "Bean", definition: "스프링 컨테이너가 생성하고 관리하는 객체" },
  { id: "t13", category: "p4", term: "Proxy", definition: "실제 객체 대신 앞단에서 요청을 받아 부가 기능을 수행하는 대리 객체" },
  { id: "t14", category: "p5", term: "Primary Key", definition: "테이블의 각 행을 유일하게 식별하는 컬럼 (중복·NULL 불가)" },
  { id: "t15", category: "p5", term: "Foreign Key", definition: "다른 테이블의 기본키를 참조하는 컬럼 (테이블 간 관계)" },
  { id: "t16", category: "p5", term: "Deadlock", definition: "서로가 가진 자원을 기다리며 영원히 진행하지 못하는 상태" },
  { id: "t17", category: "p6", term: "Entity", definition: "DB 테이블과 매핑되는 JPA 관리 대상 객체" },
  { id: "t18", category: "p6", term: "Dirty Checking", definition: "영속 엔티티의 변경을 감지해 커밋 시 UPDATE 쿼리를 자동 실행하는 기능" },
  { id: "t19", category: "p6", term: "Fetch Join", definition: "JPQL에서 연관 엔티티를 한 번의 쿼리로 함께 조회하는 기능" },
  { id: "t20", category: "p7", term: "Race Condition", definition: "여러 스레드가 공유 자원에 동시 접근해 결과가 실행 순서에 좌우되는 상황" },
  { id: "t21", category: "p7", term: "DRY", definition: "Don't Repeat Yourself: 같은 지식(로직)을 중복해서 쓰지 말라는 원칙" },
  { id: "t22", category: "p7", term: "Static Factory Method", definition: "생성자 대신 이름 있는 정적 메서드로 인스턴스를 반환하는 방식" },
  { id: "t23", category: "p8", term: "Code Smell", definition: "리팩토링이 필요할 수 있음을 암시하는 코드의 나쁜 징후" },
  { id: "t24", category: "p8", term: "Characterization Test", definition: "기존 코드의 현재 동작을 기록해 변경 시 회귀를 잡아주는 테스트" },
  { id: "t25", category: "p8", term: "Seam (이음새)", definition: "코드를 직접 수정하지 않고 동작을 바꿔 끼울 수 있는 지점" },
  { id: "t26", category: "p9", term: "Cohesion (응집도)", definition: "모듈 내부 요소들이 하나의 목적을 위해 얼마나 밀접한지의 정도" },
  { id: "t27", category: "p9", term: "DTO", definition: "Data Transfer Object: 계층 간 데이터 전달만을 위한 객체" },
  { id: "t28", category: "p9", term: "DIP", definition: "Dependency Inversion Principle: 구체가 아닌 추상(인터페이스)에 의존하라는 원칙" },
  { id: "t29", category: "p10", term: "Strategy Pattern", definition: "교체 가능한 알고리즘을 인터페이스 뒤로 캡슐화하는 패턴" },
  { id: "t30", category: "p10", term: "Observer Pattern", definition: "상태 변화를 구독자들에게 자동 통지하는 패턴" },
];

// type: mc(4지선다) | ox | short(단답)
window.QUIZZES = [
  // Phase 1
  { id: "q1", category: "p1", type: "mc", conceptId: "c-types", question: "자바에서 두 String 객체의 '내용'이 같은지 비교하는 올바른 방법은?", choices: ["a == b", "a.equals(b)", "a = b", "a.compare(b)"], answer: 1, explanation: "==는 참조(주소) 비교이고, equals()가 내용 비교입니다." },
  { id: "q2", category: "p1", type: "ox", conceptId: "c-exception", question: "RuntimeException 계열(Unchecked) 예외는 반드시 try-catch 또는 throws로 처리해야 컴파일된다.", answer: false, explanation: "처리를 강제하는 것은 Checked 예외입니다." },
  { id: "q3", category: "p1", type: "mc", conceptId: "c-collection", question: "키-값 쌍으로 저장하며 해시 기반으로 평균 O(1) 조회를 제공하는 컬렉션은?", choices: ["ArrayList", "LinkedList", "HashMap", "TreeSet"], answer: 2, explanation: "HashMap은 해시 기반 키-값 저장소입니다." },
  { id: "q4", category: "p1", type: "short", conceptId: "c-git", question: "내 커밋들을 대상 브랜치 최신 커밋 위로 재배치해 이력을 일직선으로 만드는 Git 명령은? (영문)", answer: ["rebase", "git rebase"], explanation: "rebase입니다. 이미 공유한 커밋에는 주의하세요." },
  // Phase 2
  { id: "q5", category: "p2", type: "mc", conceptId: "c-oop4", question: "같은 타입의 참조 변수로 서로 다른 구현의 메서드를 호출할 수 있는 객체지향 특징은?", choices: ["캡슐화", "다형성", "은닉", "직렬화"], answer: 1, explanation: "다형성(오버라이딩)입니다." },
  { id: "q6", category: "p2", type: "ox", conceptId: "c-compose", question: "코드 재사용이 목적이라면 무조건 상속이 합성보다 낫다.", answer: false, explanation: "상속은 결합도가 높아 보통 합성을 먼저 고려합니다." },
  { id: "q7", category: "p2", type: "mc", conceptId: "c-di", question: "다음 중 권장되는 의존관계 주입 방식은?", choices: ["필드 주입", "세터 주입", "생성자 주입", "메서드 내부에서 new"], answer: 2, explanation: "생성자 주입은 불변성과 필수 의존성을 보장하고 테스트가 쉽습니다." },
  { id: "q8", category: "p2", type: "short", conceptId: "c-di", question: "의존 객체를 직접 만들지 않고 외부에서 넣어주는 방식을 뜻하는 약자는? (영문 2글자)", answer: ["di"], explanation: "DI(Dependency Injection)입니다." },
  // Phase 3
  { id: "q9", category: "p3", type: "mc", conceptId: "c-rest", question: "REST에서 '자원의 일부만 수정'할 때 주로 사용하는 HTTP 메서드는?", choices: ["GET", "PUT", "PATCH", "POST"], answer: 2, explanation: "PATCH는 부분 수정, PUT은 전체 교체입니다." },
  { id: "q10", category: "p3", type: "mc", conceptId: "c-status", question: "로그인하지 않은 사용자가 보호된 자원에 접근할 때 주로 반환하는 상태 코드는?", choices: ["400", "401", "403", "404"], answer: 1, explanation: "401은 인증 필요, 403은 인증됐지만 권한 없음입니다." },
  { id: "q11", category: "p3", type: "ox", conceptId: "c-http", question: "HTTP는 기본적으로 이전 요청의 상태를 기억하는(Stateful) 프로토콜이다.", answer: false, explanation: "HTTP는 무상태(Stateless)입니다. 상태는 쿠키/세션 등으로 보완합니다." },
  { id: "q12", category: "p3", type: "mc", conceptId: "c-mvc", question: "스프링 MVC에서 모든 요청을 가장 먼저 받는 프론트 컨트롤러는?", choices: ["HandlerMapping", "DispatcherServlet", "ViewResolver", "FilterChain"], answer: 1, explanation: "DispatcherServlet이 요청을 받아 적절한 핸들러로 위임합니다." },
  { id: "q13", category: "p3", type: "short", conceptId: "c-status", question: "리소스가 성공적으로 '생성'되었을 때 반환하는 HTTP 상태 코드 숫자는?", answer: ["201"], explanation: "201 Created입니다." },
  { id: "q14", category: "p3", type: "mc", conceptId: "c-cors", question: "로그인된 사용자의 권한을 악용해 원치 않는 요청을 보내게 하는 공격은?", choices: ["XSS", "CSRF", "SQL Injection", "DDoS"], answer: 1, explanation: "CSRF입니다. CSRF 토큰·SameSite 쿠키로 방어합니다." },
  // Phase 4
  { id: "q15", category: "p4", type: "ox", conceptId: "c-singleton", question: "스프링 빈은 기본적으로 싱글톤이므로 인스턴스 필드에 변경 가능한 상태를 두면 동시성 문제가 생길 수 있다.", answer: true, explanation: "여러 스레드가 하나의 빈을 공유하므로 무상태로 설계해야 합니다." },
  { id: "q16", category: "p4", type: "mc", conceptId: "c-tx-spring", question: "@Transactional이 기본적으로 롤백하는 경우는?", choices: ["모든 Exception", "Checked Exception만", "RuntimeException과 Error", "롤백하지 않음"], answer: 2, explanation: "Checked 예외는 기본적으로 커밋됩니다(rollbackFor로 변경 가능)." },
  { id: "q17", category: "p4", type: "mc", conceptId: "c-aop", question: "같은 클래스 안에서 @Transactional 메서드를 내부 호출하면 트랜잭션이 적용되지 않는 이유는?", choices: ["DB 설정 문제", "프록시를 거치지 않기 때문", "Checked 예외 때문", "싱글톤이어서"], answer: 1, explanation: "스프링 AOP는 프록시 기반이라 self-invocation은 프록시를 우회합니다." },
  { id: "q18", category: "p4", type: "short", conceptId: "c-ioc", question: "객체 생성과 흐름 제어권을 프레임워크가 가지는 것을 뜻하는 약어는? (영문)", answer: ["ioc"], explanation: "IoC(Inversion of Control)입니다." },
  // Phase 5
  { id: "q19", category: "p5", type: "mc", conceptId: "c-index", question: "인덱스의 단점으로 올바른 것은?", choices: ["SELECT가 느려진다", "쓰기(INSERT/UPDATE/DELETE)가 느려질 수 있다", "데이터가 암호화된다", "테이블이 삭제된다"], answer: 1, explanation: "인덱스도 함께 갱신해야 하므로 쓰기 성능이 떨어지고 공간도 더 씁니다." },
  { id: "q20", category: "p5", type: "mc", conceptId: "c-tx", question: "ACID 중 '전부 성공하거나 전부 실패'를 의미하는 것은?", choices: ["Atomicity", "Consistency", "Isolation", "Durability"], answer: 0, explanation: "원자성(Atomicity)입니다." },
  { id: "q21", category: "p5", type: "ox", conceptId: "c-index", question: "WHERE 절에서 인덱스 컬럼에 함수를 적용해도 인덱스를 그대로 효율적으로 사용할 수 있다.", answer: false, explanation: "컬럼을 가공하면 보통 인덱스를 타지 못합니다." },
  { id: "q22", category: "p5", type: "short", conceptId: "c-explain", question: "쿼리의 실행 계획을 확인하기 위해 쿼리 앞에 붙이는 키워드는? (영문)", answer: ["explain"], explanation: "EXPLAIN입니다." },
  { id: "q23", category: "p5", type: "ox", conceptId: "c-norm", question: "정규화를 많이 할수록 조회 성능은 항상 좋아진다.", answer: false, explanation: "JOIN이 늘어 조회가 느려질 수 있어 반정규화를 하기도 합니다." },
  // Phase 6
  { id: "q24", category: "p6", type: "mc", conceptId: "c-pc", question: "영속 엔티티의 값을 바꾸면 커밋 시 UPDATE 쿼리가 자동 실행되는 기능은?", choices: ["지연 로딩", "변경 감지(Dirty Checking)", "프록시", "페치 조인"], answer: 1, explanation: "스냅샷과 비교해 변경을 감지합니다." },
  { id: "q25", category: "p6", type: "mc", conceptId: "c-assoc", question: "양방향 연관관계에서 '연관관계의 주인'은 보통 어느 쪽인가?", choices: ["@OneToMany 쪽", "외래키가 있는 @ManyToOne 쪽", "항상 부모 엔티티", "mappedBy를 선언한 쪽"], answer: 1, explanation: "외래키를 관리하는 N쪽이 주인이며, mappedBy는 주인이 아닌 쪽에 씁니다." },
  { id: "q26", category: "p6", type: "ox", conceptId: "c-fetch", question: "실무에서는 즉시 로딩(EAGER)보다 지연 로딩(LAZY)을 기본으로 쓰는 것이 권장된다.", answer: true, explanation: "EAGER는 예상치 못한 쿼리와 N+1 문제를 유발합니다." },
  { id: "q27", category: "p6", type: "short", conceptId: "c-n1", question: "목록 조회 1번 후 연관 엔티티를 N번 추가 조회하는 JPA 성능 문제의 이름은? (예: A+B 형태, 영문/숫자)", answer: ["n+1", "n+1 문제"], explanation: "N+1 문제입니다. fetch join이나 batch size로 해결합니다." },
  // Phase 7
  { id: "q28", category: "p7", type: "mc", conceptId: "c-solid", question: "SOLID 중 '확장에는 열려 있고 수정에는 닫혀 있어야 한다'는 원칙은?", choices: ["SRP", "OCP", "LSP", "ISP"], answer: 1, explanation: "OCP(개방-폐쇄 원칙)입니다." },
  { id: "q29", category: "p7", type: "ox", conceptId: "c-effective", question: "equals()를 재정의했다면 hashCode()도 반드시 함께 재정의해야 한다.", answer: true, explanation: "같은 객체는 같은 해시코드를 가져야 HashMap/HashSet이 올바르게 동작합니다." },
  { id: "q30", category: "p7", type: "mc", conceptId: "c-thread", question: "여러 스레드가 공유 자원에 동시에 접근해 결과가 실행 순서에 좌우되는 문제는?", choices: ["Race Condition", "Cache Hit", "Hot Reload", "Throttling"], answer: 0, explanation: "경쟁 상태입니다. 동기화(Lock 등)로 해결합니다." },
  // Phase 8
  { id: "q31", category: "p8", type: "mc", conceptId: "c-refactor", question: "리팩토링의 정의로 가장 알맞은 것은?", choices: ["기능을 추가하는 작업", "외부 동작은 유지하며 내부 구조를 개선하는 작업", "버그를 일부러 만드는 작업", "코드를 전부 새로 작성하는 작업"], answer: 1, explanation: "동작은 그대로 두고 구조만 개선합니다." },
  { id: "q32", category: "p8", type: "short", conceptId: "c-legacy", question: "마이클 페더스의 정의에서 '레거시 코드'란 이것이 없는 코드다. 무엇이 없는가? (2글자)", answer: ["테스트"], explanation: "레거시 코드 = 테스트가 없는 코드입니다." },
  { id: "q33", category: "p8", type: "ox", conceptId: "c-legacy", question: "특성화 테스트는 코드가 '이래야 한다'는 명세가 아니라 '현재 실제로 이렇게 동작한다'를 기록하는 테스트다.", answer: true, explanation: "변경 시 회귀를 잡기 위한 안전망입니다." },
  // Phase 9
  { id: "q34", category: "p9", type: "mc", conceptId: "c-layer", question: "계층형 아키텍처에서 비즈니스 로직과 트랜잭션을 주로 담당하는 계층은?", choices: ["Controller", "Service", "Repository", "View"], answer: 1, explanation: "Service 계층입니다." },
  { id: "q35", category: "p9", type: "mc", conceptId: "c-coupling", question: "좋은 설계의 방향으로 올바른 것은?", choices: ["높은 결합도, 낮은 응집도", "낮은 결합도, 높은 응집도", "높은 결합도, 높은 응집도", "낮은 결합도, 낮은 응집도"], answer: 1, explanation: "응집도는 높이고 결합도는 낮춥니다." },
  { id: "q36", category: "p9", type: "ox", conceptId: "c-clean-arch", question: "클린 아키텍처에서 의존성은 도메인(안쪽)에서 프레임워크·DB(바깥쪽)를 향해야 한다.", answer: false, explanation: "의존성은 바깥에서 안쪽으로만 향해야 합니다." },
  // Phase 10
  { id: "q37", category: "p10", type: "mc", conceptId: "c-strategy", question: "알고리즘(할인 정책 등)을 인터페이스로 분리해 런타임에 교체 가능하게 하는 패턴은?", choices: ["싱글톤", "전략 패턴", "옵저버", "프록시"], answer: 1, explanation: "전략 패턴입니다." },
  { id: "q38", category: "p10", type: "mc", conceptId: "c-template", question: "알고리즘의 뼈대는 부모 클래스가 정의하고 일부 단계를 자식이 구현하는 패턴은?", choices: ["템플릿 메서드", "빌더", "어댑터", "데코레이터"], answer: 0, explanation: "템플릿 메서드 패턴입니다." },
  { id: "q39", category: "p10", type: "short", conceptId: "c-observer", question: "한 객체의 상태 변화를 구독자들에게 자동으로 알려주는 패턴 이름은? (영문, 예: strategy)", answer: ["observer", "observer pattern"], explanation: "옵저버 패턴입니다." },
  { id: "q40", category: "p10", type: "ox", conceptId: "c-factory", question: "스프링에서는 싱글톤 패턴을 개발자가 직접 구현하지 않아도 컨테이너가 빈을 싱글톤으로 관리해 준다.", answer: true, explanation: "스프링 컨테이너가 싱글톤 레지스트리 역할을 합니다." },
];
