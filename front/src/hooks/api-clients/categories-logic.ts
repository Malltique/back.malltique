import { forAPI } from "../../utils/requests";

export type CategoryDTO = { id: number; name: "foods" | "electronics" };

export const useCategories = (baseURL: string) => {
    const client = forAPI(baseURL);

    const all = () => {
        return client.GET<CategoryDTO[]>("categories");
    };

    const one = (payload: { id: number }) => {
        return client.GET<CategoryDTO>(`categories/${payload.id}`);
    };

    const add = (payload: Pick<CategoryDTO, "name">) => {
        return client.POST("categories", payload);
    };

    const modify = (payload: CategoryDTO & { id: number }) =>
        client.PATCH(`categories/${payload.id}`, {
            name: payload.name,
        });

    return { all, one, add, modify };
};
