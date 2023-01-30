class Player{
    constructor(){
        this.name = null;
        this.index = null;
        this.rank = 0;
        this.positionX = 50;
        this.positionY = 400;
       
        this.chance = 6;
        this.score = 0;
    }

    getPlayerCount() {
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", data => {
          playerCount = data.val();
        });
      }

      updatePlayerCount(count) {
        database.ref("/").update({
          playerCount: count
        });
      }

      update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({
          positionX: this.positionX,
          positionY: this.positionY,
          rank: this.rank,
          score: this.score,
          chance:this.chance
        });
      }


      static getPlayersInfo() {
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data => {
          allPlayers = data.val();
        });
      }


      addPlayer() {
        var playerIndex = "players/player" + this.index;
    
        if (this.index === 1) {
          this.positionY = height / 2 - 50;
        } else {
          this.positionY = height / 2  + 80;
        }
    
        database.ref(playerIndex).set({
          name: this.name,
          positionX: this.positionX,
          positionY: this.positionY,
          rank: this.rank,
          score: this.score,
          chance:this.chance
        
        });
      }

      getCarsAtEnd() {
        database.ref("carsAtEnd").on("value", data => {
          this.rank = data.val();
        });
      }


      static updateCarsAtEnd(rank) {
        database.ref("/").update({
          carsAtEnd: rank
        });
      }
}