# surge-scripts

Surge 面板脚本集合。

## substatus.js

在 Surge 的 Information Panel 中显示机场订阅状态：剩余流量、已用流量、到期日、下次重置。

数据来源：不联网。脚本通过 `$surge.selectGroupDetails()` 读取 Surge 中名为「订阅状态」的 select 策略组，解析机场写入的「有效期…剩余…GB」信息节点。

### 用法

```
[Panel]
订阅 = title="订阅状态",content="读取中…",style=info,script-name=substatus,update-interval=300

[Script]
substatus = script-path=https://cdn.jsdelivr.net/gh/hx-guo/surge-scripts@main/substatus.js,type=generic,timeout=10,script-update-interval=3600
```

前提：配置里有一个名为「订阅状态」的 select 组，成员包含形如 `有效期2027-11-12, 剩余 98.29 GB` 的节点。脚本里的 `TOTAL_GB` 需按套餐总量修改。

脚本不含任何订阅链接或密钥。
