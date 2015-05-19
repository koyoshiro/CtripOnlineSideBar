define(function () {

    var verificationToken = "openTheDoor";

    var verificateTokenFn = function (mainToken) {

        if (mainToken == verificationToken)
            return true;
        else
            return false;
    };

    return {
        verificateToken: verificateTokenFn
    };

});