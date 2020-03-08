// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)





// get the data
d3.csv("/Reads.csv", function(data) {
    
    var barPadding = 10
    

    var optionsSN = data.map(d => d.SerialNumber)
    var optionSNunique = [...new Set(optionsSN)]
    var optionsTag = optionSNunique.map(d => {
        return `<option value="${d}">${d}</option>`
    })
    document.getElementById("selectSN").innerHTML = optionsTag
    

    d3.select("#selectSN")
        .on("change", (d,i) => {
            var sn = document.getElementById("selectSN").value
            console.log(sn)

            var filterSN = data.filter(data => data.SerialNumber == sn)
            var barWidth = (width / filterSN.length) - barPadding

            var labelYearMonth = filterSN.map( d => d.Month + " " + d.Year)

            var maxVolume = d3.max(filterSN, d => Number(d.Volume))

            
            var yScale = d3.scaleLinear()
                        .domain([0,maxVolume])
                        .range([height,0])

            var xScaleAxis = d3.scaleBand()
                                .domain(labelYearMonth)
                                .range([0, width])

            svg.selectAll("g").remove()
                
                                
            svg.append("g")
                .style("transform","translate(45px, 0)")
                .selectAll("rect")
                .data(filterSN)
                    .enter()
                    .append("rect")
                        .attr("x", (d,i) => i * (barWidth + barPadding))
                        .attr("y", d => height - yScale(Number(d.Volume)))
                        .attr("width", barWidth)
                        .transition()
                        .attr("height", d => yScale(Number(d.Volume)))
                        .attr("fill","steelblue")

            svg.append("g")
                .style("transform",`translate(${margin.left}px,0px)`)
                .call(d3.axisLeft(yScale))
            
            svg.append("g")
                .style("transform",`translate(${margin.left}px,${height}px)`)
                .call(d3.axisBottom(xScaleAxis))
    })

});