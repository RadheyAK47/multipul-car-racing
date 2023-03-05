class Game {
    constructor(){}
    
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
     
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref("playerCount").once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form();
        form.display();
      }

      car1 = createSprite(100,200);
      car1.addImage("car1",car1Img);
      car2 = createSprite(300,200);
      car2.addImage("car2",car2Img);
      car3 = createSprite(500,200); 
      car3.addImage("car3",car3Img);
      car4 = createSprite(700,200);
      car4.addImage("car4",car4Img);
      cars = [car1,car2,car3,car4];

    }

    play(){
      form.hide();
      textSize(30);
      text("Game Start",120, 100);
      Player.getPlayerInfo();
      player.getCarsAtEnd();

      if(allPlayers !== undefined){
        background(ground);
        image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

        //index of the array
        var index = 0;

        //x and y position of the cars
        var x = 175;
        var y;

        for(var plr in allPlayers){
          
          index  = index + 1;
          
          x = x + 200;
          y = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;

          if(index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y;
          }

        }
      }
        if(keyIsDown(UP_ARROW) && player.index !== null){
          player.distance += 50;
          player.update();
        }

        if(player.distance > 3870){
          gameState = 2;
          player.rank += 1;
          Player.updateCarsAtEnd(player.rank);
        }

        drawSprites();
    }

    end(){
      background(255);
      console.log("game ended");
      console.log(player.rank);
    }
  }
