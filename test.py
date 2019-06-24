#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# @Author: smartdone
# @Date:   2019-06-19 17:01

from server.utils.deviceUtils import DeviceUtil
import frida
device_util = DeviceUtil()
device_util.setup_device("763e974c0605")
print(device_util.processes_to_json_str())
device_util.setup_process("com.android.browser")
device_util.attach_process_and_load_script("console.log('hello');")
# print(frida.enumerate_devices())