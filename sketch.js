var drops = [];
let yuans = [];
let oris = [];
var gravity = 0.1;
var growth = 1;

function setup() {
  createCanvas(700, 700);
  h = hour();
	s = second();
	m = minute();
  oris.push(new ori());
	drops.push(new Drop());
	yuans.push(new yuan(h, m, s));
}

function ori() {
	this.x = 350;
  this.y = 350;
  this.show = function() {
   stroke(0);
  noFill();
  ellipse(this.x, this.y, 50, 25);
  ellipse(this.x, this.y, 110, 55);
  ellipse(this.x, this.y, 170, 85);
  ellipse(this.x, this.y, 485, 242.5); 
  }
}

function yuan(ho, mi, se) {
	this.x = 350;
	this.y = 350;
	this.miaozhen = s;
	this.fenzhen = m + 60;
	this.shizhen = h + 120;
	this.show = function() {
		
		beginShape();
    stroke(255,0,0);
		noFill();
		ellipse(this.x, this.y, this.miaozhen + 50, (this.miaozhen + 50) / 2);
		noFill();
		stroke(0,130,255);
		ellipse(this.x, this.y, this.fenzhen + 50, (this.fenzhen + 50) / 2);
		noFill();
		stroke(0,255,21);
		ellipse(this.x, this.y, (this.shizhen + 50) * 2.5, (this.shizhen + 50) / 2 * 2.5);
		
		endShape();
	}
	this.grow = function() {
		this.miaozhen = this.miaozhen + 1;
		if (this.miaozhen >= 60) {
			this.miaozhen = 0;
			this.fenzhen = this.fenzhen + 1;
			if (this.fenzhen >= 120) {
				this.fenzhen = 0;
				this.shizhen = this.shizhen + 2.5;
				if (this.shizhen >= 485) {
					this.shizhen = 0;
				}
			}
		}
	}
		
}

function Drop() {
  this.x = 350;
  this.y = -10;
  this.w = 30;
  this.h = 15;
  this.length = 10;
  this.speed = 1;
  this.endY = 350;
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
      ellipse(350, 350, this.w, this.h);
      this.w = this.w + 2;
      this.h = this.h + 1;
      this.falling = false;
			
    }
  };

  this.reset = function() {
    if (this.w >= 50) {
      this.x = 350;
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

function write() {
  noFill();
  stroke(0);
  text('black circles are the boundary of time', 200, 80);
  stroke(255, 0, 0);
  text('red circle is second, each time a raindrop drops, it\'s larger', 200, 120)
  stroke(0, 130, 255);
  text('blue circle is minute', 200, 160);
  stroke(0, 255, 21);
  text('green circle is hour', 200, 200);
  
}


function draw() {
  background(240);
  write();
  oris[0].show();
	yuans[0].show();
  drops[0].show();
  drops[0].fall();
  drops[0].puddle();
	
  drops[0].reset();
	
}
