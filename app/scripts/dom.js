$(function(){
var sh = ($(window).height() - 425) / 2;
var cp = 0;
$('div.charmcontainer').css('margin-top',sh);
$('div img').each(function(index) { $(this).css('top',cp); cp += 85; });

$("div.hidden-bar").hover(
  function () {
    $('div.charmbar').stop().animate({ right: 0 },500);      
    $('div img').each(function(index){
        $(this).stop().delay(50*index).animate({ right: 0 },500);
    }); 
  });

$("div.charmbar").on('click', function () {
 
  $('div.charmbar').stop().animate({ right: '-85px'},500);
      $('div img').each(function(index){
          $(this).stop().delay(50*index).animate({ 
 right: '-85px' },500);
      });
  });
});

