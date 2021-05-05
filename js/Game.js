class Game {
  constructor(){

  }

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
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1Image",car1Img);
    car2 = createSprite(300,200);
    car2.addImage("car2Image",car2Img);
      /*car3 = createSprite(500,200);
      car3.addImage("car3Image",car3Img);
      car4 = createSprite(700,200);
      car4.addImage("car4mage",car4Img);
      */
      cars = [car1, car2]//,// car3,// car4];
      
  }

  play(){
    form.hide();
      background("grey");
      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          push();
          fill("purple");
          strokeWeight(4);
          ellipse(cars[index-1].x,cars[index-1].y,70,70);
          pop();
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
            

      }

      

    }

    if(player.distance > 3860 ){
      this.update(2);


    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }

  end(){
    console.log("gameEnd")
  }
}
