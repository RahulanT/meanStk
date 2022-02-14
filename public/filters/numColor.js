angular.module('stkMainModule')

.filter('numColorFilter',function(){

    return function(input)

    {
        if (input < 0)

            return input + " Tutorial"
    }

});