def formatNativeHook(funcname,classname,enlogcode):
    with open('./server/fridaJavaScript/nativeHook.js', "r", encoding="utf-8") as f:
        data = f.read()
        data = data.format(full_class_name = classname,method_name = funcname,log_code = enlogcode)
        return data

def formatInlineHook(moduleName,exportName,enlogcode,lelogcode):
    with open('./server/fridaJavaScript/inlineHook.js', "r", encoding="utf-8") as f:
        data = f.read()
        data = data.format(moduleName = moduleName, exportName = exportName, enlogcode = enlogcode, lelogcode = lelogcode)
        return data

def formatAndroidTrace(classfuncname,modulefuncname):
    with open('./server/fridaJavaScript/androidTrace.js', "r", encoding="utf-8") as f:
        data = f.read()
        data = data.format(classfuncname = classfuncname, modulefuncname = modulefuncname)
        return data