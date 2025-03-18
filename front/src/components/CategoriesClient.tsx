import { FC } from "react";
import { useAPIControllerMarkup, useAPIMethodMarkup } from "../hooks/utils";
import { useCategories } from "../hooks";

const BASE_URL = "http://localhost:3001";

export const CategoriesClient: FC = () => {
    const { add, all, modify, one } = useCategories(BASE_URL);

    const getAllMarkup = useAPIMethodMarkup("Get all", all, {});
    const getOneMarkup = useAPIMethodMarkup("Get one", one, {
        id: 0,
    });
    const addMarkup = useAPIMethodMarkup("Add", add, {
        name: "foods",
    });
    const modifyMarkup = useAPIMethodMarkup("Modify", modify, {
        id: 0,
        name: "electronics",
    });
    const controllerMarkup = useAPIControllerMarkup([
        getAllMarkup,
        getOneMarkup,
        addMarkup,
        modifyMarkup,
    ]);

    return controllerMarkup;
};
