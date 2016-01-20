/**
 * Created by Viktoriia_Mironova on 1/19/2016.
 */
/*------------------profile-------------------------*/
var geninfo ='{"_id":"569e0c66c19174aa097ac038","index":0,"gender":"male","Firstname":"Fuentes","Lastname":"Woods","picture":"img/user_pic.png","status":"Online","email":"fuenteswoods@qimonk.com","phone":"+1 (998) 553-2893","servLoad":73,"storageLoad":38,"bandwidth":21,"messagesNew":6,"alertsNew":1,"mailsNew":27}';
var genData = JSON.parse(geninfo);
function loadProfile()
{
    $('.messages-new').html(genData.messagesNew);
    $('.alerts-new').html(genData.alertsNew);
    $('.user-action a span').html(genData.Firstname+' '+genData.Lastname);
    $('.welcome .user').html(genData.Firstname);
    $('.status span').html(genData.status);
    $('.status').addClass(genData.status);
    $('.user_profile-picture').attr('src',genData.picture);
    $('.mails-new').html(genData.mailsNew + ' New');

}
/*------------------Dashboard-----------------------*/
var dashinfo='{"newbook":"14.373","profit":"6.21.174","visitors":"814.321","pageviews":"1.37432"}';
var dashData=JSON.parse(dashinfo);
function loadDashboard()
{
    $('.new-book span').html(dashData.newbook);
    $('.profit span').html(dashData.profit);
    $('.visitors span').html(dashData.visitors);
    $('.page-views span').html(dashData.pageviews);
}
/*------------------panels--------------------------*/
    $('.collapse-icon').click(function(){
        $(this).find('.glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        $(this).parent().parent().find('.panel-content').toggle();
    })
    $('.remove').click(function(){
       $(this).parent().parent().parent().hide();
    })
/*-------------------files--------------------------*/
var fileinfo = '[{"FileName":"File_booking_details.jpg","Status":"Uploading","FileSize":"3","UploadSize":"1.4","UploadTime":"1","Speed":"1"},{"FileName":"File_booking_details1.jpg","Status":"Done","FileSize":"7","UploadSize":"7","UploadTime":"12","Speed":"0"}]';
var fileData=JSON.parse(fileinfo);
function loadFileUpload(){
    for (var i=0;i<fileData.length;i++)
    {
        var fileline='<div class="'+fileData[i].Status+'">';
        if (fileData[i].Status=='Uploading')
        {
            fileline+='<i class="fa fa-upload"></i>'+fileData[i].FileName+'<span>'+fileData[i].UploadSize+
            ' of '+fileData[i].FileSize+' MB - '+fileData[i].UploadTime+'min - '+fileData[i].Speed+'MB/sec</span>';

            fileline+='<div class="progress"><div class="progress-bar result-upload" role="progressbar" aria-valuenow="'+fileData[i].UploadSize/fileData[i].FileSize+'" aria-valuemin="0" aria-valuemax="100" style="width: '+(fileData[i].UploadSize/fileData[i].FileSize)*100+'%;"></div></div>'
        }
        else
        {
            fileline+='<i class="fa fa-check"></i>'+fileData[i].FileName+'<span>'+fileData[i].UploadSize+
                ' MB - '+fileData[i].UploadTime+'min - Stopped</span>';
        }
        fileline+='</div>';
        $('.fileUpload').append(fileline);
    }
}
/*------------------support-------------------------*/
var supportinfo = '[{"Firstname":"John","Lastname":"Smith","picture":"img/user_pic.png","Status":"Offline","Message":"Dashboard error . Look at the issuse"},' +
    '{"Firstname":"Ivan","Lastname":"Pertov","picture":"img/user_pic.png","Status":"Online","Message":"Mobile application error , look after the problems and do rectify it"},' +
    '{"Firstname":"Mykola","Lastname":"Sidorov","picture":"img/user_pic.png","Status":"Offline","Message":"server error occured. file cannot be transferred. please check the issue as soon as possible"}]';
var supportData=JSON.parse(supportinfo);
function loadSupport(){
    for (var i=0;i<supportData.length;i++)
    {
        var supportLine='<tr><td><img src="'+supportData[i].picture+'"><span class="'+supportData[i].Status+'"></span></td><td>'+supportData[i].Message+'</td></tr>';
        $('.TechSupport table').append(supportLine);
    }
}
/*------------------charts--------------------------*/
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawLines);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Server', 'Load'],
        ['Busy',     genData.servLoad],
        ['Free',     100-genData.servLoad],
    ]);

    var options = {
        pieHole: 0.8,
        pieSliceText: 'none',
        legend: 'none',
        backgroundColor: '#f9f9f9',
        chartArea:{top:13,width:'85%', height:'85%'},
        slices: {
            0: { color: '#4d7496' },
            1: { color: '#eae8e8' }
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('system-chart'));
    chart.draw(data, options);
    $('.system-load-res').html(genData.servLoad+ '%');
    $('.result-storage').attr('aria-valuenow',genData.storageLoad);
    $('.result-storage').width(genData.storageLoad+'%');
    $('.result-storage-legend span').html(genData.storageLoad+'%');
    $('.result-bandwidth').attr('aria-valuenow',genData.bandwidth);
    $('.result-bandwidth').width(genData.bandwidth+'%');
    $('.result-bandwidth-legend span').html(genData.bandwidth+'%');
}


var chartdata=[
    ['Date', 'Visites'],
    ['12 Oct',  10],
    ['13 Oct',  12],
    ['14 Oct',  17],
    ['15 Oct',  23],
    ['15 Oct',  22],
    ['15 Oct',  27],
]
function drawLines() {
    var data = google.visualization.arrayToDataTable(chartdata);
    var options = {
        backgroundColor: '#1d89cf',
        colors:['FFFFFF'],
        legend:'none',
        point: {visible: true},
        pointSize: 10,
        hAxis: {
            baselineColor: '#FFFFFF',
            titleTextStyle: {color: '#FFFFFF'},
            gridlines: {color: '#FFFFFF', count:4},
            textStyle:{color: '#FFFFFF'},
            baseline:{color: '#FFFFFF'},
        },
        vAxis: {
            baselineColor: '#FFFFFF',
            gridlines: {color: '#FFFFFF', count:4},
            textStyle:{color: '#FFFFFF'},
            baseline:{color: '#FFFFFF'},
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart-block'));
    chart.draw(data, options);
}
var trafficinfo ='{"date":"12 October 2015","UniqueUsers":20,"BounceRate":32,"PagesView":48}';
var trafficData = JSON.parse(trafficinfo);
google.charts.setOnLoadCallback(drawTraffic);
function drawTraffic() {
    var data = google.visualization.arrayToDataTable([
        ['Type', 'Percents'],
        ['Unique Users',     trafficData.UniqueUsers],
        ['Bounce Rate',      trafficData.BounceRate],
        ['Page Views',  trafficData.PagesView],
    ]);

    var options = {
        title: trafficData.date,
        pieHole: 0.6,
        legend: {position:'labeled'},
        chartArea:{top:43,width:'90%', height:'80%'},
        titleTextStyle: {color:'#e06d6a'},
        pieSliceText: 'none'

    };

    var chart = new google.visualization.PieChart(document.getElementById('chart-traffic'));
    chart.draw(data, options);
}