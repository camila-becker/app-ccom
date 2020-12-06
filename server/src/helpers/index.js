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

const date = () => {
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, "0");
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  return (currentDate = `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`);
};

module.exports = { addDaysToDate, date };
