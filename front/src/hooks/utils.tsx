import { useState } from "react";

export const useAPIMethodMarkup = <T extends object>(
    name: string,
    apiCall: (payload: T) => any,
    initialState: T
) => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof T>(key: K, value: T[K]) => {
        setState((prev) => ({ ...prev, [key]: value }));
    };

    const getField = <K extends keyof T>(key: K) => {
        return state[key];
    };

    const inputs = Object.keys(state).map((key) => (
        <>
            <span>
                <i>{key}</i> field
            </span>
            <input
                placeholder={key}
                // @ts-ignore
                value={getField(key)}
                onChange={(x) => {
                    const { value } = x.target;
                    // @ts-ignore
                    switch (typeof getField(key)) {
                        case "string": {
                            // @ts-ignore
                            setField(key, value);
                            return;
                        }
                        case "number": {
                            // @ts-ignore
                            setField(key, +value);
                            return;
                        }
                        case "boolean": {
                            // @ts-ignore
                            setField(key, !!value);
                            return;
                        }
                        default: {
                            // @ts-ignore
                            setField(key, value);
                            return;
                        }
                    }
                }}
            />
        </>
    ));

    return (
        <tr>
            <td>
                <b>{name}</b> method
            </td>
            <td className="flexed">{inputs}</td>
            <td>
                <button
                    disabled={loading}
                    onClick={async () => {
                        try {
                            setLoading(true);
                            const value = await apiCall(state);
                            console.log(`${name} result`, value);
                        } catch (e: any) {
                            console.error(`${name} error`, e);
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    Call
                </button>
            </td>
        </tr>
    );
};

export const useAPIControllerMarkup = (
    methods: JSX.Element | JSX.Element[]
) => {
    return (
        <>
            <table>{methods}</table>
        </>
    );
};
