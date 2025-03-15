import { forAPI } from "../../utils/requests";
import { setToken } from "../../utils/token";

export const useAuth = (baseURL: string) => {
    const client = forAPI(baseURL);

    const register = (payload: { username: string; password: string }) =>
        client.POST("auth/register", payload);

    const login = async (payload: { username: string; password: string }) => {
        const result = await client.POST<typeof payload, { token: string }>(
            "auth/login",
            payload
        );
        setToken(result.token);
        return result;
    };

    return { login, register };
};
