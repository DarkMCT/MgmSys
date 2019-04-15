

const date_parse = (date) => {
    const tmp_dt = new Date(date);
    return [tmp_dt.getFullYear(), tmp_dt.getMonth() + 1, tmp_dt.getDate()].reduce((p, a) => p + "-" + a);
}

export {date_parse};