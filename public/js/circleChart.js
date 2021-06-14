var arc, arc2, CM, CMText,pie, path, path2;

function cicleChart(content) {
    // Data
    var angulo = 270;
    var data = [0, 360, 0];

    // SVG
    var svgWidth = 1000, svgHeight = 600;
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select(content).append('svg')
        .attr('width', width)
        .attr('height', height);

    // Dois Gráficos de Setores

    var colors = ["#7bed9f", "None", "#7bed9f"];
    var color = d3.scaleOrdinal()
        .domain([0, 1, 2])
        .range(colors);

    var g = svg.append("g")
        .style('transform', 'translate(50%, 50%)')

    pie = d3.pie().sort(null).value(
        d => d
    );

    // Gráfico de Setores Maior
    var radius = height / 2.7;

    path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

    var pre = [[0, 0], [0, 2 * Math.PI], [2 * Math.PI, 2 * Math.PI]]

    arc.append("path")
        .each(function (d, i) { this._current = { startAngle: pre[i][0], endAngle: pre[i][1] }; })
        .attr("d", path)
        .attr("stroke", "black")
        .attr("fill", "None")

    // Gráfico de Setores Menor    
    arc2 = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

    path2 = d3.arc()
        .outerRadius(radius / 4)
        .innerRadius(0);

    arc2.append("path")
        .each(function (d, i) { this._current = { startAngle: pre[i][0], endAngle: pre[i][1] }; })
        .attr("d", path2)
        .attr("class", "circuloMenor")
        .attr("fill", function (d, i) {
            console.log(i);
            return color(i);
        })
        .style("border", "None");

    // Triângulo 
    var triangle = svg.append("polyline")
        .attr("points", "100,100 200,100 150,150 100,100")
        .attr("fill", '#6699FF')
        .attr("stroke", '#6699FF')

    triangle.attr("transform", "translate(" + [width / 2 - 150, - 100] + ")")

    // Semicírculo
    const arcGenerator = d3.arc()
        .outerRadius(30)
        .innerRadius(0)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2);

    // Centro de Massa
    CM = svg.append("g")
        .attr("transform", "translate(" + ((width / 2)) + "," + (height / 2) + ")")
        .append("g")

    CM.append("path")
        .attr('transform', 'translate(0,' + -radius + ')')
        .attr("d", arcGenerator())
        .attr("fill", '#FFCC00');

    var CMin = CM.append("g")
        .attr('transform', 'rotate(180)')
        .append("g")
        .attr("transform", "translate(" + (0) + "," + (-100) + ")");

    CMin.append("rect")
        .attr("x", -5)
        .attr("y", 50)
        .attr("width", 10)
        .attr("height", 50)
        .attr("fill", "gray")
        .attr("stroke", 'gray')
        .attr("stroke-width", 1);

    CMin.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .attr("fill", "#E6E7E8")

    CMText = CMin.append("g")

    CMText.append("text")
        .text("CM")
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "black")
        .attr("font-size", 40)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")

}

function changeAngle(ang) {
    data = ang < 180 ? [ang, 360 - ang, 0] : [0, ang, 360 - ang];

    arc.data(pie(data))
        .select("path")
        .transition().duration(1000)
        .attrTween("d", function (d) {
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return path(interpolate(t));
            };
        });

    arc2.data(pie(data))
        .select("path")
        .transition().duration(1000)
        .attrTween("d", function (d) {
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return path2(interpolate(t));
            };
        });

    ang = ang > 180 ? ang - 360 : ang;

    CM.transition().duration(500)
        .attr('transform', 'rotate(' + ang + ')');

    CMText.transition().duration(1000)
        .attr('transform', 'rotate(' + (180 - ang) + ')');
}

//changeAngle(90);