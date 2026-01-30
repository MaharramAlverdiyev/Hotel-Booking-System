import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveHotelSelection } from "../store/hotelsDailySlice";
import hotelsData from "../data/hotels.json";
import mealsData from "../data/meals.json";
import "../styles/hotelsdaily.css";

interface DaySelection {
    date: string;
    hotelId: number | "";
    lunchId: number | "";
    dinnerId: number | "";
    activeMeal?: "lunch" | "dinner";
}

interface HotelType {
    id: number;
    name: string;
    price: number;
}

interface MealType {
    id: number;
    name: string;
    price: number;
}

interface Booking {
    startDate: string;
    endDate: string;
    country?: {
        name: string;
    };
    board?: {
        code: string;
    };
}

interface RootState {
    booking: {
        booking: Booking | null;
    };
}

const HotelsDaily = () => {
    const dispatch = useDispatch();
    const booking = useSelector((state: RootState) => state.booking.booking);

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

    if (!booking) return null;

    const { country, board } = booking;
    const boardCode = board?.code;
    const countryName = country?.name;

    if (!countryName || !boardCode) return <p>Loading...</p>;

    const availableHotels: HotelType[] = (hotelsData as Record<string, HotelType[]>)[countryName] || [];
    const countryMeals: { lunch: MealType[]; dinner: MealType[] } | undefined =
        (mealsData as Record<string, { lunch: MealType[]; dinner: MealType[] }>)[countryName];

    const handleHotelChange = (index: number, value: number) => {
        setSelections(prev =>
            prev.map((sel, i) => (i === index ? { ...sel, hotelId: value } : sel))
        );
    };

    const handleLunchChange = (index: number, value: number) => {
        setSelections(prev =>
            prev.map((sel, i) =>
                i === index
                    ? {
                        ...sel,
                        lunchId: value,
                        dinnerId: value && boardCode === "HB" ? "" : sel.dinnerId,
                        activeMeal: value ? "lunch" : undefined,
                    }
                    : sel
            )
        );
    };

    const handleDinnerChange = (index: number, value: number) => {
        setSelections(prev =>
            prev.map((sel, i) =>
                i === index
                    ? {
                        ...sel,
                        dinnerId: value,
                        lunchId: value && boardCode === "HB" ? "" : sel.lunchId,
                        activeMeal: value ? "dinner" : undefined,
                    }
                    : sel
            )
        );
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
