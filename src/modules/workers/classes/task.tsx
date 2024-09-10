import { Types } from 'mongoose';
import { TaskStatus } from './enum/taskStatus.enum';
export default class Task {
  id?: string;
  businessId!: Types.ObjectId;
  managerId!: string;
  taskName!: string;
  description!: string;
  targetDate!: Date;
  employee!: Types.ObjectId[];
  urgency!: number;
  status!: TaskStatus;
  completionDate!: Date;
  directLink!: string;
  constructor() {}
}
