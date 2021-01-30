<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap and app CSS -->
    <link href="_css/bootstrap.css" rel="stylesheet">
    <link href="_css/app.css" rel="stylesheet">
    
    
<form method="get" action="http://index.mil.ca/Srch.aspx?">
<div id="gcwu-srchbx-in">
<label for="gcwu-srch">Search website</label>
<input maxlength="150" size="27" value="" type="search" name="UsrQue" id="gcwu-srch">
<input data-icon="search" value="Search" type="submit" name="Action" id="gcwu-srch-submit">
<input name="lang" value="en-CA" type="hidden">
<input name="ParamSources" value="12+Wing__12e+Escadre" type="hidden">
</div>
</form>
    <title>406 Experimental</title>
  </head>
  <body>
  
	<!-- NAVBAR START -->
	<!--#include file="_common/_header.inc"-->
	<!-- NAVBAR END -->

	<!-- MAIN BODY CONTENT -->
	<div id="page-content" class="d-block main-content container border p-2 shadow-lg">
	</div>
	<!-- CONTENT END --!>

	<!-- THIS IS OUR POPUP, NORMALLY HIDDEN -->
	<div class="modal fade" id="mainModal" tabindex="-1" aria-labelledby="mainModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
	<div class="modal-content">
	<div class="modal-header">
        <h5 id="modalTitle" class="modal-title">Default Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	</div>
	<div class="modal-body">
        <p id="modalText">Modal body text goes here.</p>
	</div>
	<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
	</div>
	</div>
	</div>
	</div>
	<!-- POPUP END -->

    <!-- Bootstrap Bundle with Popper -->
    <script src="_js/bootstrap.bundle.min.js"></script>
    <script src="app.js"></script>

  </body>
</html>