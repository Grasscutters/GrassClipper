##
#
#   Copyright (C) 2002-2022 MlgmXyysd All Rights Reserved.
#
##

##
#
#   Anime game script for mitmproxy
#
#   https://github.com/MlgmXyysd/
#
#   *Original fiddler script from https://github.lunatic.moe/fiddlerscript
#
#   Environment requirement:
#     - mitmdump from mitmproxy
#
#   @author MlgmXyysd
#   @version 1.0
#
##

import string
from mitmproxy import ctx
from mitmproxy import http

class MlgmXyysd_Anime_Game_Proxy:

    def load(self, loader):
        loader.add_option(
            name = "ip",
            typespec = str,
            default = "127.0.0.1",
            help = "IP address to replace",
        )

        loader.add_option(
            name = "port",
            typespec = int,
            default = 443,
            help = "Port to replace",
        )

        loader.add_option(
            name = "use_https",
            typespec = bool,
            default = True,
            help = "Use HTTPS",
        )

    def request(self, flow: http.HTTPFlow) -> None:
        # This can also be replaced with another IP address.
        REMOTE_HOST = ctx.options.ip
        REMOTE_PORT = ctx.options.port
        
        LIST_DOMAINS = [
            "api-os-takumi.mihoyo.com",
            "hk4e-api-os-static.mihoyo.com",
            "hk4e-sdk-os.mihoyo.com",
            "dispatchosglobal.yuanshen.com",
            "osusadispatch.yuanshen.com",
            "account.mihoyo.com",
            "log-upload-os.mihoyo.com",
            "dispatchcntest.yuanshen.com",
            "devlog-upload.mihoyo.com",
            "webstatic.mihoyo.com",
            "log-upload.mihoyo.com",
            "hk4e-sdk.mihoyo.com",
            "api-beta-sdk.mihoyo.com",
            "api-beta-sdk-os.mihoyo.com",
            "cnbeta01dispatch.yuanshen.com",
            "dispatchcnglobal.yuanshen.com",
            "cnbeta02dispatch.yuanshen.com",
            "sdk-os-static.mihoyo.com",
            "webstatic-sea.mihoyo.com",
            "webstatic-sea.hoyoverse.com",
            "hk4e-sdk-os-static.hoyoverse.com",
            "sdk-os-static.hoyoverse.com",
            "api-account-os.hoyoverse.com",
            "hk4e-sdk-os.hoyoverse.com",
            "overseauspider.yuanshen.com",
            "gameapi-account.mihoyo.com",
            "minor-api.mihoyo.com",
            "public-data-api.mihoyo.com",
            "uspider.yuanshen.com",
            "sdk-static.mihoyo.com",
            "abtest-api-data-sg.hoyoverse.com",
            "log-upload-os.hoyoverse.com",
            "webapi-os.account.hoyoverse.com"
        ]
        
        if flow.request.host in LIST_DOMAINS:
            if ctx.options.use_https:
                flow.request.scheme = "https"
            else:
                flow.request.scheme = "http"
            flow.request.host = REMOTE_HOST
            flow.request.port = REMOTE_PORT

addons = [
	MlgmXyysd_Anime_Game_Proxy()
]
