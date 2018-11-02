function startRoll() {
	$('#roll').click();
}

function stopRoll(n) {
	$('#stop_roll').click();

	if (n == 1) {
		alert(n);
		var text = '<div class="side front"><div class="dot center"></div></div>';
	} else if (n == 2) {
		var text = '<div class="side front"><div class="dot dtop dleft"></div><div class="dot dbottom dright"></div></div>';
	} else if (n == 3) {
		var text = '<div class="side front"><div class="dot dtop dleft"></div> <div class="dot center"></div> <div class="dot dbottom dright"></div></div>';
	} else if (n == 4) {
		var text = '<div class="side front"><div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div></div>';
	} else if (n == 5) {
		var text = '<div class="side front"><div class="dot center"></div> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div></div>';
	} else if (n == 6) {
		var text = '<div class="side front"><div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> <div class="dot center dleft"></div> <div class="dot center dright"></div></div>';
	}

	$('#platform').html(text);
}

// $(document).on("ready", function() {
// 	setTimeout(startRoll, 1000);
// 	setTimeout(stopRoll, 3000, 6);
// }); 