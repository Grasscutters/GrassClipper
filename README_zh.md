# 为了上帝的爱，请不要把GrassClipper安装到OneDrive的路径中

# ! 公告

一个新的启动器正在开发中，我是一个很大的贡献者。不幸的是，这意味着我不能维护GrassClipper太多 - 如果有的话 - 因为我忙于新的启动器开发。但是，这是个好消息，因为这个新的启动器已经更加稳定，并且包含许多附加功能。如果您在使用GrassClipper时遇到太多麻烦，我建议您等到新的启动器发布

# GrassClipper

[EN](README.md) | [PL](README_PL.md) | [ID](README_id.md) | ZH

实验性Grasscutter启动器，可在官方和私人服务器之间轻易切换

[在这里下载！](https://github.com/Grasscutters/GrassClipper/releases/) (支持 Windows 8+)

*\*注意：有些翻译已经过时了，所以如果随机出现英文文本或某个选项似乎具有误导性，这就是原因。如果您发现这样的问题，请随时提出Pull Requests！*

# 目录

* [安装 (对于用户)](#安装-对于用户)
* [安装 (对于开发者)](#安装-对于开发者)
* [TODO](#todo)
* [常见问题](#有一些问题-)
  * [代理安装未打开/失败](#手动安装代理)
  * [白屏修复](#白屏修复)
  * [502错误](#error-502)
  * [4206错误](#error-4206)
  * [无限CMD窗口](#infinite-cmd-windows)
  * [损坏的 Discord/Youtube](#my-discord-is-not-letting-me-send-messages-or-load-images-my-youtube-is-acting-strange)
  * [没有网络连接](#i-have-no-internet-after-closing-everything-restarting-my-pc)
* [语言和翻译者](#available-languages-and-translation-credits)
* [截图](#screenshots)

# 安装 (对于用户)

1. 下载zip压缩文件
2. 把它解压到一个地方
3. 启动 `GrassClipper.exe`，安装代理服务器，然后设置你的游戏文件夹！

# 安装 (对于开发者)

0. 克隆本储存库
1. 确保您已安装了 [NodeJS](https://nodejs.org/en/download/)
2. 安装 `neu` CLI工具： `npm install -g @neutralinojs/neu`
3. 安装依赖项: `setup_win.cmd`
4. 编译，并运行:
   * 开发/测试环境: `npm run dev`
   * 生产环境: `npm run build`

# TODO

* Interface/internals
  * [x] 用户界面
  * [x] 官服/私服选项
  * [x] 服务器IP地址输入
  * [x] 有趣的花哨CSS样式`n`的东西（CoD：MW 2019风格的垂直菜单，用于在官方和私人服务器之间进行选择？ [查看这个](https://charlieintel.com/wp-content/uploads/2020/11/MW-new-menu.png))
  * [x] 终止切换脚本（可选）
  * [x] 首次启动时自动运行`install.cmd`
  * [x] Grasscutter自动下载器
  * [ ] 检测程序无法访问的文件夹 (例如 `C:/Program Files`) 并且发出警告
  * [ ] 私服部分的自定义图像（欢迎任何人提交Pull Requests以添加一些！）
  * [x] 在进入之前为服务器创建可选的用户名/密码（尚未在Grasscutter中实现）
  * [ ] 平台检测和bash脚本
  * [ ] 集成的横幅创建器
* 代理服务
  * [x] 本地代理服务器
  * [x] 拦截和修改GI请求，就像使用Fiddler一样，允许其他东西通过
  * [ ] 修复启用代理时的Discord和YouTube问题（可能已修复）

# 有一些问题？

以下是您可能遇到的一些情况及其解决方案。

# 手动安装代理

如果在安装代理服务器时遇到问题，也可以手动安装它。为此，请执行以下操作：

1. 如果 GrassClipper 文件夹中不存在名为`ext`的文件夹，请创建一个该文件夹。
2. 下载并解压 [这个文件](https://snapshots.mitmproxy.org/7.0.4/mitmproxy-7.0.4-windows.zip) 到 `ext` 文件夹中
3. 打开 `mitmdump.exe` 并允许它运行几秒钟以生成证书
4. 以管理员权限运行该命令: `certutil -addstore root "%USERPROFILE%\.mitmproxy\mitmproxy-ca-cert.cer"`
5. 像往常一样使用GrassClipper！

## 白屏修复

遇到白屏？ [确保WebView2已经安装](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download)

您可能还要以管理员身份运行以下命令：
`CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"`

如果您的文件路径中有中文字符，这也可能会使它崩溃！我正在努力修复它

你还可以尝试在 Windows 8 兼容性模式下运行

如果所有其他方法都失败了，您可以在`Chrome`或`browser`模式下运行GrassClipper。为此，请执行以下操作：

* 创建快捷方式到 `GrassClipper.exe`
* 右键单击快捷方式，单击 `性能`
* 在`目标`框中，在最后面添加`--mode=chrome`或`--mode=browser`
  * `chrome` 仅在您安装了Chrome时才有效，并且会创建一个Chrome窗口
  * `browser` 将……，你猜对了，在你的默认浏览器中打开GrassClipper
* 点击“确定”
* 从现在开始使用此快捷方式运行GrassClipper！

## Error 502

***You may be using the wrong port, ensure your port in GrassClipper is either 443 or nothing (not 0, but literally nothing)***

1. If you are running a local server, ensure the local server is running. Otherwise, ensure the server you are connecting to is actually running.

2. If you are able, [use the development branch of Grasscutter](https://github.com/Grasscutters/Grasscutter/tree/development). It is known to work better with GrassClipper.

If you are still getting an error 502 when attempting to log in to your own server, open your Grasscutter config and add the following to the `DispatchServer` section:

```json
"PublicPort": YOUR_PORT
```

where `YOUR_PORT` is the same port you use as the `Port` value already. This will probably be 443.

## Error 4206

Ensure you have the correct `keystore.p12` file that comes with your branch (`stable` or `development`). Also ensure the password is set properly in Grasscutters `config.json` (blank for `stable`, "123456" for `development`).

## Infinite CMD Windows

If you are getting infinite CMD windows for any of the scripts (such as the proxy installation, or private server start), ensure you have UAC (user access control) set to any option that requires asking. Ensure your user account can open things as Admin.

## My Discord is not letting me send messages or load images/My Youtube is acting strange

Discord/YouTube (plus surely some others) does not seem to be a fan of the proxy server. You may need to disable it by either closing mitmdump or by disabling your proxy in the Windows proxy settings.

## I have no internet after closing everything/restarting my PC

The launcher most likely did not close correctly, and was unable to clean your proxy settings back to what they were. Disable your proxy in the Windows proxy settings.

# Available Languages and Translation Credits

Thank you to everyone who has provided translations! <3

* ZH - nuoxianCN, Scirese & MrAru
* ZH-TW - Kimi & KormiMeiko
* PT-BR - na.na & actuallyeunha
* VIE - labalityowo & lunaticwhat
* ID - Iqrar99 & nautilust
* FR - linsorak & memetrollsXD
* ES - memetrollsXD
* ND - memetrollsXD
* RU - fitiskin
* TR - lilmayofuksu
* JP - conochy
* HD - Arikatsu
* PL - zakhil-dev
* TH - ongsalt
* KO - tsukiroku

# Screenshots

![image](https://user-images.githubusercontent.com/25207995/164574276-645548c2-7ba6-47c3-8df4-77082003648f.png)
![image](https://user-images.githubusercontent.com/25207995/164393190-f7e6633c-60bd-4186-bf0c-30d9f30871f4.png)
![image](https://user-images.githubusercontent.com/25207995/164393040-4da72f29-6d59-4af4-bd60-072269f2ba2a.png)
![image](https://user-images.githubusercontent.com/25207995/164393024-56543ddf-7063-4c04-9a9f-0c6238f30e90.png)
![image](https://user-images.githubusercontent.com/25207995/164393118-de844e75-f9a2-491a-aea6-f2d563abecc7.png)
![image](https://user-images.githubusercontent.com/25207995/164882735-77aa535c-0e93-4b32-af7c-f8b59888257a.png)
![image](https://user-images.githubusercontent.com/25207995/164882716-c9f16cd0-c0b6-4c0a-ae9e-4c95da9ef7f5.png)
