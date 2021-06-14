var x,y,markG,lineRender, height, line;
// Manipulando os Dados
/*var data = [];

var t = 1;
var i = 0;

function addData() {
    t = t + 20;
    var ang = [0, Math.PI / 2, Math.PI, (3 * (Math.PI / 2))];

    data.push(
        {
            tempo: t,
            accel: Math.sin(ang[i]),
            mark: Math.random() < 0.3
        }
    );

    i++;

    if (i == 4) {
        i = 0;
    }
}*/

function realTimeLineChart(content) {
    // Definindo SVG
    var svgWidth = 1000, svgHeight = 600;
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };

    var quantidadeMin = 0;
    var quantidadeMax = 500;

    var width = svgWidth - margin.left - margin.right;
    height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select(content).append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)

    var g = svg.append('g')
        .attr("transform", "translate(" + margin.left + ',' + margin.top + ')');

    // Eixos
    x = d3.scaleLinear()
        .rangeRound([0, width]);

    y = d3.scaleLinear()
        .rangeRound([height, 0]);

    x.domain([quantidadeMin, quantidadeMax]);

    line = d3.line()
        .x(d => x(d.tempo))
        .y(d => y(d.accel))
        .curve(d3.curveMonotoneX);

    lineRender = g.append('path')
        .attr("fill", "None")
        .attr("stroke", "black")

    g.append('path')
        .attr("fill", "None")
        .attr("stroke", "black")
        .attr('d', `M 0 ${height / 2} L ${width} ${height / 2}`)

    g.append('path')
        .attr("fill", "None")
        .attr("stroke", "black")
        .attr('d', `M -10,0 L 0,0 0,${height} -10,${height}`)

    markG = g.append("g")

}

// Desenhando no SVG
function render(data) {
    /*if (data.length > 15) {
        data = data.slice(data.length - 15, data.length);
    }*/

    var mark = data.filter((d) => {
        return d.mark
    });


    var yData = data.map(function (element) {
        return element.accel;
    });

    var xData = data.map(function (element) {
        return element.tempo;
    });

    var maximo = d3.max([
        Math.abs(d3.max(yData)),
        Math.abs(d3.min(yData))
    ]);

    var maximoX = d3.max(xData);
    var minimoX = d3.min(xData);

    y.domain([-maximo, maximo]);
    x.domain([minimoX, maximoX]);

    // Exit Selection
    markG.selectAll("path")
        .data(mark)
        .exit()
        .remove()

    // Enter Selection
    markG.selectAll("path").data(mark)
        .enter()
        .append("path")
        .attr("stroke", "#74b9ff")
        .attr("stroke-width", "1.2px")

    // Update Selection
    markG.selectAll("path")
        .data(mark)
        .attr('d', (d) => {
            return `M ${x(d.tempo)},0 L ${x(d.tempo)},${height}`
        })

    lineRender
        .datum(data)
        .attr("stroke", "#c0392b")
        .attr("stroke-width", "2px")
        .attr("d", line.y(d => y(d.accel)))
}

//setInterval(addData, 200);
//setInterval(() => { render(data) }, 1100);
