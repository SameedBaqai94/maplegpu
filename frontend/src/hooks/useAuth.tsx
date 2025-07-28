import { useState } from "react";

interface AuthResponse {
    success: boolean;
    message?: string;
    data?: any;
}

export default function useAuth() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (email: string, passwordHashed: string): Promise<AuthResponse> => {
        setLoading(true);
        setError(null);

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

    return { signIn, loading, error };
}