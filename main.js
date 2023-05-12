status = "";
song = "";
objects = [];

function preload()
{
    song = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255); 
        ObjectDetector.detect(video, gotResult);

        for (i = 0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : object detected";

            if(objects[i].label == "person")
            {
                document.getElementById("baby_found_not_found").innerHTML = "Baby detected";
                song.stop();
            } else
            {
                document.getElementById("baby_found_not_found").innerHTML = "Baby not detected";
                song.play();
            }

            if(objects[i].label == 0)
            {
                document.getElementById("baby_found_not_found").innerHTML = "Baby not detected";
                song.play();
            }
            
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);    
        }
    }
}

