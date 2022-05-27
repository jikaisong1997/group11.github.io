
async function drawBar() {
    let data = await d3.json("nation.json")
 
     data = data['body']
    
         
    
     const newData = data.filter(d => {
         return d
     })
     console.log(newData)

     const lineArray = []
     for (let i =0; i < newData.length; i++) {
       lineArray.push(_.pick(newData[i], ['date', 'cumPeopleVaccinatedFirstDoseByPublishDate']))
     }

     const lineArray2 = []
     for (let i =0; i < newData.length; i++) {
       lineArray2.push(_.pick(newData[i], ['date', 'cumPeopleVaccinatedSecondDoseByPublishDate']))
     }
 
     console.log(lineArray2)
 
      // Set up date parsing function
     const dateParser = d3.timeParse('%Y-%m-%d')
     let formatTime = d3.timeFormat("%B %d %Y");
     let numberFormatter = d3.format(",.4r") 
     
     // Createaccessor functions
     const xAccessor = d => dateParser(d.date)
     const yAccessor = d => d.cumPeopleVaccinatedFirstDoseByPublishDate
     const y2Accessor = d => d.cumPeopleVaccinatedSecondDoseByPublishDate
     const rollAverage = d => d.Administered_7_Day_Rolling_Average
 
     // Set dimensions
     const width = 900
     const dimensions = {
         width,
         height: 400,
         margins: {
             top: 60, 
             bottom: 40, 
             left: 30, 
             right: 10
         } 
     }
     dimensions.boundedHeight = dimensions.height 
         - dimensions.margins.top
         - dimensions.margins.top
     dimensions.boundedWidth = dimensions.width 
         - dimensions.margins.left
         - dimensions.margins.right
 
     // Create wrapper
     const wrapper = d3.select("#chart-area").append("svg")
         .attr("height", dimensions.height)
         .attr("width", dimensions.width)
 
     // Create bounds
     const bounds = wrapper.append('g')
         .style("transform", `translate(${dimensions.margins.left}px, ${dimensions.margins.top}px)`)
         
     // Create scales
     const xScale = d3.scaleTime()
         .domain(d3.extent(data, xAccessor))
         .range([0, dimensions.boundedWidth])
         
     const yScale = d3.scaleLinear()
         .domain(d3.extent(data, yAccessor))
         .range([dimensions.boundedHeight, 0])
         .nice()
 
    // Create axes generators and axes
    const xAxisGenerator = d3.axisBottom(xScale)
         .ticks(5)
         .tickSizeOuter(0)
         .tickFormat(d3.timeFormat("%m-%Y"))
 
     const xAxis = bounds.append("g")
         .attr("class", "x-axis")
         .style("transform", `translate(0, ${dimensions.boundedHeight}px)`)
         .call(xAxisGenerator)
 
     const yAxisGenerator = d3.axisLeft(yScale)
         .ticks(3)
         .tickFormat(d3.format(".1s"))
         .tickSize(-dimensions.boundedWidth)
     const yAxis = bounds.append("g")
         .attr("class", "y-axis")
         .call(yAxisGenerator)
         .select(".domain").remove()
 
     // Create tooltip
     const chartTip = d3.tip()
     .attr("class", "d3-tip")
     .html(d => {
         let chartText = `<strong><p id="date">${formatTime(xAccessor(d))}</strong></p><br>`
         chartText += `<p id="number">Vaccinations: ${numberFormatter(yAccessor(d))}</p>`
         return chartText
     })
     bounds.call(chartTip)
 
     // Draw bars
     const rects = bounds.selectAll('rect')
         .data(newData)
     
     rects.exit().remove()

     const rects2 = bounds.selectAll('rect')
     .data(newData)
 
    rects2.exit().remove()

 
    rects.enter()
         .append("rect")
         .attr("x", d => xScale(xAccessor(d)))
         .attr("y", d => yScale(yAccessor(d)))
         .attr("width", "5px")
         .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
         .attr("fill", "#99d1b3")
         .on("mouseover", chartTip.show)
         .on("mouseleave", chartTip.hide)

         rects2.enter()
         .append("rect")
         .attr("x", d => xScale(xAccessor(d)))
         .attr("y", d => yScale(y2Accessor(d)))
         .attr("width", "5px")
         .attr("height", d => dimensions.boundedHeight - yScale(y2Accessor(d)))
         .attr("fill", "#003333")
         .on("mouseover", chartTip.show)
         .on("mouseleave", chartTip.hide)
    
         // Draw averge line
     // const lineGenerator = d3.line()
     //     .x(d => xScale(xAccessor(d)))
     //     .y(d => yScale(rollAverage(d)))
 
     // const line = bounds.append('path')
     //     .attr("d", lineGenerator(lineArray))
     //     .attr("fill", "none")
     //     .attr("stroke", "black")
 
     // const circles = bounds.selectAll('circle')
     //     .data(newData)
 
     // circles.exit().remove()
 
     // circles.enter()
     // .append('circle')
     //     .attr("cx", d => xScale(xAccessor(d)))
     //     .attr("cy", d => yScale(rollAverage(d)))
     //     .attr("r", 3)
 
     const chartTitle = wrapper.append("text")
         .attr("class", "title-text")
         .attr("x", 12)
         .attr("y", 20)
         .text("Cumulative doses per day")
 
     const chartSubtitle = wrapper.append("text")
         .attr("x", 12)
         .attr("y", 40)
         .attr("opacity", "0.6")
         .text("First and Second dose rollout has accelerated since late February")
         
 }
 async function drawBar2() {
    let data = await d3.json("nation.json")
 
     data = data['body']
    
         
    
     const newData = data.filter(d => {
         return d
     })
     console.log(newData)

     const lineArray = []
     for (let i =0; i < newData.length; i++) {
       lineArray.push(_.pick(newData[i], ['date', 'newDeaths28DaysByPublishDate']))
     }
 
      // Set up date parsing function
     const dateParser = d3.timeParse('%Y-%m-%d')
     let formatTime = d3.timeFormat("%B %d");
     let numberFormatter = d3.format(",.4r") 
     
     // Createaccessor functions
     const xAccessor = d => dateParser(d.date)
     const yAccessor = d => d.newDeaths28DaysByPublishDate
 
     // Set dimensions
     const width = 900
     const dimensions = {
         width,
         height: 400,
         margins: {
             top: 60, 
             bottom: 40, 
             left: 30, 
             right: 10
         } 
     }
     dimensions.boundedHeight = dimensions.height 
         - dimensions.margins.top
         - dimensions.margins.top
     dimensions.boundedWidth = dimensions.width 
         - dimensions.margins.left
         - dimensions.margins.right
 
     // Create wrapper
     const wrapper = d3.select("#chart-area").append("svg")
         .attr("height", dimensions.height)
         .attr("width", dimensions.width)
 
     // Create bounds
     const bounds = wrapper.append('g')
         .style("transform", `translate(${dimensions.margins.left}px, ${dimensions.margins.top}px)`)
         
     // Create scales
     const xScale = d3.scaleTime()
         .domain(d3.extent(data, xAccessor))
         .range([0, dimensions.boundedWidth])
         
     const yScale = d3.scaleLinear()
         .domain(d3.extent(data, yAccessor))
         .range([dimensions.boundedHeight, 0])
         .nice()
 
    // Create axes generators and axes
    const xAxisGenerator = d3.axisBottom(xScale)
         .ticks(5)
         .tickSizeOuter(0)
         .tickFormat(d3.timeFormat("%m-%Y"))
 
     const xAxis = bounds.append("g")
         .attr("class", "x-axis")
         .style("transform", `translate(0, ${dimensions.boundedHeight}px)`)
         .call(xAxisGenerator)
 
     const yAxisGenerator = d3.axisLeft(yScale)
         .ticks(3)
         .tickFormat(d3.format(".1s"))
         .tickSize(-dimensions.boundedWidth)
     const yAxis = bounds.append("g")
         .attr("class", "y-axis")
         .call(yAxisGenerator)
         .select(".domain").remove()
 
     // Create tooltip
     const chartTip = d3.tip()
     .attr("class", "d3-tip")
     .html(d => {
         let chartText = `<strong><p id="date">${formatTime(xAccessor(d))}</strong></p><br>`
         chartText += `<p id="number">Death number: ${numberFormatter(yAccessor(d))}</p>`
         return chartText
     })
     bounds.call(chartTip)
 
     // Draw bars
     const rects = bounds.selectAll('rect')
         .data(newData)
     
     rects.exit().remove()

 
    rects.enter()
         .append("rect")
         .attr("x", d => xScale(xAccessor(d)))
         .attr("y", d => yScale(yAccessor(d)))
         .attr("width", "5px")
         .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
         .attr("fill", "#800026")
         .on("mouseover", chartTip.show)
         .on("mouseleave", chartTip.hide)
 
     const chartTitle = wrapper.append("text")
         .attr("class", "title-text")
         .attr("x", 12)
         .attr("y", 20)
         .text("New death per day")
 
     const chartSubtitle = wrapper.append("text")
         .attr("x", 12)
         .attr("y", 40)
         .attr("opacity", "0.6")
         .text("Deaths began to show a downward trend during the start of vaccination")

 }
 drawBar()
 drawBar2()

         const vaccinatingSecondsPerDay = 28800; // 8 hours: 9am-5pm

        /**
         * @param num {number}
         * @returns {string}
         */
         const fmt = (num) => num.toFixed(0).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');

        /**
         * @param days {number}
         * @returns {string}
         */
        const daysAgo = (days) => new Date(new Date().getTime() - 86400000 * days).toISOString().slice(0, 10);

        /**
         * @param value {number}
         * @param min {number}
         * @param max {number}
         * @returns {number}
         */
        const bound = (value, min, max) => value < min ? min : (value > max ? max : value);
        
        /**
         * @param key {"firstDoses" | "secondDoses"}
         * @param data {{ date: string, firstDoses: number, secondDoses: number, firstDosesC: number, secondDosesC: number }[]}
         * @returns {number} The interval updating the stat
         */
        const predict = (key, data) => {
            /** @type {{ [date: string]: string }} */
            const dayDoses = {};
            data.forEach(d => dayDoses[d.date] = d[key]);

            if (!(daysAgo(1) in dayDoses) && !(daysAgo(2) in dayDoses && daysAgo(8) in dayDoses && daysAgo(9) in dayDoses)) return basicPredict(key, data);
            if (!(daysAgo(7) in dayDoses && daysAgo(8) in dayDoses)) return basicPredict(key, data);
            if (!(daysAgo(2) in dayDoses)) return basicPredict(key, data);

            dayDoses[daysAgo(1)] = dayDoses[daysAgo(1)] != undefined ? dayDoses[daysAgo(1)] : dayDoses[daysAgo(2)] * bound(dayDoses[daysAgo(8)] / dayDoses[daysAgo(9)], 0.5, 1.1);
            dayDoses[daysAgo(0)] = dayDoses[daysAgo(1)] * bound(dayDoses[daysAgo(7)] / dayDoses[daysAgo(8)], 0.5, 1.1);
            
            const rate = dayDoses[daysAgo(0)] / vaccinatingSecondsPerDay;
            
            const vaccinesAtStartOfToday = data.find(d => d.date == daysAgo(2))[key + 'C'] + dayDoses[daysAgo(1)];
            const startOfToday = new Date(new Date().toISOString().slice(0, 10)); // midnight
            const startOfVaccinationTodayMs = startOfToday.getTime() + 32400000 // 9am;
            const elem = document.getElementById(key);

            return setInterval(() => {
                const now = new Date().getTime()
                if (startOfVaccinationTodayMs > now) {
                    elem.textContent = fmt(vaccinesAtStartOfToday);
                } else if (now > startOfVaccinationTodayMs + vaccinatingSecondsPerDay * 1000) {
                    elem.textContent = fmt(vaccinesAtStartOfToday + rate * vaccinatingSecondsPerDay);
                } else {
                    elem.textContent = fmt(vaccinesAtStartOfToday + rate * (new Date().getTime() - startOfVaccinationTodayMs) / 1000);
                }
            }, 50);
        }

        /**
         * @param key {"firstDoses" | "secondDoses"}
         * @param data {{ date: string, firstDoses: number, secondDoses: number, firstDosesC: number, secondDosesC: number }[]}
         * @returns {number} The interval updating the stat
         */
        const basicPredict = (key, data) => {
            const start = data[1];
            const end = data[0];

            // Determine the rate per second
            const days = Math.round((new Date(end.date).getTime() - new Date(start.date).getTime()) / 86400000);
            const rate = (end[key + 'C'] - start[key + 'C']) / (days * vaccinatingSecondsPerDay);

            const startOfToday = new Date(new Date().toISOString().slice(0, 10)); // midnight
            const daysSinceLastStat = Math.round((startOfToday.getTime() - new Date(end.date).getTime()) / 86400000) - 1; // days of vaccination, as stats are end of
            
            const vaccinesAtStartOfToday = end[key + 'C'] + daysSinceLastStat * rate * vaccinatingSecondsPerDay;
            const startOfVaccinationTodayMs = startOfToday.getTime() + 32400000 // 9am;
            const elem = document.getElementById(key);

            return setInterval(() => {
                const now = new Date().getTime()
                if (startOfVaccinationTodayMs > now) {
                    elem.textContent = fmt(vaccinesAtStartOfToday);
                } else if (now > startOfVaccinationTodayMs + vaccinatingSecondsPerDay * 1000) {
                    elem.textContent = fmt(vaccinesAtStartOfToday + rate * vaccinatingSecondsPerDay);
                } else {
                    elem.textContent = fmt(vaccinesAtStartOfToday + rate * (new Date().getTime() - startOfVaccinationTodayMs) / 1000);
                }
            }, 50);
        }

        fetch('https://coronavirus.data.gov.uk/api/v1/data?filters=date%3E=' + daysAgo(9) + ';areaType=overview&structure=%7B%22date%22:%22date%22,%22firstDoses%22:%22newPeopleVaccinatedFirstDoseByPublishDate%22,%22secondDoses%22:%22newPeopleVaccinatedSecondDoseByPublishDate%22,%22firstDosesC%22:%22cumPeopleVaccinatedFirstDoseByPublishDate%22,%22secondDosesC%22:%22cumPeopleVaccinatedSecondDoseByPublishDate%22%7D&format=json')
            .then(res => res.json())
            .catch(err => { throw new Error('Could not get the latest data. Please try again later.') })
            .then(body => {
                if (body.data.length < 2) throw new Error('Not enough data available to make predictions at the moment.');

                predict('firstDoses', body.data);
                predict('secondDoses', body.data);

                // Reload after an hour to ensure our stats are up to date
                setTimeout(() => location.reload(), 3600000);
            })
            .catch(err => {
                document.getElementById('stats').style.display = 'none';
                document.getElementById('error').style.display = '';
                document.getElementById('error').textContent = err;
            });