// 订阅状态面板：从「订阅状态」组读取机场写入的信息节点，不发起网络请求。
// 套餐：每月 100 GB，每月 1 日重置（2026-11 与机场面板核对过）。
var PANEL_TITLE = "订阅状态";
var TOTAL_GB = 100;

var details = $surge.selectGroupDetails();
var group = (details.groups || {})["订阅状态"] || [];
var name = group[0] || "";
var m = name.match(/有效期\s*(\d{4}-\d{2}-\d{2})[，,]\s*剩余\s*([\d.]+)\s*GB/);

if (!m) {
  $done({
    title: PANEL_TITLE,
    content: "暂时读不到订阅状态\n" + (name || "（订阅状态组为空）"),
    style: "error"
  });
  return;
}

var exp = new Date(m[1] + "T00:00:00");
var daysLeft = Math.ceil((exp.getTime() - Date.now()) / 86400000);
var remain = parseFloat(m[2]);
var used = Math.max(0, TOTAL_GB - remain);
var remainPct = Math.max(0, Math.min(100, (remain / TOTAL_GB) * 100));

var now = new Date();
var nextReset = new Date(now.getFullYear(), now.getMonth() + 1, 1);
var resetDays = Math.ceil((nextReset.getTime() - now.getTime()) / 86400000);
var resetLabel = (nextReset.getMonth() + 1) + "/" + ("0" + nextReset.getDate()).slice(-2);

var BAR_LEN = 16;
var filled = Math.round((remainPct / 100) * BAR_LEN);
var bar = new Array(filled + 1).join("█") + new Array(BAR_LEN - filled + 1).join("░");

var style;
if (remainPct <= 5 || daysLeft <= 7) {
  style = "error";
} else if (remainPct <= 20 || daysLeft <= 30) {
  style = "alert";
} else {
  style = "good";
}

$done({
  title: PANEL_TITLE,
  content:
    remain.toFixed(2) + " / " + TOTAL_GB + " GB 剩余（已用 " + used.toFixed(2) + " GB）\n" +
    bar + " " + Math.round(remainPct) + "%\n" +
    resetLabel + " 重置（" + resetDays + " 天）· 账号 " + m[1] + " 到期",
  style: style
});
