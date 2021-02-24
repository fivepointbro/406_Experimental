<%@Language="VBScript"%>
<%Option Explicit%>
<%Response.Buffer = True%>
<%
On Error Resume Next
Dim strPath
strPath = Request.QueryString("file")
'-- do some basic error checking for the QueryString
If strPath = "" Then
   Response.Clear
   Response.Write("No file specified.")
   Response.End
ElseIf InStr(strPath, "..") > 0 Then
   Response.Clear
   Response.Write("Illegal folder location.")
   Response.End
ElseIf Len(strPath) > 1024 Then
   Response.Clear
   Response.Write("Folder path too long.")
   Response.End
Else
   Call DownloadFile(strPath)
   IF Err.Number <> 0 THEN
    Response.Write "=========================================" & "<br />"
    Response.Write "Error description: " & Err.Description     & "<br />"
    Response.Write "Source: " & Err.Source                     & "<br />"
    Response.Write "LineNumber: " & Err.Line                   & "<br />"
    Response.Write "=========================================" & "<br />"
   ELSE 
   END IF

End If
 
Private Sub DownloadFile(file)
   '--declare variables
   Dim strAbsFile
   Dim strFileExtension
   Dim objFSO
   Dim objFile
   Dim objStream
   '-- set absolute file location
   strAbsFile = file
   '-- create FSO object to check if file exists and get properties
   Set objFSO = Server.CreateObject("Scripting.FileSystemObject")
   '-- check to see if the file exists
   If objFSO.FileExists(strAbsFile) Then
      Set objFile = objFSO.GetFile(strAbsFile)
      '-- first clear the response, and then set the appropriate headers
	  Response.Clear
      '-- the filename you give it will be the one that is shown
      ' to the users by default when they save
      Set objStream = Server.CreateObject("ADODB.Stream")
      objStream.Open
      Response.AddHeader "Content-Disposition", "filename=" & objFile.Name
      Response.AddHeader "Pragma", "no-cache"
      Response.AddHeader "Expires", "0"      
      Response.ContentType = "application/octet-stream"
      '-- set as binary
      objStream.Type = 1
      Response.CharSet = "UTF-8"
      '-- load into the stream the file
      objStream.LoadFromFile(strAbsFile)
      '-- send the stream in the response
      Do While Not objStream.EOS
	  Response.BinaryWrite objStream.Read(3670016)
	  Response.Flush
      Loop
      objStream.Close
      Set objStream = Nothing
      Set objFile = Nothing
   Else 'objFSO.FileExists(strAbsFile)
      Response.Clear
      Response.Write("You wanted: " & strAbsFile & "<br>")
      Response.Write("No such file exists.")
   End If
   Set objFSO = Nothing
End Sub
%>