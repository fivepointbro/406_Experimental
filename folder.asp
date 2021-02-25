<%
on error resume next
dim rf,fs,f
set rf=Request.QueryString("folder")
set fs=Server.CreateObject("Scripting.FileSystemObject")
set f=fs.GetFolder(eval(rf))

Response.ContentType = "application/json"

Function JSON(input)
	JSON = Replace(input & "", "\", "\\")
End Function

dim first : first = 0

Response.Write "{ ""files"": ["
' loop through your folder contents    
for each file in f.files
	if first <> 0 then
	Response.Write(",")
	end if
	Response.Write("{ ""path"": """ & JSON(file.path) & """, ""name"": """ & JSON(file.name) & """, ""shortname"": """ & JSON(file.shortname) & """, ""type"": """ & JSON(file.type) & """, ""attributes"": """ & JSON(file.attributes) & """ }")
	first = 1
next
Response.Write "]}"

set f=nothing
set fs=nothing

IF Err.Number <> 0 THEN
	Response.Write "YOU TRIED: " & rf                          & "<br />"
    Response.Write "=========================================" & "<br />"
    Response.Write "Error description: " & Err.Description     & "<br />"
    Response.Write "Source: " & Err.Source                     & "<br />"
    Response.Write "LineNumber: " & Err.Line                   & "<br />"
    Response.Write "=========================================" & "<br />"
   ELSE 
END IF
%>