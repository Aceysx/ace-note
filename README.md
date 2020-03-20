## AceNote
![](https://img.shields.io/badge/Build-pass-green.svg)
![](https://img.shields.io/badge/Platform-mac-default.svg)
![](https://img.shields.io/badge/License-MIT-blue.svg)

AceNote is a customized personal note system. It has the same feature as other note system. The difference is you can control and manage your note and push it to remote repository for version control. Also, you can get a card review system base on note system now to help you better memory what you want

English | [中文版](./README-ZH.md)

## Why AceNote
Actually, I have used note system for two years. I find they almost are perfect where they are good at, like notes storage, classify, tag management, note export etc. But I found some  pain point for me when I have used note system.
AceNote has the following feature:
* You can manage your note at local and take a version control
* You can build your personal review queue when you want to periodic review your note
* Commonly visualization management(todos)
* Goal/plan management(todos)
* Personal time tracking(todos)

## Feature & todos
### version 1.3.0
✨ note's tag management

⚡️ improve calendar card review

⚡️ support more shortcuts
* Global Shortcuts
    * ⌘+f -> open search bar
    * ⌘+1 -> fold/unfold left sidebar
    * ⌘+2 -> fold/unfold the list of note

* Markdown Shortcuts
    * ⌘+x -> delete one line
    * ⌘+b -> bold word
    * ⌘+d -> add strikethrough
    * ⌘+3 -> ###
    * ⌘+4 -> ####
    * ⌘+5 -> #####
    * ⌘+'  -> `

### next version feature
- [ ] personal plan management
- [ ] improve the user experience of tag/cardReview management
- [ ] support open note's directory

## calendar card review introduce
**calendar card review** is a review queue references [forgetting curve]((https://zh.wikipedia.org/zh-hk/%E9%81%97%E5%BF%98%E6%9B%B2%E7%BA%BF)) and [anki](https://apps.ankiweb.net/) to help you better memory what you want. When you want to review something regularly, you can push it to review queue, and then AceNote will generate review plan for that. You can enter the CardsReview menu to check it, review note and marking.

**rules of calendar card review **
four status: 🕳not review, 💔oblivious, 💘hard, 💖easy
- when you push a note tot queue, AceNote will generate a review plan, the interval are 0, 1, 3, 7, 14, 29, 69, 129 day
- If not review today, AceNote will mark the status to 🕳, and reset the interval(that mean you need to start all over again)
- If you mark status to 💔, next review interval will backward one step;
- If you mark status to 💘,  next review interval will  as same as current interval
- If you mark status to 💖, it will go on as plan

## Download
[AceNote v1.2.0](https://github.com/Aceysx/ace-note/releases)

## Screenshot
![UTOOLS1582281300384.png](https://user-gold-cdn.xitu.io/2020/2/21/17067509e5d22251?w=3000&h=1874&f=png&s=433758)
![UTOOLS1584695830240.png](https://user-gold-cdn.xitu.io/2020/3/20/170f73b69d1dcda4?w=2984&h=1804&f=png&s=363014)
![UTOOLS1583501654699.png](https://user-gold-cdn.xitu.io/2020/3/6/170b00dbec37b579?w=3000&h=1874&f=png&s=288490)

![UTOOLS1583501770457.png](https://user-gold-cdn.xitu.io/2020/3/6/170b00f82ae0bfb8?w=3000&h=1874&f=png&s=257202)
![UTOOLS1583501801243.png](https://user-gold-cdn.xitu.io/2020/3/6/170b00ffbef29dd8?w=3000&h=1874&f=png&s=749549)

## Local Development
1. git clone https://github.com/Aceysx/ace-note.git
2. npm install
3. npm start
4. electron app/main
5. npm run build:mac (package command)

> Tip: only support mac os development now.

