import { getToken } from "./token";

export const forAPI = (baseURL: string) => {
    const GET = async <Result>(url: string) => {
        const request = await fetch(`${baseURL}/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: getToken()!,
            },
        });

        const result: Result = await request.json();

        return result;
    };

    const POST = async <Request, Result>(url: string, body: Request) => {
        const request = await fetch(`${baseURL}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getToken()!,
            },
            body: JSON.stringify(body),
        });

        const result: Result = await request.json();

        return result;
    };

    const PATCH = async <Request, Result>(url: string, body: Request) => {
        const request = await fetch(`${baseURL}/${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: getToken()!,
            },
            body: JSON.stringify(body),
        });

        const result: Result = await request.json();

        return result;
    };

    return { GET, POST, PATCH };
};
