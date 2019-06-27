from __future__ import unicode_literals
from django.http import HttpResponse
import json
from server import formatJS
from server import fridaFunc
from server.utils.deviceUtils import DeviceUtil
#processname = "what the fuck!!"
def index(request):
    #global processname
    pid = request.POST.get("ppid")
    funcname = request.POST.get("funcname")
    funcaddr = request.POST.get("funcaddr")

        

    return HttpResponse(pid)

def getHookInfo(request):
    deviceutil = DeviceUtil()
    message = deviceutil.messages
    message = json.dumps(message)
    print(message)
    return HttpResponse(message, content_type="application/json,charset=utf-8")




def getProcess(request):
    list = fridaFunc.enmuProcess()

    return HttpResponse(list, content_type="application/json,charset=utf-8")

def onOrUnpack(request):
    processname = request.POST.get("processname")
    if processname:
        deviceutil = DeviceUtil()
        devices = fridaFunc.enmuDevices()
        deviceutil.setup_device(devices)
        deviceutil.spawn_process_and_load_script_file(processname,'./server/fridaJavaScript/orUnpack.js')

        return HttpResponse("OK")

def onAdUnpack(request):
    processname = request.POST.get("processname")
    if processname:
        deviceutil = DeviceUtil()
        devices = fridaFunc.enmuDevices()
        deviceutil.setup_device(devices)
        deviceutil.spawn_process_and_load_script_file(processname,'./server/fridaJavaScript/adUnpack.js')
        return HttpResponse("OK")

def onNativeHook(request):
    processname = request.POST.get("processname")
    funcname = request.POST.get("funcname")
    methodname = request.POST.get("classname")
    enlogcode = request.POST.get("enlogcode")
    nativeHookJs = formatJS.formatNativeHook(funcname,methodname,enlogcode)
    # print(nativeHookJs)
    deviceutil = DeviceUtil()
    devices = fridaFunc.enmuDevices()
    deviceutil.setup_device(devices)
    deviceutil.setup_process(processname)
    deviceutil.attach_process_and_load_script(nativeHookJs)
    return HttpResponse("OK")

def onInlineHook(request):
    processname = request.POST.get("processname")
    moduleName = request.POST.get("moduleName")
    exportName = request.POST.get("exportName")
    enlogcode = request.POST.get("enlogcode")
    lelogcode = request.POST.get("lelogcode")
    inlineHookJs = formatJS.formatInlineHook(moduleName, exportName, enlogcode, lelogcode)
    deviceutil = DeviceUtil()
    devices = fridaFunc.enmuDevices()
    deviceutil.setup_device(devices)
    deviceutil.setup_process(processname)
    deviceutil.attach_process_and_load_script(inlineHookJs)
    return HttpResponse("OK")


