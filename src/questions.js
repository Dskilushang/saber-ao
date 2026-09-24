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

      question_pt: 'Qual país faz fronteira com Angola ao norte?',
      question_fr: 'Quel pays partage une frontière avec l’Angola au nord ?',

      options_pt: [
        'República do Congo',
        'Namíbia',
        'Zâmbia',
        'Botswana',
      ],

      options_fr: [
        'République du Congo',
        'Namibie',
        'Zambie',
        'Botswana',
      ],

      correct_pt: 'República do Congo',
      correct_fr: 'République du Congo',
    },

    {
      id: 'geo_07',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Qual é o enclave angolano situado entre a República do Congo e a República Democrática do Congo?',
      question_fr: 'Quel est l’enclave angolaise située entre la République du Congo et la République démocratique du Congo ?',

      options_pt: [
        'Cabinda',
        'Benguela',
        'Zaire',
        'Uíge',
      ],

      options_fr: [
        'Cabinda',
        'Benguela',
        'Zaire',
        'Uíge',
      ],

      correct_pt: 'Cabinda',
      correct_fr: 'Cabinda',
    },

    {
      id: 'geo_08',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Qual é a língua oficial de Angola?',
      question_fr: 'Quelle est la langue officielle de l’Angola ?',

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
      id: 'geo_09',
      difficulty: 4,
      type: 'classic',

      question_pt: 'Qual é a moeda oficial de Angola?',
      question_fr: 'Quelle est la monnaie officielle de l’Angola ?',

      options_pt: [
        'Kwanza',
        'Franco CFA',
        'Rand',
        'Dólar',
      ],

      options_fr: [
        'Kwanza',
        'Franc CFA',
        'Rand',
        'Dollar',
      ],

      correct_pt: 'Kwanza',
      correct_fr: 'Kwanza',
    },

    {
      id: 'geo_10',
      difficulty: 4,
      type: 'classic',

      question_pt: 'Em que província se encontram as Pedras Negras de Pungo Andongo?',
      question_fr: 'Dans quelle province se trouvent les Pedras Negras de Pungo Andongo ?',

      options_pt: [
        'Malanje',
        'Huíla',
        'Bié',
        'Cuanza Sul',
      ],

      options_fr: [
        'Malanje',
        'Huíla',
        'Bié',
        'Cuanza Sul',
      ],

      correct_pt: 'Malanje',
      correct_fr: 'Malanje',
    },
  ],
    // ==========================================================
  // RELIGIÃO
  // ==========================================================

  religiao: [

    {
      id: 'rel_01',
      difficulty: 1,
      type: 'classic',

      question_pt: 'Qual é o livro sagrado do cristianismo?',
      question_fr: 'Quel est le livre sacré du christianisme ?',

      options_pt: [
        'Bíblia',
        'Alcorão',
        'Torá',
        'Vedas',
      ],

      options_fr: [
        'Bible',
        'Coran',
        'Torah',
        'Vedas',
      ],

      correct_pt: 'Bíblia',
      correct_fr: 'Bible',
    },

    {
      id: 'rel_02',
      difficulty: 1,
      type: 'classic',

      question_pt: 'Quantos evangelhos existem no Novo Testamento?',
      question_fr: 'Combien y a-t-il d’évangiles dans le Nouveau Testament ?',

      options_pt: ['4', '3', '5', '7'],
      options_fr: ['4', '3', '5', '7'],

      correct_pt: '4',
      correct_fr: '4',
    },

    {
      id: 'rel_03',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Quem foi o primeiro homem, segundo o livro de Génesis?',
      question_fr: 'Qui est le premier homme selon le livre de la Genèse ?',

      options_pt: [
        'Adão',
        'Noé',
        'Abraão',
        'Moisés',
      ],

      options_fr: [
        'Adam',
        'Noé',
        'Abraham',
        'Moïse',
      ],

      correct_pt: 'Adão',
      correct_fr: 'Adam',
    },

    {
      id: 'rel_04',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Quem recebeu os Dez Mandamentos, segundo a Bíblia?',
      question_fr: 'Qui a reçu les Dix Commandements selon la Bible ?',

      options_pt: [
        'Moisés',
        'David',
        'Salomão',
        'Pedro',
      ],

      options_fr: [
        'Moïse',
        'David',
        'Salomon',
        'Pierre',
      ],

      correct_pt: 'Moisés',
      correct_fr: 'Moïse',
    },

    {
      id: 'rel_05',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Qual é o primeiro livro da Bíblia?',
      question_fr: 'Quel est le premier livre de la Bible ?',

      options_pt: [
        'Génesis',
        'Êxodo',
        'Salmos',
        'Mateus',
      ],

      options_fr: [
        'Genèse',
        'Exode',
        'Psaumes',
        'Matthieu',
      ],

      correct_pt: 'Génesis',
      correct_fr: 'Genèse',
    },

    {
      id: 'rel_06',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Qual apóstolo é tradicionalmente associado a várias das epístolas do Novo Testamento?',
      question_fr: 'Quel apôtre est traditionnellement associé à plusieurs épîtres du Nouveau Testament ?',

      options_pt: [
        'Paulo',
        'Tiago',
        'Judas',
        'André',
      ],

      options_fr: [
        'Paul',
        'Jacques',
        'Jude',
        'André',
      ],

      correct_pt: 'Paulo',
      correct_fr: 'Paul',
    },

    {
      id: 'rel_07',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Qual cidade é considerada sagrada por várias grandes religiões?',
      question_fr: 'Quelle ville est considérée comme sacrée par plusieurs grandes religions ?',

      options_pt: [
        'Jerusalém',
        'Luanda',
        'Lisboa',
        'Nairóbi',
      ],

      options_fr: [
        'Jérusalem',
        'Luanda',
        'Lisbonne',
        'Nairobi',
      ],

      correct_pt: 'Jerusalém',
      correct_fr: 'Jérusalem',
    },

    {
      id: 'rel_08',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Qual é o nome do mês de jejum no islamismo?',
      question_fr: 'Comment s’appelle le mois de jeûne dans l’islam ?',

      options_pt: [
        'Ramadão',
        'Shawwal',
        'Muharram',
        'Rajab',
      ],

      options_fr: [
        'Ramadan',
        'Chawwal',
        'Mouharram',
        'Rajab',
      ],

      correct_pt: 'Ramadão',
      correct_fr: 'Ramadan',
    },

    {
      id: 'rel_09',
      difficulty: 4,
      type: 'classic',

      question_pt: 'Qual concílio é tradicionalmente associado à formulação do Credo Niceno?',
      question_fr: 'Quel concile est traditionnellement associé à la formulation du Credo de Nicée ?',

      options_pt: [
        'Niceia I',
        'Trento',
        'Calcedónia',
        'Éfeso',
      ],

      options_fr: [
        'Nicée I',
        'Trente',
        'Chalcédoine',
        'Éphèse',
      ],

      correct_pt: 'Niceia I',
      correct_fr: 'Nicée I',
    },

    {
      id: 'rel_10',
      difficulty: 4,
      type: 'classic',

      question_pt: 'Qual dos quatro Evangelhos é tradicionalmente atribuído a João?',
      question_fr: 'Lequel des quatre Évangiles est traditionnellement attribué à Jean ?',

      options_pt: [
        'Evangelho segundo João',
        'Evangelho segundo Marcos',
        'Evangelho segundo Lucas',
        'Evangelho segundo Mateus',
      ],

      options_fr: [
        'Évangile selon Jean',
        'Évangile selon Marc',
        'Évangile selon Luc',
        'Évangile selon Matthieu',
      ],

      correct_pt: 'Evangelho segundo João',
      correct_fr: 'Évangile selon Jean',
    },
  ],


  // ==========================================================
  // CINEMA
  // ==========================================================

  cinema: [

    {
      id: 'cin_01',
      difficulty: 1,
      type: 'classic',

      question_pt: 'Como se chama a pessoa que dirige um filme?',
      question_fr: 'Comment appelle-t-on la personne qui réalise un film ?',

      options_pt: [
        'Realizador',
        'Produtor',
        'Montador',
        'Figurinista',
      ],

      options_fr: [
        'Réalisateur',
        'Producteur',
        'Monteur',
        'Costumier',
      ],

      correct_pt: 'Realizador',
      correct_fr: 'Réalisateur',
    },

    {
      id: 'cin_02',
      difficulty: 1,
      type: 'classic',

      question_pt: 'Qual prémio é atribuído pela Academia de Artes e Ciências Cinematográficas dos Estados Unidos?',
      question_fr: 'Quel prix est décerné par l’Academy of Motion Picture Arts and Sciences ?',

      options_pt: ['Óscar', 'Grammy', 'Emmy', 'Tony'],
      options_fr: ['Oscar', 'Grammy', 'Emmy', 'Tony'],

      correct_pt: 'Óscar',
      correct_fr: 'Oscar',
    },

    {
      id: 'cin_03',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Como se chama o texto que contém diálogos e indicações para a realização de um filme?',
      question_fr: 'Comment appelle-t-on le texte contenant les dialogues et indications d’un film ?',

      options_pt: [
        'Roteiro',
        'Cartaz',
        'Trailer',
        'Créditos',
      ],

      options_fr: [
        'Scénario',
        'Affiche',
        'Bande-annonce',
        'Générique',
      ],

      correct_pt: 'Roteiro',
      correct_fr: 'Scénario',
    },

    {
      id: 'cin_04',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Qual profissional é responsável pela montagem das imagens de um filme?',
      question_fr: 'Quel professionnel assemble les images d’un film au montage ?',

      options_pt: [
        'Montador',
        'Ator',
        'Diretor de fotografia',
        'Produtor',
      ],

      options_fr: [
        'Monteur',
        'Acteur',
        'Directeur de la photographie',
        'Producteur',
      ],

      correct_pt: 'Montador',
      correct_fr: 'Monteur',
    },

    {
      id: 'cin_05',
      difficulty: 2,
      type: 'classic',

      question_pt: 'Como se chama uma curta apresentação de um filme feita para o promover?',
      question_fr: 'Comment appelle-t-on une courte présentation d’un film destinée à le promouvoir ?',

      options_pt: [
        'Trailer',
        'Roteiro',
        'Cenário',
        'Legenda',
      ],

      options_fr: [
        'Bande-annonce',
        'Scénario',
        'Décor',
        'Sous-titre',
      ],

      correct_pt: 'Trailer',
      correct_fr: 'Bande-annonce',
    },

    {
      id: 'cin_06',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Qual é a principal função do diretor de fotografia num filme?',
      question_fr: 'Quelle est la fonction principale du directeur de la photographie ?',

      options_pt: [
        'Conceber a imagem e a iluminação',
        'Escrever todos os diálogos',
        'Distribuir os ingressos',
        'Compor todos os figurinos',
      ],

      options_fr: [
        'Concevoir l’image et l’éclairage',
        'Écrire tous les dialogues',
        'Vendre les billets',
        'Créer tous les costumes',
      ],

      correct_pt: 'Conceber a imagem e a iluminação',
      correct_fr: 'Concevoir l’image et l’éclairage',
    },

    {
      id: 'cin_07',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Como se chama a sequência de nomes apresentada no início ou no fim de um filme?',
      question_fr: 'Comment appelle-t-on la liste des noms affichée au début ou à la fin d’un film ?',

      options_pt: [
        'Créditos',
        'Trailer',
        'Sinopse',
        'Argumento',
      ],

      options_fr: [
        'Générique',
        'Bande-annonce',
        'Synopsis',
        'Scénario',
      ],

      correct_pt: 'Créditos',
      correct_fr: 'Générique',
    },

    {
      id: 'cin_08',
      difficulty: 3,
      type: 'classic',

      question_pt: 'Como se chama a história resumida de um filme?',
      question_fr: 'Comment appelle-t-on le résumé de l’histoire d’un film ?',

      options_pt: [
        'Sinopse',
        'Banda sonora',
        'Montagem',
        'Cenografia',
      ],

      options_fr: [
        'Synopsis',
        'Bande sonore',
        'Montage',
        'Scénographie',
      ],

      correct_pt: 'Sinopse',
      correct_fr: 'Synopsis',
    },

    {
      id: 'cin_09',
      difficulty: 4,
      type: 'classic',

      question_pt: 'Como se chama a técnica que cria a ilusão de movimento a partir de imagens sucessivas?',
      question_fr: 'Comment appelle-t-on la technique qui crée l’illusion du mouvement à partir d’images successives ?',

      options_pt: [
        'Animação',
        'Dublagem',
        'Colorização',
        'Legendagem',
      ],

      options_fr: [
        'Animation',
        'Doublage',
        'Colorisation',
        'Sous-titrage',
      ],

      correct_pt: 'Animação',
      correct_fr: 'Animation',
    },

    {
      id: 'cin_10',
      difficulty: 4,
      type: 'classic',

      question_pt: 'Qual é o nome dado à música criada ou selecionada para acompanhar um filme?',
      question_fr: 'Comment appelle-t-on la musique créée ou sélectionnée pour accompagner un film ?',

      options_pt: [
        'Banda sonora',
        'Cartaz',
        'Roteiro',
        'Storyboard',
      ],

      options_fr: [
        'Bande originale',
        'Affiche',
        'Scénario',
        'Storyboard',
      ],

      correct_pt: 'Banda sonora',
      correct_fr: 'Bande originale',
    },
  ],
  export function getQuestionsByCategory(categoryId, lang = 'pt') {
  const categoryQuestions = Array.isArray(QUESTIONS[categoryId])
    ? QUESTIONS[categoryId]
    : [];

  return categoryQuestions.map((q) => formatQuestion(q, categoryId, lang));
}

function formatQuestion(q, categoryId, lang = 'pt', sessionDifficulty = null) {
  const isFr = lang === 'fr';

  const difficulty =
    Number(sessionDifficulty ?? q.difficulty) || 1;

  const DIFFICULTY_CONFIG = {
    1: {
      points: 100,
      timeLimit: 20,
    },
    2: {
      points: 200,
      timeLimit: 20,
    },
    3: {
      points: 300,
      timeLimit: 20,
    },
    4: {
      points: 500,
      timeLimit: 25,
    },
  };

  const config =
    DIFFICULTY_CONFIG[difficulty] ||
    DIFFICULTY_CONFIG[1];

  return {
    id: q.id,
    categoryId,
    type: q.type || 'classic',

    question: isFr
      ? q.question_fr
      : q.question_pt,

    options: isFr
      ? q.options_fr
      : q.options_pt,

    correct: isFr
      ? q.correct_fr
      : q.correct_pt,

    correctAnswer: isFr
      ? q.correct_fr
      : q.correct_pt,

    difficulty,
    points: config.points,
    timeLimit: config.timeLimit,
  };
}

export function getRandomQuizQuestions(
  count = 10,
  lang = 'pt'
) {
  const SESSION_DIFFICULTIES = [
    1, 1,
    2, 2, 2,
    3, 3, 3,
    4, 4,
  ];

  const total = Math.max(
    0,
    Math.min(
      Number(count) || 10,
      SESSION_DIFFICULTIES.length
    )
  );

  const allQuestions = Object.entries(QUESTIONS)
    .flatMap(([categoryId, categoryQuestions]) =>
      (
        Array.isArray(categoryQuestions)
          ? categoryQuestions
          : []
      ).map((q) => ({
        ...q,
        categoryId,
      }))
    );

  const unused = [...allQuestions];
  const selected = [];

  for (
    let position = 0;
    position < total;
    position += 1
  ) {
    const targetDifficulty =
      SESSION_DIFFICULTIES[position];

    let candidates = unused.filter(
      (q) =>
        Number(q.difficulty) ===
        targetDifficulty
    );

    if (candidates.length === 0) {
      candidates = unused;
    }

    if (candidates.length === 0) {
      break;
    }

    const chosen =
      candidates[
        Math.floor(
          Math.random() * candidates.length
        )
      ];

    const index = unused.indexOf(chosen);

    if (index >= 0) {
      unused.splice(index, 1);
    }

    selected.push(
      formatQuestion(
        chosen,
        chosen.categoryId,
        lang,
        targetDifficulty
      )
    );
  }

  return selected;
  }
