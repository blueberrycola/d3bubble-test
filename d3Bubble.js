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
var json = FileAttachment("nations.json").json();
//Parses data from nations.json file NOTE: FileAttachment is used by observable library
data = (json)
  .map(({name, region, income, population, lifeExpectancy}) => ({
    name,
    region,
    income: parseSeries(income),
    population: parseSeries(population),
    lifeExpectancy: parseSeries(lifeExpectancy)
}));
//???
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
//???
function dataAt(date) {
    return data.map(d => ({
      name: d.name,
      region: d.region,
      income: valueAt(d.income, date),
      population: valueAt(d.population, date),
      lifeExpectancy: valueAt(d.lifeExpectancy, date)
    }));
}
//define grid for plot
let grid = g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom))
    .call(g => g.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d))
        .attr("x1", margin.left)
        .attr("x2", width - margin.right));
//Define yAxis on plot graph
let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("??? Life expectancy (years)"))
//Define xAxis on plot graph
let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80, ","))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Income per capita (dollars) ???"))
//Vars for circle state???
var color = d3.scaleOrdinal(data.map(d => d.region), d3.schemeCategory10).unknown("black");
var radius = d3.scaleSqrt([0, 5e8], [0, width / 24]);
var y = d3.scaleLinear([14, 86], [height - margin.bottom, margin.top])
var x = d3.scaleLog([200, 1e5], [margin.left, width - margin.right]);
var currentData = dataAt(date)

update = chart.update(currentData);





