$(window).on('load',function(e) {
  if($('.downloads-chart').length > 0 ) {
    var monthData = JSON.parse($('#download-chart').attr('data-graph-points'))
    downloadChart({
      data: monthData.map(function(dayPair,index,monthData) {
        dayPair.date = Date.parse(dayPair.day)
        return dayPair
      }),
      margin: {top: 5, right: 40, bottom: 30, left: 20},
      width: 440,
      height: 100,
      el: '#download-chart',
      hasYAxis: false,
      dateKeyIndex: 0
    });
  };
    if($('.downloads-chart2').length > 0 ) {
    var monthData = JSON.parse($('#download-chart2').attr('data-graph-points'))
    downloadChart({
      data: monthData.map(function(dayPair,index,monthData) {
        dayPair.date = Date.parse(dayPair.day)
        return dayPair
      }),
      margin: {top: 5, right: 40, bottom: 30, left: 20},
      width: 440,
      height: 100,
      el: '#download-chart2',
      hasYAxis: false,
      dateKeyIndex: 0
    });
  }
})

function downloadChart(opts) {

  render(opts.data)

  // render d3 chart
  function render(data) {
    var margin = opts.margin,
        width = opts.width - margin.left - margin.right,
        height = opts.height - margin.top - margin.bottom,
        // formatters
        bisectDate = d3.bisector(function(d) { return d.date; }).left,
        formatValue = d3.format(',.0f'),
        // axis extents
        x = d3.time.scale().range([0, width]),
        y = d3.scale.linear().range([height, 0]);

    var area = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.downloads); });

    var svg = d3.select(opts.el).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var extent = d3.extent(data, function(d) { return d.downloads; });

    // make the extent of the y axis a bit larger than the data to leave space
    // at the bottom
    extent[0] -= Math.round(extent[0] / 6);

    x.domain([data[0].date, data[data.length - 1].date]);
    y.domain(extent);

    var xdom = d3.extent(data, function(d) { return d.date });

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(
            d3.svg.axis()
              .tickValues(d3.time.weeks(xdom[0], xdom[1], 1))
              .scale(x)
              .orient('bottom'));

    if(opts.hasYAxis) {

      svg.append("g")
          .attr("class", "y axis")
          .call(
            d3.svg.axis()
              .scale(y)
              .orient('left')
          )
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end");

    }

    svg.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', area);

    var focus = svg.append('g')
        .attr('class', 'focus')
        .style('display', 'none');

    focus.append('circle')
        .attr('r', 4.5);

    focus.append('text')
        .attr('x', 9)
        .attr('dy', '.35em');

    svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', function() { focus.style('display', null); })
        .on('mouseout', function() { focus.style('display', 'none'); })
        .on('mousemove', mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      focus.attr('transform', 'translate(' + x(d.date) + ',' + y(d.downloads) + ')');
      focus.select('text').text(formatValue(d.downloads));
    }
  }
}
