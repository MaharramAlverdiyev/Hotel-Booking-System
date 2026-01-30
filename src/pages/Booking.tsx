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

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "dropdown") setSelected(value);
        if (name === "country") setCountry(value);
        if (name === "myOption") setSelectedOption(value);
    };

    const handleSave = () => {

        if (!selected || !country || !selectedOption || !startDate || !endDate) {
            return;
        }

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
                <label htmlFor="dropdown">Vətəndaşlığı seçin:</label>
                <br />
                <select id="dropdown" name="dropdown" value={selected} onChange={handleChange}>
                    <option value="">-- Seçin --</option>
                    {citizenship.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="select-country">
                <label htmlFor="country">Ölkəni seçin:</label>
                <br />
                <select id="country" name="country" value={country} onChange={handleChange}>
                    <option value="">-- Seçin --</option>
                    {countries.map(cs => (
                        <option key={cs.id} value={cs.id}>
                            {cs.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="date">
                <div className="date-start">
                    <label htmlFor="start">Başlanğıc tarix:</label>
                    <br />
                    <input
                        type="date"
                        id="start"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="date-end">
                    <label htmlFor="end">Son tarix:</label>
                    <br />
                    <input
                        type="date"
                        id="end"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate} 
                    />
                </div>
            </div>

            <div className="board-choose">
                {boardTypes.map(b => (
                    <div key={b.code}>
                        <label>
                            <input
                                type="radio"
                                name="myOption"
                                value={b.code}
                                checked={selectedOption === b.code}
                                onChange={handleChange}
                            />
                            {b.name}
                        </label>
                    </div>
                ))}
            </div>

            <button onClick={handleSave}>Yadda saxla</button>
        </div>
    );
};

export default Booking;
