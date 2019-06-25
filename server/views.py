from __future__ import unicode_literals
from django.http import HttpResponse
import json
import time
from server import fridaFunc
from server.utils.deviceUtils import DeviceUtil
#processname = "what the fuck!!"
def index(request):
    #global processname
    pid = request.GET.get("ppid")
    funcname = request.GET.get("funcname")
    funcaddr = request.GET.get("funcaddr")

        

    return HttpResponse(pid)

def getProcess(request):
    list = fridaFunc.enmuProcess()

    return HttpResponse(list, content_type="application/json,charset=utf-8")

def onOrUnpack(request):
    processname = request.GET.get("processname")
    if processname:
        deviceutil = DeviceUtil()
        devices = fridaFunc.enmuDevices()
        deviceutil.setup_device(devices)
        deviceutil.spawn_process_and_load_script_file(processname,'./server/fridaJavaScript/orUnpack.js')
        message = deviceutil.messages
        # print(message)
        message = json.dumps(message)
        return HttpResponse(message, content_type="application/json,charset=utf-8")

def onAdUnpack(request):
    processname = request.GET.get("processname")
    if processname:
        deviceutil = DeviceUtil()
        devices = fridaFunc.enmuDevices()
        deviceutil.setup_device(devices)
        deviceutil.spawn_process_and_load_script_file(processname,'./server/fridaJavaScript/adUnpack.js')
        message = deviceutil.messages
        # print(message)
        message = json.dumps(message)
        return HttpResponse(message, content_type="application/json,charset=utf-8")