import React, { useState, useRef } from 'react';

function Day({setCheckIn, setShowCheckIn}) {

    const [currentMonth, setCurrentMonth] = useState(new Date()); 
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

    const getDaysInMonth = (month, year) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) =>
        new Date(year, month, 1).getDay();

    const handlePrevMonth = (e) => {
        e.stopPropagation();
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
    };
    const handleNextMonth = (e) => {
        e.stopPropagation();
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    };
    const handleDateSelect = (day) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setCheckIn(selectedDate);
        setShowCheckIn(false);
    };
    const renderCalendar = (monthOffset) => {
        const month = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset);
        const days = getDaysInMonth(month.getMonth(), month.getFullYear());
        const firstDay = getFirstDayOfMonth(month.getMonth(), month.getFullYear());
        const calendarDays = [];
        for (let i = 0; i < firstDay; i++) calendarDays.push('');
        for (let day = 1; day <= days; day++) calendarDays.push(day);
        return Array.from({ length: 42 }, (_, i) => calendarDays[i] || '');
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <button onClick={handlePrevMonth} className="px-2">&lt;</button>
                <span className="flex-1 text-center font-bold">
                {new Date(currentMonth.getFullYear(), currentMonth.getMonth())
                    .toLocaleString("default", { month: "long", year: "numeric" })}
                </span>
                <span className="flex-1 text-center font-bold">
                {new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                    .toLocaleString("default", { month: "long", year: "numeric" })}
                </span>
                <button onClick={handleNextMonth} className="px-2">&gt;</button>
            </div>

            <div className="flex space-x-4">
                <div className="w-1/2">
                <div className="grid grid-cols-7 gap-1">
                    {weekdays.map((day, idx) => (
                    <div key={`left-${day}-${idx}`} className="text-center font-semibold">{day}</div>
                    ))}
                    {renderCalendar(0).map((day, index) => (
                    <div
                        key={`left-day-${index}`}
                        className={`text-center p-1 rounded cursor-pointer ${day && 'hover:bg-gray-300'}`}
                        onClick={(e) => {
                        e.stopPropagation();
                        if (day) handleDateSelect(day);
                        }}
                    >
                        {day}
                    </div>
                    ))}
                </div>
                </div>

                <div className="w-1/2">
                <div className="grid grid-cols-7 gap-1">
                    {weekdays.map((day, idx) => (
                    <div key={`right-${day}-${idx}`} className="text-center font-semibold">{day}</div>
                    ))}
                    {renderCalendar(1).map((day, index) => (
                    <div
                        key={`right-day-${index}`}
                        className={`text-center p-1 rounded cursor-pointer ${day && 'hover:bg-gray-300'}`}
                        onClick={(e) => {
                        e.stopPropagation();
                        if (day) {
                            const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day);
                            setCheckIn(selectedDate);
                            setShowCheckIn(false);
                        }
                        }}
                    >
                        {day}
                    </div>
                    ))}
                </div>
                </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                <button className="bg-black text-white px-4 py-2 rounded-3xl">Exact dates</button>
                <button className="bg-gray-200 px-4 py-2 rounded-3xl">±1 day</button>
                <button className="bg-gray-200 px-4 py-2 rounded-3xl">±2 days</button>
                <button className="bg-gray-200 px-4 py-2 rounded-3xl">±3 days</button>
                <button className="bg-gray-200 px-4 py-2 rounded-3xl">±7 days</button>
                <button className="bg-gray-200 px-4 py-2 rounded-3xl">±14 days</button>
            </div>
        </div>
    );
}

export default Day;
