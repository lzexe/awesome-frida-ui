if(Java.available) {{
    Java.perform(function(){{

        var class = Java.use("{full_class_name}");

        class.{method_name}.implementation = function(args) {{
            {log_code}


        }}

    }});
}}