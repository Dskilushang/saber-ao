// ============================================================
// SABER AO — BASE DE QUESTIONS
// ============================================================
// 10 perguntas por partida:
// Q1-Q2  Nível 1 — 100 pts — 20 s
// Q3-Q5  Nível 2 — 200 pts — 20 s
// Q6-Q8  Nível 3 — 300 pts — 20 s
// Q9-Q10 Nível 4 — 500 pts — 25 s
//
// As categorias organizam a banca; NÃO criam um menu de categorias.
// O jogo utiliza PORTUGUÊS como único idioma.
// ============================================================

export const CATEGORIES = [
  {
    id: "historia",
    label_pt: "História",
    icon: "🏛️",
    color: "#C0392B",
  },
  {
    id: "geografia",
    label_pt: "Geografia",
    icon: "🗺️",
    color: "#27AE60",
  },
  {
    id: "cultura",
    label_pt: "Cultura",
    icon: "🎭",
    color: "#8E44AD",
  },
  {
    id: "musica",
    label_pt: "Música",
    icon: "🎵",
    color: "#E67E22",
  },
  {
    id: "ciencia",
    label_pt: "Ciência",
    icon: "🔬",
    color: "#2980B9",
  },
  {
    id: "desporto",
    label_pt: "Desporto",
    icon: "⚽",
    color: "#16A085",
  },
  {
    id: "religiao",
    label_pt: "Religião",
    icon: "✝️",
    color: "#7D3C98",
  },
  {
    id: "espiritualidade",
    label_pt: "Espiritualidade",
    icon: "✨",
    color: "#AF7AC5",
  },
  {
    id: "politica",
    label_pt: "Política e Cidadania",
    icon: "🏛️",
    color: "#34495E",
  },
  {
    id: "culinaria",
    label_pt: "Culinária",
    icon: "🍲",
    color: "#D35400",
  },
  {
    id: "zoologia",
    label_pt: "Zoologia",
    icon: "🦁",
    color: "#229954",
  },
  {
    id: "proverbios",
    label_pt: "Provérbios",
    icon: "📜",
    color: "#A569BD",
  },
  {
    id: "literatura",
    label_pt: "Literatura",
    icon: "📚",
    color: "#884EA0",
  },
  {
    id: "linguas",
    label_pt: "Línguas",
    icon: "🗣️",
    color: "#2874A6",
  },
  {
    id: "artes",
    label_pt: "Artes",
    icon: "🎨",
    color: "#CA6F1E",
  },
  {
    id: "tecnologia",
    label_pt: "Tecnologia",
    icon: "💻",
    color: "#2E86C1",
  },
  {
    id: "natureza",
    label_pt: "Natureza e Ambiente",
    icon: "🌍",
    color: "#239B56",
  },
  {
    id: "economia",
    label_pt: "Economia",
    icon: "💰",
    color: "#B7950B",
  },
  {
    id: "saude",
    label_pt: "Saúde",
    icon: "🩺",
    color: "#148F77",
  },
  {
    id: "inventos",
    label_pt: "Invenções e Descobertas",
    icon: "💡",
    color: "#F1C40F",
  },
  {
    id: "personalidades",
    label_pt: "Personalidades",
    icon: "👤",
    color: "#5D6D7E",
  },
  {
    id: "cinema",
    label_pt: "Cinema",
    icon: "🎬",
    color: "#884EA0",
  }
];

export const DIFFICULTY_CONFIG = {
  1: { id: 1, label_pt: "Fácil", points: 100, timeLimit: 20 },
  2: { id: 2, label_pt: "Intermédio", points: 200, timeLimit: 20 },
  3: { id: 3, label_pt: "Difícil", points: 300, timeLimit: 20 },
  4: { id: 4, label_pt: "Especialista", points: 500, timeLimit: 25 },
};

export const SESSION_DIFFICULTIES = [1, 1, 2, 2, 2, 3, 3, 3, 4, 4];

export const QUESTION_TYPES = [
  "classic",
  "image",
  "image_ab",
  "identification",
  "true_false",
  "chronology",
  "audio",
  "surprise",
];

export const QUESTIONS = {

historia: [
  {
    id: "hist_01",
    difficulty: 2,
    type: "classic",
    question: "Que acontecimento marcou o início da luta armada de libertação nacional em Angola, em 4 de fevereiro de 1961?",
    options: [
      "Ataques de nacionalistas a prisões e instalações coloniais em Luanda",
      "Assinatura dos Acordos de Alvor",
      "Proclamação da independência em Luanda",
      "Início da guerra civil angolana"
    ],
    correctAnswer: "Ataques de nacionalistas a prisões e instalações coloniais em Luanda",
    correct: "Ataques de nacionalistas a prisões e instalações coloniais em Luanda",
    hint: "Os ataques de 4 de fevereiro de 1961 tiveram como alvo instalações coloniais em Luanda."
  },
  {
    id: "hist_02",
    difficulty: 1,
    type: "classic",
    question: "Quem foi o primeiro Presidente da República de Angola após a independência?",
    options: [
      "Agostinho Neto",
      "José Eduardo dos Santos",
      "Holden Roberto",
      "Jonas Savimbi"
    ],
    correctAnswer: "Agostinho Neto",
    correct: "Agostinho Neto"
  },
  {
    id: "hist_03",
    difficulty: 1,
    type: "classic",
    question: "De que país Angola conquistou a sua independência em 1975?",
    options: [
      "Portugal",
      "França",
      "Reino Unido",
      "Espanha"
    ],
    correctAnswer: "Portugal",
    correct: "Portugal"
  },
  {
    id: "hist_04",
    difficulty: 2,
    type: "classic",
    question: "Que movimento proclamou a independência de Angola em Luanda, a 11 de novembro de 1975?",
    options: [
      "MPLA",
      "FNLA",
      "UNITA",
      "FLEC"
    ],
    correctAnswer: "MPLA",
    correct: "MPLA"
  },
  {
    id: "hist_05",
    difficulty: 1,
    type: "classic",
    question: "Em que cidade foi proclamada a independência de Angola, a 11 de novembro de 1975, pelo MPLA?",
    options: [
      "Luanda",
      "Huambo",
      "Benguela",
      "Lubango"
    ],
    correctAnswer: "Luanda",
    correct: "Luanda"
  },
  {
    id: "hist_06",
    difficulty: 2,
    type: "classic",
    question: "Em que ano terminou oficialmente a guerra civil angolana?",
    options: [
      "2002",
      "1991",
      "1975",
      "2010"
    ],
    correctAnswer: "2002",
    correct: "2002"
  },
  {
    id: "hist_07",
    difficulty: 3,
    type: "classic",
    question: "Que escritor angolano se tornou o primeiro Presidente da República após a independência?",
    options: [
      "Agostinho Neto",
      "Lúcio Lara",
      "Holden Roberto",
      "Jonas Savimbi"
    ],
    correctAnswer: "Agostinho Neto",
    correct: "Agostinho Neto"
  },
  {
    id: "hist_08",
    difficulty: 3,
    type: "classic",
    question: "Durante o período colonial português, que língua era utilizada como principal língua da administração em Angola?",
    options: [
      "Português",
      "Francês",
      "Inglês",
      "Espanhol"
    ],
    correctAnswer: "Português",
    correct: "Português"
  },
  {
    id: "hist_09",
    difficulty: 2,
    type: "classic",
    question: "O que significa a sigla MPLA?",
    options: [
      "Movimento Popular de Libertação de Angola",
      "Movimento Patriótico de Luta Africana",
      "Movimento Popular de Luta Angolana",
      "Movimento Político de Libertação Africana"
    ],
    correctAnswer: "Movimento Popular de Libertação de Angola",
    correct: "Movimento Popular de Libertação de Angola"
  },
  {
    id: "hist_10",
    difficulty: 1,
    type: "classic",
    question: "Em que dia se celebra a independência de Angola?",
    options: [
      "11 de Novembro",
      "4 de Fevereiro",
      "17 de Setembro",
      "25 de Dezembro"
    ],
        correctAnswer: "11 de Novembro",
    correct: "11 de Novembro"
  },
  {
    id: "hist_11",
    difficulty: 4,
    type: "classic",
    question: "Em que ano a rainha Njinga a Mbande foi batizada em Luanda, recebendo o nome de Ana de Sousa?",
    options: [
      "1622",
      "1624",
      "1631",
      "1641"
    ],
    correctAnswer: "1622",
    correct: "1622",
    hint: "O batismo ocorreu durante a missão diplomática de Njinga a Luanda."
  },
  {
    id: "hist_12",
    difficulty: 4,
    type: "classic",
    question: "Qual governador português recebeu a embaixada diplomática de Njinga a Mbande em Luanda, em 1622?",
    options: [
      "João Correia de Sousa",
      "Fernão de Sousa",
      "Paulo Dias de Novais",
      "Salvador Correia de Sá"
    ],
    correctAnswer: "João Correia de Sousa",
    correct: "João Correia de Sousa"
  },
  {
    id: "hist_13",
    difficulty: 1,
    type: "classic",
    question: "Qual era a capital política e espiritual do antigo Reino do Kongo?",
    options: [
      "Mbanza Kongo",
      "Luanda",
      "Benguela",
      "Matamba"
    ],
    correctAnswer: "Mbanza Kongo",
    correct: "Mbanza Kongo"
  },
  {
    id: "hist_14",
    difficulty: 1,
    type: "classic",
    question: "Em que atual província angolana se encontra Mbanza Kongo?",
    options: [
      "Zaire",
      "Uíge",
      "Cabinda",
      "Malanje"
    ],
    correctAnswer: "Zaire",
    correct: "Zaire"
  },
  {
    id: "hist_15",
    difficulty: 2,
    type: "classic",
    question: "Em que ano os navegadores portugueses chegaram à região do Reino do Kongo?",
    options: [
      "1483",
      "1491",
      "1505",
      "1575"
    ],
    correctAnswer: "1483",
    correct: "1483"
  },
  {
    id: "hist_16",
    difficulty: 2,
    type: "classic",
    question: "Segundo as tradições históricas do Kongo, em que período foi fundado o reino?",
    options: [
      "No final do século XIV",
      "No início do século XII",
      "No século XVI",
      "No século XVIII"
    ],
    correctAnswer: "No final do século XIV",
    correct: "No final do século XIV"
  },
  {
    id: "hist_17",
    difficulty: 2,
    type: "classic",
    question: "Qual rei do Kongo adotou o nome cristão de João I após a sua conversão em 1491?",
    options: [
      "Nzinga a Nkuwu",
      "Afonso I",
      "Álvaro I",
      "Garcia II"
    ],
    correctAnswer: "Nzinga a Nkuwu",
    correct: "Nzinga a Nkuwu"
  },
  {
    id: "hist_18",
    difficulty: 3,
    type: "classic",
    question: "Qual foi o nome pelo qual ficou conhecido o rei Mvemba a Nzinga?",
    options: [
      "Afonso I",
      "João I",
      "Álvaro I",
      "Garcia I"
    ],
    correctAnswer: "Afonso I",
    correct: "Afonso I"
  },
  {
    id: "hist_19",
    difficulty: 3,
    type: "classic",
    question: "No século XVI, como o rei do Kongo exercia autoridade sobre os principais cargos administrativos?",
    options: [
      "Nomeava e podia destituir funcionários, atribuindo rendas ligadas aos cargos",
      "Permitía que todos os cargos fossem escolhidos por eleições populares",
      "Entregava toda a administração aos governadores portugueses",
      "Confiava todos os cargos exclusivamente aos chefes militares"
    ],
    correctAnswer: "Nomeava e podia destituir funcionários, atribuindo rendas ligadas aos cargos",
    correct: "Nomeava e podia destituir funcionários, atribuindo rendas ligadas aos cargos",
    hint: "O poder real incluía o controlo das nomeações e das rendas associadas aos cargos."
  },
  {
    id: "hist_20",
    difficulty: 3,
    type: "classic",
    question: "Quem foi Henrique, filho do rei Afonso I, nomeado bispo em 1518?",
    options: [
      "Um príncipe do Kongo que se tornou bispo",
      "Um navegador português",
      "Um governador de Luanda",
      "Um rei do Ndongo"
    ],
    correctAnswer: "Um príncipe do Kongo que se tornou bispo",
    correct: "Um príncipe do Kongo que se tornou bispo"
  },
  {
    id: "hist_21",
    difficulty: 4,
    type: "classic",
    question: "Quem traduziu para a língua Kikongo a obra Doutrina Cristã, publicada em 1624?",
    options: [
      "Mateus Cardoso",
      "Marcos Jorge",
      "Ignacio Martinez",
      "António Manuel Nsaku ne Vunda"
    ],
    correctAnswer: "Mateus Cardoso",
    correct: "Mateus Cardoso",
    hint: "O jesuíta traduziu a obra com a colaboração de conhecedores da língua Kikongo."
  },
    {
      id: "hist_22",
      difficulty: 4,
      type: "classic",
      question: "Em que ano Mbanza Kongo foi inscrita na Lista do Património Mundial da UNESCO?",
      options: [
        "2017",
        "2002",
        "2010",
        "2020"
      ],
      correctAnswer: "2017",
      correct: "2017",
    },
     {
  id: "hist_23",
  type: "classic",
  difficulty: 3,
  question: "Que aconteceu ao Reino do Kongo após a Batalha de Ambuíla, em 1665?",
  options: [
    "Entrou num período de fragmentação política e enfraquecimento do poder central",
    "Conquistou o território de Angola",
    "Tornou-se uma colónia holandesa",
    "Transferiu a sua capital para Luanda"
  ],
  correctAnswer: "Entrou num período de fragmentação política e enfraquecimento do poder central",
  correct: "Entrou num período de fragmentação política e enfraquecimento do poder central",
  hint: "A batalha terminou com a derrota e morte do rei António I."
},
{
  id: "hist_24",
  type: "classic",
  difficulty: 3,
  question: "Que língua era historicamente falada pelo povo Kwepe, no sudoeste de Angola, antes da sua substituição progressiva pelo Kuvale?",
  options: ["Kwadi", "Kikongo", "Kimbundu", "Umbundu"],
  correctAnswer: "Kwadi",
  correct: "Kwadi",
  hint: "Era uma língua da família Khoe-Kwadi, hoje considerada extinta."
},
{
  id: "hist_25",
  type: "classic",
  difficulty: 2,
  question: "Qual rainha governou o Reino de Matamba e também esteve ligada ao Reino do Ndongo?",
  options: [
    "Njinga a Mbande",
    "Ana de Sousa",
    "Nzinga a Nkuwu",
    "Kandengue"
  ],
  correctAnswer: "Njinga a Mbande",
  correct: "Njinga a Mbande",
  hint: "Foi uma das mais importantes soberanas da história de Angola."
},

{
  id: "hist_26",
  type: "classic",
  difficulty: 2,
  question: "De que título dos soberanos do Reino do Ndongo deriva o nome Angola?",
  options: [
    "Ngola",
    "Manikongo",
    "Mwene",
    "Soba"
  ],
  correctAnswer: "Ngola",
  correct: "Ngola",
  hint: "Era o título utilizado pelos soberanos do antigo Reino do Ndongo."
},
{
  id: "hist_27",
  type: "classic",
  difficulty: 3,
  question: "Há aproximadamente quantos anos começou a grande expansão dos povos de língua bantu?",
  options: [
    "Há cerca de 5.000 anos",
    "Há cerca de 500 anos",
    "Há cerca de 1.000 anos",
    "Há cerca de 10.000 anos"
  ],
  correctAnswer: "Há cerca de 5.000 anos",
  correct: "Há cerca de 5.000 anos",
  hint: "O processo começou há vários milénios, muito antes da colonização europeia."
},
{
  id: "hist_28",
  type: "classic",
  difficulty: 3,
  question: "Que mostram os estudos históricos e genéticos sobre os contactos entre os grupos de língua bantu e as populações locais durante a sua expansão?",  options: [
    "Interações, trocas e mistura com populações locais",
    "Ausência total de contacto",
    "Apenas conflitos militares",
    "Substituição imediata de todas as populações"
  ],
  correctAnswer: "Interações, trocas e mistura com populações locais",
  correct: "Interações, trocas e mistura com populações locais",
  hint: "A expansão envolveu migrações e contactos culturais e linguísticos."
},
{
  id: "hist_29",
  type: "classic",
  difficulty: 1,
  question: "Qual é a língua tradicionalmente falada pelos Ovimbundu?",
  options: ["Umbundu", "Kikongo", "Kimbundu", "Cokwe"],
  correctAnswer: "Umbundu",
  correct: "Umbundu",
  hint: "É uma das principais línguas nacionais de Angola."
},
{
  id: "hist_30",
  type: "classic",
  difficulty: 2,
  question: "Qual é a língua tradicionalmente associada ao povo Ambundu?",
  options: ["Kimbundu", "Umbundu", "Kikongo", "Oshikwanyama"],
  correctAnswer: "Kimbundu",
  correct: "Kimbundu",
  hint: "Era a língua de muitos habitantes do antigo reino do Ndongo."
},
{
  id: "hist_31",
  type: "classic",
  difficulty: 2,
  question: "A que grupo linguístico pertencem as variedades tradicionalmente faladas por comunidades Bakongo?",
  options: ["Kikongo", "Kimbundu", "Umbundu", "Cokwe"],
  correctAnswer: "Kikongo",
  correct: "Kikongo",
  hint: "É a língua histórica dos povos ligados ao reino do Kongo."
},
{
  id: "hist_32",
  type: "classic",
  difficulty: 2,
  question: "Qual é a língua tradicionalmente falada pelo povo Kwanyama (Ovakwanyama)?",
  options: ["Oshikwanyama", "Kikongo", "Kimbundu", "Umbundu"],
  correctAnswer: "Oshikwanyama",
  correct: "Oshikwanyama",
  hint: "É uma língua bantu falada no sul de Angola e no norte da Namíbia."
    },
    {
      id: "hist_33",
      difficulty: 2,
      type: "classic",
      question: "Em que atuais países se situavam territórios do Reino do Kongo no seu apogeu?",
      options: [
        "Angola, República Democrática do Congo e República do Congo",
        "Angola, Namíbia e África do Sul",
        "Angola, Zâmbia e Moçambique",
        "República do Congo, Gabão e Camarões"
      ],
      correctAnswer: "Angola, República Democrática do Congo e República do Congo",
      correct: "Angola, República Democrática do Congo e República do Congo",
    },
    {
      id: "hist_34",
      difficulty: 2,
      type: "classic",
      question: "Entre que séculos esteve ativo o antigo Reino do Kongo?",
      options: [
        "Do século XIV ao século XIX",
        "Do século X ao século XIII",
        "Do século XVI ao século XVIII",
        "Do século XIX ao século XX"
      ],
      correctAnswer: "Do século XIV ao século XIX",
      correct: "Do século XIV ao século XIX",
    },
    {
      id: "hist_35",
      difficulty: 3,
      type: "classic",
      question: "Que elementos estavam entre os principais espaços do centro histórico de Mbanza Kongo?",
      options: [
        "A residência real, o tribunal consuetudinário, a árvore sagrada e os locais funerários reais",
        "Uma fortaleza romana, um porto grego e um teatro",
        "Uma fábrica colonial, uma estação ferroviária e um aeroporto",
        "Um palácio francês, uma universidade inglesa e um mercado árabe"
      ],
      correctAnswer: "A residência real, o tribunal consuetudinário, a árvore sagrada e os locais funerários reais",
      correct: "A residência real, o tribunal consuetudinário, a árvore sagrada e os locais funerários reais",
    },
    {
      id: "hist_36",
      difficulty: 2,
      type: "classic",
      question: "Que tipo de construções os portugueses acrescentaram à cidade de Mbanza Kongo após a sua chegada?",
      options: [
        "Edifícios de pedra, incluindo igrejas",
        "Pirâmides de pedra",
        "Templos gregos",
        "Arranha-céus modernos"
      ],
      correctAnswer: "Edifícios de pedra, incluindo igrejas",
      correct: "Edifícios de pedra, incluindo igrejas",
    },
    {
      id: "hist_37",
      difficulty: 4,
      type: "classic",
      question: "Em que ano chegou a Roma António Manuel Nsaku ne Vunda, enviado pelo rei Álvaro II do Reino do Kongo como embaixador junto da Santa Sé?",
      options: [
        "1608",
        "1483",
        "1491",
        "1624"
      ],
      correctAnswer: "1608",
      correct: "1608",
    },
    {
      id: "hist_38",
      difficulty: 3,
      type: "classic",
      question: "A que circuito do comércio atlântico esteve ligado o Reino do Kongo, sobretudo a partir do século XVI?",
options: [   "Ao tráfico de pessoas escravizadas para as Américas e as Caraíbas",
        "Ao comércio de seda com a Ásia",
        "Ao tráfico de especiarias para a Índia",
        "Ao comércio de chá com a Europa"
      ],
      correctAnswer: "Ao tráfico de pessoas escravizadas para as Américas e as Caraíbas",
      correct: "Ao tráfico de pessoas escravizadas para as Américas e as Caraíbas",
    },
    {
      id: "hist_39",
      difficulty: 4,
      type: "classic",
      question: "Segundo as tradições orais, quais figuras estão associadas à fundação do Reino do Kongo?",
      options: [
        "Nimi a Nzima e Nsaku Lau",
        "Nzinga a Mbande e Afonso I",
        "Ngola Kiluanji e Ekuikui II",
        "Lukeni lua Nimi e Garcia II"
      ],
      correctAnswer: "Nimi a Nzima e Nsaku Lau",
      correct: "Nimi a Nzima e Nsaku Lau",
    },
    {
      id: "hist_40",
      difficulty: 4,
      type: "classic",
      question: "Segundo a tradição histórica apresentada pelo Museu Real da África Central, quem se tornou o primeiro rei do Kongo?",
      options: [
        "Lukeni lua Nimi",
        "Afonso I",
        "Garcia II",
        "Nzinga a Nkuwu"
      ],
            correctAnswer: "Lukeni lua Nimi",
      correct: "Lukeni lua Nimi",
    },
  ],

  geografia: [
    {
      id: "geo_01",
      difficulty: 1,
      type: "classic",
      question: "Qual é a capital de Angola?",
      options: ["Luanda", "Huambo", "Benguela", "Malanje"],
      correctAnswer: "Luanda",
      correct: "Luanda",
    },
    {
    id: "geo_02",
      difficulty: 1,
      type: "classic",
      question: "Quantas províncias tem Angola atualmente?",
      options: ["21", "18", "20", "16"],
      correctAnswer: "21",
      correct: "21",
      explanation: "Angola\ntem atualmente 21 províncias.",
    },
      {
      id: "geo_03",
      difficulty: 2,
      type: "classic",
      question: "Qual rio dá nome a duas províncias angolanas?",
      options: ["Kwanza", "Congo", "Zambeze", "Cunene"],
      correctAnswer: "Kwanza",
      correct: "Kwanza",
    },
    {
      id: "geo_04",
      difficulty: 2,
      type: "classic",
      question: "Qual é a segunda maior cidade de Angola?",
      options: ["Huambo", "Benguela", "Lubango", "Malanje"],
      correctAnswer: "Huambo",
      correct: "Huambo",
    },
  {  
  id: "geo_06",
  difficulty: 3,
  type: "classic",
  question: "Qual país faz fronteira com a parte principal de Angola a norte?",
  options: [
    "República Democrática do Congo",
    "Namíbia",
    "Zâmbia",
    "Botswana"
  ],
  correctAnswer: "República Democrática do Congo",
  correct: "República Democrática do Congo",
    explanation: "A parte principal de Angola faz fronteira com a República Democrática do Congo a norte. O enclave de Cabinda faz fronteira com a República do Congo.",
    },
  ],
  religiao: [
    {
      id: "rel_01",
      difficulty: 1,
      type: "classic",
      category: "Espiritualidade e Tradições",
      topic: "Culto aos Antepassados",
      question: "Nas crenças tradicionais angolanas, a veneração e o respeito aos espíritos dos antepassados têm um papel central. Como são frequentemente chamados estes espíritos venerados?",
      options: [
        "Bakulu (ou Akulu)",
        "Anjos da Guarda",
        "Santos Padroeiros",
        "Génios da Lâmpada"
      ],
      correctAnswer: "Bakulu (ou Akulu)",
      correct: "Bakulu (ou Akulu)",
      hint: "O termo deriva das línguas bantu, referindo-se aos anciãos ou antepassados que protegem a comunidade.",
    },

    {
      id: "rel_02",
      difficulty: 1,
      type: "classic",
      category: "Religião em Angola",
      topic: "Igreja Tocoísta",
      question: "Qual é o nome da importante igreja de matriz cristã e profética fundada em Angola em 1949, que teve grande impacto na identidade espiritual e social do país?",
      options: [
        "Igreja do Nosso Senhor Jesus Cristo no Mundo (Tocoísta)",
        "Igreja Católica Romana",
        "Igreja Metodista Unida",
        "Igreja Batista de Angola"
      ],
      correctAnswer: "Igreja do Nosso Senhor Jesus Cristo no Mundo (Tocoísta)",
      correct: "Igreja do Nosso Senhor Jesus Cristo no Mundo (Tocoísta)",
      hint: "Foi fundada por Simão Toco e tornou-se uma das principais igrejas de matriz africana em Angola.",
    },

    {
      id: "rel_03",
      difficulty: 1,
      type: "classic",
      category: "Mitologia e Tradições",
      topic: "Kianda",
      question: "Na tradição angolana, especialmente nas regiões costeiras, quem é a Kianda?",
      options: [
        "Uma entidade espiritual ligada às águas",
        "Uma rainha histórica",
        "Um animal sagrado",
        "Um instrumento musical"
      ],
      correctAnswer: "Uma entidade espiritual ligada às águas",
      correct: "Uma entidade espiritual ligada às águas",
    },
    
    {
      id: "rel_04",
      difficulty: 1,
      type: "classic",
      category: "Tradições",
      topic: "Alambamento",
      question: "O que é o alambamento em muitas tradições angolanas?",
      options: [
        "Uma cerimónia tradicional relacionada ao casamento",
        "Uma cerimónia de iniciação militar",
        "Uma dança de guerra",
        "Uma festa de colheita"
      ],
      correctAnswer: "Uma cerimónia tradicional relacionada ao casamento",
      correct: "Uma cerimónia tradicional relacionada ao casamento",
    },

    {
      id: "rel_05",
      difficulty: 1,
      type: "classic",
      category: "Religião",
      topic: "Cristianismo",
      question: "Qual é a religião de matriz estrangeira historicamente predominante em Angola?",
      options: [
        "Cristianismo",
        "Hinduísmo",
        "Budismo",
        "Xintoísmo"
      ],
      correctAnswer: "Cristianismo",
      correct: "Cristianismo",
    },

    {
      id: "rel_06",
      difficulty: 2,
      type: "classic",
      category: "Tradições",
      topic: "Suku",
      question: "Em várias tradições bantu, o termo Suku ou Nzambi pode estar associado a qual conceito?",
      options: [
        "Deus ou divindade suprema",
        "Espírito de um guerreiro",
        "Animal totémico",
        "Instrumento musical"
      ],
      correctAnswer: "Deus ou divindade suprema",
      correct: "Deus ou divindade suprema",
    },

    {
      id: "rel_07",
      difficulty: 2,
      type: "classic",
      category: "Tradições de Luanda",
      topic: "Kianda",
      question: "Qual local de Luanda está tradicionalmente associado às celebrações da Kianda?",
      options: [
        "Ilha de Luanda",
        "Morro da Cruz",
        "Largo da Independência",
        "Cidade Alta"
      ],
      correctAnswer: "Ilha de Luanda",
      correct: "Ilha de Luanda",
    },

    {
      id: "rel_08",
      difficulty: 2,
      type: "classic",
      category: "Religião Tradicional",
      topic: "Nzambi",
      question: "Qual destes nomes é utilizado em tradições bantu para designar Deus ou o Ser Supremo?",
      options: [
        "Nzambi / Nzambi Mpungu",
        "Kianda",
        "Mukishi",
        "Ngombo"
      ],
      correctAnswer: "Nzambi / Nzambi Mpungu",
      correct: "Nzambi / Nzambi Mpungu",
    },

    {
      id: "rel_09",
      difficulty: 2,
      type: "classic",
      category: "Práticas Tradicionais",
      topic: "Kimbanda",
      question: "Nas tradições bantu, o termo Kimbanda está historicamente relacionado a quê?",
      options: [
        "Práticas de cura e conhecimento tradicional",
        "Pesca marítima",
        "Dança de salão",
        "Arquitetura colonial"
      ],
      correctAnswer: "Práticas de cura e conhecimento tradicional",
      correct: "Práticas de cura e conhecimento tradicional",
    },

    {
      id: "rel_10",
      difficulty: 2,
      type: "classic",
      category: "Arte e Espiritualidade",
      topic: "Pensador",
      question: "A famosa escultura angolana conhecida como Pensador também está relacionada a qual nome tradicional?",
      options: [
        "Samanhonga",
        "Kianda",
        "Mukishi",
        "Ngombo"
      ],
      correctAnswer: "Samanhonga",
      correct: "Samanhonga",
    },

    {
      id: "rel_11",
      difficulty: 2,
      type: "classic",
      category: "Tradições",
      topic: "Espaços Sagrados",
      question: "Como podem ser considerados os cemitérios ancestrais em muitas comunidades tradicionais?",
      options: [
        "Espaços de memória e ligação espiritual com os antepassados",
        "Locais exclusivamente comerciais",
        "Espaços destinados apenas a cerimónias políticas",
        "Locais de treinamento militar"
      ],
      correctAnswer: "Espaços de memória e ligação espiritual com os antepassados",
      correct: "Espaços de memória e ligação espiritual com os antepassados",
    },

    {
      id: "rel_12",
      difficulty: 2,
      type: "classic",
      category: "Cosmologia",
      topic: "Kalunga",
      question: "Em determinadas tradições bantu, Kalunga pode estar associado a qual ideia?",
      options: [
        "Mundo dos mortos, mar ou dimensão espiritual",
        "Instrumento musical",
        "Título militar",
        "Tipo de agricultura"
      ],
      correctAnswer: "Mundo dos mortos, mar ou dimensão espiritual",
      correct: "Mundo dos mortos, mar ou dimensão espiritual",
    },

    {
      id: "rel_13",
      difficulty: 3,
      type: "classic",
      category: "História Religiosa",
      topic: "Kimbanguismo",
      question: "Em que território surgiu historicamente o movimento religioso associado a Simon Kimbangu?",
      options: [
        "República Democrática do Congo",
        "Angola",
        "Namíbia",
        "Moçambique"
      ],
      correctAnswer: "República Democrática do Congo",
      correct: "República Democrática do Congo",
    },

    {
      id: "rel_14",
      difficulty: 3,
      type: "classic",
      category: "Arte Tradicional",
      topic: "Mwana Pwo",
      question: "O que representa tradicionalmente a máscara Mwana Pwo?",
      options: [
        "Uma figura feminina associada à beleza e ancestralidade",
        "Um guerreiro masculino",
        "Um animal marinho",
        "Um espírito da floresta"
      ],
      correctAnswer: "Uma figura feminina associada à beleza e ancestralidade",
      correct: "Uma figura feminina associada à beleza e ancestralidade",
    },

    {
      id: "rel_15",
      difficulty: 3,
      type: "classic",
      category: "Ritos de Iniciação",
      topic: "Efiko",
      question: "O Efiko é tradicionalmente associado a que tipo de prática?",
      options: [
        "Rito de iniciação feminina",
        "Dança de guerra",
        "Cerimónia de pesca",
        "Ritual de coroação"
      ],
      correctAnswer: "Rito de iniciação feminina",
      correct: "Rito de iniciação feminina",
    },

    {
      id: "rel_16",
      difficulty: 3,
      type: "classic",
      category: "Cristianismo em Angola",
      topic: "IECA",
      question: "O que significa a sigla IECA no contexto religioso angolano?",
      options: [
        "Igreja Evangélica Congregacional em Angola",
        "Igreja Episcopal Católica Angolana",
        "Instituto Evangélico Cristão Africano",
        "Igreja Ecuménica de Cristo em Angola"
      ],
      correctAnswer: "Igreja Evangélica Congregacional em Angola",
      correct: "Igreja Evangélica Congregacional em Angola",
    },

    {
      id: "rel_17",
      difficulty: 3,
      type: "classic",
      category: "Práticas Tradicionais",
      topic: "Ngombo",
      question: "O Ngombo está tradicionalmente relacionado a qual prática entre alguns povos bantu?",
      options: [
        "Adivinhação e consulta espiritual",
        "Pesca artesanal",
        "Fabricação de instrumentos",
        "Dança tradicional"
      ],
      correctAnswer: "Adivinhação e consulta espiritual",
      correct: "Adivinhação e consulta espiritual",
    },

    {
      id: "rel_18",
      difficulty: 3,
      type: "classic",
      category: "História Religiosa",
      topic: "Simão Toco",
      question: "Quem foi Simão Toco?",
      options: [
        "Líder religioso angolano associado ao Tocoísmo",
        "Primeiro rei de Angola",
        "Escultor angolano",
        "Explorador português"
      ],
      correctAnswer: "Líder religioso angolano associado ao Tocoísmo",
      correct: "Líder religioso angolano associado ao Tocoísmo",
    },

    {
      id: "rel_19",
      difficulty: 3,
      type: "classic",
      category: "Lugares Sagrados",
      topic: "Pungo Andongo",
      question: "Pungo Andongo é conhecido, além das suas formações rochosas, por estar ligado a tradições históricas e culturais de qual região?",
      options: [
        "Malanje",
        "Cabinda",
        "Namibe",
        "Cuando Cubango"
      ],
      correctAnswer: "Malanje",
      correct: "Malanje",
    },

    {
      id: "rel_20",
      difficulty: 3,
      type: "classic",
      category: "Ritos Tradicionais",
      topic: "Mukanda",
      question: "O Mukanda é um importante rito tradicional associado principalmente a quê?",
      options: [
        "Iniciação masculina",
        "Casamento real",
        "Pesca marítima",
        "Colheita do café"
      ],
      correctAnswer: "Iniciação masculina",
      correct: "Iniciação masculina",
    },

    {
      id: "rel_21",
      difficulty: 3,
      type: "classic",
      category: "Religião e Cultura",
      topic: "Mami Wata",
      question: "Mami Wata é uma figura espiritual encontrada em diversas tradições africanas. Com que elemento está principalmente associada?",
      options: [
        "Água",
        "Fogo",
        "Montanha",
        "Deserto"
      ],
      correctAnswer: "Água",
            correct: "Água",
    },
  ],
  cinema: [
    {
      id: "cin_22",
      difficulty: 2,
      type: "classic",
      category: "Documentários",
      topic: "Para Lá dos Meus Passos",
      question: "O premiado documentário angolano Para Lá dos Meus Passos (2019), dirigido por Kamy Lara, debruça-se sobre qual manifestação artística?",
      options: [
        "Dança Contemporânea e Tradicional",
        "Pintura Rupestre em Namibe",
        "Música Semba Antiga",
        "Escultura em Madeira Kuduro"
      ],
      correctAnswer: "Dança Contemporânea e Tradicional",
      correct: "Dança Contemporânea e Tradicional",
    },

    {
      id: "cin_23",
      difficulty: 3,
      type: "classic",
      category: "Cinema Histórico e Anticolonial",
      topic: "Sambizanga",
      question: "O icónico filme anticolonial Sambizanga (1972) baseia-se numa obra literária de Luandino Vieira. Quem realizou esta obra?",
      options: [
        "Sarah Maldoror",
        "Ruy Duarte de Carvalho",
        "António Ole",
        "Orlando Fortunato"
      ],
      correctAnswer: "Sarah Maldoror",
      correct: "Sarah Maldoror",
    },

    {
      id: "cin_24",
      difficulty: 3,
      type: "classic",
      category: "Pioneiros do Cinema",
      topic: "Nelisita",
      question: "Realizado em 1982, o filme Nelisita é um marco etnográfico e cinematográfico fundamental em Angola, falado integralmente na língua Nyaneka. Quem foi o seu realizador?",
      options: [
        "Ruy Duarte de Carvalho",
        "António Ole",
        "Asdrúbal Rebelo",
        "Manuel Mariano"
      ],
      correctAnswer: "Ruy Duarte de Carvalho",
      correct: "Ruy Duarte de Carvalho",
    },

    {
      id: "cin_25",
      difficulty: 3,
      type: "classic",
      category: "Cinema Histórico",
      topic: "O Comboio da Canhoca",
      question: "Qual destes realizadores angolanos dirigiu a longa-metragem de cariz histórico O Comboio da Canhoca?",
      options: [
        "Orlando Fortunato de Almeidão",
        "Zézé Gamboa",
        "Mariano Bartolomeu",
        "Jorge Cohen"
      ],
      correctAnswer: "Orlando Fortunato de Almeidão",
      correct: "Orlando Fortunato de Almeidão",
    },

    {
      id: "cin_26",
      difficulty: 3,
      type: "classic",
      category: "Pioneiros do Cinema",
      topic: "António Ole",
      question: "Além de ser um dos artistas plásticos mais prestigiados de Angola, António Ole realizou importantes documentários cinematográficos no pós-independência. Qual destes títulos é da sua autoria?",
      options: [
        "No Caminho das Estrelas (1980)",
        "Mussulo, Terra de Sol",
        "A Ilha de Luanda no Cinema",
        "Kilas, o Mau da Fita"
      ],
      correctAnswer: "No Caminho das Estrelas (1980)",
      correct: "No Caminho das Estrelas (1980)",
    },

    {
      id: "cin_27",
      difficulty: 3,
      type: "classic",
      category: "Teatro e Cinema",
      topic: "Elinga Teatro",
      question: "Muitos atores de cinema e televisão em Angola vêm do teatro de vanguarda. Qual é o nome do coletivo e espaço histórico em Luanda liderado por José Mena Abrantes?",
      options: [
        "Elinga Teatro",
        "Oásis das Artes",
        "Teatro Horizonte Nzinga Mbandi",
        "Os Griots de Luanda"
      ],
      correctAnswer: "Elinga Teatro",
      correct: "Elinga Teatro",
    },

    {
      id: "cin_28",
      difficulty: 3,
      type: "classic",
      category: "Coproduções e Ligações",
      topic: "Ar Condicionado",
      question: "A banda sonora original do filme Ar Condicionado (2020) foi composta por quem?",
      options: [
        "Aline Frazão",
        "Waldemar Bastos",
        "Bonga",
        "Paulo Flores"
      ],
      correctAnswer: "Aline Frazão",
      correct: "Aline Frazão",
    },
    {
      id: "cin_29",
      difficulty: 3,
      type: "classic",
      category: "Atores no Exterior",
      topic: "Hoji Fortuna",
      question: "O ator angolano Hoji Fortuna alcançou relevo em produções globais de Hollywood e do streaming. Em qual destas produções de fantasia da Netflix ele integrou o elenco?",
      options: [
        "The Witcher (Série)",
        "Shadow and Bone",
        "Sandman",
        "The Umbrella Academy"
      ],
      correctAnswer: "Shadow and Bone",
      correct: "Shadow and Bone",
    },

    {
      id: "cin_30",
      difficulty: 3,
      type: "classic",
      category: "Filmes Curtos",
      topic: "Ilunji",
      question: "A curta-metragem de ficção psicológica Ilunji (2014) foi realizada por quem?",
      options: [
        "Mário Bastos (Fradique)",
        "Ery Claver",
        "Inês Gonçalves",
        "Nádia Silva"
      ],
      correctAnswer: "Mário Bastos (Fradique)",
      correct: "Mário Bastos (Fradique)",
    },

    {
      id: "cin_31",
      difficulty: 3,
      type: "classic",
      category: "Humor e Crítica",
      topic: "Nossa Senhora da Loja do Chinês",
      question: "O enredo de Nossa Senhora da Loja do Chinês constrói uma sátira social e um drama urbano em Luanda a partir de qual elemento propulsor da narrativa?",
      options: [
        "Uma estátua de plástico da Virgem Maria comprada numa loja",
        "Um carregamento ilegal de aparelhos de ar condicionado",
        "O roubo de um colar de ouro de uma famosa cantora de Kuduro",
        "A venda de bilhetes falsos para um concerto de Semba"
      ],
      correctAnswer: "Uma estátua de plástico da Virgem Maria comprada numa loja",
      correct: "Uma estátua de plástico da Virgem Maria comprada numa loja",
    },

    {
      id: "cin_32",
      difficulty: 3,
      type: "classic",
      category: "História das Salas",
      topic: "Cine Teatro Nacional",
      question: "Historicamente, o circuito de exibição em Angola contou com icónicas salas de arquitetura modernista africana. Qual destas salas, situada na Baixa de Luanda, é uma das mais antigas referências culturais do país?",
      options: [
        "Cine Teatro Nacional (Chá de Caxinde / Cinema Restauro)",
        "Cine Atlântico",
        "Cine Karl Marx",
        "Cine São Paulo"
      ],
      correctAnswer: "Cine Teatro Nacional (Chá de Caxinde / Cinema Restauro)",
      correct: "Cine Teatro Nacional (Chá de Caxinde / Cinema Restauro)",
    },
  ],
};
  
 // ------------------------------------------------------------
// Utilitário de categoria
// ------------------------------------------------------------

export function getQuestionsByCategory(categoryId) {
  const list = Array.isArray(QUESTIONS[categoryId])
    ? QUESTIONS[categoryId]
    : [];

  return list.map(q => ({ ...q, categoryId }));
}

// ------------------------------------------------------------
// Geração da partida
// ------------------------------------------------------------
// O cronómetro NÃO chama esta função.
// As perguntas são selecionadas uma única vez para a partida.

export function getRandomQuizQuestions(count = 10) {
  const total = Math.max(
    0,
    Math.min(Number(count) || 10, SESSION_DIFFICULTIES.length)
  );

  const allQuestions = Object.entries(QUESTIONS).flatMap(
    ([categoryId, list]) =>
      (Array.isArray(list) ? list : []).map(q => ({
        ...q,
        categoryId,
      }))
  );

  const unused = [...allQuestions];
  const selected = [];

  for (let position = 0; position < total; position += 1) {
    const targetDifficulty = SESSION_DIFFICULTIES[position];

    let candidates = unused.filter(
      q => Number(q.difficulty) === targetDifficulty
    );

    if (candidates.length === 0) {
      candidates = unused;
    }

    if (candidates.length === 0) {
      break;
    }

    const chosen =
      candidates[Math.floor(Math.random() * candidates.length)];

    const index = unused.indexOf(chosen);

    if (index >= 0) {
      unused.splice(index, 1);
    }

    const shuffledOptions = [...chosen.options]
  .sort(() => Math.random() - 0.5);

const actualDifficulty = Number(chosen.difficulty);

selected.push({
  ...chosen,
  options: shuffledOptions,
  difficulty: actualDifficulty,
  points: DIFFICULTY_CONFIG[actualDifficulty].points,
  timeLimit: DIFFICULTY_CONFIG[actualDifficulty].timeLimit,
});
  }

  return selected;
 }
