import { EntityBaseNamed } from '../entityBase';

export class Prdoject extends EntityBaseNamed {
  constructor() {
    super();

    this.customerName = '';
    this.rate = 0;
    this.timings = [];
  }

  customerName: string;
  rate: number;
  timings: WorkingTime[];
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
