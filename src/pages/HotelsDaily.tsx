import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { loadBookingFromStorage } from "../store/bookingSlice";

const HotelsDaily: React.FC = () => {
    const dispatch = useDispatch();
    const booking = useSelector((state: RootState) => state.booking.booking);

    useEffect(() => {
        if (!booking) {
            dispatch(loadBookingFromStorage());
        }
    }, [dispatch, booking]);

    if (!booking) {
        return <p>Booking məlumatı tapılmadı</p>;
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Seçilmiş Məlumatlar</h2>
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>Vətəndaşlıq</th>
                        <th>Ölkə</th>
                        <th>Board</th>
                        <th>Başlanğıc</th>
                        <th>Son</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{booking.citizenship?.name || "-"}</td>
                        <td>{booking.country?.name || "-"}</td>
                        <td>{booking.board?.name || "-"}</td>
                        <td>{booking.startDate ? new Date(booking.startDate).toLocaleDateString() : "-"}</td>
                        <td>{booking.endDate ? new Date(booking.endDate).toLocaleDateString() : "-"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default HotelsDaily;