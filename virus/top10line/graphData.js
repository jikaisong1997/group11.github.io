// https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv

function readData(file, id) {
  d3.csv(file).then((data) => graph(data, id))
}

function graph(data, id) {
  const numCountries = 10
  let width = window.innerWidth - 300
  let height = window.innerHeight - 300

  const dates = Object.keys(data[0])
    .map((date) => new Date(date).getTime())
    //.filter((date) => !isNaN(date)) =
    .filter(Boolean)
  console.log(dates)

  const startDate = new Date(Math.min(...dates))
  const endDate = new Date(Math.max(...dates))
  console.log('End Date ', endDate)

  const lastDate =
    endDate.getMonth() + // month numbers are zero based jan=0
    1 +
    '/' +
    endDate.getDate() +
    '/' +
    (endDate.getFullYear() + '').slice(-2) // convert to string
  console.log(lastDate)
  console.log(data[0][lastDate])

  data.sort((a, b) => (parseInt(a[lastDate]) < parseInt(b[lastDate]) ? 1 : -1))

  data = data.slice(0, numCountries)
  console.log('data', data)

  // structure data for graphing
  const casesData = data.map((d) =>
    Object.entries(d)
      .filter((e) => new Date(e[0]).getTime())
      .map((e) => [new Date(e[0]).getTime(), parseInt(e[1])])
  )

  console.log('cases Data:', casesData)

  // find max cases
  const cases = casesData.flatMap((p) => p.map((c) => c[1]))
  const maxCases = Math.max(...cases)
  console.log('Max cases:', maxCases)

  // create graph axes

  const xScale = d3.scaleTime().domain([startDate, endDate]).range([0, width])

  const yScale = d3.scaleLinear().domain([0, maxCases]).range([height, 0])

  let svg = d3
    .select(id)
    .append('svg')
    .attr('width', width + 50)
    .attr('height', height + 50)
    .attr('transform', 'translate(50,50)')

  svg
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))

  svg
    .append('g')
    .attr('id', 'yAxis')
    .attr('transform', 'translate(0, 0)')
    .call(d3.axisRight(yScale))

  //turn data into lines on graph
  svg.append("circle").attr("cx",100).attr("cy",30).attr("r", 6).style("fill", "#4e79a7")
  svg.append("circle").attr("cx",100).attr("cy",300).attr("r", 6).style("fill", "#f28e2c")
  svg.append("circle").attr("cx",100).attr("cy",60).attr("r", 6).style("fill", "#e15759")
  svg.append("circle").attr("cx",100).attr("cy",90).attr("r", 6).style("fill", "#76b7b2")
  svg.append("circle").attr("cx",100).attr("cy",120).attr("r", 6).style("fill", "#59a14f")
  svg.append("circle").attr("cx",100).attr("cy",150).attr("r", 6).style("fill", "#edc949")
  svg.append("circle").attr("cx",100).attr("cy",180).attr("r", 6).style("fill", "#af7aa1")
  svg.append("circle").attr("cx",100).attr("cy",210).attr("r", 6).style("fill", "#ff9da7")
  svg.append("circle").attr("cx",100).attr("cy",240).attr("r", 6).style("fill", "#9c755f")
  svg.append("circle").attr("cx",100).attr("cy",270).attr("r", 6).style("fill", "#bab0ab")

  svg.append("text").attr("x", 120).attr("y", 30).text("US").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 120).attr("y", 60).text("India").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 120).attr("y", 90).text("Brazil").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 120).attr("y", 120).text("France").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 120).attr("y", 150).text("United kingdom").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 120).attr("y", 180).text("Russia").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 120).attr("y", 210).text("Germany").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 120).attr("y", 240).text("Turkey").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 120).attr("y", 270).text("Italy").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 120).attr("y", 300).text("Spain").style("font-size", "15px").attr("alignment-baseline","middle")


  
  const makeLine = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))

  // color lines
  const colors = d3
    .scaleOrdinal()
    .domain([0, numCountries])
    .range(d3.schemeTableau10)

  svg
    .append('g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('id', (d, i) => d['Country/Region'])
    .style('fill', 'none')
    .attr('stroke-width', '3')
    // .attr('stroke-linecap', 'round')
    .attr('stroke', (d, i) => colors(i))
    .attr('d', (d, i) => makeLine(casesData[i]))

  // create tooltip

  let tooltip = d3.select('div.tooltip')

  casesData.forEach(function (country, i) {
    svg
      .append('g')
      .selectAll('circle')
      .data(country)
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('cx', (d) => xScale(d[0]))
      .attr('cy', (d) => yScale(d[1]))
      .attr('fill', colors(i))
      .on('mouseover', function () {
        tooltip
          .html(data[i]['Country/Region'])
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 30 + 'px')
          .style('visibility', 'visible')
      })
      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden')
      })
  })
}
