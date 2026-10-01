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
      difficulty: 1,
      type: "classic",
      question: "Em que ano Angola conquistou a sua independência?",
      options: ["1975", "1961", "1980", "1970"],
      correctAnswer: "1975",
      correct: "1975",
    },
    {
      id: "hist_02",
      difficulty: 1,
      type: "classic",
      question: "Qual foi o primeiro presidente de Angola?",
      options: [
        "Agostinho Neto",
        "Jonas Savimbi",
        "Holden Roberto",
        "José Eduardo dos Santos"
      ],
      correctAnswer: "Agostinho Neto",
      correct: "Agostinho Neto",
    },
    {
      id: "hist_03",
      difficulty: 2,
      type: "classic",
      question: "De que país Angola se tornou independente?",
      options: ["Portugal", "França", "Espanha", "Reino Unido"],
      correctAnswer: "Portugal",
      correct: "Portugal",
    },
    {
      id: "hist_04",
      difficulty: 2,
      type: "classic",
      question: "Qual movimento proclamou a independência em 1975?",
      options: ["MPLA", "UNITA", "FNLA", "FLEC"],
      correctAnswer: "MPLA",
      correct: "MPLA",
    },
    {
      id: "hist_05",
      difficulty: 2,
      type: "classic",
      question: "Em que cidade foi proclamada a independência?",
      options: ["Luanda", "Huambo", "Benguela", "Cabinda"],
      correctAnswer: "Luanda",
      correct: "Luanda",
    },
    {
      id: "hist_06",
      difficulty: 3,
      type: "classic",
      question: "Quando terminou a guerra civil em Angola?",
      options: ["2002", "1994", "1998", "2005"],
      correctAnswer: "2002",
      correct: "2002",
    },
    {
      id: "hist_07",
      difficulty: 3,
      type: "classic",
      question: "Qual herói nacional foi poeta e presidente?",
      options: [
        "Agostinho Neto",
        "Lúcio Lara",
        "Iko Carreira",
        "Saydi Mingas"
      ],
      correctAnswer: "Agostinho Neto",
      correct: "Agostinho Neto",
    },
    {
      id: "hist_08",
      difficulty: 3,
      type: "classic",
      question: "Qual língua foi imposta durante a colonização?",
      options: ["Português", "Francês", "Inglês", "Espanhol"],
      correctAnswer: "Português",
      correct: "Português",
    },
    {
      id: "hist_09",
      difficulty: 4,
      type: "classic",
      question: "O que significa MPLA?",
      options: [
        "Movimento Popular de Libertação de Angola",
        "Movimento Para a Liberdade de Angola",
        "Movimento Político de Luanda Angola",
        "Movimento Pela Libertação de África"
      ],
      correctAnswer: "Movimento Popular de Libertação de Angola",
      correct: "Movimento Popular de Libertação de Angola",
    },
    {
      id: "hist_10",
      difficulty: 4,
      type: "classic",
      question: "Qual é o dia da independência de Angola?",
      options: [
        "11 de Novembro",
        "4 de Fevereiro",
        "1 de Agosto",
        "25 de Abril"
      ],
      correctAnswer: "11 de Novembro",
      correct: "11 de Novembro",
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
      question: "Quantas províncias tem Angola?",
      options: ["18", "16", "20", "14"],
      correctAnswer: "18",
      correct: "18",
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
      id: "geo_05",
      difficulty: 2,
      type: "classic",
      question: "Qual é o ponto mais alto de Angola?",
      options: [
        "Morro do Môco",
        "Serra da Leba",
        "Monte Nabi",
        "Planalto do Bié"
      ],
      correctAnswer: "Morro do Môco",
      correct: "Morro do Môco",
    },
    {
      id: "geo_06",
      difficulty: 3,
      type: "classic",
      question: "Qual país faz fronteira com Angola ao norte?",
      options: [
        "República do Congo",
        "Namíbia",
        "Zâmbia",
        "Botswana"
      ],
      correctAnswer: "República do Congo",
      correct: "República do Congo",
    },
    {
      id: "geo_07",
      difficulty: 3,
      type: "classic",
      question: "Qual é o enclave angolano situado entre a República do Congo e a República Democrática do Congo?",
      options: ["Cabinda", "Benguela", "Zaire", "Uíge"],
      correctAnswer: "Cabinda",
      correct: "Cabinda",
    },
    {
      id: "geo_08",
      difficulty: 3,
      type: "classic",
      question: "Qual é a língua oficial de Angola?",
      options: ["Português", "Francês", "Inglês", "Espanhol"],
      correctAnswer: "Português",
      correct: "Português",
    },
    {
      id: "geo_09",
      difficulty: 4,
      type: "classic",
      question: "Qual é a moeda oficial de Angola?",
      options: ["Kwanza", "Franco CFA", "Rand", "Dólar"],
      correctAnswer: "Kwanza",
      correct: "Kwanza",
    },
    {
      id: "geo_10",
      difficulty: 4,
      type: "classic",
      question: "Em que província se encontram as Pedras Negras de Pungo Andongo?",
      options: ["Malanje", "Huíla", "Bié", "Cuanza Sul"],
      correctAnswer: "Malanje",
      correct: "Malanje",
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

selected.push({
  ...chosen,
  options: shuffledOptions,
  difficulty: targetDifficulty,
  points: DIFFICULTY_CONFIG[targetDifficulty].points,
  timeLimit: DIFFICULTY_CONFIG[targetDifficulty].timeLimit,
});
  }

  return selected;
}       
