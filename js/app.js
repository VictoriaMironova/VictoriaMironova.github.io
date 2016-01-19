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
/*------------------charts--------------------------*/
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
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