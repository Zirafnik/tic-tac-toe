const display= (function() {

    const _DOMElements= {
        getContainer: function(){
            return document.querySelector('#container');
        },
        getChildren: function() {
            return document.querySelectorAll('.child');
        }
    }

    const _createMarkerSpot= (marker) => {
        let markerSpot= document.createElement('div');
        markerSpot.textContent= marker;
        markerSpot.classList.add('child');
        _DOMElements.getContainer().appendChild(markerSpot);
    }

    const populateGrid= () => {
        gameRules.getGameboard().forEach(element => {
            _createMarkerSpot(element);
        });
    }

    /*
    const _changeMarker = function(){ 
            return function(e) {
                e.target.textContent= player.sign;
                
                //save changes to gameboard == updates gameboard
                gameRules.clearGameboard();
                _DOMElements.getChildren().forEach(child => gameRules.getGameboard().push(child.textContent));

                gameRules.turnCompletionCheck= true;
            }
        }   
    }
*/

    //EVENT LISTENERS
    const changeTurns = () => {
        let player= gameRules.whoseTurn();

        //delete all old listeners == replace old node with clone node
        _DOMElements.getChildren().forEach(child => {
            let childClone= child.cloneNode(true);
            child.parentNode.replaceChild(childClone, child);
        });

        _DOMElements.getChildren().forEach(child => child.addEventListener('click', function(e) {
                console.log('added event listener ' + player.sign);
                e.target.textContent= player.sign;
                
                //save changes to gameboard == updates gameboard
                gameRules.clearGameboard();
                _DOMElements.getChildren().forEach(child => gameRules.getGameboard().push(child.textContent));

                gameRules.turnOverCheck= true;
        }));
    }

    return {
        populateGrid,
        changeTurns
    }
})();

/*
function PlayerFactory(number) {
    let name= 'Player ' + number;
    let sign= '';
    if(number==1) {
        sign= 'X';
    } else {
        sign= 'O';
    }

    return {
        name,
        sign,
    }
}
*/

const Players = {
    P1: {name: 'Player 1', sign: 'X'},
    P2: {name: 'Player 2', sign: 'O'}
}

const gameRules= (function() {
    let _gameboard= 
    ['', '', '',
     '', '' ,'' ,
     '' ,'' ,''];

    const getGameboard= () => {
        return _gameboard;
    }

    const clearGameboard= () => {
        return _gameboard=[];
    }

    const _winConditions= [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];

    const checkWinCoditions= () => {

        let board= getGameboard();
        _winConditions.forEach(arr => {
            if(board[arr[0]]!='' && board[arr[0]]==board[arr[1]] && board[arr[1]]==board[arr[2]]) {
                if(board[arr[0]]=='X') {
                    console.log('P1 WIN');
                    return true;
                } else {
                    console.log('P2 WIN');
                    return true;
                }
            } else if(Array.from(board).includes('')==false) {
                console.log('TIE');
                return true;
            } else {
                console.log('Continue playing');
                return false;
            }
        })
    }

    let _player1Turn= true;
    const whoseTurn = () => {
        if(_player1Turn) {
            _player1Turn= false;
            return Players.P1;
        } else {
            _player1Turn= true;
            return Players.P2;
        }
    }

    return {
        getGameboard,
        clearGameboard,
        checkWinCoditions,
        whoseTurn,
    }
})();


const gameFlow= (function() {

    display.populateGrid();

    let turnOverCheck= true;
    if(turnOverCheck== true) {
        turnOverCheck= false;
        display.changeTurns();
    }

})();