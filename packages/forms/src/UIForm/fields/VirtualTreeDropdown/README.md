# VirtualTreeDropdown

This widget allows you to render a field which has a dropdown:
- a tree with:
  - fold/expand and partial selection on nodes
  - leaves can be checked.

// - with a filter input at the top that will match on flattened entries
// - selectAll button with depend on filter

**Json Schema**

| Property | Description |
|---|---|
| selection | `object` or `avropath string eg: ".*"` |
| tree | `object`
// | filterTerm | `string`

| selectable | `all` or `leaves`


```json
{
  "type": "object",
  "title": "VirtualTreeDropdown",
  "properties": {
    "tree": {
      "type": "object",
    },
	"filterTerm":{
		"type": "string"
	}
  }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| autoFocus | If the input should has autoFocus | `false` |
| description | A description to display below the input |  |
| disabled | Disable the input | `false` |
| placeholder | The input placeholder |  |
| readOnly | If the input should be readonly | `false` |
| title | The title to display next to the field |  |
| widget | The widget to use | `VirtualTreeDropdown` |

```json
[
    {
      "key": "applyOnFields",
      "title": "Select fields",
      "description": "You can select leaves and nodes",
      "widget": "VirtualTreeDropdown"
    }
  ]
```

**Result**

![VirtualTreeDropdown](screenshot.gif)
