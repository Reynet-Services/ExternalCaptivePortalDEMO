import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";
import styles from "./page.module.css";

export default async function WelcomePage() {
  const store = await cookies();
  const token = store.get("auth-token");
  const user = store.get("auth-user");

  if (!token || !token.value) {
    redirect("/");
  }

  const displayName = user?.value ?? "Usuario";

  return (
    <div className={styles.wrapper}>
      <section className={styles.card}>
        <div className={styles.heading}>
          <h1>¡Bienvenido, {displayName}!</h1>
          <p>
            Este portal demuestra un flujo básico de autenticación en Next.js
            usando rutas API y cookies para validar el acceso a recursos.
          </p>
        </div>

        <div className={styles.actions}>
          <p>
            El API protegido expone la información del usuario únicamente si la
            sesión es válida. Puedes revisar el endpoint en{" "}
            <Link href="/api/auth/me" className={styles.link}>
              /api/auth/me
            </Link>
            .
          </p>
          <p>
            Cierra la sesión cuando quieras para limpiar la cookie y volver al
            formulario de acceso.
          </p>
        </div>

        <LogoutButton />
      </section>
    </div>
  );
}
