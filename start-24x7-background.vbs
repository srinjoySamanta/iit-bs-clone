' Windows VBScript to launch IIT KGP BS Portal completely silently in the background
Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "E:\IIT kgp bs"
WshShell.Run "cmd /c npm run dev -- --host --port 5173", 0, False
Set WshShell = Nothing
