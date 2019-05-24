Sub DRA()
Dim i As Integer  //定义一个变量i为整数类型
Dim nnm As String   //定义一个变量nnm为字符串类型
Dim cityname As String
Application.DisplayAlerts = False   //默认值为 True。 将此属性设置为 False 可在宏运行时禁止显示提示和警告消息
Application.ScreenUpdating = False  //屏幕更新：关闭屏幕更新可加快宏的执行速度。这样将看不到宏的执行过程，但宏的执行速度加快了。
Application.Calculation = xlCalculationManual   //返回或设置一个**XlCalculation** 值, 它代表计算模式。(表示一个运行模式)

Sheets("sheet1").Activate   //使sheet1成为正在操作的窗口
For i = 2 To 61  //循环语法，从2到61
    Set hyp = Cells(i, 19).Hyperlinks.Add(Cells(i, 19), Cells(i, 19).Value)  //我理解的Set为赋值或者说设置语法，给这个单元格设置超链接

    nnm = Cells(i, 20).Value  //给nnm赋值Cells(i, 20)的值
    cityname = Cells(i, 21).Value
    hyp.Follow NewWindow:=False, AddHistory:=True     //给超链接设置属性，不在新窗口打开，addHistory不知道咋回事，文档说无法使用，可能是是否禁用这个单元格的意思？
    Sheets("2月").Activate       //打开名为2月的sheet
    [b7:fw90].Copy


    ThisWorkbook.Activate
    Sheets(cityname).Activate
    Range("b7").PasteSpecial xlPasteValues
    'ActiveSheet.Paste
    Windows(nnm).Close
    Sheets("sheet1").Activate

Next i


Application.DisplayAlerts = True
Application.ScreenUpdating = True
End Sub