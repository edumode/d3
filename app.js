var width = 800
var height = 300 + 30
var paddingBar = 10

var toFind = "FirstAttempt"

var firstAttemptDates = dates.map(d => d[toFind])

console.log(firstAttemptDates)
var uniquefirstAttemptDates = [...new Set(firstAttemptDates)]

var widthBar = width / uniquefirstAttemptDates.length - paddingBar - 10

var dateMax = d3.max(dates, d => d.FirstAttempt)
var dateMin = d3.min(dates, d => d.FirstAttempt)

var nested_data = d3.nest()
.key(function(d) { return  d[toFind]; })
.rollup(function(leaves) { return leaves.length; })
.entries(dates)

var quantityMax = d3.max(nested_data, d => d.value)
var quantityMin = d3.min(nested_data, d => d.value)

var yScale = d3.scaleLinear()
            .domain([quantityMax, quantityMin])
            .range([height, 0])

var yScaleAxis = d3.scaleLinear()
                .domain([quantityMin, quantityMax])
                .range([height - 30, 0])

var datesAxis = nested_data.map(d => d.key)

var toDate = nested_data.map(d => {
  var dateNumber = Number(d.key)
  var convertExceltoJS = (dateNumber - (25567 + 1))*86400*1000 
  var date = new Date(convertExceltoJS)
  var dateString = date.toString()

  return  moment(dateString).format("MMM DD YYYY");   
})

bottomScaleAxis = d3.scaleBand()
                      .domain(toDate)
                      .range([0, width])


var svgDates = d3.select("svg")
  .attr("width", width)
  .attr("height", height)


var yAxis = d3.axisLeft(yScaleAxis)

svgDates.append("g")
        .style("transform","translate(20px,2px)")
        .call(yAxis)

var bottomAxis = d3.axisBottom(bottomScaleAxis)

svgDates.append("g")
        .style("transform","translate(50px,0)")
        .selectAll("rect")
        .data(uniquefirstAttemptDates)
        .enter()
          .append('rect')
          .attr("width", widthBar)
          .attr("height", (d,i) => yScale(nested_data[i].value)  )
          .attr("y", (d,i) => height - yScale(nested_data[i].value) - 30)
          .attr("x", (d,i) => (paddingBar + widthBar) * i)
          .attr("fill","#996666")

svgDates.append("g")
        .style("transform","translate(20px,300px)")
        .call(bottomAxis)