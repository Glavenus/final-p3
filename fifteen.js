"use strict";

var gameTile; 
var notify;
var timer;
var yAxis;
var xAxis;
var source;
var time;



 window.onload = function (){

    //these sets of code are what add text to the html with info
    var headerDiv = document.getElementById("header");
    var content = document.createTextNode("Fifteen Puzzle");
    headerDiv.appendChild(content);

    var theDiv = document.getElementById("openingtext");
    var content = document.createTextNode("The goal of the fifteen puzzle is to un-jumble its fifteen squares by repeatedly making moves that slide squares into the empty space. How quickly can you solve it?");
    theDiv.appendChild(content);

    var bottomDiv = document.getElementById("bottomtext");
    var content = document.createTextNode("American puzzle author and mathematician Sam Loyd is often falsely credited with creating the puzzle; indeed, Loyd claimed from 1891 until his death in 1911 that he invented it. The puzzle was actually created around 1874 by Noyes Palmer Chapman, a postmaster in Canastota, New York.");
    bottomDiv.appendChild(content);

    //gets the puzzle area
	var puzzleSpace = document.getElementById('gameSpace');
	gameTile = puzzleSpace.getElementsByTagName('div'); 

	for (var i=0; i<gameTile.length; i++) 
	{
		gameTile[i].className = 'gameTile'; 
		gameTile[i].style.left = (i%4*100)+'px'; 
		gameTile[i].style.top = (parseInt(i/4)*100) + 'px'; 
		gameTile[i].style.backgroundPosition= '-' + gameTile[i].style.left + ' ' + '-' + gameTile[i].style.top; 
		

		gameTile[i].onmouseover = function() 
		{
			if (testOpenSpace(parseInt(this.innerHTML))) 
			{
				this.style.border = "3px solid red"; 
				this.style.color = "#006600"; 
				this.style.textDecoration = "underline"; 
                
			}
		};

		gameTile[i].onmouseout = function() 
		{
			this.style.border = "2px solid black"; 
			this.style.color = "#000000"; 
			this.style.textDecoration = "none"; 
		};


		gameTile[i].onclick = function() 
		{
			if (testOpenSpace(parseInt(this.innerHTML))) 
			{
				slide(this.innerHTML-1); 
				if (finish()) 
				{
					win(); 
				}
				return;
			}
		};
	}

    

	var shuffle = document.getElementById('shufflebutton'); 
	xAxis = '300px'; 
	yAxis = '300px';
	shuffle.onclick = function() 
	{
		for (var i=0; i<300; i++) 
		{
			var rand = parseInt(Math.random()* 100) %4; 
			if (rand == 0)
			{
				var temp = up(xAxis, yAxis); 
				if ( temp != -1)
				{
					slide(temp);
				}
			}
			if (rand == 1)
			{
				var temp = down(xAxis, yAxis);
				if ( temp != -1) 
				{
					slide(temp);
				}
			}

			if (rand == 2)
			{
				var temp = left(xAxis, yAxis);
				if ( temp != -1)
				{
					slide(temp);
				}
			}

			if (rand == 3)
			{
				var temp = right(xAxis, yAxis);
				if (temp != -1)
				{
					slide(temp);
				}
			}
		}
        var clock = document.getElementById('timer');
        (function () {
            var sec = 0;
            var min = 0;
            var hr = 0;
            time = setInterval( () => {
                var s = sec < 10 ? '0' + sec : sec;
                var m = m < 10 ? '0' + min + ':': min + ':';
                var h = h < 10 ? '0' + hr + ':' : hr + ':'; 
                clock.innerHTML = h + m + s;
                sec++;
                if (sec == 60) {
                    min++;
                    sec = 0;
                }
                if (min == 60) {
                    hr++;
                    min = 0;
                    sec = 0;
                }
            }, 1000)
        })()
	};

};



function testOpenSpace(position) 
    {
        if (left(xAxis, yAxis) == (position-1))
        {
            return true;
        }

        if (down(xAxis, yAxis) == (position-1))
        {
            return true;
        }

        if (up(xAxis, yAxis) == (position-1))
        {
            return true;
        }

        if (right(xAxis, yAxis) == (position-1))
        {
            return true;
        }
    }


function Notify() 
    {
        notify --; 

        if (notify == 0) 
        {
            var body = document.getElementsByTagName('body'); 
            body[0].style.backgroundImage= "none"; 
            alert('Winner! ... Shuffle and Play Again'); 
            var para=document.getElementsByClassName('explanation');
            para[0].style.visibility="visible"; 
            return;
        }
        else  (notify % 2) 
        {
            var body = document.getElementsByTagName('body'); 
            body[0].style.backgroundImage= "url('./pikachu-mario.png')";
            
        }
        timer= setTimeout(Notify, 200); 
    }



function win() 
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundImage= "url('./pikachu-mario.png')";
        notify = 10; 
        if (time != null){
        clearInterval(time);
        time = null;}
        timer= setTimeout(Notify, 200);
        var para=document.getElementsByClassName('explanation');
        para[0].style.visibility="hidden"; 
    }


function finish() 
    {
        var flag = true;
        for (var i = 0; i < gameTile.length; i++) 
        {
            var top = parseInt(gameTile[i].style.top);
            var left = parseInt(gameTile[i].style.left);
            if (left != (i%4*100) || top != parseInt(i/4)*100) 
            {
                flag = false;
                break;
            }
        }
        return flag;
    }

function left(x, y) 
    {
        var cordX = parseInt(x);
        var cordY = parseInt(y);
        if (cordX > 0)
        {
            for (var i = 0; i < gameTile.length; i++) 
            {
                if (parseInt(gameTile[i].style.left) + 100 == cordX && parseInt(gameTile[i].style.top) == cordY)
                {
                    return i;
                } 
            }
        }
        else 
        {
            return -1;
        }
    }



function right (x, y) 
    {
        var cordX = parseInt(x);
        var cordY = parseInt(y);
        if (cordX < 300)
        {
            for (var i =0; i<gameTile.length; i++){
                if (parseInt(gameTile[i].style.left) - 100 == cordX && parseInt(gameTile[i].style.top) == cordY) 
                {
                    return i;
                }
            }
        }
        else
        {
            return -1;
        } 
    }



function up(x, y) 
    {
        var cordX = parseInt(x);
        var cordY = parseInt(y);
        if (cordY > 0)
        {
            for (var i=0; i<gameTile.length; i++)
            {
                if (parseInt(gameTile[i].style.top) + 100 == cordY && parseInt(gameTile[i].style.left) == cordX) 
                {
                    return i;
                }
            } 
        }
        else 
        {
            return -1;
        }
    }



function down (x, y) 
    {
        var cordX = parseInt(x);
        var cordY = parseInt(y);
        if (cordY < 300)
        {
            for (var i=0; i<gameTile.length; i++)
            {
                if (parseInt(gameTile[i].style.top) - 100 == cordY && parseInt(gameTile[i].style.left) == cordX) 
                {
                    return i;
                }
            }
        }
        else
        {
            return -1;
        } 
    }



function slide (position) 
    {
         var temp = gameTile[position].style.top;
         gameTile[position].style.top = yAxis;
         yAxis = temp;


         temp = gameTile[position].style.left;
         gameTile[position].style.left = xAxis;
         xAxis = temp;
    }

function changePic(btn)
    {
     var id = btn.id;
     if (id == "mario") {
        for(let i = 0; i < 15; i++){
            gameTile[i].style.backgroundImage = "url(./racoon-mario.png)";
        }
        return;
     }
     if (id == "wario") {
        for(let i = 0; i < 15; i++){
            gameTile[i].style.backgroundImage = "url(./wario.png)";
        }
        return;
     }
     if(id == "yoshi") {
        for(let i = 0; i < 15; i++){
            gameTile[i].style.backgroundImage = "url(./yoshi-mario.png)";
        }
         return;
     }
     return;
    }