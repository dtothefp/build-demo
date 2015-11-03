#### Build Demo

- install NVM https://github.com/creationix/nvm
- add `.nvmrc` to your root directory with node version you want to use
- add to `.bash_profile` or `.zshrc`
```sh
source ~/.nvm/nvm.sh
nvm use

alias rmall="nvm use && rm -rf node_modules && npm cache clean && npm i"
```
- open a new tab or `. ~/.nvm/nvm.sh`
- `nvm install <node_version> # 4 or 5`

- Setup Gulp
```sh
npm i -g gulp
npm i -D gulp && babel
```

##### Question
- how do we use a script in `package.json` to compile JS from `src` to `dist`

