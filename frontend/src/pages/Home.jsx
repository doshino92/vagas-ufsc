import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="home-page">
            <Navbar />

            <main className="home-main">
                <div className="home-card">
                    <h2>Bem-vindo!</h2>
                    <p>
                        Você está logado como <strong>{user.role === "recruiter" ? "recrutador" : "candidato"}</strong>.
                    </p>
                    <p className="home-hint">
                        {user.role === "recruiter"
                            ? "Em breve você poderá criar e gerenciar suas vagas aqui."
                            : "Em breve você poderá visualizar e se candidatar a vagas aqui."}
                    </p>
                </div>
            </main>
        </div>
    );
}
