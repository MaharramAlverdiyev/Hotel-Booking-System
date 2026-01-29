import React from 'react'
import { useState } from "react";
import boardTypes from "../data/boardTypes";
import countries from '../data/countries';
import "../styles/booking.css"


export const Booking = () => {
    const [citizenship, setCitizenship] = useState("Azerbaijan");
    const [countryId, setCountryId] = useState<number | "">("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [selectedBoard, setSelectedBoard] = useState("FB");

    return (
        <div className='booking-hotel'>
            <div>
                <label>Citizenship:</label>
                <input type="text" value={citizenship} disabled />
            </div>

            {/* Gedeceyimiz olke sechimi */}
            <div className='selectCountry'>
                <label>Destination Country:</label>
                <select value={countryId} onChange={e => setCountryId(Number(e.target.value))}>
                    <option value="">Select country</option>
                    {countries.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* Gun araligi */}
            <div className='selectDate'>
                <label>From:</label>
                <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                <label>To:</label>
                <input type="date" value={toDate} min={fromDate} onChange={e => setToDate(e.target.value)} />
            </div>

            {/* Board (yemek) sechimi */}
            <div className='board'>
                {boardTypes.map(b => (
                    <label key={b.code}>
                        <input
                            type="radio"
                            name="board"
                            value={b.code}
                            checked={selectedBoard === b.code}
                            onChange={() => setSelectedBoard(b.code)}
                        />
                        {b.name}
                    </label>
                ))}
            </div>
        </div>
    );
}