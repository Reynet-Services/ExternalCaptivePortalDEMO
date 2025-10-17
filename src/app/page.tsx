"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const { error: message } = await response.json();
        setError(message ?? "No pudimos iniciar sesión");
        return;
      }

      setUsername("");
      setPassword("");
      router.push("/welcome");
    } catch (submitError) {
      setError("Ocurrió un problema al conectar con el servicio");
      console.error(submitError);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !username || !password;

  return (
    <div className={styles.wrapper}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1>Acceso</h1>
          <p>Ingresa tus credenciales para continuar.</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="username">
            Usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="demo"
            className={styles.input}
          />

          <label className={styles.label} htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="demo123"
            className={styles.input}
          />

          {error ? <p className={styles.error}>{error}</p> : null}

          <button className={styles.button} type="submit" disabled={isDisabled}>
            {loading ? "Validando..." : "Ingresar"}
          </button>
        </form>

        <footer className={styles.footer}>
          <p>
            Usa <strong>demo</strong> y <strong>demo123</strong> para el acceso
            de prueba.
          </p>
        </footer>
      </section>
    </div>
  );
}
