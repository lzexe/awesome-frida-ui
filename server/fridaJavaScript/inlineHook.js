var moduleAddr = Module.findExportByName("{moduleName}","{exportName}");
Interceptor.attach(moduleAddr,{
    onEnter: function(args){
        {enlogcode}

    },
    onLeave: function (retval) {
        {lelogcode}
    }
});