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
];

export default questions;
