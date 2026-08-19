export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "Quelle province est célèbre pour ses énormes pierres noires appelées 'Pedras Negras'?",
    options: ["Huíla", "Malanje", "Benguela", "Bié"],
    correct: "Malanje",
  },
  {
    id: 2,
    question:
      "En argot angolais (Gíria), que signifie l'expression 'Está de mambo'?",
    options: ["C'est fâché", "C'est mystérieux", "C'est compliqué", "C'est super"],
    correct: "C'est compliqué",
  },
  {
    id: 3,
    question:
      "Quelle est la boisson traditionnelle angolaise fabriquée à base de maïs ou de manioc fermenté?",
    options: ["Kissangua", "Marufo", "Cuca", "Gindungo"],
    correct: "Kissangua",
  },
  {
    id: 4,
    question: "Quelle est la capitale de l'Angola?",
    options: ["Luanda", "Huambo", "Benguela", "Lubango"],
    correct: "Luanda",
  },
  {
    id: 5,
    question:
      "Quel style musical angolais est souvent dansé en couple et a influencé la musique de danse lusophone?",
    options: ["Semba", "Kuduro", "Kizomba", "Zouk"],
    correct: "Semba",
  },
  {
    id: 6,
    question:
      "Quel genre musical angolais, né dans les années 1990, est caractérisé par des rythmes rapides, électroniques et une danse énergique?",
    options: ["Semba", "Kuduro", "Kizomba", "Morna"],
    correct: "Kuduro",
  },
  {
    id: 7,
    question:
      "Quel animal, symbole national de l'Angola, est une antilope rare souvent appelée 'Palanca'?",
    options: ["Palanca Negra Gigante", "Girafe", "Éléphant", "Lion"],
    correct: "Palanca Negra Gigante",
  },
  {
    id: 8,
    question:
      "Quel aliment de base angolais, à base de farine de manioc ou de maïs, accompagne souvent des plats comme la moamba?",
    options: ["Funje", "Feijoada", "Matapa", "Tapalapa"],
    correct: "Funje",
  },
  {
    id: 9,
    question:
      "Quel genre de danse/lente romantique est originaire d'Angola et est devenu populaire dans les bals à travers le monde?",
    options: ["Zouk", "Kizomba", "Semba", "Tango"],
    correct: "Kizomba",
  },
  {
    id: 10,
    question:
      "Quel fleuve important traverse l'Angola et donne son nom aux provinces Cuanza Norte et Cuanza Sul?",
    options: ["Kwanza (Cuanza)", "Congo", "Zambèze", "Nile"],
    correct: "Kwanza (Cuanza)",
  },
];

export default questions;
