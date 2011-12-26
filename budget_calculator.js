      $(function(){
        var specificationsLastChangeChars = 0;

        function calculate(){
          var budget = specificationsChars() == 0 ? 0 : Math.ceil(random(2000, 20000) / 100) * 100;
          $("#budget span").html(currencyFormat(budget));
        }

        function specificationsHaveChanged(){
          specificationsLastChangeChars = specificationsChars();
          var interval = setInterval(calculate, 100);
          setTimeout(function() { clearInterval( interval ) }, random(200, 2000));
        }

        function specificationsChange(){
          return Math.abs(specificationsLastChangeChars - specificationsChars());
        }

        function specificationsChars(){
          return $("#specifications").val().replace(/\n/g, "").length;
        }

        function fluctuationsNoise(){
          specificationsHaveChanged();
          setTimeout(fluctuationsNoise, random(10000, 30000));
        }

        function currencyFormat(number){
          return number.toString().replace(/(.{3})$/, ".$1") + ",00";
        }

        function random(from, to){
          var range = to - from + 1;
          return Math.ceil(Math.random() * range + from - 1);
        }

        function keyPressed(event) {
          if(
            (specificationsChars() == 0) ||
            (specificationsChange() > random(5, 20)) ||
            (event.charCode == 13 && specificationsChange() > 1)
          ) {
            specificationsHaveChanged();
          }
        }

        $("#specifications").keypress(keyPressed);
        fluctuationsNoise();
      });