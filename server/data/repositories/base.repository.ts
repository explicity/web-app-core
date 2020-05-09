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
  public findAll(): Promise<T[]> {
    return this.find();
  }

  public findById(id: string): Promise<T> {
    return this.findOne({
      where: {
        id
      }
    });
  }

  public createItem(data: T): Promise<InsertResult> {
    return this.insert(data);
  }

  public updateById(id: string, data: T): Promise<UpdateResult> {
    return this.update(id, data);
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }
}
