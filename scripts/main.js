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
        return function(e) {
        e.target.textContent= playerSign;
        //save changes to gameboard
        _clearGameBoard();
        _children.forEach(child => getGameboard().push(child.textContent));
    }}

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

    const resetGrid= () => {
        getGameboard().forEach(element => {
            _createMarkerSpot('');
        })
    }

    //EVENT LISTENERS
    const changeTurns = (player) => {
        _loadDOMElements();
        //resets event listneres so they mark correct sign
        if(player.sign== 'X') {
            _children.forEach(child => child.removeEventListener('click', _changeMarker('X')));
            _children.forEach(child => child.addEventListener('click', _changeMarker('O')));
        } else if(player.sign== 'O') {
            _children.forEach(child => child.removeEventListener('click', _changeMarker('O')));
            _children.forEach(child => child.addEventListener('click', _changeMarker('X')));
        }
    }

    return {
        getGameboard,  //does it need to be public
        populateGrid,
        resetGrid,
        changeTurns
    }
})();


function playerFactory(number) {
    let name= 'Player ' + number;
    let sign= '';
    if(number==1) {
        sign= 'X';
    } else {
        sign= 'O';
    }
    let status= 'nonactive';


    return {
        name,
        sign,
        status
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

    const checkWinCoditions= () => {
        let board= display.getGameboard();
        console.log(board);
        _winConditions.forEach(arr => {
            if(board[arr[0]]!='' && board[arr[0]]==board[arr[1]] && board[arr[1]]==board[arr[2]]) {
                if(board[arr[0]]=='X') {
                    console.log('P1 WIN');
                } else {
                    console.log('P2 WIN');
                }
            } else if(Array.from(board).includes('')==false) {
                return console.log('TIE');
            }
        })
    }

    display.resetGrid();

    const playerOne= playerFactory(1);
    const playerTwo= playerFactory(2);

    display.changeTurns(playerOne);

    return {
        checkWinCoditions
    }
})();