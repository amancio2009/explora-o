// ============ CONFIGURAÇÃO ============
const TOTAL_FASES = 10;

// ============ HISTÓRIA ============
// Cada cena tem 3 opções:
//   - duas levam a um caminho diferente da próxima fase (campo "ir")
//   - uma termina a missão (campo "fim" = motivo do game over)
// "ir: 'VITORIA'" leva à tela de vitória.
// As chaves seguem o padrão "fase + caminho", ex.: "3A" = fase 3, caminho A.
const cenas = {
  "1": {
    texto: "Base de lançamento. Na contagem regressiva, a T-10 minutos, um sensor acusa uma pequena variação de pressão em um tanque da nave Aurora.",
    opcoes: [
      { texto: "Adiar o lançamento em 1 hora e inspecionar o tanque", ir: "2A" },
      { texto: "Isolar a válvula suspeita e seguir com a contagem", ir: "2B" },
      { fim: "O tanque rompeu na ignição. Alertas de pressão nunca devem ser ignorados.", texto: "Ignorar o alerta e lançar mesmo assim" }
    ]
  },

  "2A": {
    texto: "Com o tanque revisado, o lançamento é perfeito. Você está em órbita baixa, a cerca de 400 km, a mesma altitude da Estação Espacial Internacional.",
    opcoes: [
      { texto: "Acoplar na Estação Espacial para revisar a nave", ir: "3A" },
      { texto: "Acender o motor e partir direto rumo à Lua", ir: "3B" },
      { fim: "Sem sistemas ativos, a Aurora perdeu o controle de atitude e saiu da trajetória.", texto: "Desligar todos os sistemas para economizar energia" }
    ]
  },
  "2B": {
    texto: "A Aurora decolou, mas com menos combustível do que o planejado. É preciso poupar cada gota.",
    opcoes: [
      { texto: "Usar a gravidade da Terra em um sobrevoo para ganhar impulso", ir: "3B" },
      { texto: "Ficar em órbita de espera e transferir combustível do tanque reserva", ir: "3A" },
      { fim: "Sem combustível restante, a Aurora ficou à deriva no espaço.", texto: "Queimar todo o combustível de uma só vez" }
    ]
  },

  "3A": {
    texto: "Na estação, a tripulação ajuda na revisão da Aurora. Então chega um aviso: uma tempestade solar atingirá a região em poucas horas.",
    opcoes: [
      { texto: "Abrigar-se na parte mais blindada da estação", ir: "4A" },
      { texto: "Partir antes da tempestade, rumo à Lua", ir: "4B" },
      { fim: "A radiação da tempestade solar é perigosa para quem está fora da nave.", texto: "Fazer uma caminhada espacial para checar o casco" }
    ]
  },
  "3B": {
    texto: "Você está a caminho da Lua quando um alerta mostra um pequeno desvio na rota da Aurora.",
    opcoes: [
      { texto: "Corrigir a rota com um disparo curto dos propulsores", ir: "4B" },
      { texto: "Recalcular a posição pelas estrelas antes de agir", ir: "4A" },
      { fim: "Sem cálculos precisos, a nave errou a Lua por milhares de quilômetros.", texto: "Desligar o computador de bordo e pilotar no olho" }
    ]
  },

  "4A": {
    texto: "A Aurora entra em órbita lunar com energia de sobra. Há dois locais de pouso: o polo sul, com gelo de água em crateras sombreadas, e o Mar da Tranquilidade, plano e seguro.",
    opcoes: [
      { texto: "Pousar no polo sul, em busca de gelo", ir: "5A" },
      { texto: "Pousar no Mar da Tranquilidade", ir: "5B" },
      { fim: "O pouso às cegas terminou em uma cratera íngreme.", texto: "Pousar sem escolher, no primeiro ponto que aparecer" }
    ]
  },
  "4B": {
    texto: "A Aurora chega à Lua com pouca folga de energia e a tripulação está cansada.",
    opcoes: [
      { texto: "Dar mais uma órbita para conferir os sistemas e pousar no Mar da Tranquilidade", ir: "5B" },
      { texto: "Pousar no polo sul e usar o gelo para produzir água e oxigênio", ir: "5A" },
      { fim: "O trem de pouso estava com defeito e a Aurora tombou ao tocar o solo.", texto: "Pousar sem checar o trem de pouso" }
    ]
  },

  "5A": {
    texto: "No polo sul lunar, você encontra gelo em crateras que nunca recebem luz do Sol. A temperatura ali é extremamente baixa.",
    opcoes: [
      { texto: "Enviar o rover primeiro para coletar o gelo", ir: "6A" },
      { texto: "Descer com traje térmico reforçado e corda de segurança", ir: "6B" },
      { fim: "Sem traje térmico, o frio extremo da cratera foi fatal.", texto: "Entrar na cratera com o traje comum" }
    ]
  },
  "5B": {
    texto: "A Aurora pousa suavemente no Mar da Tranquilidade, onde a Apollo 11 pousou em 1969. A poeira lunar gruda em tudo.",
    opcoes: [
      { texto: "Montar painéis solares e a antena de comunicação", ir: "6A" },
      { texto: "Coletar amostras de rocha com ferramentas seladas", ir: "6B" },
      { fim: "A Lua não tem atmosfera. Com a escotilha aberta, a cabine perdeu pressão.", texto: "Deixar a escotilha aberta para ventilar a cabine" }
    ]
  },

  "6A": {
    texto: "Com energia e comunicação em ordem, a Terra avisa: a janela de lançamento para Marte está se abrindo.",
    opcoes: [
      { texto: "Partir agora e aproveitar a janela", ir: "7A" },
      { texto: "Esperar a próxima janela e reforçar os suprimentos", ir: "7B" },
      { fim: "Fora da janela de lançamento, a viagem gastaria combustível demais e a Aurora não chegaria a Marte.", texto: "Partir sem calcular a janela" }
    ]
  },
  "6B": {
    texto: "Com as amostras guardadas, o controle autoriza a partida para Marte. A viagem vai durar meses.",
    opcoes: [
      { texto: "Seguir com piloto automático e turnos de descanso", ir: "7A" },
      { texto: "Aliviar o peso, deixando para trás equipamentos que não serão mais usados", ir: "7B" },
      { fim: "Sem o escudo térmico, a Aurora não sobreviveria à entrada na atmosfera de Marte.", texto: "Descartar o escudo térmico para economizar peso" }
    ]
  },

  "7A": {
    texto: "A viagem a Marte dura cerca de sete meses. No meio dela, o sistema de reciclagem de água falha.",
    opcoes: [
      { texto: "Consertar o sistema com as peças de reserva", ir: "8A" },
      { texto: "Racionar a água e usar o estoque de emergência", ir: "8B" },
      { fim: "Os sinais levam minutos para chegar à Terra. Ninguém poderia ajudar a tempo.", texto: "Esperar a Terra resolver o problema" }
    ]
  },
  "7B": {
    texto: "A microgravidade enfraquece ossos e músculos da tripulação. É preciso cuidar da saúde durante a viagem.",
    opcoes: [
      { texto: "Seguir um plano de exercícios diários de duas horas", ir: "8A" },
      { texto: "Criar rotinas de descanso e reforçar a alimentação", ir: "8B" },
      { fim: "Sem exercício, os músculos enfraqueceram e a tripulação não conseguiu se mover em Marte.", texto: "Parar os exercícios para economizar energia" }
    ]
  },

  "8A": {
    texto: "Marte à vista! A atmosfera do planeta é fina demais para o paraquedas sozinho frear a Aurora.",
    opcoes: [
      { texto: "Combinar escudo térmico, paraquedas e retropropulsores", ir: "9A" },
      { texto: "Fazer aerofrenagem em órbita antes de descer", ir: "9B" },
      { fim: "Sem escudo térmico, o atrito com a atmosfera destruiu a nave.", texto: "Entrar direto na atmosfera, sem escudo, para pousar mais rápido" }
    ]
  },
  "8B": {
    texto: "A Aurora entra na órbita de Marte, mas uma tempestade de poeira cobre boa parte do planeta.",
    opcoes: [
      { texto: "Esperar em órbita até a tempestade diminuir", ir: "9B" },
      { texto: "Pousar em uma região longe da tempestade", ir: "9A" },
      { fim: "A poeira cegou os sensores durante a descida.", texto: "Pousar no meio da tempestade" }
    ]
  },

  "9A": {
    texto: "Pouso concluído na cratera Jezero, que já abrigou um lago. É hora de procurar sinais de vida antiga.",
    opcoes: [
      { texto: "Analisar os sedimentos do antigo delta do rio", ir: "10A" },
      { texto: "Perfurar rochas para coletar amostras do interior", ir: "10B" },
      { fim: "A atmosfera de Marte é fina e quase toda de gás carbônico. Sem capacete, ninguém sobrevive.", texto: "Tirar o capacete para sentir o ar marciano" }
    ]
  },
  "9B": {
    texto: "A tempestade passou e a Aurora pousa com excelente visibilidade. O solo é rico em ferro oxidado, e é por isso que Marte é vermelho.",
    opcoes: [
      { texto: "Explorar a região com os rovers", ir: "10A" },
      { texto: "Montar o abrigo e produzir oxigênio a partir do gás carbônico da atmosfera", ir: "10B" },
      { fim: "Marte quase não tem proteção contra a radiação do espaço. Sair sem proteção é perigoso.", texto: "Sair para explorar sem proteção contra radiação" }
    ]
  },

  "10A": {
    texto: "Os sedimentos revelam moléculas orgânicas antigas. A descoberta é enorme, e agora você precisa decidir como relatá-la.",
    opcoes: [
      { texto: "Enviar os dados para a Terra e pedir revisão de outros cientistas", ir: "VITORIA" },
      { texto: "Guardar as amostras para análise nos laboratórios da Terra", ir: "VITORIA" },
      { fim: "Sem verificação, a ciência não aceita a descoberta e a missão perde a credibilidade.", texto: "Anunciar a descoberta de vida sem verificar" }
    ]
  },
  "10B": {
    texto: "A missão em Marte termina. A Aurora precisa decolar para a viagem de volta, com combustível produzido no próprio planeta.",
    opcoes: [
      { texto: "Decolar na janela de lançamento calculada", ir: "VITORIA" },
      { texto: "Esperar um dia de céu limpo e então decolar", ir: "VITORIA" },
      { fim: "A nave sobrecarregada de rochas extras não conseguiu sair da gravidade de Marte.", texto: "Decolar com a nave cheia de rochas extras" }
    ]
  }
};

// ============ ELEMENTOS ============
const telas = {
  inicio: document.getElementById("tela-inicio"),
  jogo: document.getElementById("tela-jogo"),
  gameover: document.getElementById("tela-gameover"),
  vitoria: document.getElementById("tela-vitoria"),
  creditos: document.getElementById("tela-creditos")
};
const inputNick = document.getElementById("nickname");
const erroNick = document.getElementById("erro-nick");
const infoJogador = document.getElementById("info-jogador");
const infoFase = document.getElementById("info-fase");
const barra = document.getElementById("barra-progresso");
const elHistoria = document.getElementById("historia");
const elOpcoes = document.getElementById("opcoes");
const textoGameOver = document.getElementById("texto-gameover");

const elEstrelas = document.getElementById("estrelas");
const elEstrelasVitoria = document.getElementById("estrelas-vitoria");

let nickname = "";

// ============ FUNÇÕES ============
function mostrarTela(nome) {
  Object.values(telas).forEach(t => t.classList.remove("ativa"));
  telas[nome].classList.add("ativa");
}

function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Desenha as 10 estrelas. "acesas" = quantas já foram coletadas;
// "nova" = posição da estrela recém-coletada (recebe a animação).
function desenharEstrelas(container, acesas, nova) {
  container.innerHTML = "";
  for (let i = 0; i < TOTAL_FASES; i++) {
    const e = document.createElement("span");
    e.className = "estrela" + (i < acesas ? " acesa" : "") + (i === nova ? " nova" : "");
    e.textContent = "★";
    container.appendChild(e);
  }
}

function iniciarJogo() {
  const nome = inputNick.value.trim();
  if (nome.length < 2) {
    erroNick.textContent = "Digite um nickname com pelo menos 2 letras.";
    inputNick.focus();
    return;
  }
  erroNick.textContent = "";
  nickname = nome;
  mostrarTela("jogo");
  mostrarCena("1");
}

function mostrarCena(id) {
  const cena = cenas[id];
  const fase = parseInt(id, 10);
  infoJogador.textContent = "Comandante: " + nickname;
  infoFase.textContent = "Fase " + fase + " de " + TOTAL_FASES;
  barra.style.width = ((fase - 1) / TOTAL_FASES) * 100 + "%";
  // 1 estrela por fase concluída; a última coletada ganha animação
  desenharEstrelas(elEstrelas, fase - 1, fase > 1 ? fase - 2 : -1);
  elHistoria.textContent = cena.texto;
  elOpcoes.innerHTML = "";

  embaralhar(cena.opcoes).forEach(opcao => {
    const btn = document.createElement("button");
    btn.className = "opcao";
    btn.textContent = opcao.texto;
    btn.addEventListener("click", () => escolher(opcao, btn));
    elOpcoes.appendChild(btn);
  });
}

function escolher(opcao, botao) {
  if (opcao.fim) {
    textoGameOver.textContent = opcao.fim;
    mostrarTela("gameover");
    document.getElementById("btn-tentar-novamente").focus();
  } else if (opcao.ir === "VITORIA") {
    mostrarVitoria();
  } else {
    mostrarCena(opcao.ir);
  }
}

function mostrarVitoria() {
  barra.style.width = "100%";
  desenharEstrelas(elEstrelasVitoria, TOTAL_FASES, -1);
  document.getElementById("texto-vitoria").textContent =
    "Parabéns, comandante " + nickname + "! Você completou as " + TOTAL_FASES +
    " fases e levou a Aurora da Terra até Marte com a tripulação em segurança.";
  mostrarTela("vitoria");
}

function voltarAoInicio() {
  mostrarTela("inicio"); // o nickname continua preenchido
  inputNick.focus();
}

// ============ EVENTOS ============
document.getElementById("btn-play").addEventListener("click", iniciarJogo);
inputNick.addEventListener("keydown", e => { if (e.key === "Enter") iniciarJogo(); });
document.getElementById("btn-voltar").addEventListener("click", voltarAoInicio);
document.getElementById("btn-jogar-novamente").addEventListener("click", voltarAoInicio);
document.getElementById("btn-creditos").addEventListener("click", () => mostrarTela("creditos"));
document.getElementById("btn-voltar-creditos").addEventListener("click", voltarAoInicio);
document.getElementById("btn-tentar-novamente").addEventListener("click", () => {
  mostrarTela("jogo");
  mostrarCena("1");
});