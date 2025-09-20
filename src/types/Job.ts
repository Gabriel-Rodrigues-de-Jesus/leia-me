export interface Job {
  id: string;
  description: string;
  requiredSkills: string;
  desiredSkills: string;
  monthlySalary: number;
  benefits: string;
  location: string;
  isFilled: boolean;
  createdAt: Date;
  updatedAt: Date;
}