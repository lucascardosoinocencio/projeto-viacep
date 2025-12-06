/* ====== Elementos ====== */
const cepEl = document.getElementById('cep');
const btnBuscar = document.getElementById('btnBuscar');
const loader = document.getElementById('loader');
const btnText = document.getElementById('btnText');
const historyListEl = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');
const toastContainer = document.getElementById('toastContainer');
const themeToggle = document.getElementById('themeToggle');

const fields = {
  rua: document.getElementById('rua'),
  bairro: document.getElementById('bairro'),
  cidade: document.getElementById('cidade'),
  uf: document.getElementById('uf'),
  ibge: document.getElementById('ibge'),
  population: document.getElementById('populationValue'),
};

let isLoading = false;
const STORAGE_KEY = 'cepnav_history_v1';
const THEME_KEY = 'cepnav_theme_v1';

/* ====== Inicialização ====== */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark'){
    document.body.classList.add('theme-dark');
    themeToggle.querySelector('.icon').textContent = "🌙";
  }
  renderHistory();
});

/* ====== Theme toggle ====== */
themeToggle.addEventListener('click', () => {
  const dark = document.body.classList.toggle('theme-dark');
  themeToggle.setAttribute('aria-pressed', dark ? 'true':'false');
  themeToggle.querySelector('.icon').textContent = dark ? "🌙" : "🌞";
  localStorage.setItem(THEME_KEY, dark ? 'dark':'light');
});

/* ====== Loader ====== */
function showLoader(on=true){
  loader.style.display = on ? 'inline-block' : 'none';
  btnText.style.opacity = on ? '0' : '1';
  isLoading = on;
  btnBuscar.disabled = on;
}

/* ====== Toast ====== */
function showToast(msg){
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  toastContainer.appendChild(t);
  setTimeout(()=> t.style.opacity='1',10);
  setTimeout(()=>{
    t.style.opacity='0';
    t.style.transform='translateY(8px)';
    setTimeout(()=> t.remove(),300);
  },3000);
}

/* ====== Histórico ====== */
function saveHistoryItem(cep, display){
  const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const without = arr.filter(i => i.cep !== cep);
  without.unshift({cep, display, at:Date.now()});
  localStorage.setItem(STORAGE_KEY, JSON.stringify(without.slice(0,10)));
  renderHistory();
}

function renderHistory(){
  const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  historyListEl.innerHTML = '';
  if (!arr.length){
    historyListEl.innerHTML = '<li style="opacity:.6">Nenhum CEP pesquisado ainda.</li>';
    return;
  }
  arr.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${item.cep}</strong>
        <div style="font-size:.85rem;opacity:.6">${item.display}</div>
      </div>
      <button class="link-btn">Reusar</button>
    `;
    li.addEventListener('click',()=>{
      cepEl.value = item.cep.replace(/\D/g,'');
      fetchCep(cepEl.value);
    });
    li.querySelector('button').addEventListener('click', e=>{
      e.stopPropagation();
      cepEl.value = item.cep.replace(/\D/g,'');
      fetchCep(cepEl.value);
    });
    historyListEl.appendChild(li);
  });
}

clearHistoryBtn.addEventListener('click',()=>{
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
});

/* ====== Buscar ====== */
btnBuscar.addEventListener('click', () => {
  const cepValue = cepEl.value.replace(/\D/g,'');
  if (!/^\d{8}$/.test(cepValue)){
    shake();
    showToast('CEP inválido');
    return;
  }
  fetchCep(cepValue);
});

function shake(){
  cepEl.animate([
    {transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}
  ],{duration:400});
}

/* ====== ViaCEP ====== */
function fetchCep(cepValue){
  showLoader(true);
  Object.values(fields).forEach(f=>f.value='');

  fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
    .then(r=>r.json())
    .then(d=>{
      if (d.erro){
        showToast('CEP não encontrado');
        return;
      }
      fields.rua.value = d.logradouro || '';
      fields.bairro.value = d.bairro || '';
      fields.cidade.value = d.localidade || '';
      fields.uf.value = d.uf || '';
      fields.ibge.value = d.ibge || '';
      saveHistoryItem(formatCep(cepValue), `${d.localidade} / ${d.uf}`);
      if (d.ibge) fetchPopulation(d.ibge);
    })
    .catch(()=>showToast('Erro na conexão'))
    .finally(()=>showLoader(false));
}

/* ====== População ====== */
async function fetchPopulation(ibge){
  fields.population.value = "Carregando...";
  const id = String(ibge).padStart(7,"0");

  try{
    const r = await fetch(`https://apisidra.ibge.gov.br/values/t/6579/n6/${id}/p/all/v/9324`);
    if(r.ok){
      const data = await r.json();
      if(data.length>1){
        const last = data[data.length-1];
        const val = Number((last.V || last.Valor).replace(/\./g,''));
        fields.population.value = val.toLocaleString('pt-BR');
        return;
      }
    }
  }catch{}

  fields.population.value = "Não disponível";
}

/* ====== utils ====== */
function formatCep(v){ return v.replace(/^(\d{5})(\d{3})$/,'$1-$2'); }

cepEl.addEventListener('keydown',e=>{
  if(e.key==='Enter'){ e.preventDefault(); btnBuscar.click(); }
});

renderHistory();