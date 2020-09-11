import { EntityBaseNamed } from '../entityBase';

export class Prdoject extends EntityBaseNamed {
  constructor() {
    super();

    this.customerName = '';
    this.rate = 0;
    this.workingTimes = [];
  }

  customerName: string;
  rate: number;
  workingTimes: WorkingTime[];
}

export class WorkingTime extends EntityBaseNamed {
  constructor() {
    super();
  }

  startedAt: Date;
  endedAt: Date;

  project: Prdoject;
  projectId: number;
}

export interface IProjectFormValues {
  name: string;
  customerName: string;
  rate: number;
  workingTiming: any[];
}
