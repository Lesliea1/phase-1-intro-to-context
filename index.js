// Your code here
class TimeCard {
  constructor() {
    this.records = [];
  }

  addRecord(date, time) {
    this.records.push({ date, time });
  }

  getRecords() {
    return this.records;
  }
}

function checkIn(timeCard, date, time) {
  timeCard.addRecord(date, time + " check-in");
}

function checkOut(timeCard, date, time) {
  timeCard.addRecord(date, time + " check-out");
}

function calculateWorkHours(checkInTime, checkOutTime) {
  const checkInHour = parseInt(checkInTime.slice(-4));
  const checkOutHour = parseInt(checkOutTime.slice(-4));
  const workHours = checkOutHour - checkInHour;
  return workHours;
}

const HOURLY_RATE = 15;

function calculatePayroll(workHours) {
  return workHours * HOURLY_RATE;
}

const timeCard = new TimeCard();

checkIn(timeCard, "2018-01-01", "0800");
checkOut(timeCard, "2018-01-01", "1700");

const records = timeCard.getRecords();
console.log(records);

const workHours = calculateWorkHours(records[0].time, records[1].time);
const payroll = calculatePayroll(workHours);
console.log(`Work Hours: ${workHours}`);
console.log(`Payroll: $${payroll}`);

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const payOwed = hoursWorked * employeeRecord.payPerHour;
  return payOwed;
}

function allWagesFor(employeeRecord) {
  const allDates = employeeRecord.timeInEvents.map((event) => event.date);
  const totalWages = allDates.reduce(
    (total, date) => total + wagesEarnedOnDate(employeeRecord, date),
    0
  );
  return totalWages;
}

function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce(
    (total, employeeRecord) => total + allWagesFor(employeeRecord),
    0
  );
  return totalPayroll;
}