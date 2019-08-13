"use strict";

exports.password=function(){
    this.setup={
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
    this.log={};
    this.reset=function(){
        passt.log={
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
    this.password="";
    this.set=function(type, name, value){
        if(typeof passt.setup[type] === "undefined")
            return false;
        if(typeof passt.setup[type][name] === "undefined")
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
        passt.setup[type][name]=value;
        return true;
    };
    this.getLog = function(){
        return passt.log;
    };
    this.tools={
        failed:function(target, limit){
            if(typeof limit === "undefined"){
                limit = "min";
            }else{
                limit = "max";
            }
            if(
                (typeof target !== "undefined")&&
                (typeof passt.log.checks[limit][target] !== "undefined")
            )
                passt.log.checks[limit][target] = false;
                
            passt.log.result=false;
            return false;
        },
        check:function(checkStr, min, max, target){
            if (
                (typeof checkStr === "undefined")||
                (checkStr === null)
            )
                return passt.tools.failed(target);
            if(
                (parseInt(min).toString() != min.toString())||
                (parseInt(max).toString() != max.toString())
            )
                return passt.tools.failed(target);
            if(
                (min > 0) &&
                (min > checkStr.length)
            )
                return passt.tools.failed(target);
            if(
                (max > 0) &&
                (checkStr.length > max)
            )
                return passt.tools.failed(target, 1);
            return true;
        }/*,
        duplication:function(checkStr){
            checkStr=[...new Set(checkStr)];

        }*/
    };
    this.check=function(password){
        passt.password = password;
        passt.reset();
        if(passt.setup.check.upperCase)
            passt.log.checks.upperCase = passt.tools.check(
                passt.password.match(/[A-Z]/g),
                passt.setup.min.upperCase,
                passt.setup.max.upperCase,
                "upperCase"
            );
        if(passt.setup.check.lowerCase)
            passt.log.checks.lowerCase = passt.tools.check(
                passt.password.match(/[a-z]/g),
                passt.setup.min.lowerCase,
                passt.setup.max.lowerCase,
                "lowerCase"
            );
        if(passt.setup.check.number)
            passt.log.checks.number = passt.tools.check(
                passt.password.match(/\d/g),
                passt.setup.min.number,
                passt.setup.max.number,
                "number"
            );
        if(passt.setup.check.special)
            passt.log.checks.special = passt.tools.check(
                passt.password.match(/[$()@.!%*#?&]/g),
                passt.setup.min.special,
                passt.setup.max.special,
                "special"
            );
        if(passt.setup.check.size)
            passt.log.checks.size = passt.tools.check(
                passt.password,
                passt.setup.min.size,
                passt.setup.max.size,
                "size"
            );
        return passt.log.result;

    };
    var passt = this;
};


