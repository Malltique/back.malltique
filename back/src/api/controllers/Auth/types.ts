export type Register = {
    Request: {
        email: string;
        name: string;
        password: string;
        roles: number[];
    };
};

export type Login = {
    Request: { email: string; password: string };
};
