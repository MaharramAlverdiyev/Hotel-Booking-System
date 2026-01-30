import React from "react";
import { useSelector } from "react-redux";

const FinallyBooking: React.FC = () => {
    const booking = useSelector((state: any) => state.booking.booking);
    const hotelSelections = useSelector((state: any) => state.hotelsDaily?.selections || []);

    if (!booking) return null;

    return (
        <div style={{ padding: 20 }}>
            <h2>Rezervasiya Xülasəsi</h2>

            <p>Vətəndaşlıq: {booking.citizenship?.name || "-"}</p>
            <p>Ölkə: {booking.country?.name || "-"}</p>
            <p>Gediş tarixi: {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : "-"}</p>
            <p>Qayıdış tarixi: {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : "-"}</p>
            <p>Board növü: {booking.board?.name || "-"}</p>

            <h3>Hotel və Yemək Seçimləri</h3>
            {hotelSelections.length === 0 ? (
                <p>Heç bir hotel və yemək seçimi yoxdur.</p>
            ) : (
                hotelSelections.map((sel, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                        <p>Otel: {sel.hotel?.name || "-"}</p>
                        <p>Nahar: {sel.lunch?.name || "-"}</p>
                        <p>Şam yeməyi: {sel.dinner?.name || "-"}</p>
                        <p>Otel Qiyməti: {sel.hotel?.price || 0}$</p>
                        <p>Yemək Qiyməti: {((sel.lunch?.price || 0) + (sel.dinner?.price || 0))}$</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default FinallyBooking;
