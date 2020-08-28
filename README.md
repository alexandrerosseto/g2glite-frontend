[![header][header-url]][header-link]

# G2GLITE
[![Project Version][version-image]][version-url]
[![Frontend][Frontend-image]][Frontend-url]

> An open source e-commerce platform for studies purposes.

This is a project design to be the frontend side which it was developed using Ionic.

---
## Author

**Alexandre Antonio Lana Rosseto** 
* *Backend work* : [g2glite-backend][repository-url] (Repository space)
* *Frontend work* : [g2glite-frontend][repository-frontend-url] (Repository space)
* *Released on* [cloud-provider][cloud-provider-url] (Cloud provider)
* *My professional profile on* [LinkedIn][linkedin-url]
* *See my articles on* [Medium][medium-url]

## Showcase

This project was designed to demonstrate knowledge in:

* Ionic
* TypeScript
* Angular
* Cordova

## Complementary Reading

* [GUIA DE BOLSO: GIT / GITHUB](https://medium.com/@alexandrerosseto/guia-de-bolso-git-github-b1b8c4492897)
* [HEROKU — CONFIGURAR E PROVISIONAR JAVA + MYSQL](https://medium.com/@alexandrerosseto/heroku-configurar-e-provisionar-java-mysql-976b73d22ac0)

---

## Usage example

Please download it from PlayStore.

---

## Installation

Since this is a Ionic project, you must have installed its libraries.

Please check if you have everything running correctly accordingly with package.json file using the commands:

```
node -v
```
```
npm -v
```
```
ionic -v
```
```
cordova -v
```
Install Ionic CLI and Cordova
```
npm install -g ionic@3.19.0 cordova@7.1.0
```
Cordova Camera
```
ionic cordova platform add browser --save
ionic cordova plugin add cordova-plugin-camera
npm install --save @ionic-native/camera
```

---

## Development setup

After you clone this repository, you need to make the changes they as follow below.

* Change the baseUrl in api.config.ts to your own.
* Change at least the tag 'widget id' from config.xml file
* Execute the commands:
```
npm install
```
```
ionic cordova platform add browser --save
```
```
ionic cordova platform add android --save
```
_Soon it will be more about the dev environment._

## Release History

* 1.0.0
    * Initial work

---

## Contributing

1. Fork it (<https://github.com/alexandrerosseto/g2glite-frontend/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->

[header-url]: g2glite-intro.png
[header-link]: https://github.com/alexandrerosseto

[repository-url]: https://github.com/alexandrerosseto/g2glite
[repository-frontend-url]: https://github.com/alexandrerosseto/g2glite-frontend

[cloud-provider-url]: https://g2glite.herokuapp.com

[linkedin-url]: https://www.linkedin.com/in/alexandrerosseto

[medium-url]: https://medium.com/@alexandrerosseto

[wiki]: https://github.com/yourname/yourproject/wiki

[version-image]: https://img.shields.io/badge/Version-1.0.0-brightgreen?style=for-the-badge&logo=appveyor
[version-url]: https://img.shields.io/badge/version-1.0.0-green
[Frontend-image]: https://img.shields.io/badge/Frontend-Ionic-blue?style=for-the-badge
[Frontend-url]: https://img.shields.io/badge/Frontend-Ionic-blue?style=for-the-badge
[Backend-image]: https://img.shields.io/badge/Backend-Java%208-important?style=for-the-badge
[Backend-url]: https://img.shields.io/badge/Backend-Java%208-important?style=for-the-badge