
import React from "react";

/**
 * Format the date string to the format that React can read
 * @param {string} date date as string retrived from Knex.js
 */
const date_parse = (date) => {
    const tmp_dt = new Date(date);

    let year = tmp_dt.getFullYear().toString();
    let month = (tmp_dt.getMonth() + 1).toString();
    let day = tmp_dt.getUTCDate().toString();

    year = year.padStart(4, "0");
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");

    return [ year, month, day].reduce((p, a) => p + "-" + a);
};

/**
 * Format a date in portuguese format (ie, dd/MM/YYYY)
 * @param {string} date The string to be formated
 */
const format_date = (date) => {
    const tmp = new Date(date);

    let year  = tmp.getFullYear().toString();
    let month = (tmp.getMonth() + 1).toString();
    let day   = tmp.getUTCDate().toString();

    year  = year.padStart(4, "0");
    month = month.padStart(2, "0");
    day   = day.padStart(2, "0");

    return `${day}/${month}/${year}`;
};

/**
 * Copy an object. After copy:
 *  A === B and change(A) don't affect B
 * @param {object} source The object to be copied
 */
const deep_copy = (source) => {
    if (!source) return null;

    let result = {};

    Object.keys(source).forEach( k => {
        if ("object" === typeof source[k]){
            const subobject = deep_copy(source[k]);
            result[k] = subobject;
        } else {
            result[k] = source[k];
        }
    });

    return result;
};

/**
 * Compare two objects and return all field that among them
 * @param {object} source The original object
 * @param {object} target The modified object'
 */
const check_changed_fields = (source, target) => {
    let altered_values = {};

    for (let field of Object.keys(source)) {
        if (source[field] == null)
            continue;

        for (let subfield of Object.keys(source[field])) {
            if (target[field][subfield] !== source[field][subfield]) {
                if (!(field in altered_values)) {
                    altered_values[field] = {};
                }

                altered_values[field][subfield] = target[field][subfield];
            }
        }
    }

    return altered_values;
};

export { date_parse, check_changed_fields , deep_copy, format_date };