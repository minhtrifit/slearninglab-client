export interface QuestionType {
  title: string;
  amount: number;
  ans: unknown[];
  correct: string;
  img: string[];
}

export interface ExamType {
  exam: {
    examName: string;
    time: number;
    classId: string | undefined;
  };
  question: QuestionType[];
}

export interface ExamInfo {
  id: string;
  examName: string;
  time: number;
  classId: string;
}
