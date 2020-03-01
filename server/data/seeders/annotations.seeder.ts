import Annotation from '../entities/Annotation';

import { annotations } from '../seed-data/annotations';

export class AnnotationsSeeder {
  public static async execute() {
    annotations.forEach(async annotation => {
      await Object.assign(new Annotation(), annotation).save();
    });
  }
}
