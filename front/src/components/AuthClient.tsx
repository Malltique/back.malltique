import { FC } from "react";
import { useAPIControllerMarkup, useAPIMethodMarkup } from "../hooks/utils";
import { useAuth } from "../hooks";

const BASE_URL = "http://localhost:3001";

export const AuthClient: FC = () => {
    const { login, register } = useAuth(BASE_URL);

    const registerMarkup = useAPIMethodMarkup("Register", register, {
        username: "",
        password: "",
    });

    const loginMarkup = useAPIMethodMarkup("Login", login, {
        username: "",
        password: "",
    });

    const controllerMarkup = useAPIControllerMarkup([
        registerMarkup,
        loginMarkup,
    ]);

    return controllerMarkup;
};
