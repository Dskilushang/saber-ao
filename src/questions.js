// ============================================================
// SABER AO — BASE DE QUESTIONS
// ============================================================
// Une partie standard = 10 questions.
//
// Q1-Q2  : Niveau 1 — 100 pts — 20 s
// Q3-Q5  : Niveau 2 — 200 pts — 20 s
// Q6-Q8  : Niveau 3 — 300 pts — 20 s
// Q9-Q10 : Niveau 4 — 500 pts — 25 s
//
// Les catégories servent à organiser la banque de questions.
// Elles ne créent PAS de menu de catégories dans le jeu.
// ============================================================


// ============================================================
// CATÉGORIES
// ============================================================

export const CATEGORIES = [
  {
    id: 'historia',
    label_pt: 'História',
    label_fr: 'Histoire',
    icon: '🏛️',
    color: '#C0392B',
  },
  {
    id: 'geografia',
    label_pt: 'Geografia',
    label_fr: 'Géographie',
    icon: '🗺️',
    color: '#27AE60',
  },
  {
    id: 'cultura',
    label_pt: 'Cultura',
    label_fr: 'Culture',
    icon: '🎭',
    color: '#8E44AD',
  },
  {
    id: 'musica',
    label_pt: 'Música',
    label_fr: 'Musique',
    icon: '🎵',
    color: '#E67E22',
  },
  {
    id: 'ciencia',
    label_pt: 'Ciência',
    label_fr: 'Science',
    icon: '🔬',
    color: '#2980B9',
  },
  {
    id: 'desporto',
    label_pt: 'Desporto',
    label_fr: 'Sport',
    icon: '⚽',
    color: '#16A085',
  },

  // Nouvelles catégories préparées pour l'extension
  {
    id: 'religiao',
    label_pt: 'Religião',
    label_fr: 'Religion',
    icon: '✝️',
    color: '#7D3C98',
  },
  {
    id: 'espiritualidade',
    label_pt: 'Espiritualidade',
    label_fr: 'Spiritualité',
    icon: '✨',
    color: '#AF7AC5',
  },
  {
    id: 'politica',
    label_pt: 'Política e Cidadania',
    label_fr: 'Politique et citoyenneté',
    icon: '🏛️',
    color: '#34495E',
  },
  {
    id: 'culinaria',
    label_pt: 'Culinária',
    label_fr: 'Gastronomie',
    icon: '🍲',
    color: '#D35400',
  },
  {
    id: 'zoologia',
    label_pt: 'Zoologia',
    label_fr: 'Zoologie',
    icon: '🦁',
    color: '#229954',
  },
  {
    id: 'proverbios',
    label_pt: 'Provérbios',
    label_fr: 'Proverbes',
    icon: '📜',
    color: '#A569BD',
  },
  {
    id: 'literatura',
    label_pt: 'Literatura',
    label_fr: 'Littérature',
    icon: '📚',
    color: '#884EA0',
  },
  {
    id: 'linguas',
    label_pt: 'Línguas',
    label_fr: 'Langues',
    icon: '🗣️',
    color: '#2874A6',
  },
  {
    id: 'artes',
    label_pt: 'Artes',
    label_fr: 'Arts',
    icon: '🎨',
    color: '#CA6F1E',
  },
  {
    id: 'tecnologia',
    label_pt: 'Tecnologia',
    label_fr: 'Technologie',
    icon: '💻',
    color: '#2E86C1',
  },
  {
    id: 'natureza',
    label_pt: 'Natureza e Ambiente',
    label_fr: 'Nature et environnement',
    icon: '🌍',
    color: '#239B56',
  },
  {
    id: 'economia',
    label_pt: 'Economia',
    label_fr: 'Économie',
    icon: '💰',
    color: '#B7950B',
  },
  {
    id: 'saude',
    label_pt: 'Saúde',
    label_fr: 'Santé',
    icon: '🩺',
    color: '#148F77',
  },
  {
    id: 'inventos',
    label_pt: 'Invenções e Descobertas',
    label_fr: 'Inventions et découvertes',
    icon: '💡',
    color: '#F1C40F',
  },
  {
    id: 'personalidades',
    label_pt: 'Personalidades',
    label_fr: 'Personnalités',
    icon: '👤',
    color: '#5D6D7E',
  },
];


// ============================================================
// CONFIGURATION DES NIVEAUX
// ============================================================

export const DIFFICULTY_CONFIG = {
  1: {
    id: 1,
    label_pt: 'Fácil',
    label_fr: 'Facile',
    points: 100,
    timeLimit: 20,
  },

  2: {
    id: 2,
    label_pt: 'Intermédio',
    label_fr: 'Intermédiaire',
    points: 200,
    timeLimit: 20,
  },

  3: {
    id: 3,
    label_pt: 'Difícil',
    label_fr: 'Difficile',
    points: 300,
    timeLimit: 20,
  },

  4: {
    id: 4,
    label_pt: 'Especialista',
    label_fr: 'Expert',
    points: 500,
    timeLimit: 25,
  },
};


// ============================================================
// STRUCTURE D'UNE PARTIE STANDARD
// ============================================================

export const SESSION_DIFFICULTIES = [
  1,
  1,
  2,
  2,
  2,
  3,
  3,
  3,
  4,
  4,
];


// ============================================================
// TYPES DE QUESTIONS
// ============================================================

export const QUESTION_TYPES = [
  'classic',
  'image',
  'image_ab',
  'identification',
  'true_false',
  'chronology',
  'audio',
  'surprise',
];


// ============================================================
// BANQUE DE QUESTIONS
// ============================================================

export const QUESTIONS = {

  // ==========================================================
  // HISTÓRIA
  // ==========================================================

  historia: [

    {
      id: 'hist_01',
      difficulty: 1,
      type: 'classic',

      question_pt: 'Em que ano Angola conquistou a sua independência?',
      question_fr: "En quelle année l'Angola a conquis son indépendance ?",

      options_pt: ['1975', '1961', '1980', '1970'],
      options_fr: ['1975', '1961', '1980', '1970'],

      correct_pt: '1975',
      correct_fr: '1975',
    },

    {
      id: 'hist_02',
      difficulty: 1,
      type: 'classic',

      question_pt: 'Qual foi o primeiro presidente de Angola?',
      question_fr: "Qui fut le premier président de l'Angola ?",

      options_pt: [
        'Agostinho Neto',
        'Jonas Savimbi',
        'Holden Roberto',
        'José Eduardo dos Santos',
      ],

      options_fr: [
        'Agostinho Neto',
        'Jonas Savimbi',
        'Holden Roberto',
        'José Eduardo dos Santos',
      ],

      correct_pt: 'Agostinho Neto',
      correct_fr: 'Agostinho Neto',
    },

    {
      id: 'hist_03',
      difficulty: 2,
      type: 'classic',

      question_pt: 'De que país Angola se tornou independente?',
      question_fr: "De quel pays l'Angola s'est-il indépendant ?",

      options_pt: [
        'Portugal',
        'França',
        'Espanha',
        'Reino Unido',
      ],

      options_fr: [
        'Portugal',
        'France',
        'Espagne',
        'Royaume-Uni',
      ],

      correct_pt: 'Portugal',
      correct_fr: 'Portugal',
    },

    {
      id: 'hist_04',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Qual movimento proclamou a independência em 1975?',
      question_fr: "Quel mouvement a proclamé l'indépendance en 1975 ?",

      options_pt: [
        'MPLA',
        'UNITA',
        'FNLA',
        'FLEC',
      ],

      options_fr: [
        'MPLA',
        'UNITA',
        'FNLA',
        'FLEC',
      ],

      correct_pt: 'MPLA',
      correct_fr: 'MPLA',
    },

    {
      id: 'hist_05',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Em que cidade foi proclamada a independência?',
      question_fr: "Dans quelle ville l'indépendance fut-elle proclamée ?",

      options_pt: [
        'Luanda',
        'Huambo',
        'Benguela',
        'Cabinda',
      ],

      options_fr: [
        'Luanda',
        'Huambo',
        'Benguela',
        'Cabinda',
      ],

      correct_pt: 'Luanda',
      correct_fr: 'Luanda',
    },

    {
      id: 'hist_06',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Quando terminou a guerra civil em Angola?',
      question_fr: "Quand s'est terminée la guerre civile en Angola ?",

      options_pt: [
        '2002',
        '1994',
        '1998',
        '2005',
      ],

      options_fr: [
        '2002',
        '1994',
        '1998',
        '2005',
      ],

      correct_pt: '2002',
      correct_fr: '2002',
    },

    {
      id: 'hist_07',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Qual herói nacional foi poeta e presidente?',
      question_fr: "Quel héros national fut poète et président ?",

      options_pt: [
        'Agostinho Neto',
        'Lúcio Lara',
        'Iko Carreira',
        'Saydi Mingas',
      ],

      options_fr: [
        'Agostinho Neto',
        'Lúcio Lara',
        'Iko Carreira',
        'Saydi Mingas',
      ],

      correct_pt: 'Agostinho Neto',
      correct_fr: 'Agostinho Neto',
    },

    {
      id: 'hist_08',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Qual língua foi imposta durante a colonização?',
      question_fr: "Quelle langue fut imposée durant la colonisation ?",

      options_pt: [
        'Português',
        'Francês',
        'Inglês',
        'Espanhol',
      ],

      options_fr: [
        'Portugais',
        'Français',
        'Anglais',
        'Espagnol',
      ],

      correct_pt: 'Português',
      correct_fr: 'Portugais',
    },

    {
      id: 'hist_09',
      difficulty: 4,
      type: 'classic',

      question_pt: 'O que significa MPLA?',
      question_fr: "Que signifie MPLA ?",

      options_pt: [
        'Movimento Popular de Libertação de Angola',
        'Movimento Para a Liberdade de Angola',
        'Movimento Político de Luanda Angola',
        'Movimento Pela Libertação de África',
      ],

      options_fr: [
        "Mouvement Populaire de Libération de l'Angola",
        "Mouvement Pour la Liberté de l'Angola",
        "Mouvement Politique de Luanda Angola",
        "Mouvement Pour la Libération de l'Afrique",
      ],

      correct_pt: 'Movimento Popular de Libertação de Angola',
      correct_fr: "Mouvement Populaire de Libération de l'Angola",
    },

    {
      id: 'hist_10',
      difficulty: 4,
      type: 'classic',

      question_pt: 'Qual é o dia da independência de Angola?',
      question_fr: "Quel est le jour de l'indépendance de l'Angola ?",

      options_pt: [
        '11 de Novembro',
        '4 de Fevereiro',
        '1 de Agosto',
        '25 de Abril',
      ],

      options_fr: [
        '11 Novembre',
        '4 Février',
        '1 Août',
        '25 Avril',
      ],

      correct_pt: '11 de Novembro',
      correct_fr: '11 Novembre',
    },
  ],


  // ==========================================================
  // GEOGRAFIA
  // ==========================================================

  geografia: [

    {
      id: 'geo_01',
      difficulty: 1,
      type: 'classic',

      question_pt: 'Qual é a capital de Angola?',
      question_fr: "Quelle est la capitale de l'Angola ?",

      options_pt: [
        'Luanda',
        'Huambo',
        'Benguela',
        'Malanje',
      ],

      options_fr: [
        'Luanda',
        'Huambo',
        'Benguela',
        'Malanje',
      ],

      correct_pt: 'Luanda',
      correct_fr: 'Luanda',
    },

    {
      id: 'geo_02',
      difficulty: 1,
      type: 'classic',

      question_pt: 'Quantas províncias tem Angola?',
      question_fr: "Combien de provinces compte l'Angola ?",

      options_pt: [
        '18',
        '16',
        '20',
        '14',
      ],

      options_fr: [
        '18',
        '16',
        '20',
        '14',
      ],

      correct_pt: '18',
      correct_fr: '18',
    },

    {
      id: 'geo_03',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Qual rio dá nome a duas províncias angolanas?',
      question_fr: "Quel fleuve donne son nom à deux provinces ?",

      options_pt: [
        'Kwanza',
        'Congo',
        'Zambeze',
        'Cunene',
      ],

      options_fr: [
        'Kwanza',
        'Congo',
        'Zambèze',
        'Cunene',
      ],

      correct_pt: 'Kwanza',
      correct_fr: 'Kwanza',
    },

    {
      id: 'geo_04',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Qual é a segunda maior cidade de Angola?',
      question_fr: "Quelle est la deuxième plus grande ville ?",

      options_pt: [
        'Huambo',
        'Benguela',
        'Lubango',
        'Malanje',
      ],

      options_fr: [
        'Huambo',
        'Benguela',
        'Lubango',
        'Malanje',
      ],

      correct_pt: 'Huambo',
      correct_fr: 'Huambo',
    },

    {
      id: 'geo_05',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Qual é o ponto mais alto de Angola?',
      question_fr: "Quel est le point culminant de l'Angola ?",

      options_pt: [
        'Morro do Môco',
        'Serra da Leba',
        'Monte Nabi',
        'Planalto do Bié',
      ],

      options_fr: [
        'Morro do Môco',
        'Serra da Leba',
        'Monte Nabi',
        'Plateau du Bié',
      ],

      correct_pt: 'Morro do Môco',
      correct_fr: 'Morro do Môco',
    },

    {
      id: 'geo_06',
      difficulty: 3,
      type: 'classic',

      question
