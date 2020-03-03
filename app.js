var width = 800
var height = 300
var paddingBar = 10

var firstAttemptDates = dates.map(dates => dates.FirstAttempt)
var uniquefirstAttemptDates = [...new Set(firstAttemptDates)]

var widthBar = width / uniquefirstAttemptDates.length - paddingBar - 10

var dateMax = d3.max(dates, d => d.FirstAttempt)
var dateMin = d3.min(dates, d => d.FirstAttempt)


var yScale = d3.scaleLinear()
                .domain([dateMin, dateMax])
                .range([height, 0])

var  yScaleAxis = d3.scaleLinear()
                .domain([0, dates.length])
                .range([height, 0])


var svgDates = d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .style("border", "1px solid black")

  console.log(uniquefirstAttemptDates)

var yAxis = d3.axisRight(yScaleAxis)

svgDates.append("g")
        .style("transform","translate(1px,10px)")
        .call(yAxis)

svgDates.append("g")
        .style("transform","translate(50px,0)")
        .selectAll("rect")
        .data(uniquefirstAttemptDates)
        .enter()
          .append('rect')
          .attr("width", widthBar)
          .attr("height", (d,i) => yScale(uniquefirstAttemptDates[i]) )
          .attr("y", (d,i) => height - yScale(uniquefirstAttemptDates[i]))
          .attr("x", (d,i) => (paddingBar + widthBar) * i)
          .attr("fill","green")