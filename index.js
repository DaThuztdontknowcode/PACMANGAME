const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
// tạo ranh giới , với các giá trị thấy tham chiếu
class Boundary {
    static width = 40
    static height = 40
    constructor({position}) {
        this.position = position 
        this.width = 40 
        this.height = 40 
    }
    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
class Nut {
    static Radius = 5 
    constructor({position}){
        this.position = position
        this.Radius = 5 
    }
    draw() {
        c.beginPath()
        c.fillStyle = 'white'
        c.arc(this.position.x+20 ,this.position.y+20 ,this.Radius,0, 2 * Math.PI);
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
    }
}
//
class Ghost {
    static radius = 18;
    constructor({ position, velocity,imagePath }) {
      this.position = position;
      this.velocity = velocity;
      this.radius = 18;
      this.currentImage = new Image();
      this.currentImage.src = imagePath; //  hình ảnh của Ghost
    }
  
    draw() {
      c.drawImage(
        this.currentImage,
        this.position.x - this.radius,
        this.position.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
    }
  
    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
    updateDirection() {
        const randomDirection = Math.floor(Math.random() * 4);
    
        switch (randomDirection) {
          case 0: // Lên
            this.velocity.x = 0;
            this.velocity.y = -2;
            break;
          case 1: // Xuống
            this.velocity.x = 0;
            this.velocity.y = 2;
            break;
          case 2: // Trái
            this.velocity.x = -2;
            this.velocity.y = 0;
            break;
          case 3: // Phải
            this.velocity.x = 2;
            this.velocity.y = 0;
            break;
        }
      }
      randomDirect() { 
        const randomDirection2 = Math.floor(Math.random() * 2);
    
        switch (randomDirection2) {
          case 0: // Lên
            this.velocity.x = 0;
            this.velocity.y = -2;
            break;
          case 1: // Xuống
            this.velocity.x = 0;
            this.velocity.y = 2;
            break;
          case 0: // Trái
            this.velocity.x = -2;
            this.velocity.y = 0;
            break;
          case 1: // Phải
            this.velocity.x = 2;
            this.velocity.y = 0;
            break;
        }
      }
      
      
  }
  
// tạo lớp đối tượng ( pacman ) với các hàm 
class Player {
    static radius = 18
    constructor({position,velocity}){
        this.position = position 
        this.velocity = velocity
        this.radius = 18
        this.images = {
            
            left: new Image(),
            right: new Image(),
            up: new Image(),
            down: new Image,

          };
          this.images.left.src = '1200px-Pac_Man.svg.png'; // Đường dẫn đến tệp tin hình ảnh khi nhấn vào bên trái
          this.images.right.src = 'image.png'; // Đường dẫn đến tệp tin hình ảnh khi nhấn vào bên phải
          this.images.up.src = '1200px-Pac_Man1.svg.png';
          this.images.down.src = 'down.png';
          
          this.currentImage = this.images.left; // Hình ảnh mặc định là hình ảnh bên trái
        }
        
        draw() {
            c.drawImage(
              this.currentImage,
              this.position.x - this.radius,
              this.position.y - this.radius,
              this.radius * 2,
              this.radius * 2
            );
          
      }
      //
      flipImage() {
        // Xử lý sự kiện lật hình ảnh khi người chơi nhấn vào bên
        if (keys.ArrowRight.pressed) {
          this.currentImage = this.images.left;
        } else if (keys.ArrowLeft.pressed) {
          this.currentImage = this.images.right;
        }
        else if (keys.ArrowUp.pressed) {
            this.currentImage = this.images.up;
        }
        else if (keys.ArrowDown.pressed) {
            this.currentImage = this.images.down;
        }
    }
    //
    
    // update cho loạt ảnh 
    update() {
        this.draw()
        this.position.x +=this.velocity.x
        this.position.y +=this.velocity.y
    }
    
    
    
}

/*const boundary = new Boundary({position :{
    x: 0,
    y: 0
}
} )
boundary.draw()
const boundary2 = new Boundary({position :{
    x: 40,
    y: 0
}
})
boundary2.draw()*/
/*const boundaries = [
    new Boundary({
        position: {
            x: 0,
            y: 0 
        }
    }),
    new Boundary({
        position: {
            x: 41,
            y: 0
        }
    })
]
boundaries.forEach(Boundary =>{
    Boundary.draw()
})*/
// tạo đối tượng pacman với các thuộc tính 
let score = 0;
const boundaries = []
const nut = []
const pacMan = []
const ghost =  new Ghost ({position: {
    x:Boundary.width*8,
    y:Boundary.height + Boundary.height / 2
},velocity: {
    x:2,
    y:2
},imagePath: 'ghostxanh.png',})
//
const ghost2 =  new Ghost ({position: {
    x:Boundary.width + Boundary.width / 2,
    y:Boundary.height*11
},velocity: {
    x:2,
    y:2
},imagePath: 'ghostdo.png',})
//

const pacman = new Player({position: {
    x:Boundary.width + Boundary.width / 2,
    y:Boundary.height + Boundary.height / 2
},velocity: {
    x:0,
    y:0
}
})
const diem = new Nut({position: {
    x:Boundary.width + Boundary.width / 2,
    y:Boundary.height + Boundary.height / 2
}})
const keys = {
    ArrowUp: {pressed: false},
    ArrowDown: {pressed:false},
    ArrowRight: {pressed: false},
    ArrowLeft: {pressed:false}
}
let lastKey =''
const map = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','1',' ',' ','-',' ','1','1','1','1',' ','-',' ',' ',' ','-',],
    ['-',' ','-',' ','-',' ',' ','-','-',' ',' ','-',' ','-',' ','-',],
    ['-',' ','-',' ','-',' ','1','1','1','1',' ','-',' ','-',' ','-',],
    ['-',' ','-',' ','-',' ',' ','-','-',' ',' ','-',' ','-',' ','-',],
    ['-',' ','-','1','1','1','1',' ',' ','1','1','1','1','-',' ','-',],
    ['-',' ','-','1','1','1','1','-','-','1','1','1','1','-',' ','-',],
    ['-',' ','1',' ','-','1','1','1','1','1','1','-',' ','1',' ','-',],
    ['-',' ','1',' ','-','1','1','1','1','1','1','-',' ','1',' ','-',],
    ['-','-','1',' ','-','-','-','-','-','-','-','-',' ','1','-','-',],
    ['-',' ','1','1','1','1','1','1','1','1','1','1','1','1',' ','-',],
    ['-',' ','1','1','1','1','1','1','1','1','1','1','1','1',' ','-',],
    ['-',' ','-','-','-','-','1','1','1','1','-','-','-','-',' ','-',],
    ['-',' ','1','1','1','1','1','1','1','1','1','1','1','1',' ','-',],
    ['-',' ','-','1','1','1','1','1','1','1','1','1','1','-',' ','-',],
    ['-',' ','-',' ','-','-',' ',' ',' ',' ','-','-',' ','-',' ','-',],
    ['-',' ','1','1','1','1','1','1','1','1','1','1','1','1',' ','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',]
]
// duyệt qua mảng để tạo map 
map.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        switch (Symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        }
                    })
                )
                break
            case ' ':
                nut.push(
                    new Nut({
                        position: {
                            x: Boundary.width* j,
                            y: Boundary.height* i
                        }
                    })
                )
                break

        }
    })
})
let animationId 
// chức năng tạo hoạt ảnh 
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)

    if(keys.ArrowUp.pressed && lastKey === 'ArrowUp'){
        pacman.velocity.y = -4
    } else if(keys.ArrowDown.pressed && lastKey === 'ArrowDown'){
        pacman.velocity.y = 4
    } else if(keys.ArrowRight.pressed && lastKey === 'ArrowRight'){
        pacman.velocity.x = 4
    } else if(keys.ArrowLeft.pressed && lastKey === 'ArrowLeft'){
        pacman.velocity.x = -4
    }

    boundaries.forEach(Boundary =>{
        Boundary.draw()

        if (pacman.position.y - pacman.radius + pacman.velocity.y <= Boundary.position.y + Boundary.height 
            && pacman.position.x + pacman.radius + pacman.velocity.x >= Boundary.position.x 
            && pacman.position.y + pacman.radius + pacman.velocity.y>= Boundary.position.y 
            && pacman.position.x - pacman.radius + pacman.velocity.x <= Boundary.position.x + Boundary.width ){
                console.log('va cham')
                pacman.velocity.x = 0
                pacman.velocity.y = 0

            }
        })
    //
    
    //
    
        boundaries.forEach((Boundary) => {
          if (
            ghost.position.y - ghost.radius + ghost.velocity.y <=
              Boundary.position.y + Boundary.height &&
            ghost.position.x + ghost.radius + ghost.velocity.x >= Boundary.position.x &&
            ghost.position.y + ghost.radius + ghost.velocity.y >= Boundary.position.y &&
            ghost.position.x - ghost.radius + ghost.velocity.x <=
              Boundary.position.x + Boundary.width
          ) {
            ghost.velocity.x = 0
            ghost.velocity.y = 0
            ghost.updateDirection();
          } 
          
        });
        ghost.draw();
        ghost.update();
        //
        //
        boundaries.forEach((Boundary) => {
            if (
              ghost2.position.y - ghost2.radius + ghost2.velocity.y <=
                Boundary.position.y + Boundary.height &&
              ghost2.position.x + ghost2.radius + ghost2.velocity.x >= Boundary.position.x &&
              ghost2.position.y + ghost2.radius + ghost2.velocity.y >= Boundary.position.y &&
              ghost2.position.x - ghost2.radius + ghost2.velocity.x <=
                Boundary.position.x + Boundary.width
            ) {
              ghost2.velocity.x = 0
              ghost2.velocity.y = 0
              ghost2.updateDirection();
            } 
            
          });
          ghost2.draw();
          ghost2.update();
        //
    nut.forEach((Nut,index) => {
        Nut.draw()
        if (pacman.position.y - pacman.radius + pacman.velocity.y  <= Nut.position.y +20  + Nut.Radius
            && pacman.position.x + pacman.radius + pacman.velocity.x >= Nut.position.x  +20
            && pacman.position.y + pacman.radius + pacman.velocity.y >= Nut.position.y  +20
            && pacman.position.x - pacman.radius + pacman.velocity.x  <= Nut.position.x +20 + Nut.Radius ){
                nut.splice(index, 1);
                score++;
                updateScoreDisplay();
 
            }
    })
    //
    
    //
    
    pacman.flipImage()
    pacman.update()
    pacman.velocity.x = 0
    pacman.velocity.y = 0
    /*if(keys.ArrowUp.pressed && lastKey === 'ArrowUp'){
        pacman.velocity.y = -4
    } else if(keys.ArrowDown.pressed && lastKey === 'ArrowDown'){
        pacman.velocity.y = 4
    } else if(keys.ArrowRight.pressed && lastKey === 'ArrowRight'){
        pacman.velocity.x = 4
    } else if(keys.ArrowLeft.pressed && lastKey === 'ArrowLeft'){
        pacman.velocity.x = -4
    }*/
    Ghost.forEach((ghost)=> {
        ghost.update()
        if (
            Math.hypot (
                ghost.position.x - Player.position.x,
                ghost.position.y - Player.position.y
            ) < 
            ghost.radius + pacman.radius
        ) {
            cancelAnimationFrame(animationId)
        }
    })
}

// sau mỗi 5 giây
function executeCommand() {
    ghost.randomDirect()
    ghost2.randomDirect()
  }

  setInterval(executeCommand, 5000);
  
//

//

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.textContent = "Score: " + score;
  }
//
addEventListener('keydown', ({key}) => {
    console.log(key)
    switch (key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            lastKey = 'ArrowUp'
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            lastKey = 'ArrowDown'
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'
            break
    }
    console.log(pacman.velocity)
})

addEventListener('keyup', ({key}) => {
    console.log(key)
    switch (key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
    console.log(pacman.velocity)
})

animate()
