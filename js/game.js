class Game{
    constructor(){
        this.playerMoving=false;
        this.upKeyActive=false;       
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");
        this.leadeboardTitle = createElement("h2");
        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");
        this.carCollision=false; 
      }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }

    updateState(state) {
      database.ref("/").update({
          gameState: state
      });
    }

    start(){
      player = new Player();
      playerCount = player.getPlayerCount();
      form = new Form()
      form.display();
      // road1=createSprite(0,(windowWidth*6)/2,windowWidth*7,20)
      //road2=createSprite(0,width/2-350,windowWidth*7,20)
      player1=createSprite(50,width/2-350,50,50);
      player1.addAnimation("player1",player1Img)
      player2=createSprite(50,width/2-550,50,50);
      player2.addAnimation("player2",player2Img);
      players=[player1,player2];
      powerCoins = new Group();
      carsGroup= new Group();
      heartsGroup=new Group();
      var heartPosition=[
        { x: 100, y: 100, image: heartImage },
        { x: 100, y: 100, image: heartImage },
        { x: 100, y: 100, image: heartImage }
      ]
      this.addSprites(powerCoins, 15, coinImage, 0.3);
      this.addSprites(powerCoins, 15, coinImage, 0.3);
      this.addSprites(carsGroup,3,car1Img,1);
      this.addSprites(heartsGroup,3,heartImage,0.2,heartPosition);
      //console.log(heartsGroup[0].position.x)
      
    }

    


    play() {
      this.objectPositions();
      this.handleResetButton();
  
      Player.getPlayersInfo();
      player.getCarsAtEnd();
  
      if (allPlayers !== undefined) {
        //image(grassImage, -50, 0, width*6, height);
        image(trackImage, -30, height/3, width*6, 400);
        
  
        //this.showFuelBar();
        //this.showLife();
        this.showLeaderboard();
  
        //index of the array
        var index = 0;
        for (var plr in allPlayers) {
          //add 1 to the index for every loop
          index = index + 1;
  
          //use data form the database to display the cars in x and y direction
          var x = allPlayers[plr].positionX;
          var y = allPlayers[plr].positionY;
  
          //var currentlife = allPlayers[plr].life;
  
          //if (currentlife <= 0) {
           // players[index - 1].changeImage("blast");
            //players[index - 1].scale = 0.3;
          //}
  
          players[index - 1].position.x = x;
          players[index - 1].position.y = y;

          //heartsGroup[0].position.x=players[index-1].position.x;
          //heartsGroup[1].position.x=players[index-1].position.x+100;
          //heartsGroup[2].position.x=players[index-1].position.x+200
  
          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
                 
            
            this.handleCoinCollision(index)
            
            this.handlePlayersCollision(index)
            this.handleCycleACollisionWithCycleB(index);

            heartsGroup[0].position.x= x;
          heartsGroup[1].position.x= x+100;
          heartsGroup[2].position.x= x+200
            //heartsGroup
            
           

            
            
            
  
            //if (player.life <= 0) {
              //this.blast = true;
              //this.playerMoving = false;
            //}
  
            // Changing camera position in y direction
            camera.position.x = players[index - 1].position.x;
          }
        }
  
        if (this.playerMoving) {
          player.positionX += 5;
          player.update();
        }
  
        // handling keyboard events
        this.handlePlayerControls();
  
        // Finshing Line
        const finshLine = 8900;
  
        if (player.positionX > finshLine) {
          gameState = 2;
          player.rank += 1;
          Player.updateCarsAtEnd(player.rank);
          player.update();
          this.showRank();
          gameWon.play();

        }
  
        drawSprites();
      }
    }


   
  handlePlayerControls() {
  
      if (keyIsDown(RIGHT_ARROW)) {
        this.playerMoving = true;
        player.positionX += 10;
        player.update();
      }

      if (keyIsDown(UP_ARROW) && player.positionY > height / 2-100) {
        this.upKeyActive = true;
        player.positionY -= 10;
        player.update();
      }

      if (keyIsDown(DOWN_ARROW) && player.positionY < height / 2 + 200) {
        this.upKeyActive = false;
        player.positionY += 10;
        player.update();
      }
  
  }

      objectPositions(){
        form.hide();
        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 +550 , 30);

        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 700, 30);


       

        this.leadeboardTitle.html("Leaderboard");
        this.leadeboardTitle.class("resetText");
        this.leadeboardTitle.position(width / 2 +300, 30);
    
        this.leader1.class("leadersText");
        this.leader1.position(width/2+330, 80);
    
        this.leader2.class("leadersText");
        this.leader2.position(width/2+330, 110);
      }


      handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {},
            carsAtEnd: 0
          });
          window.location.reload();
        });
      }


      showRank() {
        swal({
          title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
          text: "You reached the finish line successfully",
          imageUrl:
            "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
          imageSize: "100x100",
          confirmButtonText: "Ok"
        });
      }

      
  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
    
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
        
        

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
        
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
        

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
        
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
        x = random(width, width*5);
        y = random(height/2-100, height/2+100);
      }
      var sprite = createSprite(x, y);
      sprite.addAnimation("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  


  handleCoinCollision(index) {
    players[index - 1].overlap(powerCoins, function(collector, collected) {
      player.score += 21;
      player.update();
      coinEarnSound.play();
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }

  handlePlayersCollision(index) {
    if (players[index - 1].collide(carsGroup)) {
     if (this.upKeyActive) {
        player.positionY+=50;
        
      } else {
       player.positionY -=50;
      
      }
      player.chance=player.chance-1

      if(player.chance<6 &&player.chance>=4){
        heartsGroup[0].visible=false;
      }

      if(player.chance<4 &&player.chance>=3){
        heartsGroup[1].visible=false;
      }

      if(player.chance<2 &&player.chance>0){
        heartsGroup[2].visible=false;
      }

      //Reducing Player Life
      if (player.chance<=0){
        gameState=2;
        this.gameOver();
        gameLose.play();
      }
      

      player.update();
    }
  }


  
  

  handleCycleACollisionWithCycleB(index) {
    if (index === 1) {
      if (players[index - 1].collide(players[1])) {
        
        if (this.upKeyActive) {
          player.positionY-= 5;
        } else {
          player.positionY+=5;
        }

        //Reducing Player Life
        if (player.chance > 0) {
          player.chance-=1;
        }

        if(player.chance<6 &&player.chance>=4){
          heartsGroup[0].visible=false;
        }
  
        if(player.chance<4 &&player.chance>=2){
          heartsGroup[1].visible=false;
        }
  
        if(player.chance<2 &&player.chance>0){
          heartsGroup[2].visible=false;
        }
  
        //Reducing Player Life
        if (player.chance<0){
          this.gameOver()
          gameLose.play();
        }
        player.update();

        
  

       
      }
    }
    if (index === 2) {
      if (players[index - 1].collide(players[0])) {
        if (this.upKeyActive) {
          player.positionY-=2;
        } else {
          player.positionY +=2;
        }

        //Reducing Player Life
        if (player.chance>0) {
          player.chance-=1;
        }

        if(player.chance<6 &&player.chance>=4){
          heartsGroup[0].visible=false;
        }
  
        if(player.chance<4 &&player.chance>=2){
          heartsGroup[1].visible=false;
        }
  
        if(player.chance<2 &&player.chance>0){
          heartsGroup[2].visible=false;
        }
  
        //Reducing Player Life
        if (player.chance<0){
          this.gameOver();
          gameLose.play();
        }
        player.update();

                
      }
    }
  
  } 
  
  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
  
    
}