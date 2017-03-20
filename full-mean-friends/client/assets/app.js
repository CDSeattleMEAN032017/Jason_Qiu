function formatDate(datestr) {
  var date=new Date(datestr)
  var monthNames = [
    "January", "February", "March","April", "May", "June", "July", "August", "September", "October","November", "December"];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour=date.getHours();
  if (hour<10){ hour='0'+hour};
  var min=date.getMinutes();
  if (min<10){ min='0'+min};
  var sec=date.getSeconds();
  var noon=''
  if(hour<12){
    hour=hour
    noon='am'
  } else{
    hour=hour-12
    noon='pm'
  }
  return  monthNames[monthIndex] + ' '+ day + ' ' + year;
}
var app = angular.module('myApp', ['ngRoute','ngCookies']);
app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!
$routeProvider
  .when('/',{
      templateUrl: '../partials/all.html',
  })
  .when('/friends/new',{
      templateUrl: '../partials/new.html',
  })
  .when('/friends/:friendid/edit',{
      templateUrl: '../partials/edit.html',
  })
  .when('/friends/:friendid',{
      templateUrl: '../partials/detail.html',
  })
  .otherwise({
    redirectTo: '/'
  });
});
