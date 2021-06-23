//D3 Lib import
const d3 = require('d3');
//Consts
const height = 560; //Height for total plot
const margin = ({top: 20, right: 20, bottom: 35, left: 40}); //Creates margin
bisectDate = d3.bisector(([date]) => date).left; //No idea what this does
//Unsure what this is
function parseSeries(series) {
    return series.map(([year, value]) => [new Date(Date.UTC(year, 0, 1)), value]);
}
//Parsing for dates in nations.json?
let dates = interval.range(
    d3.min(data, d => {
      return d3.min([
        d.income[0], 
        d.population[0], 
        d.lifeExpectancy[0]
      ], ([date]) => date);
    }),
    d3.min(data, d => {
      return d3.max([
        d.income[d.income.length - 1], 
        d.population[d.population.length - 1], 
        d.lifeExpectancy[d.lifeExpectancy.length - 1]
      ], ([date]) => date);
    })
);

interval = d3.utcMonth // interval between animation frames
//Parses data from nations.json file
let data = (await FileAttachment("nations.json").json())
  .map(({name, region, income, population, lifeExpectancy}) => ({
    name,
    region,
    income: parseSeries(income),
    population: parseSeries(population),
    lifeExpectancy: parseSeries(lifeExpectancy)
}));

function valueAt(values, date) {
    const i = bisectDate(values, date, 0, values.length - 1);
    const a = values[i];
    if (i > 0) {
      const b = values[i - 1];
      const t = (date - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }



