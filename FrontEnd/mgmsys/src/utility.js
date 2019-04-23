


const date_parse = (date) => {
    const tmp_dt = new Date(date);

    let year = tmp_dt.getFullYear().toString();
    let month = (tmp_dt.getMonth() + 1).toString();
    let day = tmp_dt.getDate().toString();

    year = year.padStart(4, "0");
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");

    return [ year, month, day].reduce((p, a) => p + "-" + a);
}

export {date_parse};