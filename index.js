"use strict";

exports.password=function(){
    /*
     * @public
     * object
     */
    this.check=function(pass){
        password = pass;
        reset();
        if(setup.check.upperCase)
            log.checks.upperCase = checkCase(
                password.match(/[A-Z]/g),
                setup.min.upperCase,
                setup.max.upperCase,
                "upperCase"
            );
        if(setup.check.lowerCase)
            log.checks.lowerCase = checkCase(
                password.match(/[a-z]/g),
                setup.min.lowerCase,
                setup.max.lowerCase,
                "lowerCase"
            );
        if(setup.check.number)
            log.checks.number = checkCase(
                password.match(/\d/g),
                setup.min.number,
                setup.max.number,
                "number"
            );
        if(setup.check.special)
            log.checks.special = checkCase(
                password.match(/[$()@.!%*#?&]/g),
                setup.min.special,
                setup.max.special,
                "special"
            );
        if(setup.check.size)
           log.checks.size = checkCase(
                password,
                setup.min.size,
                setup.max.size,
                "size"
            );
        return log.result;

    };
    /* @param string {type}
     * @param string {name}
     * @param string/number {value}
     * @public
     * boolean
     */
    this.set=function(type, name, value){
        if(typeof setup[type] === "undefined")
            return false;
        if(typeof setup[type][name] === "undefined")
            return false;
        if(
            (type === "check")&&
            (0 > [true, false].indexOf(value))
        )
            return false;
        if(["min","max"].indexOf(type) > -1){
            if (parseInt(value).toString() !== value.toString())
                return false;
            value = parseInt(value);
        }
        setup[type][name]=value;
        return true;
    };
    /*
     * @public
     * object
     */
    this.getLog = function(){
        return log;
    };
    /*
     * @private 
     * object 
     */
    let setup={
        check:{
            upperCase:true,
            lowerCase:true,
            number:true,
            special:true,
            size:true,
        },
        min:{
            upperCase:1,
            lowerCase:1,
            number:1,
            special:1,
            size:7,
        },
        max:{
            upperCase:9,
            lowerCase:9,
            number:9,
            special:9,
            size:19,
        }
    };
    /*
     * @private
     * object
     */
    let log={};
    /*
     * @private
     * string
     */
    let password="";
    /*
     * @private
     */
    let reset=function(){
        log={
            checks:{
                min:{
                    upperCase:true,
                    lowerCase:true,
                    number:true,
                    special:true,
                    size:true
                },
                max:{
                    upperCase:true,
                    lowerCase:true,
                    number:true,
                    special:true,
                    size:true
                }
            },
            failed:[],
            ok:[],
            result:true
        };
    };
    /*
     * @private
     * boolean
     */
    let failed = function(target, limit){
        if(typeof limit === "undefined"){
            limit = "min";
        }else{
            limit = "max";
        }
        if(
            (typeof target !== "undefined")&&
            (typeof log.checks[limit][target] !== "undefined")
        )
            log.checks[limit][target] = false;
            
        log.result=false;
        return false;
    };
    /*
     * @private
     * boolean
     */
    let checkCase =function(checkStr, min, max, target){
        if (
            (typeof checkStr === "undefined")||
            (checkStr === null)
        )
            return failed(target);
        if(
            (parseInt(min).toString() != min.toString())||
            (parseInt(max).toString() != max.toString())
        )
            return failed(target);
        if(
            (min > 0) &&
            (min > checkStr.length)
        )
            return failed(target);
        if(
            (max > 0) &&
            (checkStr.length > max)
        )
            return failed(target, 1);
        return true;
    };
    /*
     * @private
     * boolean
     */
    let checkDuplication = function(checkStr){
        checkStr=[...new Set(checkStr)];
    }
};


