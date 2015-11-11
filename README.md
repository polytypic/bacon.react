[![npm version](https://badge.fury.io/js/bacon.react.svg)](http://badge.fury.io/js/bacon.react)

## Get started

```js
import React from "react"
import Bacon from "baconjs"
import Reify from "bacon.react"
```

## Observe cardinality

```js
// n = 1
<Reify>{Bacon.constant(<h1>LOL BAL</h1>)}</Reify>
=> <h1>LOL BAL</h1>

// n > 1
<Reify>{Bacon.constant("LOL")} {Bacon.constant("BAL")}</Reify>
=> <div>LOL BAL</div>

// n = 1
<Reify><h2>{Bacon.constant("LOL")} {Bacon.constant("BAL")}</h2></Reify>
=> <h2>LOL BAL</h2>
```

## Optional lifecycle props

```js
<Reify
  willMount={me => ...}
  didMount={myself => ...}
  willUnmount={i => ...}>
  ...
</Reify>
```

## Longer examples

* [TodoMVC](https://github.com/polytypic/atomi-todomvc)
* [Atomi-POC](https://github.com/polytypic/atomi-poc)
