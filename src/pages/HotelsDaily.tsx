import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveHotelSelection } from "../store/hotelsDailySlice";
import hotelsData from "../data/hotels.json";
import mealsData from "../data/meals.json";
import "../styles/hotelsdaily.css"

interface DaySelection {
    date: string;
    hotelId: number | "";
    lunchId: number | "";
    dinnerId: number | "";
    activeMeal?: "lunch" | "dinner";
}

const HotelsDaily: React.FC = () => {
    const dispatch = useDispatch();
    const booking = useSelector((state: any) => state.booking.booking);

    const [selections, setSelections] = useState<DaySelection[]>([]);

    const getDatesArray = (start: string, end: string) => {
        const dates: string[] = [];
        let current = new Date(start);
        const last = new Date(end);
        while (current <= last) {
            dates.push(current.toISOString().split("T")[0]);
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };

    useEffect(() => {
        if (!booking) return;
        const { startDate, endDate } = booking;
        const dates = getDatesArray(startDate!, endDate!);
        setSelections(dates.map(date => ({ date, hotelId: "", lunchId: "", dinnerId: "" })));
    }, [booking]);

    if (!booking) return;

    const { country, board } = booking;
    const boardCode = board?.code;
    const countryName = country?.name;

    if (!countryName || !boardCode) return <p>Loading...</p>;

    const availableHotels = hotelsData[countryName] || [];
    const countryMeals = mealsData[countryName];

    const handleHotelChange = (index: number, value: number) => {
        const newSel = [...selections];
        newSel[index].hotelId = value;
        setSelections(newSel);
    };

    const handleLunchChange = (index: number, value: number) => {
        const newSel = [...selections];
        newSel[index].lunchId = value;
        if (boardCode === "HB" && value) {
            newSel[index].dinnerId = "";
            newSel[index].activeMeal = "lunch";
        }
        if (!value) newSel[index].activeMeal = undefined;
        setSelections(newSel);
    };

    const handleDinnerChange = (index: number, value: number) => {
        const newSel = [...selections];
        newSel[index].dinnerId = value;
        if (boardCode === "HB" && value) {
            newSel[index].lunchId = "";
            newSel[index].activeMeal = "dinner";
        }
        if (!value) newSel[index].activeMeal = undefined;
        setSelections(newSel);
    };

    const handleSave = () => {
        const payload = selections.map(sel => ({
            hotel: availableHotels.find(h => h.id === sel.hotelId),
            lunch:
                (boardCode === "FB" || boardCode === "HB") && sel.lunchId
                    ? countryMeals?.lunch.find(l => l.id === sel.lunchId)
                    : undefined,
            dinner:
                (boardCode === "FB" || boardCode === "HB") && sel.dinnerId
                    ? countryMeals?.dinner.find(d => d.id === sel.dinnerId)
                    : undefined,
            date: sel.date,
        }));
        dispatch(saveHotelSelection(payload));
    };

    return (
        <div className="hoteldaily">
            <h2>Səyahətiniz üçün hotel və yemək seçimlərini edin !</h2>
            <div className="scrollable-table">
                <table cellPadding={7} className="scrollable-table">
                    <thead>
                        <tr>
                            <th>Gün</th>
                            <th>Otel</th>
                            <th>Nahar</th>
                            <th>Şam</th>
                            <th>Otel ($)</th>
                            <th>Yemək ($)</th>
                            <th>Total ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selections.map((sel, index) => {
                            const selectedHotel = availableHotels.find(h => h.id === sel.hotelId);
                            const lunchPrice =
                                sel.lunchId && countryMeals?.lunch.find(l => l.id === sel.lunchId)?.price
                                    ? countryMeals.lunch.find(l => l.id === sel.lunchId)!.price
                                    : 0;
                            const dinnerPrice =
                                sel.dinnerId && countryMeals?.dinner.find(d => d.id === sel.dinnerId)?.price
                                    ? countryMeals.dinner.find(d => d.id === sel.dinnerId)!.price
                                    : 0;

                            return (
                                <tr key={sel.date}>
                                    <td data-label="Gün">{sel.date}</td>
                                    <td data-label="Otel">
                                        <select
                                            value={sel.hotelId}
                                            onChange={e => handleHotelChange(index, Number(e.target.value))}
                                        >
                                            <option value="">-- Seçin --</option>
                                            {availableHotels.map(h => (
                                                <option key={h.id} value={h.id}>
                                                    {h.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td data-label="Nahar">
                                        <select
                                            value={sel.lunchId}
                                            onChange={e => handleLunchChange(index, Number(e.target.value))}
                                            disabled={boardCode === "NB" || (boardCode === "HB" && sel.activeMeal === "dinner")}
                                        >
                                            <option value="">-- Seçin --</option>
                                            {countryMeals?.lunch.map(l => (
                                                <option key={l.id} value={l.id}>
                                                    {l.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td data-label="Şam">
                                        <select
                                            value={sel.dinnerId}
                                            onChange={e => handleDinnerChange(index, Number(e.target.value))}
                                            disabled={boardCode === "NB" || (boardCode === "HB" && sel.activeMeal === "lunch")}
                                        >
                                            <option value="">-- Seçin --</option>
                                            {countryMeals?.dinner.map(d => (
                                                <option key={d.id} value={d.id}>
                                                    {d.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td data-label="Otel ($)">{selectedHotel ? selectedHotel.price.toFixed(2) : "0.00"}</td>
                                    <td data-label="Yemək ($)">{(lunchPrice + dinnerPrice).toFixed(2)}</td>
                                    <td data-label="Total ($)">{((selectedHotel ? selectedHotel.price : 0) + lunchPrice + dinnerPrice).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
            <button onClick={handleSave} className="buttonn">
                Yadda saxla
            </button>
        </div>
    );
};

export default HotelsDaily;
