$(function(){ //passing a functino into a $, don't want to run until document ready; also use document ready

  var table = $('table');
  var board = [];
  var players = [ 'x', 'o' ]; //array or players
  var current = 0;
  var msg = $('#msg');
  var whos_turn = $('#whos_turn'); //grabbing reference to the element
  var game_over = false;

  $('tr').each(function(){ // taking reach row of the table and pushing to board
    board.push($(this).find('td').toArray());
  });

  reset(); //reset function

  $('td').on('click', click); //calls click function
  $('#reset').on('click', reset); //create callback to reset the game, call reset function
  
  function click(){
    var el = $(this); //el stands for element
  
    if(game_over) return;
  
    if(el.text() !== '') return msg.text('already set'); //check element if there is space, if filled show already set
    
    msg.text(""); //refresh text if there is a legal move
  
    el.text(players[current]); //takes from array and sets current as x or o
  
    current = (current < players.length-1) ? current + 1 : 0; //if 0 go to 1 if 1 go to 0
  //is there still more room to increment through the array, if at end of array go to beginning
    whos_turn.text('player '+ (current+1)); //shows text of player one or two turn
  
    checkForWin();
  }

  function checkForWin(){ 
    // horizontal rows
    board.forEach(function(row){
      if(checkRow(row)) markRow(row);
    });
    
    // verticals
    transpose(board).forEach(function(row){ //transpose takes the columns and makes them rows
      if(checkRow(row)) markRow(row);
    });
    
    var diangle1 = [board[0][0], board[1][1], board[2][2] ];
    var diangle2 = [board[0][2], board[1][1], board[2][0] ];
    
    if(checkRow(diangle1)) markRow(diangle1);
    if(checkRow(diangle2)) markRow(diangle2);
    
  }
  
  function checkRow(row){
    var matches = 0
      , val = row[0].innerText;
    row.forEach(function(cell){
      if(cell.innerText === val) matches++;
    });
    
    return (matches === 3 && val);
  }
  
  function markRow(row){
    row.forEach(function(cell){
      $(cell).addClass('red'); //add css property to red
    });
    
    msg.text('player ' + ( players.indexOf(row[0].innerText) + 1 ) + ' wins!' );
    whos_turn.text("");
    game_over = true;
  }
  
  function transpose(rows){
    var board = [];
    for(var i = 0; i < rows[0].length; i++){
      var row = [rows[0][i]];
      for(var j = 1; j < rows.length; j++ ){
        row.push(rows[j][i]);
      }
      board.push(row);
    }
    return board;
  }
  
  
  function reset(){ //reset the whole game
    $('td').removeClass('red').text('');
    current = 0;
    msg.text('');
    whos_turn.text('player '+ (current+1));
    game_over = false;
  }

});

