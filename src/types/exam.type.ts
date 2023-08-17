export interface QuestionType {
  title: string;
  amount: number;
  ans: any[];
  correct: string;
  img: string[];
}

export interface QuestionTypeNonAns {
  id?: string;
  title: string;
  amount: number;
  ans: any[];
  img: string[];
}

export interface ExamType {
  exam: {
    id?: string;
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

export interface ExamTypeNonAns {
  exam: {
    id?: string;
    examName: string;
    time: number;
    classId: string | undefined;
  };
  question: QuestionTypeNonAns[];
}

export interface ResultType {
  usernameId: string;
  classId: string;
  examId: string;
  examName: string;
  amount: number;
  result: number;
  date: Date;
}
