
document.addEventListener("DOMContentLoaded", () => {

  let lastTotalSec = null
  
  // =========================
  // useEnemyTimeCheckbox
  // =========================

  const useEnemyCheckbox = document.getElementById("useEnemyTimeCheckbox");
  const rallyRemainInput = document.getElementById("rallyRemainTime");
  const enemyMarchInput = document.getElementById("enemyMarchTime");

  if (useEnemyCheckbox) {
    useEnemyCheckbox.checked = true; // 초기 ON
    useEnemyCheckbox.addEventListener("change", toggleEnemyInputs);
    toggleEnemyInputs();
  }

  function toggleEnemyInputs() {

    const enabled = useEnemyCheckbox.checked;

    rallyRemainInput.disabled = !enabled;
    enemyMarchInput.disabled = !enabled;

    rallyRemainInput.classList.toggle("bg-gray-200", !enabled);
    enemyMarchInput.classList.toggle("bg-gray-200", !enabled);
  }

  if (useEnemyCheckbox) {

    useEnemyCheckbox.addEventListener("change", toggleEnemyInputs);

    toggleEnemyInputs(); // 초기 상태
  }

  // =========================
  // UTC 자동 입력
  // =========================

  const useUtcCheckbox = document.getElementById("useUtcCheckbox");
  const utcInput = document.getElementById("utcTime");

  if (useUtcCheckbox) {
    useUtcCheckbox.checked = true; // 초기 ON
  }

  if (rallyRemainInput && utcInput && useUtcCheckbox) {

      rallyRemainInput.addEventListener("input", () => {

      if (!useUtcCheckbox.checked) return;

      if(!/^\d{2}:\d{2}:\d{2}$/.test(rallyRemainInput.value)) return;

      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2,"0");
      const m = String(now.getUTCMinutes()).padStart(2,"0");
      const s = String(now.getUTCSeconds()).padStart(2,"0");

      utcInput.value = `${h}:${m}:${s}`;

    });

  }

  // =========================
  // 리셋 버튼
  // =========================

  const resetRally=document.getElementById("resetRallyRemainTime")
  if(resetRally){
    resetRally.onclick=()=>{
      document.getElementById("rallyRemainTime").value=""
    }
  }

  const resetEnemy=document.getElementById("resetEnemyMarchTime")
  if(resetEnemy){
    resetEnemy.onclick=()=>{
      document.getElementById("enemyMarchTime").value=""
    }
  }

  const resetUtc=document.getElementById("resetUtcTime")
  if(resetUtc){
    resetUtc.onclick=()=>{
      document.getElementById("utcTime").value=""
    }
  }

  const resetMarch=document.getElementById("btnResetMarch")
  if(resetMarch){
    resetMarch.onclick=()=>{
      document.getElementById("marchBulkInput").value=""
      localStorage.removeItem("marchBulk")
    }
  }

// =========================
// 추가 리셋 버튼들
// =========================

// counterMarchTime 리셋
const resetCounterMarch = document.getElementById("resetcounterMarchTime")
if (resetCounterMarch) {
  resetCounterMarch.onclick = () => {
    document.getElementById("counterMarchTime").value = ""
  }
}

// attackrallyStartTime 리셋
const resetAttackRally = document.getElementById("resetattackrallyStartTime")
if (resetAttackRally) {
  resetAttackRally.onclick = () => {
    document.getElementById("attackrallyStartTime").value = ""
  }
}

// marchBulkInput2 리셋 + localStorage
const resetAttackMarch = document.getElementById("resetattackMarchTime")
if (resetAttackMarch) {
  resetAttackMarch.onclick = () => {
    document.getElementById("marchBulkInput2").value = ""
    localStorage.removeItem("marchBulk2")
  }
}

// explain6Container 리셋
const resetDataPage = document.getElementById("resetDataPage")
if (resetDataPage) {
  resetDataPage.onclick = () => {
    document.getElementById("explain6Container").innerHTML = ""
  }
}

const resetAttackEnemy = document.getElementById("resetattackEnemyTime")
if (resetAttackEnemy) {
  resetAttackEnemy.onclick = () => {
    document.getElementById("attackEnemyTime").value = ""
  }
}

const resetReportEnemy = document.getElementById("resetreportEnemyTime")
if (resetReportEnemy) {
  resetReportEnemy.onclick = () => {
    document.getElementById("reportEnemyTime").value = ""
  }
}

// switchingTime 리셋
const resetSwitching = document.getElementById("resetswitchingTime")
if (resetSwitching) {
  resetSwitching.onclick = () => {
    document.getElementById("switchingTime").value = ""
  }
}

  // =========================
  // 탭 전환
  // =========================

  // =========================
// 탭 전환 (5개용)
// =========================

const tabs = {
  tabRally: document.getElementById("rallyTab"),
  tabSwitch: document.getElementById("switchTab"),
  tabCont: document.getElementById("contTab"),
  tabMarch: document.getElementById("marchTab"),
};

const buttons = {
  tabRally: document.getElementById("tabRally"),
  tabSwitch: document.getElementById("tabSwitch"),
  tabCont: document.getElementById("tabCont"),
  tabMarch: document.getElementById("tabMarch"),
};

function switchTab(activeKey) {

  // 1. 모든 탭 숨김
  Object.values(tabs).forEach(tab => {
    tab.classList.add("hidden");
  });

  // 2. 모든 버튼 비활성화
  Object.values(buttons).forEach(btn => {
    btn.classList.remove("bg-blue-500","text-white");
    btn.classList.add("bg-gray-300");
  });

  // 3. 선택된 탭만 표시
  tabs[activeKey].classList.remove("hidden");

  // 4. 선택된 버튼 활성화
  buttons[activeKey].classList.add("bg-blue-500","text-white");
  buttons[activeKey].classList.remove("bg-gray-300");
}

// 클릭 이벤트 연결
Object.keys(buttons).forEach(key => {
  buttons[key].onclick = () => switchTab(key);
});

switchTab("tabRally");

  // =========================
  // 자동 콜론 입력
  // =========================

  function autoColon(input){

    input.addEventListener("input",()=>{

      let raw=input.value.replace(/[^0-9]/g,"").slice(0,6)

      if(raw.length>=5)
        input.value=raw.replace(/(\d{2})(\d{2})(\d{0,2})/,"$1:$2:$3")

      else if(raw.length>=3)
        input.value=raw.replace(/(\d{2})(\d{0,2})/,"$1:$2")

      else
        input.value=raw

    })

  }

  ["rallyRemainTime","enemyMarchTime","utcTime","switchingTime","counterMarchTime","attackrallyStartTime","attackEnemyTime","reportEnemyTime"].forEach(id=>{
    const el=document.getElementById(id)
    if(el) autoColon(el)
  })

  // =========================
  // 시간 변환
  // =========================

  function parseTime(str){

    if(!str) return null

    const p=str.split(":").map(Number)

    if(p.length!==3) return null

    return p[0]*3600+p[1]*60+p[2]

  }

  function secToMinSec(sec){

    if(sec<0) sec=0

    const m=Math.floor(sec / 60) % 60
    const s=sec%60

    return `${m}분 ${s}초`

  }

function secToHHMMSS(sec){
  if(sec < 0) sec = 0

  const h = String(Math.floor(sec / 3600)).padStart(2,"0")
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2,"0")
  const s = String(sec % 60).padStart(2,"0")

  return `${h}:${m}:${s}`
}

  // =========================
  // Bulk 행군 파싱
  // =========================

  function parseMarchBulk(){

    const txt = document.getElementById("marchBulkInput").value.trim()

    if(!txt) return []

    const tokens = txt.replace(/\n/g," ").split(/\s+/)

    let result=[]

    tokens.forEach(t=>{

      const m=t.match(/^(.+?)(\d+)$/)

      if(!m) return

      result.push({
        id:m[1],
        sec:Number(m[2])
      })

    })

    return result

  }

  // =========================
  // 쉬운주유 계산
  // =========================

  document.getElementById("btnCalcExplain").onclick=()=>{

    const rally=parseTime(document.getElementById("rallyRemainTime").value)
    const enemy=parseTime(document.getElementById("enemyMarchTime").value)
    const utc=parseTime(document.getElementById("utcTime").value)

    if(rally===null||enemy===null||utc===null){

      alert("시간 형식 HH:mm:ss")

      return
    }

const total = rally + enemy + utc
lastTotalSec = total

    document.getElementById("explainStart1").textContent="<행군> | 주유시간"

    const offsets=[60,55,50,45,40,35,30]

    offsets.forEach((o,i)=>{

      const sec=total-o

      document.getElementById("explain"+(i+1)).textContent=
      `*${o}초* | ${secToMinSec(sec)}`

    })

  }

  // =========================
  // 지정주유 계산
  // =========================

  document.getElementById("btnCalcExplain2").onclick=()=>{

    const rally=parseTime(document.getElementById("rallyRemainTime").value)
    const enemy=parseTime(document.getElementById("enemyMarchTime").value)
    const utc=parseTime(document.getElementById("utcTime").value)

    if(rally===null||enemy===null||utc===null){

      alert("시간 형식 HH:mm:ss")

      return
    }

  const total=rally+enemy+utc
    lastTotalSec = total

    const marches=parseMarchBulk()

    const container = document.getElementById("explain2Container")

    container.innerHTML = ""

    marches.forEach(m => {

      const sec = total - m.sec

      const el = document.createElement("div")

      el.textContent = `${m.id}(${m.sec}) - ${secToMinSec(sec)}`

      container.appendChild(el)

    })

  }
// =========================
// 복사 (통합)
// =========================

// -------------------------
// 공통: 기본 explain 복사 (explain1~7, explain31~37 등)
// -------------------------
function copyExplain(prefix, count, startId = null) {
  let txt = []

  if (startId) {
    const title = document.getElementById(startId)
    if (title && title.textContent.trim() !== "") {
      txt.push(title.textContent)
    }
  }

  for (let i = 1; i <= count; i++) {
    const el = document.getElementById(prefix + i)
    if (el && el.textContent.trim() !== "") {
      txt.push(el.textContent)
    }
  }

  if (txt.length) {
    navigator.clipboard.writeText(txt.join("\n"))
  }
}

// -------------------------
// 공통: 컨테이너 복사 (스마트)
// -------------------------
function smartCopy(containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  const rows = container.querySelectorAll("div")
  const count = rows.length

  // 10줄 이하 → 바로 복사
  if (count <= 10) {
    const txt = [...rows].map(r => r.textContent).join("\n")
    navigator.clipboard.writeText(txt)
    return
  }

  // 10줄 초과 → 구간 선택
  showCopyPopup(containerId, count)
}

// -------------------------
// 공통: 구간 선택 팝업
// -------------------------
function showCopyPopup(containerId, count) {
  const popup = document.getElementById("copyPopup")
  popup.innerHTML = ""

  const rows = document.querySelectorAll(`#${containerId} div`)

  for (let start = 0; start < count; start += 10) {
    const end = Math.min(start + 10, count)

    const btn = document.createElement("button")
    btn.textContent = `○ [${start + 1}~${end}]줄 복사하기`

    btn.style.display = "block"
    btn.style.width = "100%"
    btn.style.textAlign = "left"
    btn.style.padding = "10px"
    btn.style.border = "none"
    btn.style.borderBottom = "1px solid #ddd"
    btn.style.background = "white"
    btn.style.cursor = "pointer"

    btn.onclick = () => {
      let txt = []
      for (let i = start; i < end; i++) {
        txt.push(rows[i].textContent)
      }
      navigator.clipboard.writeText(txt.join("\n"))
      popup.style.display = "none"
    }

    popup.appendChild(btn)
  }

  popup.style.display = "block"
}

// =========================
// switchingTime 복사
// =========================
const copySwitchBtn = document.getElementById("copyswitchingTime")

if (copySwitchBtn) {
  copySwitchBtn.onclick = () => {
    const input = document.getElementById("switchingTime")

    navigator.clipboard.writeText(input.value)
  }
}

// =========================
// 버튼 연결
// =========================

// 쉬운 주유
const btn1 = document.getElementById("btnCopyExplain")
if (btn1) {
  btn1.onclick = () => copyExplain("explain", 7, "explainStart1")
}

// 지정 주유
const btn2 = document.getElementById("btnCopyExplain2")
if (btn2) {
  btn2.onclick = () => smartCopy("explain2Container")
}

// 쉬운 스위칭 (explain31~37)
const btn3 = document.getElementById("btnCopyExplain3")
if (btn3) {
  btn3.onclick = () => copyExplain("explain3", 7, "explainStart31")
}

// 지정 스위칭
const btn4 = document.getElementById("btnCopyExplain4")
if (btn4) {
  btn4.onclick = () => smartCopy("explain4Container")
}

// 연집
const btn5 = document.getElementById("btnCopyExplain5")
if (btn5) {
  btn5.onclick = () => smartCopy("explain5Container")
}



  // =========================
  // Bulk 저장
  // =========================
// 기존
const bulk = document.getElementById("marchBulkInput")
if (bulk) {
  bulk.value = localStorage.getItem("marchBulk") || ""
  bulk.addEventListener("input", () => {
    localStorage.setItem("marchBulk", bulk.value)
  })
}

// 추가
const bulk2 = document.getElementById("marchBulkInput2")
if (bulk2) {
  bulk2.value = localStorage.getItem("marchBulk2") || ""
  bulk2.addEventListener("input", () => {
    localStorage.setItem("marchBulk2", bulk2.value)
  })
}

// 불러오기 버튼
const loadBtn = document.getElementById("btnLoadMarchTime")

if (loadBtn) {
  loadBtn.onclick = () => {

    if (lastTotalSec === null) {
      alert("먼저 주유 계산을 실행하세요")
      return
    }

    const attackInput = document.getElementById("attackEnemyTime")
    attackInput.value = secToHHMMSS(lastTotalSec)
  }
}

// =========================
// 스위칭 시간 기능
// =========================

// 현재 UTC → switchingTime
const nowBtn = document.getElementById("nowTime")
if (nowBtn) {
  nowBtn.onclick = () => {
    const now = new Date()

    const h = String(now.getUTCHours()).padStart(2,"0")
    const m = String(now.getUTCMinutes()).padStart(2,"0")
    const s = String(now.getUTCSeconds()).padStart(2,"0")

    document.getElementById("switchingTime").value = `${h}:${m}:${s}`
  }
}

// UTC + 5분 + counterMarchTime
const counterBtn = document.getElementById("counterTime")
if (counterBtn) {
  counterBtn.onclick = () => {
    const now = new Date()

    const baseSec =
      now.getUTCHours()*3600 +
      now.getUTCMinutes()*60 +
      now.getUTCSeconds()

    const counter = parseTime(document.getElementById("counterMarchTime").value)

    if (counter === null) {
      alert("카랠팀 행군시간 입력 필요")
      return
    }

    const total = baseSec + (5 * 60) + counter

    document.getElementById("switchingTime").value = secToHHMMSS(total)
  }
}

// -10초
const minusBtn = document.getElementById("minus10s")
if (minusBtn) {
  minusBtn.onclick = () => {
    const input = document.getElementById("switchingTime")

    if (!input.value) {
      alert("스위칭 목표시간 입력 필요")
      return
    }

    const sec = parseTime(input.value)
    if (sec === null) {
      alert("시간 형식 HH:mm:ss")
      return
    }

    input.value = secToHHMMSS(sec - 10)
  }
}

// +10초
const plusBtn = document.getElementById("plus10s")
if (plusBtn) {
  plusBtn.onclick = () => {
    const input = document.getElementById("switchingTime")

    if (!input.value) {
      alert("스위칭 목표시간 입력 필요")
      return
    }

    const sec = parseTime(input.value)
    if (sec === null) {
      alert("시간 형식 HH:mm:ss")
      return
    }

    input.value = secToHHMMSS(sec + 10)
  }
}

// =========================
// 쉬운 스위칭
// =========================
const btnCalc3 = document.getElementById("btnCalcExplain3")

if (btnCalc3) {
  btnCalc3.onclick = () => {

    const base = parseTime(document.getElementById("switchingTime").value)

    if (base === null) {
      alert("스위칭 목표시간 입력 필요")
      return
    }

    document.getElementById("explainStart31").textContent = "<스위칭> | 도착시간"

    const offsets = [60,55,50,45,40,35,30]

    offsets.forEach((o,i)=>{
      const sec = base - o
      document.getElementById("explain3" + (i+1)).textContent =
        `*${o}초* | ${secToMinSec(sec)}`
    })
  }
}

// =========================
// 지정 스위칭
// =========================
const btnCalc4 = document.getElementById("btnCalcExplain4")

if (btnCalc4) {
  btnCalc4.onclick = () => {

    const base = parseTime(document.getElementById("switchingTime").value)

    if (base === null) {
      alert("스위칭 목표시간 입력 필요")
      return
    }

    const marches = parseMarchBulk() // 기존 함수 재사용

    const container = document.getElementById("explain4Container")
    container.innerHTML = ""

    marches.forEach(m => {
      const sec = base - m.sec

      const el = document.createElement("div")
      el.textContent = `${m.id}(${m.sec}) - ${secToMinSec(sec)}`

      container.appendChild(el)
    })
  }
}

// =========================
// 연집 계산 (btnCalcExplain5)
// =========================
const btnCalc5 = document.getElementById("btnCalcExplain5")

if (btnCalc5) {
  btnCalc5.onclick = () => {

    const base = parseTime(document.getElementById("attackrallyStartTime").value)

    if (base === null) {
      alert("집결 오픈 시간 입력 필요")
      return
    }

    // bulk2 파싱 (여기 중요)
    const txt = document.getElementById("marchBulkInput2").value.trim()
    if (!txt) {
      alert("행군시간 입력 필요")
      return
    }

    const tokens = txt.replace(/\n/g," ").split(/\s+/)
    let marches = []

    tokens.forEach(t=>{
      const m = t.match(/^(.+?)(\d+)$/)
      if (!m) return

      marches.push({
        id: m[1],
        sec: Number(m[2])
      })
    })

    if (marches.length === 0) {
      alert("행군 데이터 없음")
      return
    }

    // ✅ 최소값 찾기
    const minSec = Math.min(...marches.map(m => m.sec))

    const container = document.getElementById("explain5Container")
    container.innerHTML = ""

    marches.forEach(m => {

      // 핵심 계산
      const sec = base - (m.sec - minSec)

      const el = document.createElement("div")
      el.textContent = `${m.id}(${m.sec}) - ${secToMinSec(sec)}`

      container.appendChild(el)
    })
  }
}


})