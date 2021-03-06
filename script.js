var clientInfo = [];
var clientObject = {};

var startupText = "<p>dog name:<br>human name:<br>address:<br>email:<br>phone:<br>";

function getClientInfo(client, data) {
	var text = "dog name: " + data[client].dogname + "<br>";
	text += "human name: " + data[client].humanname + "<br>";
	if (data[client].address) {
		text += "address: " + data[client].address + "<br>";
	} else {
		text += "address: " + "<br>";
	}
	if (data[client].email) {
		text += "email: " + data[client].email + "<br>";
	} else {
		text += "email: " + "<br>";
	}
	if (data[client].phone) {
		text += "phone: " + data[client].phone + "<br>";
	} else {
		text += "phone: " + "<br>";
	}

	return text;
}

function getClientInfoForEnter(data) {
	var text = "dog name: " + data.dogname + "<br>";
	text += "human name: " + data.humanname + "<br>";
	if (data.address) {
		text += "address: " + data.address + "<br>";
	} else {
		text += "address: " + "<br>";
	}
	if (data.email) {
		text += "email: " + data.email + "<br>";
	} else {
		text += "email: " + "<br>";
	}
	if (data.phone) {
		text += "phone: " + data.phone + "<br>";
	} else {
		text += "phone: " + "<br>";
	}

	return text;
}

// enter or update clientObject key on change

$(document).ready(function() {

	$("#show").html(startupText);

	$("#humanname").change(function() {
		clientObject.humanname = $("#humanname").val();

	});
	$("#dogname").change(function() {
		clientObject.dogname = $("#dogname").val();

	});
	$("#address").change(function() {
		clientObject.address = $("#address").val();

	});
	$("#email").change(function() {
		clientObject.email = $("#email").val();

	});
	$("#phone").change(function() {
		clientObject.phone = $("#phone").val();

	});

	// store data on enter button click

	$("#enter").click(function () {
		if ($("#dogname").val().length > 0 && $("#humanname").val().length > 0) {
			if (localStorage.getItem('clients') !== null) {
				clientInfo = JSON.parse(localStorage.getItem('clients'));
			}

			clientInfo.push(clientObject);
			localStorage.setItem('clients', JSON.stringify(clientInfo));

			var data = clientObject;
			var text = getClientInfoForEnter(data);

			$("#show").html("<p>" + text + "</p>");
			$("input").val("");

			clientObject = {};

		} else {
			alert("Please enter a client")
		}

	});

	// retrieve data on search button click

	$("#get").click(function () {
		var client;
		var data = JSON.parse(localStorage.getItem('clients'));
		var found = false;

		if ($("#dogname").val().length > 0) {
			// loop thru clientInfo looking for dog name
			for (client in data) {
				// if found, retrieve and display all info for that object
				if (clientObject.dogname === data[client].dogname) {
						var text = getClientInfo(client, data);
						$("#show").html("<p>" + text + "</p>");
						$("input").val("");
						found = true;
				}
			}

		} else {
			alert("Please enter a dog name");
			found = true;
		}

		if (found === false) {
			$("input").val("");
			alert("no entry was found");
		}
			
	});


	$("#clear").click( function () {
		$("#show").html(startupText);
	});


	$("#all").click( function () {
			var client;
			var data = JSON.parse(localStorage.getItem('clients'));

		if (data.length === 0) {
			$("#show").html(startupText);
		} else {

			$("#show").html("");

			for (client in data) {
				var text = getClientInfo(client, data);
				$("#show").append("<p>" + text + "</p>");
			}
		}
	});

	// $("#deleteAll").click( function () {
		// localStorage.removeItem('clients');
		// clientInfo = [];
		// $("#show").text("");
	// })

	$("#deleteClient").click( function () {
		var client;
		var data = JSON.parse(localStorage.getItem('clients'));

		if (data.length > 0) {
			$("#show").html(startupText);
			for (client in data) {
				if (clientObject.dogname === data[client].dogname) {
					data.splice(client, 1);
					clientInfo = data;
					localStorage.setItem('clients', JSON.stringify(clientInfo));
				}
			}
		} else {
			alert("Please select a client entry to delete");
		}
	});

});









