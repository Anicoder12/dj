    music = ""
    leftwristx = 0
    leftwristy = 0
    rightwristx = 0
    rightwristy = 0
    score_lw = 0
    score_rw = 0

function preload() 
{
music = loadSound("music.mp3");
}

function setup()
{
canvas = createCanvas(300,300);
canvas.center();

video = createCapture(VIDEO);
video.hide();

pn = ml5.poseNet(video, modelLoaded);
pn.on("pose", gotPoses);  
}

function draw()
{
image(video, 0, 0, 300, 300);

fill("red");
stroke("red");

if(score_rw > 0.2) 
{
    circle(rightwristx, rightwristy, 20);

if(rightwristy >= 0 && rightwristy <= 100)
{
    document.getElementById("speed_1").innerHTML = "Speed: 0.5";
    music.rate(0.5);
}

if(rightwristy > 100 && rightwristy <= 200)
{
    document.getElementById("speed_1").innerHTML = "Speed: 1";
    music.rate(1);
}

if(rightwristy > 200 && rightwristy <= 300)
{
    document.getElementById("speed_1").innerHTML = "Speed: 1.5";
    music.rate(1.5);
}

if(rightwristy > 300 && rightwristy <= 400)
{
    document.getElementById("speed_1").innerHTML = "Speed: 2";
    music.rate(2);
}

if(rightwristy > 400 && rightwristy <= 500)
{
    document.getElementById("speed_1").innerHTML = "Speed: 2.5";
    music.rate(2.5);
}
}

if(score_lw > 0.2) { 
circle(leftwristx, leftwristy, 20);

n = Number(leftwristy);
n1 = floor(n);
n2 = n1/300;
document.getElementById("volume_l").innerHTML = "Volume: " + n2;
music.setVolume(n2);
}
}

function play_song()
{
music.play();
music.setVolume(1);
music.rate(1);
}

function modelLoaded()
{
    console.log("Model has been loaded.")
}

function gotPoses(results)
{
if(results.length > 0) 
{
console.log(results);
leftwristx = results[0].pose.leftWrist.x;
leftwristy = results[0].pose.leftWrist.y;
rightwristx = results[0].pose.rightWrist.x;
rightwristy = results[0].pose.rightWrist.y;
score_lw = results[0].pose.keypoints[9].score;
score_rw = results[0].pose.keypoints[10].score;
console.log(score_lw);
console.log("leftwristx = " + leftwristx, "leftwristy = " + leftwristy);
console.log("rightwristx = " + rightwristx, "rightwristy = " + rightwristy);
}
}