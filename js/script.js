function getSoon(site) {
  var launchTime = new Date(2025, 0, 1, 23, 59); // Set launch: [year], [month], [day], [hour]...
  var raw = new XMLHttpRequest()
  raw.open('GET', 'https://chewedfeed.com/soon.json', false)
  raw.onreadystatechange = function() {
    if (raw.readyState === 4) {
      if (raw.status === 200 || raw.status !== 0) {
        var allText = raw.responseText;
        var json = JSON.parse(allText);
        var html = '';
        for (var i = 0; i < json.length; i++) {
          if (json[i].name === site) {
            var year = json[i].launchDate.year
            var month = json[i].launchDate.month
            var day = json[i].launchDate.day
            var newLaunch = new Date(year, month, day, 23, 59)

            if (newLaunch.getTime() < launchTime.getTime()) {
              launchTime = newLaunch
            }

            $("#countdown").countdown({
              until: launchTime,
              format: "odHMS"
            });
            $("#progressbar").animate({width: json[i].progress + "%"}, 2000);
            $("#progressAmount").text(json[i].progress + "%");
            $("#pageTitle").text(json[i].name + " Coming Soon");

            var a = document.createElement('div');
            a.innerHTML = json[i].fullDesc;
            $("#fullDesc").append(a)
          }
        }
      }
    }
  }
  raw.send(null);
}
