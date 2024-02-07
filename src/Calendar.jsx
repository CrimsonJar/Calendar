import "./css/main.css";
const Calendar = ({ date }) => {
  const currentDate = date;
  const today = currentDate.getDate();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const ruDate = new Intl.DateTimeFormat("ru-RU", options).format(currentDate);
  
  const splittedRuDate = ruDate.split(" ");
  const headerDayOfWeek = splittedRuDate[0].slice(0, -1);
  const headerDay = splittedRuDate[1];
  const headerMonth= splittedRuDate[2];
  const headerYear= splittedRuDate[3];
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  let dayOfWeekBegin = firstDayOfMonth.getDay(); // день недели для первого числа месяца
  if (dayOfWeekBegin !== 1) {
    // Если день недели не понедельник
    dayOfWeekBegin = dayOfWeekBegin - 1 || 7; 
  } else dayOfWeekBegin = 0;
  const lastMonthDayCount = dayOfWeekBegin - 1;
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); // Устанавливаем день в 0 для получения последнего дня предыдущего месяца
  const lastDayOfPreviousMonth = new Date(
    currentYear,
    currentMonth,
    0
  ).getDate();
  
  let dayOfWeekEnd = lastDayOfMonth.getDay(); // день недели для последнего дня месяца
  if (dayOfWeekEnd !== 1) {
    dayOfWeekEnd = dayOfWeekEnd - 1 || 7;
  }

  // массив дней месяца
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  if (lastMonthDayCount >= 0) {
    for (let i = 0; i < Math.abs(lastMonthDayCount + 1); i++) {
      monthDays.unshift(lastDayOfPreviousMonth - i);
    }
  }
  if (dayOfWeekEnd !== 0) {
    // Если последний день месяца - не воскресенье
    let daysToAdd = 6 - dayOfWeekEnd; // количество дней, которые нужно добавить из следующего месяца
    for (let i = 1; i <= daysToAdd; i++) {
      monthDays.push(i); // числа из следующего месяца
    }
  }
  

  const dayCells = [];
  monthDays.forEach((day, index) => {
    if (index % 7 === 0) {
      dayCells.push([]);
    };
    if (index < Math.abs(lastMonthDayCount + 1)) {
      dayCells[dayCells.length - 1].push(
        <td key={index} className="ui-datepicker-other-month">
          {day}
        </td>
      );
    } else if (index >= monthDays.length - (6 - dayOfWeekEnd)) {
      dayCells[dayCells.length - 1].push(
        <td key={index} className="ui-datepicker-other-month">
          {day}
        </td>
      );
    } else {
      const isToday = day === today ? "ui-datepicker-today" : "";
      dayCells[dayCells.length - 1].push(<td key={index} className={isToday}>{day}</td>);
    };
  });

  const tableRows = dayCells.map((week, index) => <tr key={index}>{week}</tr>);
  
  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{headerDayOfWeek}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{headerDay}</div>
          <div className="ui-datepicker-material-month">{headerMonth}</div>
          <div className="ui-datepicker-material-year">{headerYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{headerMonth}</span>&nbsp;
          <span className="ui-datepicker-year">{headerYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">
              Пн
            </th>
            <th scope="col" title="Вторник">
              Вт
            </th>
            <th scope="col" title="Среда">
              Ср
            </th>
            <th scope="col" title="Четверг">
              Чт
            </th>
            <th scope="col" title="Пятница">
              Пт
            </th>
            <th scope="col" title="Суббота">
              Сб
            </th>
            <th scope="col" title="Воскресенье">
              Вс
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
