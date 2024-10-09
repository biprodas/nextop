export interface IProgram {
  id: string;
  name: string;
  degree: string;
  subject: string;
  universityId: string;
  departmentId?: string;
  session?: string;
  year?: string;
  priority?: string;
  gre?: string;
  ielts?: string;
  toefl?: string;
  duolingo?: string;
  pte?: string;
  priorityDate?: string;
  endDate?: string;
  note?: string;
}

export interface ICreateProgram {
  // name: string;
  degree: string;
  subject: string;
  universityId: string;
  departmentId?: string;
  session?: string;
  year?: string;
  priority?: string;
  gre?: string;
  ielts?: string;
  toefl?: string;
  duolingo?: string;
  pte?: string;
  priorityDate?: string;
  endDate?: string;
  note?: string;
}

export interface IUpdateProgram {
  id: string;
  name?: string;
  degree?: string;
  subject?: string;
  universityId?: string;
  departmentId?: string;
  session?: string;
  year?: string;
  priority?: string;
  gre?: string;
  ielts?: string;
  toefl?: string;
  duolingo?: string;
  pte?: string;
  priorityDate?: string;
  endDate?: string;
  note?: string;
}

export interface IProgramsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProgram[];
}

export interface IProgramResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProgram;
}
