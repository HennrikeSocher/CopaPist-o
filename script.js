let betAmount = 1;
let userMoney = 100;

function updateBalanceDisplay() {
    document.getElementById('userMoneyDisplay').innerText = 'Saldo: $' + userMoney;
}

updateBalanceDisplay();

function updateBetAmount() {
    betAmount = parseInt(document.getElementById('betAmount').value);
}

function placeBet() {
    updateBetAmount();
    if (userMoney >= betAmount) {
        let selectedCar = prompt("Em qual carro você deseja apostar? (1-5)");
        if (selectedCar >= 1 && selectedCar <= 5) {
            startRace(selectedCar);
        } else {
            alert("Por favor, selecione um carro válido.");
        }
    } else {
        alert("Você não tem dinheiro suficiente para essa aposta.");
    }
}

function startRace(selectedCar) {
    let cars = document.querySelectorAll('.car');
    let finishLine = document.getElementById('track').offsetWidth - 50;
    let winner = 0;

    let raceInterval = setInterval(function() {
        cars.forEach(function(car, index) {
            let carLeft = parseInt(car.style.left) || 0;
            let distanceToFinish = finishLine - carLeft;
            let speed = Math.min(Math.random() * 20, distanceToFinish); // Ajuste de velocidade
            carLeft += speed;
            car.style.left = carLeft + 'px';

            if (carLeft >= finishLine && winner === 0) {
                winner = index + 1;
                clearInterval(raceInterval);
                if (winner == selectedCar) {
                    userMoney += betAmount;
                    updateBalanceDisplay();
                    alert("Você ganhou! Seu novo saldo é $" + userMoney);
                } else {
                    userMoney -= betAmount;
                    updateBalanceDisplay();
                    alert("Você perdeu! Seu novo saldo é $" + userMoney);
                }
            }
        });
    }, 50);
}

function restartRace() {
    let cars = document.querySelectorAll('.car');
    cars.forEach(function(car) {
        car.style.left = '0px';
    });
}

function restartGame() {
    userMoney = 100;
    updateBalanceDisplay();
    restartRace();
}
