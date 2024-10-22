document.addEventListener('DOMContentLoaded', () => {

    const dino = document.querySelector('.dinosaur')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    let gravity = 0.9
    let isJumping = false
    let isGameOver = false
    let points = 0


    function control(e){

        if (e.code === "Space") {
            if(!isJumping){
                jump()
            }
        }
    }
    document.addEventListener('keyup', control)

    let position = 0
    function jump(){
        isJumping = true
        points +=5
        let count =0
        let timerId = setInterval(function() {

            //down
            if(count === 15){
                clearInterval(timerId)
                let downTimerId = setInterval(function(){

                    if(count === 0){
                        clearInterval(downTimerId)
                        isJumping = false
                    }

                position -=5
                count--
                position = position * gravity
                dino.style.bottom = position + "px"

                }, 20)
            }

            //up
            position += 30
            count++
            position = position * gravity
            dino.style.bottom = position + "px"
            

        },20)

    }


    function createObstacles(){

        if(!isGameOver){
            let randTime= Math.random() * 4000

        //obstaculo a lo lejos
        let obstaclePosition = 1000
        const obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'

        let timerId = setInterval(function(){

            if(obstaclePosition > 0 && obstaclePosition< 60 && position < 60){
                //timer stops working
                clearInterval(timerId)
                alert.innerHTML = 'GAME OVER KID'
                alert.innerHTML = 'PUNTOS: ' + points + " puntos"
                isGameOver = true

                //remove all children
                while (grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }


            obstaclePosition -=10
            obstacle.style.left = obstaclePosition + 'px'


        },20)

        setTimeout(createObstacles, randTime)
        }

    }
    //generar obstaculos aleatorios
    createObstacles()

})
