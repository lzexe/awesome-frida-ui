from __future__ import unicode_literals
from django.http import HttpResponse

from server import fridaFunc


# processname = "what the fuck!!"
def index(request):
<<<<<<< HEAD
    #global processname
    pid = request.GET.get("ppid")
=======
    # global processname
    pid = request.GET.get("pid")
>>>>>>> develop
    funcname = request.GET.get("funcname")
    funcaddr = request.GET.get("funcaddr")
    processname = request.GET.get("processname")
    if processname:
        fridaFunc.crack(processname)
        return HttpResponse("Successful")


def getProcess(request):
    list = fridaFunc.enmuProcess()

    return HttpResponse(list, content_type="application/json,charset=utf-8")
