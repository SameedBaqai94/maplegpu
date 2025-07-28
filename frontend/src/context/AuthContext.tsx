import { createContext, useState, type ReactNode } from "react";

// export interface User {
//     name: string;
//     email: string;
// }

interface AuthResponse {
    success: boolean;
    message?: string;
    data?: any;
}
interface AuthContextInterface {
    //user: User;
    //isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    signIn: (email: string, passwordHashed: string) => Promise<AuthResponse>;
}
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    //const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (email: string, passwordHashed: string): Promise<AuthResponse> => {
        setLoading(true);
        setError(null);
        console.log(email, passwordHashed)
        try {
            const response = await fetch("http://localhost:8000/api/users/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, passwordHashed }),
                credentials: "include"
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            setError("Network error");
            return { success: false, message: "Network error" };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        loading: loading,
        error: error,
        signIn: signIn
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}