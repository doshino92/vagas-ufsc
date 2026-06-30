import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { notificationService } from "../services/api";
import "./Notifications.css";

export default function Notifications() {
    const { token } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        notificationService.getAll(token).then((res) => {
            if (res.ok) setNotifications(res.data);
            setLoading(false);
        });
    }, [token]);

    const handleMarkRead = async (id) => {
        const res = await notificationService.markRead(token, id);
        if (res.ok) {
            setNotifications((prev) =>
                prev.map((n) => (n._id === id ? { ...n, read: true } : n))
            );
        }
    };

    const unread = notifications.filter((n) => !n.read).length;

    return (
        <div className="page">
            <Navbar />
            <main className="page-main">
                <h2 className="page-title">
                    Notificações
                    {unread > 0 && <span className="unread-badge">{unread} nova{unread > 1 ? "s" : ""}</span>}
                </h2>

                {loading && <p className="info-text">Carregando...</p>}
                {!loading && notifications.length === 0 && (
                    <p className="info-text">Você não tem notificações.</p>
                )}

                <div className="notifications-list">
                    {notifications.map((n) => (
                        <div key={n._id} className={`notification-card ${n.read ? "read" : "unread"}`}>
                            <div className="notification-content">
                                {!n.read && <span className="dot" />}
                                <div>
                                    <p className="notification-message">{n.message}</p>
                                    <p className="notification-date">
                                        {new Date(n.createdAt).toLocaleString("pt-BR")}
                                    </p>
                                </div>
                            </div>
                            {!n.read && (
                                <button className="mark-read-btn" onClick={() => handleMarkRead(n._id)}>
                                    Marcar como lida
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
