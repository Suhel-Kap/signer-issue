To replicate the issue, first clone this repo, then run the following

```shell
yarn install
yarn start
```

and go to `http://localhost:3000/` in your browser.

connect your wallet and refresh the page and you will be able to see the signer in the console, as expected.

### To replicate the bug

go to `http://localhost:3000?id=1` in your browser.

now you will see the signer is undefined in the console.