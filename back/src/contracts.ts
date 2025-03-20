import { RunResult } from "sqlite3";

export type Identified<Id = number> = {
    id: Id;
};

export type Named<Name = string> = {
    name: Name;
};

export type CreatePayload<T> = {
    [k in keyof Omit<T, "id">]: T[k] extends Array<any>
        ? number[]
        : T[k] extends object
        ? number
        : T[k];
};

export type OnlyPrimitives<G extends object> = {
    [k in keyof G]: G[k] extends Array<any> ? never : G[k];
};

export type ModifyPayload<T> = Partial<OnlyPrimitives<CreatePayload<T>>>;

export type HasAsyncModel<Model> = {
    model: () => Promise<Model>;
};

export type Item<DTO> = { id: () => number } & HasAsyncModel<DTO> & {
        modify: (payload: ModifyPayload<DTO>) => Promise<RunResult>;
        delete: () => Promise<RunResult>;
    };

export type Repository<T, AdditionalCreateParams = {}> = T extends Item<
    infer DTO
>
    ? HasAsyncModel<DTO[]> & {
          create: (
              payload: CreatePayload<DTO & AdditionalCreateParams>[]
          ) => Promise<RunResult | RunResult[]>;
          deleteAll: () => Promise<RunResult>;
      }
    : never;

export type DTO<T, Name = string, ID = number> = T &
    Identified<ID> &
    Named<Name>;

export type DatabaseEntity<DTO, AdditionalCreateParams = {}> = {
    Item: Item<DTO>;
    Repository: Repository<Item<DTO>, AdditionalCreateParams>;
};
