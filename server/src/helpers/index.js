const newDate = new Date();

function addDaysToDate(days) {
  let datePlusDays = new Date(newDate.getTime() + days * 24 * 60 * 60 * 1000);
  return (
    datePlusDays.getDate() +
    "/" +
    (datePlusDays.getMonth() + 1) +
    "/" +
    datePlusDays.getFullYear()
  );
}

module.exports = { addDaysToDate };
