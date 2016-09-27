
angular.module('ngBreakthrough', [])

  .controller('breakthroughCtrl', function($scope, $timeout) { 
    var RED = "Red", BLACK = "Black", BOARD_WIDTH = 8,
        selectedSquare = null;

    function Piece(player, x, y) {
      this.player = player;
      this.x = x;
      this.y = y;
      this.isChoice = false;
    }

    $scope.newGame = function() {
      $scope.player = RED;
      $scope.redScore = 0;
      $scope.blackScore = 0;

      $scope.board = [];
      for (var i = 0; i < BOARD_WIDTH; i++) {
        $scope.board[i] = [];
        for (var j = 0; j < BOARD_WIDTH; j++) {
          if ( (i === 0 ) || (i === 1) ) {
            $scope.board[i][j] = new Piece(BLACK, j, i);
          } else if ( (i === BOARD_WIDTH - 2) || (i === BOARD_WIDTH - 1) ){
            $scope.board[i][j] = new Piece(RED, j, i);
          } else {
            $scope.board[i][j] = new Piece(null, j, i);
          }
        }
      }
    }
    $scope.newGame();

    $scope.setStyling = function(square) {
      if (square.player === RED)
        return {"backgroundColor": "#FF0000"};
      else if (square.player === BLACK)
        return {"backgroundColor":"#A3A3A3"};
      return {"backgroundColor": "none"};
    }

    $scope.setClass = function(square) {
      if (square.y % 2 === 0) {
        if (square.x % 2 === 0) {
          return {"backgroundColor": square.isChoice ? "green" : "black"};
        } else {
          return {"backgroundColor": square.isChoice ? "green" : "white"};
        }
      } else {
        if (square.x % 2 === 1) {
          return {"backgroundColor": square.isChoice ? "green" : "black"};
        } else {
          return {"backgroundColor": square.isChoice ? "green" : "white"};
        }
      }
    }

    $scope.select = function(square) {
      if (selectedSquare !== null && !square.player) {
        movePiece(square);
        checkGameOver(square);      
        resetChoices();
      } else if (square.player === $scope.player) {
        selectedSquare = square;
        resetChoices();
        setChoices(selectedSquare.x, selectedSquare.y, []);
      } else {
        movePiece(square);
        checkGameOver(square);        
        resetChoices();
        selectedSquare = null;
      }
      console.log($scope.board);
    }

    function resetChoices() {
      // Reset Choices
      for (var i = 0; i < BOARD_WIDTH; i++) {
        for (var j = 0; j < BOARD_WIDTH; j++) {
          $scope.board[i][j].isChoice = false;
        }
      }
    }

    function movePiece(square) {
      if (square.isChoice) {
        square.player = selectedSquare.player;
        selectedSquare.player = null;
        $scope.player = $scope.player === RED ? BLACK : RED;
      }
    }


    function setChoices(x, y) {
      // Upper Choices
      if ($scope.player === RED) {
        // Upper Left
        if (x > 0 && y > 0) {
          var UP_LEFT = $scope.board[y-1][x-1];
          if (UP_LEFT.player ===RED) {/*Do nothing you have one of your pieces in front*/}
          else if (UP_LEFT.player ===BLACK){UP_LEFT.isChoice = true;} 
          else {
            UP_LEFT.isChoice = true;
          }
        }
        // Upper Middle
        if (x >= 0 && y > 0) {
          var UP_FRONT = $scope.board[y-1][x];
          if (UP_FRONT.player) {/*Do nothing you have a piece in front and cant take directly in front*/} 
          else {
            UP_FRONT.isChoice = true;
          }
        }        
        // Upper Right
        if (x < BOARD_WIDTH - 1 && y > 0) {
          var UP_RIGHT = $scope.board[y-1][x+1];
          if (UP_RIGHT.player ===RED) {/*Do nothing you have one of your pieces in front*/}
          else if (UP_RIGHT.player ===BLACK){UP_RIGHT.isChoice = true;} 
          else {          
            UP_RIGHT.isChoice = true;
          }
        }
      }
      // Lower Choices
      if ($scope.player === BLACK) {
        // Lower Left
        if (x > 0 && y < BOARD_WIDTH - 1) {
          var LOWER_LEFT = $scope.board[y+1][x-1];
          if (LOWER_LEFT.player ===BLACK) {/*Do nothing you have one of your pieces in front*/}
          else if (LOWER_LEFT.player ===RED){LOWER_LEFT.isChoice = true;}   
          else {
            LOWER_LEFT.isChoice = true;
          }
        }
        // Lower Middle
        if (x >= 0 && y < BOARD_WIDTH - 1) {
          var LOWER_FRONT = $scope.board[y+1][x];
          if (LOWER_FRONT.player) {/*Do nothing you have a piece in front and cant take directly in front*/} 
          else {
            LOWER_FRONT.isChoice = true;
          }
        }      
        // Lower Right
        if (x < BOARD_WIDTH - 1 && y < BOARD_WIDTH - 1) {
          var LOWER_RIGHT = $scope.board[y+1][x+1];
          if (LOWER_RIGHT.player ===BLACK) {/*Do nothing you have one of your pieces in front*/}
          else if (LOWER_RIGHT.player ===RED){LOWER_RIGHT.isChoice = true;}            
          else {
            LOWER_RIGHT.isChoice = true;
          }
        }
      }
    }

    function checkGameOver(square){
        if (square.player === RED && square.y == 0)
            {
              top.alert('Red wins');
              $scope.newGame();
            }
        if(square.player === BLACK && square.y == BOARD_WIDTH - 1)
            {
              top.alert('Black wins'); 
              $scope.newGame();
            } 
    }

  });
