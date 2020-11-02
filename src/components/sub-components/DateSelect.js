import React from 'react';

function DateSelect ({ currentMonth, months, handleDateSelect }) {
  return (
    <select className="month-filter select-filter" name="currentMonth" value={ currentMonth } onChange={ (event) => handleDateSelect(event) } >
      { months.map(month => (
        <option 
          value={ month }
          key={ month }
        >
          { month }
        </option>
      ))}
    </select>
  )
}

export default DateSelect;