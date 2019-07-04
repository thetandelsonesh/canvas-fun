//INIT
var refresh = 0;
var text = "";
var mouse = {};
var mouseOnScreen = false;
var denseness = 4;
var timeline = 180;
var play = false;
var counter = 0;
var particles = []; // array of particle circle

var maxradius = 2;
var background = "#000";

//init main canvas
var canvas = document.createElement('canvas');
canvas.setAttribute("id", "particleCanvas");
canvas.style.width = "100%";

var context = canvas.getContext('2d');
var div = document.getElementById('particleName');
div.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// text canvas having text
var tcanvas = document.createElement('canvas');
var tcontext = tcanvas.getContext('2d');
tcanvas.width = window.innerWidth;
tcanvas.height = window.innerHeight;

//OTHER FUNCTION
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomRad() {
    // return maxradius;

    var r = Math.floor(Math.random() * maxradius);
    return r;
}

//PARTICLE FUNCTIONS
var clear = function() {
    context.fillStyle = background;
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.closePath();
    context.fill();
}

function drawParticles() {
    refresh = 0;
    clear();
    if (play) {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.startx += p.velocity_x;
            p.starty += p.velocity_y;
            context.fillStyle = p.color;
            context.beginPath();
            context.arc(p.startx, p.starty, p.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            if (p.startx < -10 || p.starty < -10 || p.startx > canvas.width + 10 || p.straty > canvas.height + 10) {
                refresh++;
            }
        }
        // pause when name appears
        counter++;
        if (counter == timeline + 2) {
            play = false;
        }
    }

    //vibrate
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var signx = Math.random() < 0.5 ? -1 : 1;
        var signy = Math.random() < 0.5 ? -1 : 1;
        var tempx = (Math.random() * 2) * signx;
        var tempy = (Math.random() * 2) * signy;

        var X = p.startx ;//+ tempx;
        var Y = p.starty ;//+ tempy;


        context.fillStyle = getRandomColor();
        context.beginPath();
        context.arc(X, Y, getRandomRad(), 0, Math.PI * 2, true);
        context.closePath();
        context.fill();



    }

    if (refresh < particles.length / 2) {
        requestAnimationFrame(drawParticles);
    } else {
        refresh = 0;
        counter = 0;
        clear();
        particles = [];
        startAnimation();
    }

}

function togglePlay() {
    play = !play;
}

function createParticle(x, y) {
    var startx = (Math.random() * tcanvas.width);
    var starty = (Math.random() * tcanvas.height);

    var velocity_x = (x - startx) / timeline;
    var velocity_y = (y - starty) / timeline;

    var point = {
        color: background, //getRandomColor(),
        radius: maxradius, //getRandomRad(),
        main_x: x,
        main_y: y,
        startx: startx,
        starty: starty,
        velocity_x: velocity_x,
        velocity_y: velocity_y,
    }
    particles.push(point);
}


function textToParticles() {
    var ht, wid;
    var imageData = tcontext.getImageData(0, 0, tcanvas.width, tcanvas.height);

    for (ht = 0; ht < tcanvas.height; ht += denseness) {
        for (wid = 0; wid < tcanvas.width; wid += denseness) {
            var pix = imageData.data[((wid + (ht * tcanvas.width)) * 4) - 1];
            if (pix == 255) {
                createParticle(wid, ht);
            }
        }
    }
}


function startAnimation() {
    text = "CODEPEN";
    var img = document.getElementById("test");

    if (img != null) {
        //tcontext.textAlign = "center";
        // tcontext.fillStyle = "#000000";
        // tcontext.font = '240px impact';
        // tcontext.fillText(text, 100, 240);
        // tcontext.fill();
        tcontext.drawImage(img, 10, 10);
        play = true;
        textToParticles();
        requestAnimationFrame(drawParticles);
    }
}