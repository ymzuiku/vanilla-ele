# vanilla-element

## Example:

Easy create HTMLElement:

```js
import vanillaElement from 'vanilla-ele';

const buttonFuture = Ele.future()

  const body = vanillaElement("div", { className: bem`_body` }, [
    vanillaElement("div", {
      onclick: handleGoToUserClick,
      className: bem`_goToUser`,
      textContent: "go to user"
    }),
    ...Array(50)
      .fill(0)
      .map((v, i) => {
        return vanillaElement("div", { textContent: "label" + i });
      }),
    buttonFuture.bindElement("div", {
      onclick: handleGoToUserClick,
      className: bem`_goToUser`,
      textContent: "go to user2"
    })
  ]);

  console.log(buttonFuture.target);
```
