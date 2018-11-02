import emptyCircle from "../images/emptyCircle.png"
import figure from "../images/figure.png"
import emptyTriangle from "../images/emptyTriangle.png"
import filledTriangle from "../images/filledTriangle.png"
const template = `<div id="title">Games</div>

<br>

<div class="step step-3" id="step-3">
		Game Deposit: <input type="number" name="deposit" value="10" min="5" max="20"><b>tokens</b>
		<button class="next" id="gamedice">Dice</button>
	</div>

	<hr>

	<div class="step step-4" id="step-4">
		<div>
			Your bet: <input type="number" name="bet" value="1" min="1" max="20"> <b>tokens</b>
			<button class="next">Close</button>
		</div>

		<br>
		Your number: &nbsp;&nbsp;
		<input type="radio" name="choice" value="1"> 1 &nbsp;&nbsp;
		<input type="radio" name="choice" value="2" checked> 2 &nbsp;&nbsp;
		<input type="radio" name="choice" value="3"> 3 &nbsp;&nbsp;
		<input type="radio" name="choice" value="4"> 4 &nbsp;&nbsp;
		<input type="radio" name="choice" value="5"> 5 &nbsp;&nbsp;
		<input type="radio" name="choice" value="6"> 6 &nbsp;&nbsp;
		<button class="play" id="play">Play</button>
		<br>

		<div id="wrapper">
			<input id="secondroll" name="roll" type="checkbox" style="display: none;">
			<input id="roll" name="roll" type="checkbox" style="display: none;">
			<label for="roll" style="display: none;">Shuffle!</label>
			<label for="secondroll" id="stop_roll" style="display: none;"><span>Stop!</span></label>
			<div id="platform">
				<div id="dice">
					<div class="side front">
						<div class="dot center"></div>
					</div>
					<div class="side front inner"></div>
					<div class="side top">
						<div class="dot dtop dleft"></div>
						<div class="dot dbottom dright"></div>
					</div>
					<div class="side top inner"></div>
					<div class="side right">
						<div class="dot dtop dleft"></div>
						<div class="dot center"></div>
						<div class="dot dbottom dright"></div>
					</div>
					<div class="side right inner"></div>
					<div class="side left">
						<div class="dot dtop dleft"></div>
						<div class="dot dtop dright"></div>
						<div class="dot dbottom dleft"></div>
						<div class="dot dbottom dright"></div>
					</div>
					<div class="side left inner"></div>
					<div class="side bottom">
						<div class="dot center"></div>
						<div class="dot dtop dleft"></div>
						<div class="dot dtop dright"></div>
						<div class="dot dbottom dleft"></div>
						<div class="dot dbottom dright"></div>
					</div>
					<div class="side bottom inner"></div>
					<div class="side back">
						<div class="dot dtop dleft"></div>
						<div class="dot dtop dright"></div>
						<div class="dot dbottom dleft"></div>
						<div class="dot dbottom dright"></div>
						<div class="dot center dleft"></div>
						<div class="dot center dright"></div>
					</div>
					<div class="side back inner"></div>
					<div class="side cover x"></div>
					<div class="side cover y"></div>
					<div class="side cover z"></div>
				</div>
			</div>
		</div>

		<!-- <button class="next" style="width: 100%; margin: 85px 0 30px 0;">Close</button> -->
		<div id="middle"></div>

		Results:
		<table id="suda-rezu">
			<tr>
				<td>Bet</td>
				<td>Your choice</td>
				<td>Number</td>
				<td>Profit</td>
				<td>Your balance</td>
			</tr>
		</table>
	</div>`

export default template