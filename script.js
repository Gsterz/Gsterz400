document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // useEnemyTimeCheckbox
  // =========================

  const useEnemyCheckbox = document.getElementById("useEnemyTimeCheckbox");
  const rallyRemainInput = document.getElementById("rallyRemainTime");
  const enemyMarchInput = document.getElementById("enemyMarchTime");

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
  // 탭 전환
  // =========================

  const tabRally = document.getElementById("tabRally");
  const tabMarch = document.getElementById("tabMarch");
  const rallyTab = document.getElementById("rallyTab");
  const marchTab = document.getElementById("marchTab");

  tabRally.onclick = () => {
    rallyTab.classList.remove("hidden");
    marchTab.classList.add("hidden");

    tabRally.classList.add("bg-blue-500","text-white");
    tabMarch.classList.remove("bg-blue-500","text-white");
    tabMarch.classList.add("bg-gray-300");
  }

  tabMarch.onclick = () => {
    marchTab.classList.remove("hidden");
    rallyTab.classList.add("hidden");

    tabMarch.classList.add("bg-blue-500","text-white");
    tabRally.classList.remove("bg-blue-500","text-white");
    tabRally.classList.add("bg-gray-300");
  }

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

  ["rallyRemainTime","enemyMarchTime","utcTime"].forEach(id=>{
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

    const total=rally+enemy+utc

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
  // 복사
  // =======================

  function copyExplain2(){

    const container = document.getElementById("explain2Container")

    const rows = container.querySelectorAll("div")

    let txt=[]

    rows.forEach(r=>{
      if(r.textContent.trim()!=="")
        txt.push(r.textContent)
    })

    if(txt.length)
      navigator.clipboard.writeText(txt.join("\n"))

  }
  document.getElementById("btnCopyExplain")
  .onclick=()=>copyExplain("explain",7)

  function copyExplain(prefix,count){

    let txt=[]

    const title=document.getElementById("explainStart1")

    if(title) txt.push(title.textContent)

    for(let i=1;i<=count;i++){

      const el=document.getElementById(prefix+i)

      if(el && el.textContent.trim()!=="")
        txt.push(el.textContent)

    }

    if(txt.length)
      navigator.clipboard.writeText(txt.join("\n"))

  }
  document.getElementById("btnCopyExplain2")
  .onclick=()=>smartCopyExplain()

  function smartCopyExplain(){

    const container = document.getElementById("explain2Container")
    const rows = container.querySelectorAll("div")
    const count = rows.length

    if(count<=10){

      const txt=[...rows].map(r=>r.textContent).join("\n")
      navigator.clipboard.writeText(txt)
      return

    }

    showCopyPopup(count)

  }

  function showCopyPopup(count){

    const container = document.getElementById("copyPopup")
    container.innerHTML=""

    const rows = document.querySelectorAll("#explain2Container div")

    for(let start=0; start<count; start+=10){

      const end = Math.min(start+10, count)

      const btn = document.createElement("button")

      btn.textContent=`○ [${start+1}~${end}]줄 복사하기`

      btn.style.display="block"
      btn.style.width="100%"
      btn.style.textAlign="left"
      btn.style.padding="10px"
      btn.style.border="none"
      btn.style.borderBottom="1px solid #ddd"
      btn.style.background="white"
      btn.style.cursor="pointer"

      btn.onclick=()=>{
        let txt=[]

        for(let i=start;i<end;i++)
          txt.push(rows[i].textContent)

        navigator.clipboard.writeText(txt.join("\n"))

        container.style.display="none"
      }

      container.appendChild(btn)
    }
    container.style.display="block"

  }
  // =========================
  // Bulk 저장
  // =========================

  const bulk=document.getElementById("marchBulkInput")

  if(bulk){

    bulk.value=localStorage.getItem("marchBulk")||""

    bulk.addEventListener("input",()=>{

      localStorage.setItem("marchBulk",bulk.value)

    })

  }

})