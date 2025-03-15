/**
 * Shared
 */
type Identified<Id = number> = {
  id: Id;
};

type Named<Name = string> = {
  name: Name;
};

type CreatePayload<T> = Omit<T, "id">;

type ModifyPayload<T> = Partial<CreatePayload<T>>;

type HasAsyncModel<Model> = {
  model: () => Promise<Model>;
};

type Item<DTO> = { id: () => number } & HasAsyncModel<DTO> & {
    modify: (payload: ModifyPayload<DTO>) => Promise<void>;
    delete: () => Promise<void>;
  };

type Repository<T> = T extends Item<infer DTO>
  ? HasAsyncModel<DTO[]> & {
      create: (payload: CreatePayload<DTO>) => Promise<void>;
      deleteAll: () => Promise<void>;
    }
  : never;

export type DTO<T, ID = number, Name = string> = T &
  Identified<ID> &
  Named<Name>;

export type DatabaseEntity<DTO> = {
  Item: Item<DTO>;
  Repository: Repository<Item<DTO>>;
};
