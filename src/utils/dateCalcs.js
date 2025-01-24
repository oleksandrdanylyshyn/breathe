export const calculateSecondsSince = (datetime) => {
    const today = new Date();
    const parsedDate = new Date(datetime)
    console.log("test today", today);
    console.log("test datetime", parsedDate);
    const timeDifference = today - parsedDate;
    const secondsSince = Math.ceil(timeDifference / 1000);
    console.log(secondsSince)
    return secondsSince;
}
export const formatDuration = (totalSeconds) => {
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay; // Approximate month length
    const secondsInYear = 365 * secondsInDay; // Approximate year length

    const years = Math.floor(totalSeconds / secondsInYear);
    totalSeconds %= secondsInYear;

    const months = Math.floor(totalSeconds / secondsInMonth);
    totalSeconds %= secondsInMonth;

    const days = Math.floor(totalSeconds / secondsInDay);
    totalSeconds %= secondsInDay;

    const hours = Math.floor(totalSeconds / secondsInHour);
    totalSeconds %= secondsInHour;

    const minutes = Math.floor(totalSeconds / secondsInMinute);
    totalSeconds %= secondsInMinute;

    const seconds = totalSeconds;

    return { years, months, days, hours, minutes, seconds };
};

export const combineDateAndTime = (date, time) => {
    // Extract the date components
    const year = date.getFullYear();
    const month = date.getMonth(); // Note: Month is 0-indexed (0 = January)
    const day = date.getDate();

    // Extract the time components
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Create a new Date object with the combined date and time
    return new Date(year, month, day, hours, minutes, seconds);
}