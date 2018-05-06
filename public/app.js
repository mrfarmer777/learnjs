'use strict';
var learnjs={};

learnjs.problems=[
    {
        description:'What is truth?',
        code:'function problem(){return _; }'
    },
    {
        description:'Simple Math',
        code:"function problem(){return 42 === 6 * __;}"
    }
];


learnjs.problemView=function(data){
    var problemNumber=parseInt(data,10);//gets the problem number as an integer from the data passed in
    var view = $('.templates .problem-view').clone(); //Get the blank problem view template and clone it, store it is view variable
    var problemData=learnjs.problems[problemNumber-1];
    var resultFlash=view.find('.result');
    
    function checkAnswer(){
        var answer=view.find('.answer').val();//get the value from the answer element that the user filled in.
        var test=problemData.code.replace('__',answer)+'; problem();';//Puts the answer into the problem code
        return eval(test);//careful, eval can be dangerous! Don't use it outside of this setting.
    }
    
    function checkAnswerClick(){
        if(checkAnswer()){
            resultFlash.text('Correct!');
        } else {
            resultFlash.text('Incorrect!');
        }
        return false;
    }
    
    view.find('.check-btn').click(checkAnswerClick); //assigns click event listener with call back checkAnswerClick
    view.find('.title').text('Problem #'+problemNumber); //set the title
    learnjs.applyObject(problemData,view);
    return view; //returns function for building the desired view output.
};

learnjs.showView=function(hash){
    
    var routes={ //Storing routes in dictionary with hash as key
        '#problem':learnjs.problemView //key is #problem, value is the problemView function (as an object)
    };
    
    var hashParts=hash.split('-'); //splits the hash at a hyphen
    
    var viewFn=routes[hashParts[0]]; //calls the appropriate view function from the routes dictionary
    if(viewFn){
        $('.view-container').empty().append(viewFn(hashParts[1])); //sets contents of view container, after being emptied, to the result of calling the view function with hashParts[1](the prblem number) as an argument
    }
};

//A function that's called when the page loads, calls showView with the present window hash
learnjs.appOnReady=function(){
    //Setup an event listener by specifying an anonymous callback function for onhashchange event (part of window object already).
    window.onhashchange=function(){
        learnjs.showView(window.location.hash); //window.location gets the URL, does .hash split the url at a hashtag?
    };
    learnjs.showView(window.location.hash); //actually calls it so it doesn't have to wait for ONLY only hashchange events
};

learnjs.applyObject=function(obj,elem){
    for(var key in obj){                //for every key in the object
        elem.find('[data-name="'+key+'"]').text(obj[key]); //set the text of the element with that data-name attribute to the value of the key
    }
};


