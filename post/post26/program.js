(function(){
  var something = {
    doSomething: function(){
      console.log("I am something");
    },
    doNothing:function(){
      var obj = {
        doSomething: function(){
          console.log("I am something in obj");
        },
        sample0: function(){
          this.doSomething();
        },

        sample1: function(){
          this.doSomething();
        }.bind(this)
      };

      obj.sample0();
      obj.sample1();

    }
  };

  something.doNothing();


  function add(a, b){
    return a + b;
  }

  console.log(add(5, 6));

  var addTwo = add.bind(null, 2);
  console.log(addTwo(6));

  var anotherAddTwo = function(a){
    return add(a, 2);
  };

  console.log(anotherAddTwo(6));

  var noArgs = add.bind(null, 2, 5);
  console.log(noArgs());




})();
