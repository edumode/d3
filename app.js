var quotes = [
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    year: 1800,
    rating: "PG-13"
  }, {
    quote: "May the force be with you.",
    movie: "Star Wars: Episode IV - A New Hope",
    year: 1850,
    rating: "PG"
  }, {
    quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "Dirty Harry",
    year: 1971,
    rating: "R"
  }, {
    quote: "You had me at 'hello.'",
    movie: "Jerry Maguire",
    year: 1200,
    rating: "R"
  }, {
    quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2800,
    rating: "G"
  },
  {
    quote: "It's necessary",
    movie: "Interstellar",
    year: 1700,
    rating: "PG"
  },
  {
    quote: "It's necessary",
    movie: "Interstellar",
    year: 1400,
    rating: "PG"
  }
];

var width = 500
var height = 300
var barPadding = 10
var numBars = quotes.length
var barWidth = width / numBars - barPadding

var maxYear = d3.max(quotes, d => d.year)
var minYear = d3.min(quotes, d => d.year)

var yScale = d3.scaleLinear()
                .domain([0, maxYear])//data
                .range([height, 0])//box size

var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height)
            .style("padding-left","50px")

var yAxis = d3.axisRight(yScale)

svg
  .append("g")
  .style("padding-left","-10px")
  .call(yAxis)

svg
  .selectAll("rect")
  .data(quotes)
    .enter()
    .append("rect")
      .attr("x", (d,i) => (barPadding + barWidth) * i)
      .attr("y", (d) => yScale(d.year))
      .attr("width", barWidth)
      .attr("height", d => height - yScale(d.year))
      .attr("fill", "green")
  

  


/*var ratesData = quotes.map(rates => 
  "<option value='"+ rates.rating +"'>"+ rates.rating + "</options>"
  )

var rates = [...new Set(ratesData)]

rates.push('<option value="all">All</option>')

document.getElementById("rates").innerHTML = rates

var colors = {
  "G": "green",
  "PG": "yellow",
  "PG-13": "orange",
  "R": "red"
}

var filterRates  =  quotes.filter(d => {
  return d.rating === document.getElementById("rates").value
})


var quotesList = d3.select("#quotes")
  .style("list-style", "none")
  

function enterData (data){
  quotesList
  .selectAll("li")
  .data(data)
  .enter()
  .append("li")
  .text(d => '"' + d.quote + '" - ' + d.movie + ' ('+ d.year +')')
    .style("margin", "20px")
    .style("padding","20px")
    .style("font-size", d => d.quote.length < 25 ? "2em" : "1em")
    .style("background-color", d => colors[d.rating])
    .style("border-radius", "20px")
}

enterData(quotes)
  
  d3.select("#rates")
    .on("change", () => {
      var rate = d3.select("#rates").property("value")

      var newData = quotes.filter(d => {
        return d.rating === rate
      })

  quotesList
  .selectAll("li")
  .data(newData, d => d.quote)
      .exit()
      .remove()
    
      
  if(rate === "all"){
    enterData(quotes)
  }else{
    enterData(newData)
  }
})

*/

