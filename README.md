# wordle-clone

Just wanted to see what it would take to create wordle. I simplified things quite a bit by making the word random every time, and limiting it to 2-letter words.

Server-side: node.js and express

Client side: I am using vue.js and basic html, css, and javascript

https://two-letter-wordle.herokuapp.com/

Enhancements:
 - I would like to actually hook this up to a dictionary api. By using 2-letter words, I was able to avoid that since there is a very finite number of them, and I was able to just add them in as an array.
 - Hook this up to a database and allow users to keep track of how they do.
 - also I need to figure out how to make the users keyboard stay down while they are using the game, currently it seems to pop-up and thus making the in-game key board redundant (besides for allowing them to see which letters they have tried).

