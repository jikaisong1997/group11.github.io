/**
 * Contains functionality responsible for extracting csv covid-19 data.
 */

var arrTotalInfected, arrTotalDeceased, arrTotalRecovered;


var infected_by_countries_and_dates = [[],[],[]];
var dates=[];


//Files
//Retrieved from CSSE JHU
//https://github.com/CSSEGISandData/COVID-19
const infected = 'data/time_series_covid19_confirmed_global.csv';
const deceased = 'data/time_series_covid19_deaths_global.csv';
const recovered = 'data/time_series_covid19_recovered_global.csv'; 

async function getDataFromFiles()
{
    //fetch infected
    const responseInfected = await fetch(infected);
    const dataInfected = await responseInfected.text();

    //fetch deceased
    const responseDeceased = await fetch(deceased);
    const dataDeceased = await responseDeceased.text();

    //fetch recovered
    const responseRecovered = await fetch(recovered);
    const dataRecovered = await responseRecovered.text();

    //split lines and delete headers (no data)
    var rowsInfected = dataInfected.split('\n');
    dates = rowsInfected[0].split(',').splice(4);
    rowsInfected = rowsInfected.splice(1);
    var rowsDeceased = dataDeceased.split('\n').splice(1);
    var rowsRecovered = dataRecovered.split('\n').splice(1);
    
    //init arrays (date columns start at idx 4)
    const dateIdxOffset = 4;
    const numDates = rowsInfected[0].split(',').length - dateIdxOffset;

    arrTotalInfected = new Array(numDates).fill(0);

    arrTotalDeceased = new Array(numDates).fill(0);
    arrTotalRecovered = new Array(numDates).fill(0);




    for(ii = 0; ii < rowsInfected.length; ii++) //cycle rows
    {
        //new row for the matrix

        //split columns (delim=',' but keep commas inside quoted elements)
        var currRowInfected = rowsInfected[ii].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        infected_by_countries_and_dates[0].push(currRowInfected)
        // console.log(currRowInfected)
        var currRowDeceased = [];
        if(rowsDeceased[ii] != undefined)
        {
            currRowDeceased = rowsDeceased[ii].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            infected_by_countries_and_dates[1].push(currRowDeceased)
        }

        var currRowRecovered = [];
        if(rowsRecovered[ii] != undefined)
        {
            currRowRecovered = rowsRecovered[ii].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            infected_by_countries_and_dates[2].push(currRowRecovered)
        }
                //cycle dates
        for(jj = dateIdxOffset; jj < currRowInfected.length; jj++)
        {
            //add to totals
            arrTotalInfected[jj-dateIdxOffset] += parseInt(currRowInfected[jj]);

            if(currRowDeceased[jj] != undefined)
            {
                arrTotalDeceased[jj-dateIdxOffset] += parseInt(currRowDeceased[jj]);
            }

            if(currRowRecovered[jj] != undefined)
            {
                arrTotalRecovered[jj-dateIdxOffset] += parseInt(currRowRecovered[jj]);
            }

        }
    }
}
