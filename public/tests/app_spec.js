describe('LearnJS',function(){
    it('can show a problem view',function(){
      learnjs.showView('1'); //calls the function tested.
      expect($('.view-container .problem-view').length).toEqual(1);//denotes expected results.
    });
    
    it('shows the landing page view when there is no hash',function(){
      learnjs.showView('');
      expect($('.view-container .landing-view').length).toEqual(1);
    });
    
    it('passes the hash view parameter to the view function',function(){
      spyOn(learnjs,'problemView'); //pay attention to the problem view function
      learnjs.showView('#problem-42'); //calls the function with a parameter
      expect(learnjs.problemView).toHaveBeenCalledWith('42');//expect that problemview will be called with 42 as parameter
    });
    
    it('invokes the router when loaded',function(){
      spyOn(learnjs,'showView'); //we're watching you, showView...
      learnjs.appOnReady(); //we call appOnReady to see what happens...
      expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);//appOnReady should have called showView with whatever hash it receives
    });
    
    it('subscribes to the hash change event',function(){
      learnjs.appOnReady();//calls this to make sure the router is invoked (see above test)
      spyOn(learnjs, 'showView'); //we're watching you again, showView...
      $(window).trigger('hashchange'); //force a desired hashchange event for testing.
      expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });
    
    
    
    //Describine the ProblemView function
    describe('problem view',function(){
      var view=learnjs.problemView('1');
      it('has a title that includes the problem number', function(){
        
        expect(view.find('.title').text()).toEqual('Problem #1 Coming soon!');
      });
      
      
      describe('answer section',function(){
        it('can check a correct answer by hitting a button',function(){
          var view=learnjs.problemView('1');
          view.find('.answer').val('true');
          view.find('.check-btn').click();
          expect(view.find('.result').text()).toEqual('Correct!');
        });
        
        if('rejects an incorrect answer',function(){
          view.find('.answer').val('false');
          view.find('.check-btn').click();
          expect(view.find('.result').text()).toEqual('Incorrect!');
        });
      });
    });
});


/*
Tests should be Fast, Informative, Reliable, and Exhaustive (FIRE)
-Fast - able to be run very quickly
-Informative - give relevant feedback about what works or is broken
-Reliable - shouldn't break randomly
-Exhaustive - every step of the workflow is tested individually. So, if something breaks, ideally a single test should fail.

*/