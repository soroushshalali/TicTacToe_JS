$(document).ready(function () {
    $('.show_result').hide();
    let playerName1, playerName2;
    let flagQueue = true;
    let startFlag = false;

    $('.board > div').on('click', function (e) {
        if (startFlag) {
            let signPlayer = flagQueue ? 'X' : 'O';
            let colorSign = (flagQueue) ? 'blue' : 'red';
            let usersSelect = this.getAttribute('data-value');
            if (!$(`.cell_${usersSelect}`).text()) {
                flagQueue = !flagQueue;
                $(`.cell_${usersSelect}`).html(signPlayer);
                $(`.cell_${usersSelect}`).css("color", colorSign);
                let signWinner = checkGame(signPlayer);
                if (signWinner) {
                    showResult(signWinner);
                }
            }
        }
    });

    const options = [
        [1, 4, 7],
        [3, 4, 5],
        [0, 1, 2],
        [6, 7, 8],
        [0, 3, 6],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const showResult = (signWinner) => {
        $('.show_result').show(1000);
        let winnername;
        if (signWinner == 'X') {
            $('.winner_name').text(playerName1 + ' is the winner');
        } else if (signWinner == 'O') {
            $('.winner_name').text(playerName2 + ' is the winner');
        } else if (signWinner == 'draw') {
            $('.winner_name').text('The result was a draw');
        }
    }

    const checkGame = (signPlayer) => {
        let signPlayerCounter = 0;
        let endGame = true;
        for (let i = 0; i <= 7; i++) {
            signPlayerCounter = 0;
            for (let j = 0; j <= 2; j++) {
                if ($(`.cell_${options[i][j]}`).text() == signPlayer) {
                    signPlayerCounter++;
                }
            }
            if (signPlayerCounter === 3) {
                return signPlayer;
            }
        }

        let DrawFlag = true;
        for (let i = 0; i <= 8; i++) {
            if (!$(`.cell_${i}`).text()) {
                DrawFlag = false;
            }
        }

        if (DrawFlag) {
            return 'draw';
        }

    }

    $('#selector').change(function (e) {

        if ($('#selector').val() == 2) {
            $('.name_player2').show();
        } else {
            $('.name_player2').hide();
        }

    });


    $('#start').on('click', startGame);

    function startGame() {

        if (startFlag) {
            restGame();
        } else {
            if ($('#selector').val() == 1) {
                player();
                showName(1);
            } else {
                players();
                showName(2);
            }
            startFlag = true;
            $(".section_selector").find('input').attr("disabled", "true");
            $(".section_selector").find('select').attr("disabled", "true");
            $('.start').text('RESTART');
            // return true;
        }
    }

    const showName = (e) => {
        playerName1 = ($('.name_player1').val()) ? $('.name_player1').val() : 'Player 1';
        playerName2 = ($('.name_player2').val()) ? $('.name_player2').val() : 'Player 2';
        $('.show_player1').text(playerName1);
        $('.show_player2').text(playerName2);
        if (e == 1) {
            $('.show_player2').text('CP');
        }
    }

    $('.again').click(function (e) {
        flagQueue = true;
        $('.show_result').hide();
        for (let i = 0; i <= 8; i++) {
            $(`.cell_${i}`).text('');
        }
    });

    $('.reset').click(restGame);

    function restGame() {
        window.location.reload();
    }

    const player = () => {
    }

    const players = () => {
    }


    $('.start').on('mouseenter', (e) => {
        $('.start > span').css({
            width: 300,
        });
    })
    $('.start').on('mouseleave', (e) => {
        $('.start > span').css({
            width: 0,
        });
    })







});
