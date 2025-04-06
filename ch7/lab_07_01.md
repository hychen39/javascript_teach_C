# 實驗 01：建立一個從 Animal 類別繼承的 Rabbit 類別

## 描述

R1. 建立一個 `Animal` 類別，具有以下屬性：
- speed
- name
- run(speed)：顯示以下訊息: `${this.name} 以速度 ${this.speed} 跑步。`
- stop()：顯示以下訊息:`${this.name} 停止。`

R2. 建立一個 `Rabbit` 類別，繼承自 `Animal` 類別，具有以下屬性和方法：
- hide()：顯示以下訊息: `${this.name} 躲起來了！`

R3. 初始化一個 `Rabbit` 物件。然後，將 `name` 和 `speed` 屬性分別設置為 `White Rabbit` 和 `50`。最後，呼叫 `run` 和 `hide` 方法。