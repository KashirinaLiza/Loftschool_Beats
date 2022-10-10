const workers = [
  {"name":"John", "salary":"500"},
  {"name":"Mike", "salary":"1300"},
  {"name":"Linda", "salary":"1500"}
];

const getWorthyWorkers = workersArr => {
  const WorthyWorkers = [];

  for (let i=0; i<workersArr.length; i++) {
    const currentWorker = workersArr[i];

    if (currentWorker.salary > 1000) {
      WorthyWorkers.push(currentWorker.name);
    }
  }

  return WorthyWorkers;
}
console.log(getWorthyWorkers(workers))