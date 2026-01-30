import React from "react";
import { useSelector } from "react-redux";

const FinallyBooking: React.FC = () => {
    const booking = useSelector((state: any) => state.booking.booking);
    const hotelSelections = useSelector((state: any) => state.hotelsDaily?.selections || []);

    if (!booking) return null;

    const totalHotelPrice = hotelSelections.reduce((sum, sel) => sum + (sel.hotel?.price || 0), 0);
    const totalMealPrice = hotelSelections.reduce(
        (sum, sel) => sum + (sel.lunch?.price || 0) + (sel.dinner?.price || 0),
        0
    );

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
                <div
                    style={{
                        maxHeight: 300,
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        padding: 10
                    }}
                >
                    {hotelSelections.map((sel, i) => {
                        const hotelPrice = sel.hotel?.price || 0;
                        const mealPrice = (sel.lunch?.price || 0) + (sel.dinner?.price || 0);

                        return (
                            <div key={i} style={{ marginBottom: 12, padding: 8, borderBottom: "1px solid #eee" }}>
                                <p><strong>Tarix:</strong> {sel.date}</p>
                                <p><strong>Otel:</strong> {sel.hotel?.name || "-"}</p>
                                <p><strong>Nahar:</strong> {sel.lunch?.name || "-"}</p>
                                <p><strong>Şam yeməyi:</strong> {sel.dinner?.name || "-"}</p>
                                <p><strong>Otel Qiyməti:</strong> {hotelPrice.toFixed(2)}$</p>
                                <p><strong>Yemək Qiyməti:</strong> {mealPrice.toFixed(2)}$</p>
                                <p><strong>Cəm:</strong> {(hotelPrice + mealPrice).toFixed(2)}$</p>
                            </div>
                        );
                    })}
                </div>
            )}

            <div style={{ marginTop: 10, fontWeight: "bold", borderTop: "2px solid #ccc", paddingTop: 8 }}>
                <p>Total Otel: {totalHotelPrice.toFixed(2)}$</p>
                <p>Total Yemək: {totalMealPrice.toFixed(2)}$</p>
                <p>Ümumi Cəm: {(totalHotelPrice + totalMealPrice).toFixed(2)}$</p>
            </div>
        </div>
    );
};

export default FinallyBooking;
