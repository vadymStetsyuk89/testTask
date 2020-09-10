export class EntityBase {
  constructor() {
    this.id = 0;
  }

  id: number;
}

export class EntityBaseNamed extends EntityBase {
  constructor() {
    super();

    this.name = '';
    this.description = '';
  }

  name: string;
  description: string;
}
