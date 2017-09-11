var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var CardValues = [];
  for (i=1; i<=8; i++){
    CardValues.push(i);
    CardValues.push(i);
  };

  var RandomizedValues = [];
  while (CardValues.length > 0){
    var randomIndex = Math.floor(Math.random() * CardValues.length);
    RandomizedValues.push(CardValues[randomIndex]);
    CardValues.splice(randomIndex,1);
  }
  return RandomizedValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = ['hsl(25,85%,65%)', 'hsl(55,85%,65%)', 'hsl(90,85%,65%)',
  'hsl(160,85%,65%)', 'hsl(220,85%,65%)', 'hsl(265,85%,65%)', 'hsl(310,85%,65%)',
  'hsl(360,85%,65%)'];

  $game.empty();
  $game.data('flips', [])
  for (i=0; i<cardValues.length;i++){
    $card = $('<div class="col-xs-3 card"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', colors[cardValues[i] - 1]);
    $game.append($card);
  }

  $('.card').click(function(){
    MatchGame.flipCard($(this), $('#game'));
  })
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped') == false && $game.data('flips').length < 2){
    $card.css('background-color', $card.data('color'));
    $card.text($card.data('value'));
    $card.data('flipped',true);
    $game.data('flips').push($card);

    if ($game.data('flips').length == 2){
      if ($game.data('flips')[0].data('value') == $game.data('flips')[1].data('value')){
        $game.data('flips')[0].css('background-color', 'rgb(153,153,153)');
        $game.data('flips')[1].css('background-color', 'rgb(153,153,153)');
        $game.data('flips', []);
      }
      else{
        setTimeout(function(){
          $game.data('flips')[0].css('background-color', 'rgb(32,64,86)');
          $game.data('flips')[1].css('background-color', 'rgb(32,64,86)');
          $game.data('flips')[0].text('');
          $game.data('flips')[1].text('');
          $game.data('flips')[0].data('flipped',false);
          $game.data('flips')[1].data('flipped',false);
          $game.data('flips', []);
        },1000)
      }
    }
  }
};
