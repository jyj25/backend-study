(function () {
  const $app = document.getElementById("app");
  const CATS = window.CATEGORIES, CONCEPTS = window.CONCEPTS, TERMS = window.TERMS, QUIZZES = window.QUIZZES;
  const GRADUATE_STREAK = 3;

  // ---------- 저장소 ----------
  const KEY = "bs_progress_v2";
  let P = load();
  function load() {
    try { const d = JSON.parse(localStorage.getItem(KEY)); if (d) return d; } catch (e) {}
    return { termBox: {}, wrong: {}, stats: { solved: 0, correct: 0 }, seen: {} };
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {} updateBadge(); }

  // ---------- 유틸 ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const catName = (id) => { const c = CATS.find((x) => x.id === id); return c ? c.icon + " " + c.name : id; };
  const activeWrong = () => Object.keys(P.wrong).filter((id) => !P.wrong[id].done);
  function updateBadge() { const n = activeWrong().length, b = document.getElementById("wrongBadge"); b.hidden = !n; b.textContent = n; }
  const chipsHtml = (sel, prefix) => `<div class="chips">${[{ id: "all", name: "전체", icon: "" }, ...CATS].map((c) => `<button class="chip ${sel === c.id ? "on" : ""}" data-${prefix}="${c.id}">${c.icon} ${c.name}</button>`).join("")}</div>`;

  // ---------- 라우터 ----------
  function route() {
    const [, name = "", arg] = location.hash.replace("#", "").split("/");
    document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.r === name));
    window.scrollTo(0, 0);
    if (name === "concepts") return arg ? conceptDetail(arg) : conceptList();
    if (name === "flashcards") return flashSetup();
    if (name === "quiz") return quizSetup();
    if (name === "wrong") return wrongNotes();
    home();
  }

  // ---------- 홈 ----------
  function home() {
    const learned = TERMS.filter((t) => (P.termBox[t.id] || 0) >= 4).length;
    const acc = P.stats.solved ? Math.round((P.stats.correct / P.stats.solved) * 100) : 0;
    $app.innerHTML = `
      <h1>백엔드 필수 개념, 읽고 · 외우고 · 풀어보세요</h1>
      <p class="sub">개념 학습 → 단어 암기 → 퀴즈 → 오답노트로 이어지는 복습 루프</p>
      <div class="grid stats">
        <div class="card stat"><div class="num">${learned}/${TERMS.length}</div><div class="lbl">암기 완료 단어</div></div>
        <div class="card stat"><div class="num">${acc}%</div><div class="lbl">퀴즈 정답률 (${P.stats.solved}문제)</div></div>
        <div class="card stat"><div class="num">${activeWrong().length}</div><div class="lbl">복습할 오답</div></div>
      </div>
      <h2>바로 시작하기</h2>
      <div class="grid">
        <a class="card link-card" href="#/concepts"><div class="ico">📚</div><h3>개념 학습</h3><p>${CONCEPTS.length}개 핵심 개념 카드</p></a>
        <a class="card link-card" href="#/flashcards"><div class="ico">🃏</div><h3>단어 암기</h3><p>플래시카드 · ${TERMS.length}개 용어</p></a>
        <a class="card link-card" href="#/quiz"><div class="ico">✏️</div><h3>퀴즈</h3><p>객관식 · O/X · 단답 ${QUIZZES.length}문제</p></a>
        <a class="card link-card" href="#/wrong"><div class="ico">📒</div><h3>오답노트</h3><p>틀린 문제만 다시 풀기</p></a>
      </div>`;
  }

  // ---------- 개념 ----------
  let cState = { cat: "all", q: "" };
  function conceptList() {
    $app.innerHTML = `<h1>📚 개념 학습</h1><p class="sub">카테고리별 핵심 개념을 정리했어요.</p>
      <input type="search" id="cq" placeholder="개념 검색 (예: JWT, 인덱스)" value="${esc(cState.q)}" style="margin-bottom:14px">
      <div id="cchips"></div><div id="clist" class="grid"></div>`;
    const draw = () => {
      const cur = CATS.find((c) => c.id === cState.cat);
      document.getElementById("cchips").innerHTML = chipsHtml(cState.cat, "cat") + (cur ? `<p class="muted">📖 참고 자료: ${cur.resources.map(esc).join(" · ")}<br>※ 아래 내용은 요약본이므로 교재와 대조해 확인하세요.</p>` : "");
      const q = cState.q.trim().toLowerCase();
      const list = CONCEPTS.filter((c) => (cState.cat === "all" || c.category === cState.cat) && (!q || (c.title + c.summary + c.tags.join(" ")).toLowerCase().includes(q)));
      document.getElementById("clist").innerHTML = list.length ? list.map((c) => `
        <a class="card link-card" href="#/concepts/${c.id}">
          <div class="muted">${catName(c.category)}</div><h3>${esc(c.title)}</h3><p>${esc(c.summary)}</p>
          <div style="margin-top:10px">${c.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div></a>`).join("") : `<div class="empty">검색 결과가 없어요</div>`;
      document.querySelectorAll("[data-cat]").forEach((b) => (b.onclick = () => { cState.cat = b.dataset.cat; draw(); }));
    };
    document.getElementById("cq").oninput = (e) => { cState.q = e.target.value; draw(); };
    draw();
  }
  function conceptDetail(id) {
    const c = CONCEPTS.find((x) => x.id === id);
    if (!c) return conceptList();
    const rel = (c.related || []).map((r) => CONCEPTS.find((x) => x.id === r)).filter(Boolean);
    const qs = QUIZZES.filter((q) => q.conceptId === id);
    $app.innerHTML = `<a class="back" href="#/concepts">← 목록으로</a>
      <div class="card detail"><div class="muted">${catName(c.category)}</div><h1>${esc(c.title)}</h1>
        <p class="sub" style="font-size:17px">${esc(c.summary)}</p>${c.detail}
        <div>${c.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div></div>
      ${rel.length ? `<h2>관련 개념</h2><div class="grid">${rel.map((r) => `<a class="card link-card" href="#/concepts/${r.id}"><h3>${esc(r.title)}</h3><p>${esc(r.summary)}</p></a>`).join("")}</div>` : ""}
      ${qs.length ? `<div class="row" style="margin-top:20px"><button class="btn" id="cquiz">이 개념 퀴즈 풀기 (${qs.length}문제)</button></div>` : ""}`;
    const b = document.getElementById("cquiz");
    if (b) b.onclick = () => startQuiz(qs);
  }

  // ---------- 플래시카드 ----------
  let fState = { cat: "all" }, fs = null;
  function flashSetup() {
    fs = null;
    const pool = () => TERMS.filter((t) => fState.cat === "all" || t.category === fState.cat);
    $app.innerHTML = `<h1>🃏 단어 암기</h1><p class="sub">카드를 눌러 뒤집고, 알았는지 체크하세요. 모르는 카드는 더 자주 나와요. (Leitner 5단계)</p>
      <div id="fchips"></div><div class="card" id="fbox"></div>`;
    const draw = () => {
      document.getElementById("fchips").innerHTML = chipsHtml(fState.cat, "cat");
      const p = pool(), counts = [1, 2, 3, 4, 5].map((n) => p.filter((t) => (P.termBox[t.id] || 1) === n).length);
      document.getElementById("fbox").innerHTML = `<b>박스별 단어 수</b>
        <div class="boxes">${counts.map((n, i) => `<div>박스 ${i + 1}<b>${n}</b></div>`).join("")}</div>
        <p class="muted">박스 5에 도달하면 암기 완료로 쳐요. 모르면 박스 1로 돌아가요.</p>
        <div class="row"><button class="btn" id="fgo">10개 학습 시작</button><button class="btn ghost" id="freset">진도 초기화</button></div>`;
      document.querySelectorAll("[data-cat]").forEach((b) => (b.onclick = () => { fState.cat = b.dataset.cat; draw(); }));
      document.getElementById("fgo").onclick = () => {
        const sorted = shuffle(p).sort((a, b) => (P.termBox[a.id] || 1) - (P.termBox[b.id] || 1));
        fs = { cards: shuffle(sorted.slice(0, 10)), i: 0, known: 0 };
        flashCard();
      };
      document.getElementById("freset").onclick = () => { if (confirm("단어 암기 진도를 초기화할까요?")) { p.forEach((t) => delete P.termBox[t.id]); save(); draw(); } };
    };
    draw();
  }
  function flashCard() {
    if (fs.i >= fs.cards.length) {
      $app.innerHTML = `<div class="card"><div class="score">${fs.known}/${fs.cards.length}</div><p style="text-align:center">알고 있던 단어 수</p>
        <div class="row" style="justify-content:center"><button class="btn" id="again">다시 학습</button><a class="btn ghost" href="#/quiz">퀴즈 풀러 가기</a></div></div>`;
      document.getElementById("again").onclick = flashSetup;
      return;
    }
    const t = fs.cards[fs.i], box = P.termBox[t.id] || 1;
    $app.innerHTML = `<div class="row" style="justify-content:space-between"><span class="muted">${fs.i + 1} / ${fs.cards.length} · 박스 ${box}</span><span class="muted">${catName(t.category)}</span></div>
      <div class="progress" style="margin-top:8px"><div style="width:${(fs.i / fs.cards.length) * 100}%"></div></div>
      <div class="fc-wrap"><div class="fc" id="fc">
        <div class="face"><div class="term">${esc(t.term)}</div><div class="hint">눌러서 뜻 보기</div></div>
        <div class="face back-face"><div class="def">${esc(t.definition)}</div></div></div></div>
      <div class="row" style="justify-content:center"><button class="btn bad" id="no" disabled>모르겠음</button><button class="btn ok" id="yes" disabled>알았음</button></div>
      <p class="muted" style="text-align:center">카드를 먼저 뒤집어 보세요</p>`;
    const fc = document.getElementById("fc"), yes = document.getElementById("yes"), no = document.getElementById("no");
    fc.onclick = () => { fc.classList.toggle("flip"); yes.disabled = no.disabled = false; };
    const next = (known) => { P.termBox[t.id] = known ? Math.min(5, box + 1) : 1; if (known) fs.known++; save(); fs.i++; flashCard(); };
    yes.onclick = () => next(true); no.onclick = () => next(false);
  }

  // ---------- 퀴즈 ----------
  let qState = { cat: "all", n: 10 }, qs = null;
  function quizSetup() {
    qs = null;
    $app.innerHTML = `<h1>✏️ 퀴즈</h1><p class="sub">카테고리와 문제 수를 고르고 시작하세요.</p>
      <div id="qchips"></div>
      <div class="card"><label>문제 수 <select id="qn" style="width:auto;margin-left:8px">${[5, 10, 20, 30, 40].map((n) => `<option ${qState.n === n ? "selected" : ""}>${n}</option>`).join("")}</select></label>
      <p class="muted" id="qinfo"></p><div class="row"><button class="btn" id="qgo">퀴즈 시작</button></div></div>`;
    const draw = () => {
      document.getElementById("qchips").innerHTML = chipsHtml(qState.cat, "cat");
      const pool = QUIZZES.filter((q) => qState.cat === "all" || q.category === qState.cat);
      document.getElementById("qinfo").textContent = `해당 카테고리 문제 ${pool.length}개`;
      document.getElementById("qgo").disabled = !pool.length;
      document.querySelectorAll("[data-cat]").forEach((b) => (b.onclick = () => { qState.cat = b.dataset.cat; draw(); }));
    };
    document.getElementById("qn").onchange = (e) => (qState.n = +e.target.value);
    document.getElementById("qgo").onclick = () => startQuiz(QUIZZES.filter((q) => qState.cat === "all" || q.category === qState.cat), qState.n);
    draw();
  }
  function startQuiz(pool, n) {
    qs = { list: shuffle(pool).slice(0, n || pool.length), i: 0, correct: 0, wrongIds: [] };
    quizQ();
  }
  const normalize = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ");
  function quizQ() {
    if (qs.i >= qs.list.length) return quizResult();
    const q = qs.list[qs.i];
    const typeLbl = { mc: "객관식", ox: "O/X", short: "단답형" }[q.type];
    let body = "";
    if (q.type === "mc") body = q.choices.map((c, i) => `<button class="opt" data-i="${i}">${i + 1}. ${esc(c)}</button>`).join("");
    else if (q.type === "ox") body = `<div class="row"><button class="opt" data-i="1" style="flex:1;text-align:center;font-size:22px">⭕ O</button><button class="opt" data-i="0" style="flex:1;text-align:center;font-size:22px">❌ X</button></div>`;
    else body = `<input type="text" id="sa" placeholder="정답 입력 후 Enter" autocomplete="off"><div class="row" style="margin-top:12px"><button class="btn" id="sub">제출</button></div>`;
    $app.innerHTML = `<div class="row" style="justify-content:space-between"><span class="muted">${qs.i + 1} / ${qs.list.length} · ${typeLbl}</span><span class="muted">${catName(q.category)}</span></div>
      <div class="progress" style="margin-top:8px"><div style="width:${(qs.i / qs.list.length) * 100}%"></div></div>
      <div class="card" style="margin-top:18px"><div class="q-title">${esc(q.question)}</div><div id="body">${body}</div><div id="fb"></div></div>`;
    const grade = (ok, userAns) => {
      P.stats.solved++; if (ok) { P.stats.correct++; qs.correct++; } else qs.wrongIds.push(q.id);
      const w = P.wrong[q.id];
      if (!ok) P.wrong[q.id] = { count: (w ? w.count : 0) + 1, lastAt: Date.now(), streak: 0, memo: w ? w.memo : "", done: false };
      else if (w && !w.done) { w.streak++; if (w.streak >= GRADUATE_STREAK) w.done = true; }
      save();
      const ansText = q.type === "mc" ? q.choices[q.answer] : q.type === "ox" ? (q.answer ? "O" : "X") : q.answer[0];
      document.querySelectorAll(".opt").forEach((b) => {
        b.disabled = true; const i = +b.dataset.i;
        if (q.type === "mc" && i === q.answer || q.type === "ox" && !!i === q.answer) b.classList.add("right");
        else if (userAns !== undefined && i === userAns) b.classList.add("wrong");
      });
      const sa = document.getElementById("sa"); if (sa) sa.disabled = true;
      const sub = document.getElementById("sub"); if (sub) sub.remove();
      document.getElementById("fb").innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}"><b>${ok ? "정답! 🎉" : "오답 😢"}</b>${ok ? "" : ` · 정답: <b>${esc(ansText)}</b>`}<br>${esc(q.explanation)}</div>
        <div class="row" style="margin-top:14px"><button class="btn" id="nx">${qs.i + 1 >= qs.list.length ? "결과 보기" : "다음 문제"}</button></div>`;
      document.getElementById("nx").onclick = () => { qs.i++; quizQ(); };
    };
    if (q.type === "short") {
      const submit = () => { const v = normalize(document.getElementById("sa").value); if (!v) return; grade(q.answer.some((a) => normalize(a) === v)); };
      document.getElementById("sub").onclick = submit;
      const sa = document.getElementById("sa"); sa.onkeydown = (e) => e.key === "Enter" && submit(); sa.focus();
    } else document.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
      const i = +b.dataset.i; grade(q.type === "mc" ? i === q.answer : !!i === q.answer, i);
    }));
  }
  function quizResult() {
    const pct = Math.round((qs.correct / qs.list.length) * 100);
    $app.innerHTML = `<div class="card"><div class="muted" style="text-align:center">퀴즈 결과</div><div class="score">${qs.correct} / ${qs.list.length}</div>
      <p style="text-align:center">${pct >= 80 ? "훌륭해요! 🔥" : pct >= 50 ? "좋아요, 조금만 더! 💪" : "오답노트로 복습해봐요 📒"}</p>
      ${qs.wrongIds.length ? `<h2>틀린 문제</h2>${qs.wrongIds.map((id) => { const q = QUIZZES.find((x) => x.id === id); return `<div class="muted" style="margin-bottom:6px">• ${esc(q.question)}</div>`; }).join("")}` : ""}
      <div class="row" style="justify-content:center;margin-top:20px"><a class="btn" href="#/quiz">다시 풀기</a><a class="btn ghost" href="#/wrong">오답노트</a></div></div>`;
  }

  // ---------- 오답노트 ----------
  let wTab = "active";
  function wrongNotes() {
    const ids = Object.keys(P.wrong).filter((id) => (wTab === "active") === !P.wrong[id].done).sort((a, b) => P.wrong[b].lastAt - P.wrong[a].lastAt);
    const nActive = activeWrong().length;
    $app.innerHTML = `<h1>📒 오답노트</h1><p class="sub">틀린 문제가 자동 저장돼요. 연속 ${GRADUATE_STREAK}번 맞히면 극복 처리됩니다.</p>
      <div class="row" style="margin-bottom:16px"><button class="chip ${wTab === "active" ? "on" : ""}" id="ta">복습 중 (${nActive})</button><button class="chip ${wTab === "done" ? "on" : ""}" id="td">극복 완료 (${Object.keys(P.wrong).length - nActive})</button>
      <span style="flex:1"></span><button class="btn" id="wretry" ${nActive ? "" : "disabled"}>오답만 다시 풀기</button></div>
      <div id="wl"></div>`;
    document.getElementById("ta").onclick = () => { wTab = "active"; wrongNotes(); };
    document.getElementById("td").onclick = () => { wTab = "done"; wrongNotes(); };
    document.getElementById("wretry").onclick = () => startQuiz(activeWrong().map((id) => QUIZZES.find((q) => q.id === id)).filter(Boolean));
    document.getElementById("wl").innerHTML = ids.length ? ids.map((id) => {
      const q = QUIZZES.find((x) => x.id === id), w = P.wrong[id]; if (!q) return "";
      const ans = q.type === "mc" ? q.choices[q.answer] : q.type === "ox" ? (q.answer ? "O" : "X") : q.answer[0];
      const c = CONCEPTS.find((x) => x.id === q.conceptId);
      return `<div class="card" style="margin-bottom:14px"><div class="item"><div><div class="muted">${catName(q.category)} · 오답 ${w.count}회 · 연속 정답 ${w.streak}/${GRADUATE_STREAK}</div>
        <div class="q-title" style="font-size:17px;margin:6px 0">${esc(q.question)}</div>
        <div>정답: <b style="color:var(--ok)">${esc(ans)}</b></div><div class="muted">${esc(q.explanation)}</div>
        ${c ? `<a class="tag" href="#/concepts/${c.id}" style="margin-top:8px">📚 ${esc(c.title)} 개념 보기</a>` : ""}</div>
        <button class="btn ghost" data-del="${id}" title="노트에서 삭제">🗑</button></div>
        <textarea class="memo" data-memo="${id}" rows="2" placeholder="나만의 메모 (왜 틀렸는지 적어보세요)">${esc(w.memo || "")}</textarea></div>`;
    }).join("") : `<div class="empty">${wTab === "active" ? "복습할 오답이 없어요 👏" : "아직 극복한 문제가 없어요"}</div>`;
    document.querySelectorAll("[data-memo]").forEach((t) => (t.onchange = () => { P.wrong[t.dataset.memo].memo = t.value; save(); }));
    document.querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => { delete P.wrong[b.dataset.del]; save(); wrongNotes(); }));
  }

  // ---------- 테마 ----------
  const themeBtn = document.getElementById("themeBtn");
  function setTheme(t) { document.documentElement.dataset.theme = t; themeBtn.textContent = t === "dark" ? "☀️" : "🌙"; try { localStorage.setItem("bs_theme", t); } catch (e) {} }
  let saved = null; try { saved = localStorage.getItem("bs_theme"); } catch (e) {}
  setTheme(saved || "light");
  themeBtn.onclick = () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");

  window.addEventListener("hashchange", route);
  updateBadge();
  route();
})();
