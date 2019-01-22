<div id="text"></div>
 
<script>
 var drops = [];
let yuans = [];
var gravity = 0.1;

function setup() {
  createCanvas(700, 700);
  h = hour();
	s = second();
	m = minute();
	drops.push(new Drop());
	yuans.push(new yuan(h, m, s));
}

function yuan(ho, mi, se) {
	this.x = 200;
	this.y = 200;
	this.miaozhen = s;
	this.fenzhen = m*3 + 60;
	this.shizhen = h*5 + 120;
	this.show = function() {
		
		beginShape();
		ellipse(this.x, this.y, this.miaozhen + 50, this.miaozhen + 25);
		stroke(255,0,0);
		noFill();
		ellipse(this.x, this.y, this.fenzhen + 50, this.fenzhen + 25);
		noFill();
		stroke(0,130,255);
		ellipse(this.x, this.y, this.shizhen + 50, this.shizhen + 25);
		noFill();
		stroke(255,99,21);
		endShape();
	}
	this.grow = function() {
		this.miaozhen = this.miaozhen + 1;
		if (this.miaozhen >= 60) {
			this.miaozhen = 0;
			this.fenzhen = this.fenzhen + 1;
			if (this.fenzhen >= 120) {
				this.fenzhen = 0;
				this.shizhen = this.shizhen + 1;
				if (this.shizhen >= 144) {
					this.shizhen = 0;
				}
			}
		}
	}
		
}

function Drop() {
  this.x = 200;
  this.y = -10;
  this.w = 30;
  this.h = 15;
  this.length = 10;
  this.speed = 1;
  this.endY = 200;
  this.falling = true;

  this.show = function() {
    if (this.falling) {
      stroke(0);
      line(this.x, this.y, this.x, this.y + this.length);
    }
  };

  this.fall = function() {
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;
  };

  this.puddle = function() {
    if (this.y >= this.endY) {
      this.speed = 0;
      this.length = 0;
      noFill();
      ellipse(this.x, this.y, this.w, this.h);
      this.w = this.w + 2;
      this.h = this.h + 1;
      this.falling = false;
			
    }
  };

  this.reset = function() {
    if (this.w >= 50) {
      this.x = 200;
      this.y = -10;
      this.length = 10;
      this.speed = 0;
      this.w = 30;
      this.h = 15;
			yuans[0].grow();
      this.falling = true;
    }
  };
}


function draw() {
  background(240);
	yuans[0].show();
  drops[0].show();
  drops[0].fall();
  drops[0].puddle();
	
  drops[0].reset();
	
}

</script>
