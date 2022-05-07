# GrassClipper
Experymentalny launcher Grasscutter'a stworzony dla łatwego przełączania się pomiędzy serwerami oficjalnymi, a prywatnymi

[Pobierz tutaj!](https://github.com/Grasscutters/GrassClipper/releases/) (Wspiera Windows'a 8+)

*\*Uwaga: niektóre tłumaczenia są nie aktualne, więc jeżeli widzisz tekst po angielsku, lub jakiś tekst wprowadza w błąd, to to jest powodem. W przypadku zauważenia takiego błędu, śmiało otwórz pull request'a!*

# Spis treści

* [Instalacja (dla użytkownika)](#instalacja-dla-użytkownika)
* [Instalacja (dla developera)](#instalacja-dla-developera)
* [Do zrobienia](#do-zrobienia)
* [Częste problmy](#napotkałeś-problem?)
  * [Instalacja proxy nie uruchamia się / nie powodzi się](#ręczna-instalacja-proxy)
  * [Naprawa białego ekranu](#naprawa-białego-ekranu)
  * [Błąd 502](#błąd-502)
  * [Błąd 4206](#błąd-4206)
  * [Nieskończone okna CMD](#nieskończone-okna-CMD)
  * [Niedziałający Discord/Youtube](#discord-nie-pozwala-wysyłać-mi-wiadomości-lub-wczytywać-obrazków/YouTube-dziwnie-się-zachowuje)
  * [Brak internetu](#nie-mam-dostępu-do-internetu-po-zamknięciu-wszystkiego/restarcie-komputera!)
* [Dostępne tłumaczenia oraz ich autorzy](#dostępne-tłumaczenia-oraz-ich-autorzy)
* [Zrzuty ekranu](#zrzuty-ekranu)

# Instalacja (dla użytkownika)

1. Pobierz plik zip
2. Wypakuj gdzieś plik zip
3. Uruchom `GrassClipper.exe`, zainstaluj serwer proxy oraz ustaw folder z grą!

# Instalacja (dla developera)

0. Sklonuj repozytorium
1. Upewnij się, że masz zainstalowanego [NodeJS'a](https://nodejs.org/en/download/).
2. Zainstaluj narzędzie `neu` CLI: `npm install -g @neutralinojs/neu`
3. Zainstaluj zależności: `setup_win.cmd`
4. Skompiluj i uruchom:
   * Testowanie: `npm run dev`
   * Produkcja: `npm run build`

# Do zrobienia

* Interfejst/wewnętrzne
  * [x] UI
  * [x] Opcje Oficjalny i Prywatny
  * [x] Wprowadzanie IP serwera
  * [x] Stylowanie CSS - Pionowe menu do wybierania pomiędzy oficjalnym, a prywatnym serwerem? (Stylizowane na CoD: MW 2019) [Zobacz tutaj](https://charlieintel.com/wp-content/uploads/2020/11/MW-new-menu.png))
  * [x] Skrypt Kill Switch (opcjonalne)
  * [x] Automatyczne uruchamianie `install.cmd`, jeżeli uruchamamy program po raz pierwszy
  * [x] Auto-pobieranie Grasscutter'a
  * [ ] Wykrywanie gdy program jest uruchomiony w folderze, do którego nie ma dostępu (np. `C:/Program Files`) i wysyłanie ostrzeżenia.
  * [ ] Nowe obrazki dla sekcji serwera prywatnego (Pull request'y od wszystkich są mile widziane!)
  * [x] Opcjonalne tworzenie loginu/hasła dla serwera przed połączeniem (nie zaimplementowane jeszcze w Grasscutter)
  * [ ] Wykrywanie systemu i skrypty bash
  * [ ] Zintegrowany kreator bannerów
* Usługa proxy
  * [x] Lokalny serwer proxy
  * [x] Przechwytywanie i modyfikowanie zapytań GI, np. przy użyciu Fiddler'a, przepuszczanie wszystkigo innego.
  * [ ] Naprawienie problemów z Discordem i YouTube'm gdy proxy jest włączone (może naprawione)

# Napotkałeś problem?

Poniżej znajdują się najczęściej pojawiające się problemy oraz ich rozwiązania.

## Ręczna instalacja proxy

Jeżeli napotkałeś problemy z automatyczną instalacją proxy, możesz zainstalować je ręcznie. <br> 
W tym celu:
1. Jeżeli nie istnieje stwórz folder `ext` w folderze GrassClipper'a.
2. Pobierz i wypakuj zawartość [tego pliku](https://snapshots.mitmproxy.org/7.0.4/mitmproxy-7.0.4-windows.zip) do folderu `ext`
3. Uruchom `mitmdump.exe` i poczekaj kilka chwil, żeby wygenerował certyfikat.
4. Wywołaj to polecenie jako Administrator: `certutil -addstore root "%USERPROFILE%\.mitmproxy\mitmproxy-ca-cert.cer"`
5. GrassClipper powinien działać poprawnie!

## Naprawa białego ekranu

Napotkałeś biały ekran? Upewnij się czy [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download) jest zainstalowany.

Wywołanie tego polecenia jako Administrator również może pomóc:
`CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"`

Jeżeli w twojej ścieżce do pliku występują chińskie symbole, to mogą one być tego przyczyną. Pracujemy nad poprawką.

Możesz spróbować uruchomić aplikacje w trybie zgodności z Windows'em 8

Jeżeli nic z tego nie pomoże, możesz uruchomić GrassClipper'a w trybie `chrome` lub `browser`. W tym celu:
* Stwórz skrót do `GrassClipper.exe`
* Kliknij na niego prawym przyciskiem, wybierz `Właściwości`
* W polu `Element docelowy`, na samym końcu, dodaj ` --mode=chrome` lub ` --mode=browser`
  * `chrome` działa tylko wtedy gdy masz zainstalowanego Chrome'a, otworzy okienko Chrome'a
  * `brower` otworzy GrassClippera w twojej domyślnej przeglądarce
* Kliknij `Ok`
* Od teraz uruchamiaj GrassClippera nowo stworzonym skrótem.

## Błąd 502

1. Jeżeli dołączas na serwer lokalny to upewnij się czy jest włączony. W przeciwnym wypadku, upewnij się, czy serwer do którego się łączysz działa.

2. Jeżeli to możliwe, [użyj wersji developerskiej Grasscutter'a](https://github.com/Grasscutters/Grasscutter/tree/development). Z tego co wiadomo to działa lepiej z GrassClipper'em.

Jeżeli dalej dostajesz błąd 502 przy próbie logowania do własnego serwera, otwórz plik `config.json` w folderze Grasscutter'a i dodaj w nim w sekcji `DispatchServer`:

```json
"PublicPort": TWÓJ_PORT
```

`TWÓJ_PORT` jest tym samym portem co w polu `Port`. Jest to prawdopodobnie wartość 443.

## Błąd 4206

Upewnij się, że posiadasz odpowiedni plik `keystore.p12` dla twojej wersji. Sprawdź, czy hasło jest poprawnie ustawione w pliku `config.json` (puste dla wersji `stabilnej`, "123456" dla wersji `developerskiej`).

## Nieskończone okna CMD

Jeżeli jakikolwiek skrypt uruchamia nieskończoność okien CMD (np. instalator proxy albo starter serwera prywatnego), upewnij się, że UAC (User Access Control) jest ustawiony na dowolną opcje która wymaga potwierdzenia. Sprawdź czy twoje konto może uruchamiać programy jako Administrator.

## Discord nie pozwala wysyłać mi wiadomości lub wczytywać obrazków/YouTube dziwnie się zachowuje

Discord/Youtube (i na pewno pare innych) nie przepadają za serwerem proxy. Musisz go wyłączyć zamykając mitmdump, albo wyłączając proxy w ustawieniach Windowsa.

## Nie mam dostępu do internetu po zamknięciu wszystkiego/restarcie komputera!

Launcher najprawdopodobniej nie został poprawnie zamknięty, przez co nie był w stanie przywrócić oryginalnych ustawień proxy. Wyłącz proxy w ustawieniach Windows'a.

# Dostępne tłumaczenia oraz ich autorzy

Dziękujemy dla wszystkich, którzy pomagają w tłumaczeniu! <3

* ZH - nuoxianCN, Scirese & MrAru
* ZH-TW - Kimi & KormiMeiko
* PT-BR - na.na
* VIE - labalityowo
* ID - Iqrar99 & nautilust
* FR - linsorak & memetrollsXD
* ES - memetrollsXD
* ND - memetrollsXD
* RU - fitiskin
* TR - lilmayofuksu
* JP - conochy
* HD - Arikatsu 
* PL - zakhil-dev

# Zrzuty ekranu

![image](https://user-images.githubusercontent.com/25207995/164574276-645548c2-7ba6-47c3-8df4-77082003648f.png)
![image](https://user-images.githubusercontent.com/25207995/164393190-f7e6633c-60bd-4186-bf0c-30d9f30871f4.png)
![image](https://user-images.githubusercontent.com/25207995/164393040-4da72f29-6d59-4af4-bd60-072269f2ba2a.png)
![image](https://user-images.githubusercontent.com/25207995/164393024-56543ddf-7063-4c04-9a9f-0c6238f30e90.png)
![image](https://user-images.githubusercontent.com/25207995/164393118-de844e75-f9a2-491a-aea6-f2d563abecc7.png)
![image](https://user-images.githubusercontent.com/25207995/164882735-77aa535c-0e93-4b32-af7c-f8b59888257a.png)
![image](https://user-images.githubusercontent.com/25207995/164882716-c9f16cd0-c0b6-4c0a-ae9e-4c95da9ef7f5.png)
