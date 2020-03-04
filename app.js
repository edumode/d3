var width = 800
var height = 300 + 30
var paddingBar = 10

var firstAttemptDates = dates.map(dates => dates.FirstAttempt)
var uniquefirstAttemptDates = [...new Set(firstAttemptDates)]

var widthBar = width / uniquefirstAttemptDates.length - paddingBar - 10

var dateMax = d3.max(dates, d => d.FirstAttempt)
var dateMin = d3.min(dates, d => d.FirstAttempt)

var nested_data = d3.nest()
.key(function(d) { return d.FirstAttempt; })
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

bottomScaleAxis = d3.scaleLinear()
                      .domain([datesAxis[0], datesAxis[4]])
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
          .attr("fill","green")

svgDates.append("g")
        .style("transform","translate(0px,300px)")
        .call(bottomAxis)