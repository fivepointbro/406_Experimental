﻿<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap and app CSS -->
    <link href="_css/bootstrap.css" rel="stylesheet">
    <link href="_css/app.css" rel="stylesheet">
    
    
    <title>406 Experimental</title>
  </head>
  <body>
  
	<!-- NAVBAR START -->
	<nav-bar page="home"></nav-bar>
	<!-- NAVBAR END -->

	<!-- MAIN BODY CONTENT -->
	<div id="page-content" class="d-block main-content container border p-2 shadow-lg">
	</div>
	<!-- CONTENT END --!>

	<!-- THIS IS OUR POPUP, ONLY APPEARS WHEN ACTIVATED -->
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

    <!-- Bootstrap Bundle and our Site's JS Code -->
    <script src="_js/bootstrap.bundle.min.js"></script>
	<script type="module" src="app.js"></script>


  </body>
</html>