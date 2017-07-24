
$(document).ready(function () {
    var mousePressed = false,
    lastX,
    lastY,
   content = $("canvas").get(0).getContext("2d"), 
    rectangle = false,
    trait = false,
    crayon = true,
    gomme = true,
    i = 0,
    cercle = false,
    int = false,
    texte = false;



    $('#texte').click(function () {
        $("#inputTEXT").show();
        reset();
        texte = true;
    });

    $('#trait').click(function () {
        reset();
        trait = true;
    });

    $('#crayon').click(function () {
        reset();
        crayon = true;
    });

    $('#gomme').click(function () {
        reset();
        gomme = true;
    });

    $('#rect').click(function () {
        reset();
        rectangle = true;
    });

    $('#rectA').click(function () {
        reset();
        rectangle = true;
        int = true;
    });

    $('#cercleA').click(function () {
        reset();
        cercle = true;
        int = true;
    });

    $('#cercle').click(function () {
        reset();
        cercle = true;
    });

    function reset() {
        texte = false;
        trait = false;
        crayon = false;
        rectangle = false;
        cercle = false;
        int = false;
    } 


    $('#canvas').mousemove(function (e) { 
        if (mousePressed) {
            dessiner(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#canvas').mouseup(function () {
        mousePressed = false;
    });

    $('#canvas').mouseleave(function () { 
        mousePressed = false;
    });


    $('#clear').click(function () {
        content.clearRect(0, 0, 1200, 800);
    });

    $('#back').click(function () {
        $("#inputTEXT")();
        texte = false;
        trait = false;
        crayon = true;
        rectangle = false;
        cercle = false;
    });

    $('#canvas').mousedown(function (e) { 
        if (trait) {
            mousePressed = false;
            dessiner(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        } else if (crayon) {
            mousePressed = true;
            dessiner(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
        } else if (rectangle) {
            mousePressed = false;
            dessiner(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        } else if (cercle) {
            mousePressed = false;
            dessiner(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        } else if (texte) {
            mousePressed = false;
            write(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
        }else if (gomme) {
            mousePressed = true;
            (e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
        }

    });



    
    
    function dessiner(x, y, isDown) {
        if (!isDown) {
            lastX = x - 1;
            lastY = y;
        }
        if (crayon || trait) {
            if ((trait && i === 1) || crayon) {
                content.beginPath();
                content.strokeStyle = $('#color').val();
                content.lineWidth = $('#size').val();
                content.lineJoin = "round"; 
                content.moveTo(lastX, lastY); 
                content.lineTo(x, y); 
                content.closePath();
                content.stroke(); 
                i = 0;
            } else {
                i += 1;
            }
        } 

        else if (rectangle) {
            if (i === 1) {
                content.beginPath();
                content.strokeStyle = $('#color').val();
                content.lineWidth = $('#size'). val();
                content.lineJoin = "round"; 
                if (rectangle === true && int === false) {
                    content.rect(lastX, lastY, x - lastX, y - lastY); 
                    content.closePath();
                    content.stroke();
                } else if (rectangle === true && int === true) {
                    content.fillStyle = $('#color').val();
                    content.fillRect(lastX, lastY, x - lastX, y - lastY);
                }
                i = 0;
            } else {
                i += 1;
            }
        } else if (cercle) {
            if (i === 1) {
                content.beginPath();
                content.strokeStyle = $('#color').val();
                content.lineWidth = $('#size').val();
                content.lineJoin = "round"; 
                if (cercle === true && int === false) {
                    content.arc(lastX, lastY, Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2)), 0, 2 * Math.PI); 
                    content.closePath();
                    content.stroke();
                } else if (cercle === true && int === true) {
                    content.fillStyle = $('#color').val();
                    content.arc(lastX, lastY, Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2)), 0, 2 * Math.PI); 
                    content.fill();
                }
                i = 0;
            } else {
                i += 1;
            }
        }else if(gomme){



            content.clearRect(lastX,lastY, $('#size').val(), $('#size').val());
        }

        lastX = x;
        lastY = y;
    }

    function write(x, y) {
        content.font = $('#sizeTEXT').val() + "px " + $('#fontTEXT').val();
        content.fillText($('#valueTEXT').val(), x, y);
    }
});






function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById("canvas").toDataURL();
    link.download = filename;
}
document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'canvas.png');
    console.log(this);
}, false);

document.getElementById("uploadimage").addEventListener("change", addImage, false)
function addImage(){
    var ctx = document.getElementById('canvas').getContext('2d'),
    img = new Image(),
    f = document.getElementById("uploadimage").files[0],
    url = window.URL || window.webkitURL,
    src = url.createObjectURL(f);

    img.src = src;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        url.revokeObjectURL(src);
    }
}

