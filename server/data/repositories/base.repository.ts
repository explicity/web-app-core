import {
  Repository,
  ObjectLiteral,
  UpdateResult,
  DeleteResult,
  InsertResult
} from 'typeorm';

export default abstract class BaseRepository<
  T extends ObjectLiteral
> extends Repository<T> {
  findAll(): Promise<T[]> {
    return this.find();
  }

  findById(id: string): Promise<T> {
    return this.findOne({
      where: {
        id
      }
    });
  }

  createItem(data: T): Promise<InsertResult> {
    return this.insert(data);
  }

  updateById(id: string, data: T): Promise<UpdateResult> {
    return this.update(id, data);
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }
}
