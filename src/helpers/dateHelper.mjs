
export function getFormattedDate(date) {
    let newDate = new Date(date);

    return newDate.toLocaleDateString('en-GB');
}