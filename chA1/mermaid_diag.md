

```mermaid
graph LR
  A[Start] --> B["setTimeout 1 (1s)"]
  B --> C["Callback 1"]
  C --> D["setTimeout 2 (1s)"]
  D --> E["Callback 2"]
  E --> F[End]
  
  style C fill:#f9f,stroke:#333,stroke-width:4px
  style E fill:#f9f,stroke:#333,stroke-width:4px
```
