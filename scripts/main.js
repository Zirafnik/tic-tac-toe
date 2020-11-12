const display= (function() {
    let _container= null;
    let _children= null;

    const _loadDOMElements= () => {
    _container= document.querySelector('#container');
    _children= document.querySelectorAll('.child');
    }

    let _gameboard= 
    ['', '', '',
     '', '' ,'' ,
     '' ,'' ,''];

    const getGameboard= () => {
        return _gameboard;
    }

    const _clearGameBoard= () => {
        return _gameboard=[];
    }

    const _changeMarker = function(playerSign){ 
        console.log('eventListener WORKS');
        return function(e) {
            e.target.textContent= playerSign;
            
            //save changes to gameboard
            _clearGameBoard();
            _children.forEach(child => getGameboard().push(child.textContent));
        }
    }

    const _createMarkerSpot= (marker) => {
        _loadDOMElements();
        let markerSpot= document.createElement('div');
        markerSpot.textContent= marker;
        markerSpot.classList.add('child');
        _container.appendChild(markerSpot);
    }

    const populateGrid= () => {
        getGameboard().forEach(element => {
            _createMarkerSpot(element);
        });
    }

    //EVENT LISTENERS
    const changeTurns = () => {
        _loadDOMElements();
        let player= game.whoseTurn();
            _children.forEach(child => child.addEventListener('click', _changeMarker(player.sign)));
    }

    return {
        getGameboard,
        populateGrid,
        changeTurns
    }
})();


function PlayerFactory(number) {
    let name= 'Player ' + number;
    let sign= '';
    let active= null;
    if(number==1) {
        sign= 'X';
        active= true;
    } else {
        sign= 'O';
        active= false;
    }


    return {
        name,
        sign,
        active
    }
}


const game= (function() {
    const _winConditions= [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];

    const _checkWinCoditions= () => {
        let board= display.getGameboard();
        _winConditions.forEach(arr => {
            if(board[arr[0]]!='' && board[arr[0]]==board[arr[1]] && board[arr[1]]==board[arr[2]]) {
                if(board[arr[0]]=='X') {
                    return console.log('P1 WIN');
                } else {
                    return console.log('P2 WIN');
                }
            } else if(Array.from(board).includes('')==false) {
                return console.log('TIE');
            }
        })
    }

    let _player1Turn= true;
    const whoseTurn = () => {
        if(_player1Turn) {
            _player1Turn= false;
            return player1;
        } else {
            _player1Turn= true;
            return player2;
        }
    }

    //GAME FLOW
    display.populateGrid();

    const player1= PlayerFactory(1);
    const player2= PlayerFactory(2);


    //

    return {
        //temporary export
        _checkWinCoditions,
        whoseTurn,
        player1,
        player2
    }
})();