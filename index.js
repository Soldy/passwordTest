"use strict";

class password  {
    log = {}
    password = "";
    setup = {
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
    }
    reset(){
        this.log={
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
        }
    }
    set(type, name, value){
        if(typeof this.setup[type] === "undefined")
            return false;
        if(typeof this.setup[type][name] === "undefined")
            return false;
        if(
            (type === "check")&&
            (0 > [true, false].indexOf(value))
        )
            return false;
        if(['min','max'].indexOf(type) > -1){
            if (parseInt(value).toString() !== value.toString())
                return false;
            value = parseInt(value);
        }
        this.setup[type][name]=value;
        return true;
    }
    getLog(){
        return this.log;
    }
    failed(target, limit){
          if(typeof limit === "undefined"){
              limit = "min";
          }else{
              limit = "max"
          }
          if(
              (typeof target !== "undefined")&&
              (typeof this.log.check[limit][target] !== "undefined")
          )
              this.log.check[limit][target] = false;
              
          this.log.result=false;
          return false;
    }
    each(checkStr, min, max, target){
          if (
              (typeof checkStr === "undefined")||
              (checkStr === null)
          )
              return this.failed(target);
          if(
              (parseInt(min).toString() != min.toString())||
              (parseInt(max).toString() != max.toString())
          )
              return this.failed(target);
          if(
              (min > 0) &&
              (min > checkStr.length)
          )
              return this.failed(target);
          if(
              (max > 0) &&
              (checkStr.length > max)
          )
              return this.failed(target, 1);
          return true;
    }
    duplication(checkStr){
          let length = parseInt(checkStr.length);
        checkStr=[...new Set(checkStr)];
    }
    check(password){
        this.password = password;
        this.reset();
        if(this.setup.check.upperCase)
            this.log.checks.upperCase = this.each(
                this.password.match(/[A-Z]/g),
                this.setup.min.upperCase,
                this.setup.max.upperCase,
                "upperCase"
            );
        if(this.setup.check.lowerCase)
            this.log.checks.lowerCase = this.each(
                this.password.match(/[a-z]/g),
                this.setup.min.lowerCase,
                this.setup.max.lowerCase,
                "lowerCase"
            );
        if(this.setup.check.number)
            this.log.checks.number = this.each(
                this.password.match(/\d/g),
                this.setup.min.number,
                this.setup.max.number,
                "number"
            );
        if(this.setup.check.special)
            this.log.checks.special = this.each(
                this.password.match(/[$\(\)@\.!%*#?&]/g),
                this.setup.min.special,
                this.setup.max.special,
                "special"
            );
        if(this.setup.check.size)
            this.log.checks.size = this.each(
               this.password,
               this.setup.min.size,
               this.setup.max.size,
               "size"
            );
        return this.log.result;
    }
    constructor(){
        this.log={};
        this.password="";
    }

}


extends.password=password;