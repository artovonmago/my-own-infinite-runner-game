let plant;
let bg;
let zombiesGroup;
let rand;
let score = 0;
let gameState = "PLAY";
let tryAgainButn;

function preload() {
    bgImg = loadImage('bg.png')
    caulipowerIdle = loadImage('caulipower.png');
    zombie1 = loadImage('zombie1.png')
    zombie2 = loadImage('zombie2.png')
    zombie3 = loadImage('zombie3.png')
    zombie4 = loadImage('zombie4.png')
    tryAgainImg = loadImage('tryAgain.png')
}

function createZombies() {
    if (score < 20 ? frameCount % 50 == 0 : frameCount % score / 2 == 0) {
        let zombie = createSprite(windowWidth, random(100, 1000))
        zombiesGroup.add(zombie)
        zombie.lifetime = 400
        zombie.velocityX = score * -0.5
        rand = round(random(1, 4))
        switch (rand) {
            case 1:
                zombie.addImage(zombie1, 'zombie1.png')
                zombie.scale = 0.2
                zombie.velocityX = score * -0.5
                break;

            case 2:
                zombie.addImage(zombie2, 'zombie2.png')
                zombie.scale = 0.45
                zombie.velocityX = score * -0.5
                break;

            case 3:
                zombie.addImage(zombie3, 'zombie3.png')
                zombie.scale = 0.8
                zombie.velocityX = score * -0.5
                break;

            case 4:
                zombie.addImage(zombie4, 'zombie4.png')
                zombie.scale = 1.4
                zombie.velocityX = score * -0.7
                break;

        }
    }

}

function setup() {
    createCanvas(windowWidth, windowHeight)
    bg = createSprite(750, 200)
    bg.addImage(bgImg, 'bg.png')
    bg.scale = 3
    bg.velocityX = -6
    plant = createSprite(600, 500)
    plant.addImage(caulipowerIdle, 'caulipower.png')
    plant.scale = 0.2
    plant.setCollider("rectangle", 0, 0, 400, 500)
    zombiesGroup = new Group()

    tryAgainButn = createSprite(width / 2, height / 3);
    tryAgainButn.addImage(tryAgainImg, "tryAgain.png")
    tryAgainButn.visible = false

}



function draw() {
    background(100)
    if (gameState == "PLAY") {
        createZombies()
    }
    drawSprites()

    if (frameCount % 20 == 0) {
        score += 1
    }

    if (mousePressedOver(tryAgainButn)) {
        gameState = "PLAY"
        tryAgainButn.visible = false
        plant.y = 500
        bg.velocityX = -6
    }


    if (keyDown("up_arrow")) {
        if (gameState == "PLAY") {
            plant.y -= 7
        }
    }
    if (keyDown("down_arrow")) {
        if (gameState == "PLAY") {
            plant.y += 7
        }
    }
    if (plant.y > windowHeight) {
        plant.y = windowHeight + 1
    }
    if (plant.y > windowHeight) {
        plant.y = windowHeight - 1
    }

    if (bg.x < 0) {
        bg.x = bg.width / 2;
    }

    if (plant.isTouching(zombiesGroup)) {
        gameState = "END"

    }
    if (gameState == "END") {
        tryAgainButn.visible = true
        bg.velocityX = 0
        zombiesGroup.destroyEach()
        score = 0
    }

    textSize(32);
    text('score: ' + score, 10, 30);

}


