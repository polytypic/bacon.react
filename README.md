[![npm version](https://badge.fury.io/js/bacon.react.svg)](http://badge.fury.io/js/bacon.react)

```js
import React from "react"
import Bacon from "baconjs"
import Reify from "bacon.react"

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
