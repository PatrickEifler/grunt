function Validator()
{
    "use strict";
}

Validator.prototype.checkName = function(name)
{
    "use strict";
    return (/[^a-z]/i.test(name) === false);
};

window.addEventListener('load', function(){
    "use strict";
    document.getElementById('firstname').addEventListener('blur', function(){
        var _this = this;
        var validator = new Validator();
        var validation = document.getElementById('namevalidation');
        if (validator.checkName(_this.value) === true) {
            validation.innerHTML = 'Looks good! :)';
            validation.className = "validation yep";
            _this.className = "yep";
        }
        else {
            validation.innerHTML = 'Looks bad! :(';
            validation.className = "validation nope";
            _this.className = "nope";
        }

    });
});