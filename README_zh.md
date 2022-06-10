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
  * [502错误](#502错误)
  * [4206错误](#4206错误)
  * [无限CMD窗口](#无限cmd窗口)
  * [损坏的 Discord/Youtube](#我的Discord不让我发送消息或加载图像/我的Youtube看起来很奇怪)
  * [没有网络连接](#关闭所有内容或者重新启动PC后，我没有互联网连接)
* [语言和翻译者](#可用语言和翻译贡献者)
* [截图](#截图)

# 安装 (对于用户)

1. 下载zip压缩文件
2. 把它解压到一个地方
3. 启动 `GrassClipper.exe`，安装代理服务器，然后设置你的游戏文件夹！

# 安装 (对于开发者)

0. 克隆本储存库
1. 确保您已安装了 [NodeJS](https://nodejs.org/en/download/)
2. 安装 `neu` cli工具： `npm install -g @neutralinojs/neu`
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
  * `browser` 它将......，你猜对了，在你的默认浏览器中打开GrassClipper
* 点击`确定`
* 从现在开始使用此快捷方式运行GrassClipper！

## 502错误

***您可能使用了错误的端口，请确保您在GrassClipper中的端口是443或没有（不是0，但实际上什么都没有）***

1. 如果运行的是本地服务器，请确保本地服务器正在运行。否则，请确保您连接到的服务器实际正在运行

2. 如果可以的话，[使用Grasscutter的开发分支](https://github.com/Grasscutters/Grasscutter/tree/development)。众所周知，它与GrassClipper一起工作得更好

如果您在尝试登录到自己的服务器时仍然收到错误502，请打开Grasscutter配置并将以下内容添加到`调度服务器`部分：

```json
"PublicPort": 你的端口
```

其中`你的端口`是您已经与`端口`值相同的端口。这可能是443

## 4206错误

确保分支附带正确的`keystore.p12`文件（`稳定`或`开发`）。还要确保在Grasscutters `config.json`中正确设置密码（空白表示`稳定`，`123456`表示`开发`）。

## 无限CMD窗口

*注意：本部分为机器翻译*

如果为任何脚本（如代理安装或专用服务器启动）获取无限的 CMD 窗口，请确保已将 UAC（用户访问控制）设置为需要询问的任何选项。确保您的用户帐户可以管理员身份打开内容。

## 我的Discord不让我发送消息或加载图像/我的Youtube看起来很奇怪

Discord/YouTube（当然还有其他一些应用）似乎不是代理服务器的粉丝。您可能需要通过关闭 mitmdump 或在 Windows 代理设置中禁用代理来修复它。

## 关闭所有内容或者重新启动PC后，我没有互联网连接

启动器很可能未正确关闭，并且无法将您的代理设置清理回原来的状态。你可以在 Windows 代理设置中禁用代理。

# 可用语言和翻译贡献者

感谢所有提供翻译的人！ <3

* ZH - nuoxianCN, Yang_qwq(README_zh.md), Scirese & MrAru
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

# 截图

![image](https://user-images.githubusercontent.com/25207995/164574276-645548c2-7ba6-47c3-8df4-77082003648f.png)
![image](https://user-images.githubusercontent.com/25207995/164393190-f7e6633c-60bd-4186-bf0c-30d9f30871f4.png)
![image](https://user-images.githubusercontent.com/25207995/164393040-4da72f29-6d59-4af4-bd60-072269f2ba2a.png)
![image](https://user-images.githubusercontent.com/25207995/164393024-56543ddf-7063-4c04-9a9f-0c6238f30e90.png)
![image](https://user-images.githubusercontent.com/25207995/164393118-de844e75-f9a2-491a-aea6-f2d563abecc7.png)
![image](https://user-images.githubusercontent.com/25207995/164882735-77aa535c-0e93-4b32-af7c-f8b59888257a.png)
![image](https://user-images.githubusercontent.com/25207995/164882716-c9f16cd0-c0b6-4c0a-ae9e-4c95da9ef7f5.png)
