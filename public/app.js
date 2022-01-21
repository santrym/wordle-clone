const app = Vue.createApp({
    data() {
        return {
            gameName: 'Wordle',
            word: 'testerrrrr',
            correctLetters: [],
            guessedLetters: [],
            currentGuess: '',
            guessedWords: [],
            test: "testerino",
            currentCell: 0,
            maxWordLength: 2,
            victory: false,
            possibleWords: ['aa', 'ab', 'ad', 'ae', 'ag', 'ah', 'ai', 'al', 'am', 'an', 'ar', 'as', 'at', 'aw', 'ax', 'ay', 'ba', 'be', 'bi', 'bo', 'by', 'da', 'de', 'do', 'ed', 'ef', 'eh', 'el', 'em', 'en', 'er', 'es', 'et', 'ex', 'fa', 'fe', 'gi', 'go', 'ha', 'he', 'hi', 'hm', 'ho', 'id', 'if', 'in', 'is', 'it', 'jo', 'ka', 'ki', 'la', 'li', 'lo', 'ma', 'me', 'mi', 'mm', 'mo', 'mu', 'my', 'na', 'ne', 'no', 'nu', 'od', 'oe', 'of', 'oh', 'oi', 'ok', 'om', 'on', 'op', 'or', 'os', 'ow', 'ox', 'oy', 'pa', 'pe', 'pi', 'po', 'qi', 're', 'sh', 'si', 'so', 'ta', 'te', 'ti', 'to', 'uh', 'um', 'un', 'up', 'us', 'ut', 'we', 'wo', 'xi', 'xu', 'ya', 'ye', 'yo', 'za']        
        }
    },
    mounted(){

        console.log('Mounting man');
        const randomNum = Math.floor(Math.random() * this.possibleWords.length);
        let randWord = this.possibleWords[randomNum].toUpperCase();
        this.word = randWord;

        console.log('the word: ' + this.word);

        // parse letters in word
        for(i=0; i < randWord.length; i++){
            this.correctLetters.push(randWord.substring(i,i+1));
        }

        // auto focus on the input
        document.getElementById('mainInput').focus();

        // make active cell glow
        document.getElementById('cell-0').parentNode.classList.add('glow');



    },
    methods: {
        logKey(input, interface){

            let charVal = '';
            let isValidInput = false;

            if(interface){
                charVal = input;
                isValidInput = true;
            } else{

                console.log(input.target.value);

                // check if a letter input, Backspace, or Enter
                if (input.keyCode >= 65 && input.keyCode <= 90){
                    console.log('ITS A LETTER!');
                    isValidInput = true;
                    charVal = input.key.toUpperCase();
                } else if(input.key=="Backspace" || input.key=="Enter"){
                    isValidInput = true;
                    charVal = input.key;
                }

            }

            if(isValidInput){

                if(charVal == 'Backspace'){

                    console.log("MIKE TEST: " + this.currentGuess);

                    if(this.currentGuess.length > 0){
                        if(this.currentGuess.length == 1){
                            this.removeGlow(this.currentCell);
                            this.addGlow(this.currentCell - 1);
                        }
                        this.currentGuess = this.currentGuess.substring(0, this.currentGuess.length-1);
                        document.getElementById('cell-' + (this.currentCell - 1)).innerHTML = "";
                        this.currentCell--;         
                    }

                } else if(charVal == 'Enter'){

                    if(this.currentGuess.length == this.maxWordLength){

                        // check if the user's guess is correct
                        if(this.currentGuess == this.word){
                            document.getElementById('cell-' + (this.currentCell -2)).parentNode.classList.add("greeny");
                            document.getElementById('cell-' + (this.currentCell -1)).parentNode.classList.add("greeny");
                            let cellNum = this.currentCell;
                            setTimeout(function(){
                                document.getElementById('cell-' + (cellNum - 1)).parentNode.classList.remove('glow');
                                document.getElementById("modalZoneText").innerHTML = "<h3>You won!</h3><h5>Congrats, duder!</h5>";
                                document.getElementById("myModal").style.display = "block";
                                this.victory = true;
                            }
                            , 200);

                        } else{
                            for(i=0; i<this.maxWordLength; i++){
                                let letter = this.currentGuess.substring(i,i+1);
                                if(letter == this.correctLetters[i]){
                                    //document.getElementById('cell-' + (this.currentCell - 2 + i)).parentNode.style.backgroundColor = "green";
                                    document.getElementById('cell-' + (this.currentCell - 2 + i)).parentNode.classList.add("greeny");
                                    document.getElementById('key-' + letter).classList.add("greeny");
                                } else{
                                    if(this.correctLetters.includes(this.currentGuess.substring(i,i+1))){
                                        document.getElementById('cell-' + (this.currentCell - 2 + i)).parentNode.classList.add("yellowed");
                                    } else {
                                        document.getElementById('cell-' + (this.currentCell - 2 + i)).parentNode.classList.add("greyed");
                                        document.getElementById('key-' + letter).classList.add("greyed");
                                    }
                                }
                            }

                            if(this.currentCell > 11){
                                let wordo = this.word;
                                setTimeout(function(){
                                    console.log('WORD TEST: ' + this.word);
                                    document.getElementById("modalZoneText").innerHTML = "<h3>You lose, loser!</h3><h4>The Word was: " + wordo + "</h4>";
                                    document.getElementById("myModal").style.display = "block";
                                }, 200);
                            } else{

                                this.removeGlow(this.currentCell - 1);
                                this.addGlow(this.currentCell);

                            }

                            this.guessedWords.push(this.currentGuess);
                            this.currentGuess = '';

                        }

                    } else{
                        alert('word has to be ' + this.maxWordLength + ' letters long.');
                    }

                } else{

                    if(this.currentGuess.length < this.maxWordLength){

                        let cellID = 'cell-' + this.currentCell;
                        let currentCellDiv = document.getElementById(cellID);
                        currentCellDiv.innerHTML = charVal;
        
                        this.currentGuess = this.currentGuess + charVal;
                        console.log('currentguess2: ' + this.currentGuess);


                        if(this.currentCell % 2 != 1){
                            this.removeGlow(this.currentCell);
                            this.currentCell++;
                            this.addGlow(this.currentCell);
                        } else{
                            //this.removeGlow(this.currentCell);
                            this.currentCell++;
                        }
                        

                    } else {

                        alert('press enter to submit guess');

                    }

                    

                }

            }

            

            
            

        },

        addGlow(cellNum) {
            document.getElementById('cell-' + cellNum).parentNode.classList.add('glow');
        },

        removeGlow(cellNum) {
            document.getElementById('cell-' + cellNum).parentNode.classList.remove('glow');
        },
        
        focuspocus() {
            if(this.victory){
                return;
            }
            console.log('hocuspocus');
            document.getElementById('mainInput').focus();
        }
    }
    
});

app.mount('#app');