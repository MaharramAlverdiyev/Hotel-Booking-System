import React, { useState } from "react";
import "../styles/booking.css";
import citizenship from "../data/citizenship.json";
import countries from "../data/countries.json";
import boardTypes from "../data/boardTypes.json";
import { useDispatch } from "react-redux";
import { saveBooking } from "../store/bookingSlice";

const Booking: React.FC = () => {
    const [selected, setSelected] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [errors, setErrors] = useState({
        citizenship: false,
        country: false,
        board: false,
        startDate: false,
        endDate: false,
    });

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "dropdown") setSelected(value);
        if (name === "country") setCountry(value);
        if (name === "myOption") setSelectedOption(value);
    };

    const handleSave = () => {
        const newErrors = {
            citizenship: !selected,
            country: !country,
            board: !selectedOption,
            startDate: !startDate,
            endDate: !endDate,
        };
        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;

        const bookingData = {
            citizenship: citizenship.find(c => c.id.toString() === selected),
            country: countries.find(c => c.id.toString() === country),
            board: boardTypes.find(b => b.code === selectedOption),
            startDate,
            endDate,
        };
        dispatch(saveBooking(bookingData));
    };

    return (
        <div className="booking">
            <div className="citizenship">
                <label>Vətəndaşlığı seçin:</label>
                <select name="dropdown" value={selected} onChange={handleChange} className={errors.citizenship ? "error" : ""}>
                    <option value="">-- Seçin --</option>
                    {citizenship.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className="select-country">
                <label>Ölkəni seçin:</label>
                <select name="country" value={country} onChange={handleChange} className={errors.country ? "error" : ""}>
                    <option value="">-- Seçin --</option>
                    {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className="date">
                <label>Başlanğıc tarix:</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={errors.startDate ? "error" : ""} />
                <label>Son tarix:</label>
                <input type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)} className={errors.endDate ? "error" : ""} />
            </div>

            <div className="board-choose">
                {boardTypes.map(b => (
                    <label key={b.code}>
                        <input type="radio" name="myOption" value={b.code} checked={selectedOption === b.code} onChange={handleChange} />
                        {b.name}
                    </label>
                ))}
            </div>

            <button onClick={handleSave}>Yadda saxla</button>
        </div>
    );
};

export default Booking;
