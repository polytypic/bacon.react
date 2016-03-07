*NOTE:* This library is deprecated.
[Bacon.React.HTML](https://github.com/calmm-js/bacon.react.html) is the
successor of this library.

[![npm version](https://badge.fury.io/js/bacon.react.svg)](http://badge.fury.io/js/bacon.react)

## Get started

```jsx
import React from "react"
import Bacon from "baconjs"
import Reify from "bacon.react"
```

## Observe cardinality

```jsx
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

```jsx
<Reify
  willMount={me => ...}
  didMount={myself => ...}
  willUnmount={i => ...}>
  ...
</Reify>
```
