export const calculateSecondsSince = (date, time) => {
    const today = new Date();
    const stoppedSmokingDateTime = combineDateAndTime(date, time);
    const timeDifference = today.getTime() - stoppedSmokingDateTime.getTime();
    const secondsSince = Math.ceil(timeDifference / 1000);
    return secondsSince;
}

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