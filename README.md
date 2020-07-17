# Adventure Closure
A decision making game, make a fortune and conquer the universe! 💰🚀

<p align="center">
  <img width="500px" alt="Be like Elon Musk" src="img/elon-musk.gif">
</p>

## The problem
Create an idle business sim-game. The basic idea is to purchase a business, win capital from that business, upgrade the business and then purchase more businesses.
The way to win capital in `Adventure Closure` is once you’ve purchased a business, you need to click on the business and it takes some time to gain the capital. Once done, you can click again.
In order to automate this, you can hire a manager who can run the business for you, so you don’t have to click manually anymore. Then you can upgrade the business and gain even more money.
The game is idle, so it progresses while you are away: If you have a manager, the game should continue playing while you’re gone.

<details open>
  <summary><b>Spec Requirements</b></summary>

  * Buy and upgrade businesses. There should be several business types to choose from.
  * Make money from a business. (i.e. you click on a business and in a certain amount of time you get money).
  * Hire managers, so that money is made automatically.
  * When you close the game, next time you open it, you should see the money that your businesses made for you. (Businesses continue to make progress while you’re away).
</details>

## The solution
Do you want to see this awesome game in action? Visit https://jdnichollsc.github.io/adventure-closure yay! 🎉

![Happy like Elon Musk](img/happy-like-elon.gif)

## Installation 📚

### Running the app

```bash
cd app

# install dependencies
$ yarn

# development
$ yarn start
```

### Running the api

```bash
cd api

# install dependencies
$ yarn

# development
$ yarn start
```

## Test 🕵️

```bash
# unit tests
$ yarn test
```

## TODO 📝
- [x] Use a game engine like `Phaser Framework` to create better user experiences with WebGL/Canvas.
- [x] Define a `Component-based` architecture for separation of concerns.
- [x] Use a `Mobile first` framework like `Ionic` to build a cross-platform app (Mobile, Desktop and Web).
- [x] Use `Web Components` and `Web animations` to improve the UI/UX and build a high performance web app using web-standards.
- [x] Use `TypeScript` to improve the quality of the code and reduce maintenance costs and technical debt of the project.
- [x] Use patterns like `Repository design` and dependency injection to have a modular architecture.
- [x] Use `SOLID` following Software principles like SRP, DRY, KISS, etc to create a system that is easy to maintain and extend over time.
- [x] Use platform-agnostic tools to scale the system easily.
- [x] Add authentication/authorization for security concerns (JWT, Basic Authorization, Role-based access control, etc).
- [x] Add testing utilities like Enzyme to write better tests for the components and help to reduce the complexity of the code.
- [ ] Add default data (Businesses, Managers, etc) with database migrations.
- [ ] Use `Websockets` to improve the communication with a Event-driven architecture.
- [ ] Manage game scaling and use `media queries` to support multiple resolutions and devices.
- [ ] Use `Facebook Instant Games` SDK to integrate services like In-App Purchase and distribute the game in multiple platforms.
- [ ] Support PWA and Offline mode (SQLite, Cache with Service Workers, etc) to improve the UX with other kind of games (Nice to have for fun).
- [ ] Share the final results and inspire others with Open Source contributions.
- [ ] Add semantic release to use Gitflow Workflow for better branching process.
- [ ] Use tools like `Lerna` to optimizes the workflow managing a multi-package repository for shared logic between front-end and back-end.

## Credits 👍
Some resources used here are part of my `Open Source` contributions:

* **IonPhaser:** [A web component to integrate Phaser Framework with Angular, React, Vue, etc 🎮](https://github.com/proyecto26/ion-phaser).
* **MyApi Template:** [A template to create awesome APIs easily ⚡️](https://github.com/proyecto26/MyAPI).
* **Animatable:** [A Web Component to use WAAPI in a declarative way](https://github.com/proyecto26/animatable-component).
* **Awesome JavaScript Games:** [A curated list of awesome JavaScript Games 🎮](https://github.com/proyecto26/awesome-jsgames).

Other resources:
* **Elon Musk image:** [By Algarifma](https://imgur.com/GeEHyCu).

## Happy coding 💯
Made with <3

<img width="150px" src="https://github.com/jdnichollsc/jdnichollsc.github.io/blob/master/assets/nicholls.png?raw=true" align="right">
