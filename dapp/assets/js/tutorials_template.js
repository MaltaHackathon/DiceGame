import emptyCircle from "../images/emptyCircle.png"
import figure from "../images/figure.png"
import emptyTriangle from "../images/emptyTriangle.png"
import filledTriangle from "../images/filledTriangle.png"
const template = `<div id="tutorial_app" class="show-step-0">
		<h1 id="h1">Games</h1>
		<div style="display:none" id="loader-spinner" class="loaders-container">
		<div class="container">
		 <div class="switchbox">
			 <div class="switch-horisontal"><img src=${emptyCircle} width="15px" height="15px"></div>
			 <div class="switch-horisontal"><img src=${emptyTriangle} width="15px" height="15px"></div>
			 <div class="switch-vertical"><img src=${filledTriangle} width="15px" height="15px"></div>
			 <div class="switch-vertical"><img src=${figure} width="15px" height="15px"></div>
		 </div>
		 </div>
	 </div>
		<hr>
		<div class="step step-3">
			<label>
				Game Deposit:
				<input type="number" name="deposit" value="10" min="5" max="20"> <b>tokens</b>
			</label>
			<button class="next" style="top: 5px; bottom: 40px;">Dice</button>
		</div>


		<!-- play -->
		<div class="step step-4">

			<label>
				Your bet:
				<input type="number" name="bet" value="1" min="1" max="20"> <b>tokens</b>
			</label>

			<br>
			<label>
				Your number: &nbsp;&nbsp;
				<input type="radio" name="choice" value="1"> 1 &nbsp;&nbsp;
				<input type="radio" name="choice" value="2" checked> 2 &nbsp;&nbsp;
				<input type="radio" name="choice" value="3"> 3 &nbsp;&nbsp;
				<input type="radio" name="choice" value="4"> 4 &nbsp;&nbsp;
				<input type="radio" name="choice" value="5"> 5 &nbsp;&nbsp;
				<input type="radio" name="choice" value="6"> 6 &nbsp;&nbsp;
			</label>
			<br>

			<table id="play-table-results" class="play-log">
				<caption>play log:</caption>
				<thead><tr>
					<th>bet</th>
					<th>choice</th>
					<th>rnd hash</th>
					<th>rnd num</th>
					<th>profit</th>
					<th>balance</th>
				</tr></thead>
				<tbody></tbody>
			</table>
			<br>
			<button class="play">Play</button>
			<button class="next" style="bottom: 50px;">Close Channel</button>
		</div>

		<!-- closeChannel -->
		<div class="step step-5">
			<h2>OK, time to end tutorial</h2>

			<div class="close-block">
				<p>Now, send close gamechannel transaction</p>
				<button>Close Channel</button>
			</div>


			<div class="outro-block" style="display:none">
				<pre id="close_result"></pre>
				<p>Thats all.</p>
				<p>
					More information you can find in our git and site
					<ul>
						<li><a target="_blank" href="https://developers.dao.casino/">Dev site</a></li>
						<li><a target="_blank" href="https://github.com/DaoCasinok">DaoCasino Github</a></li>
						<li><a target="_blank" href="https://github.com/DaoCasino/sdk">DaoCasino/sdk</a></li>
					</ul>
				</p>
			</div>
		</div>


		<!-- dapp status -->
		<div id="log">
			<div class="title">Dapp status:</div>
		</div>

	</div>`

export default template