# jquery-addTableRowSpan
JQuery plugin to add rowspan for tables


## Ex:
```
            $("table").addTableRowSpan({
                vertical_align:'middle',
                // columns: [0,1,2],
                emptyCellsPairWithUppers: true,
                emptyCellsPairWithLowers: true,
                firstRow: 2,// 0 = header
                cellTypes: ["th", "td"]
            });
```
