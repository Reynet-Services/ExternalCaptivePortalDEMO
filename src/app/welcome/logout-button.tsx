"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });

      if (!response.ok) {
        setError("No pudimos cerrar la sesión");
        return;
      }

      router.push("/");
    } catch (logoutError) {
      setError("Ocurrió un error al cerrar la sesión");
      console.error(logoutError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className={styles.logoutButton}
      >
        {loading ? "Cerrando sesión..." : "Cerrar sesión"}
      </button>
      {error ? <p className={styles.errorMessage}>{error}</p> : null}
    </div>
  );
}
