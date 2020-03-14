# vanilla-ele

## Example:

Easy create HTMLElement:

```js
const buttonFuture = Ele.future()

  const body = Ele("div", { className: bem`_body` }, [
    Ele("div", {
      onclick: handleGoToUserClick,
      className: bem`_goToUser`,
      textContent: "go to user"
    }),
    ...Array(50)
      .fill(0)
      .map((v, i) => {
        return Ele("div", { textContent: "label" + i });
      }),
    buttonFuture.Ele("div", {
      onclick: handleGoToUserClick,
      className: bem`_goToUser`,
      textContent: "go to user2"
    })
  ]);

  console.log(buttonFuture.target);
```
