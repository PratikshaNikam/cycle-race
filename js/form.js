class Form {
    constructor() {
      this.input = createInput("").attribute("placeholder", "Enter your name");
      this.playButton = createButton("Play");
      this.title = createElement("h1");
      this.title.html("CYCLE RACE");
      this.greeting = createElement("h2");
    }
  
    setElementsPosition() {
      this.title.position(width/2-400, 0);
      this.input.position(width /2+400, height / 2 - 200);
      this.playButton.position(width /2+420, height / 2 - 150);
      this.greeting.position(width / 2 - 300, height / 2 - 100);
    }
  
    setElementsStyle() {
      this.title.class("gameTitle");
      this.input.class("customInput");
      this.playButton.class("customButton");
      this.greeting.class("greeting");
    }
  
    hide() {
      this.greeting.hide();
      this.playButton.hide();
      this.input.hide();
      this.title.hide();
    }
  
    handleMousePressed() {
        this.playButton.mousePressed(() => {
          this.input.hide();
          this.playButton.hide();
          var message = `
          Hello ${this.input.value()}
          </br>wait for another player to join...`;
          this.greeting.html(message);
          playerCount += 1;
          player.index = playerCount;
          player.name = this.input.value();
          player.addPlayer();
          player.updatePlayerCount(playerCount);
          enroll.play()
          //player.getDistance();
        });
      }
  
    display() {
      this.setElementsPosition();
      this.setElementsStyle();
      this.handleMousePressed();
    }
  }