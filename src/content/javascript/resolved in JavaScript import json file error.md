---
title: 解决在 JavaScript 中 import json 文件报错的问题
author: 向阳
pubDate: 2023-07-25
tag: 'JavaScript'
description: 解决在 JavaScript 中 import json 文件报错的问题
---

有时候我们会有在 js 文件中引入 json 文件的需求，比如像这样：

```javascript
import pkg from './package.json'
```

但是这么用会有一个报错

```bash
[!] TypeError: Module "file:///C:/Users/Administrator/Desktop/mineSpace/mini-vue/package.json" needs an import assertion of type "json"
TypeError [ERR_IMPORT_ASSERTION_TYPE_MISSING]: Module "file:///C:/Users/Administrator/Desktop/mineSpace/mini-vue/package.json" needs an import assertion of type "json"
    at new NodeError (node:internal/errors:372:5)
    at validateAssertions (node:internal/modules/esm/assert:82:15)
    at defaultLoad (node:internal/modules/esm/load:24:3)
    at ESMLoader.load (node:internal/modules/esm/loader:407:26)
    at ESMLoader.moduleProvider (node:internal/modules/esm/loader:326:22)
    at new ModuleJob (node:internal/modules/esm/module_job:66:26)
    at ESMLoader.#createModuleJob (node:internal/modules/esm/loader:345:17)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:304:34)
    at async ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:82:21)
    at async Promise.all (index 1)
```

需要将导入的 `package.json` 文件类型断言为 `json`

我们只需要根据提示改成这样就好了

```javascript
import pkg from './package.json' assert { type: 'json' }
```